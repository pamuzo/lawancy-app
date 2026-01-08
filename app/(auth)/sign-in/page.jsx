import SigninForm from "./signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Sign In",
};

async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl ?? "/";

  const session = await auth();
  if (session?.user) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full">
      <SigninForm />
    </div>
  );
}

export default SignInPage;
