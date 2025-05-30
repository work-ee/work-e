import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in"); // або інший шлях для авторизації
  }

  return <>{children}</>;
}
