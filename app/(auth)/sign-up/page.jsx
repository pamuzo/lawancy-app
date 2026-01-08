import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./signup-form";
export const metadata = {
  title: "Sign Up",
};

async function SignUpPage({ searchParams }) {
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl ?? "/";

  const session = await auth();
  if (session?.user) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full">
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
