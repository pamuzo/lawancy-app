"use server";
import { signInSchema, signUpSchema } from "../validator";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { prisma } from "@/lib/prisma";
import { hashSync } from "bcryptjs";
import { ZodError } from "zod";
import { formatError } from "../utils";

// Action for signing in user
export async function signInUser(prevState, formData) {
  try {
    const user = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);
    return { success: true, message: "Sign in successful" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log("Sign in error:", error);
    return { success: false, message: "Invalid email or password" };
  }
}

// Action for signing out user
export async function signOutUser() {
  try {
    await signOut();
    return { success: true, message: "Sign out successful" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Sign out failed" };
  }
}

// Action for registering a new user
export async function signUpUser(prevState, formData) {
  try {
    const user = signUpSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    // const plainPassword = formData.get("password");

    const hashedPassword = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        addresses: [],
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
    });

    return { success: true, message: "Sign up successful" };
  } catch (error) {
    // console.log(error.code);
    console.log(error.issues);
    console.log(error.cause);
    // console.log(error.meta?.target);

    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: await formatError(error) };
  }
}
