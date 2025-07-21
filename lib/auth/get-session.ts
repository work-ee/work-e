import { auth } from "@/lib/auth";

export default async function GetSession() {
  const session = await auth();
  return session;
}
