import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
    // signOut: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 day
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Validate credentials
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // find user by email in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // if user not found or no password set
        if (!user || !user.password) {
          return null;
        }
        // compare the password with hashed password
        // if (user && user.password) {
        //   const isMatch = compareSync(credentials.password, user.password);
        //   if (!isMatch) {
        //     console.log("❌ Password mismatch");
        //     return null;
        //   }
        // }
        const isMatch = bcrypt.compare(credentials.password, user.password);

        // return user object
        if (!isMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }) {
      // set the user id from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      return session;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true, name: true, email: true },
        });

        token.role = dbUser.role;
        token.name =
          dbUser.name && dbUser.name !== "NO NAME"
            ? dbUser.name
            : dbUser.email.split("@")[0];
      }

      //   if there is a trigger called "update" then update the session user data
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
  },
};

export const { handler, auth, signIn, signOut, getSession, useSession } =
  NextAuth(config);
