import { auth } from "@/auth";
import HeaderMenu from "./menu";
import { signOutUser } from "@/lib/actions/user.action";

export default async function Header() {
  const session = await auth();

  return <HeaderMenu session={session} signOutUser={signOutUser} />;
}
