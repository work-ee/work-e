"use client";

import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/Button";

import { logoutFromDjango } from "@/lib/auth/django-api";

const SignOut = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      // -> Try to log out from Django API if there is a token
      if (session?.backendToken) {
        // const success = await logoutFromDjango(
        await logoutFromDjango(session.backendToken, session.backendRefreshToken || session.backendToken);
        // console.log("Django logout success:", success);
      } else {
        // -> If there is no token, just make a request with cookies
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout/`, {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout/`, {
          method: "POST",
          credentials: "include",
        });
        // console.log("Django logout via cookies response:", response.status);
      }
    } catch (err) {
      console.error("Django logout error:", err);
    } finally {
      // -> Always sign out from NextAuth regardless of Django logout result
      await signOut({ callbackUrl: "/sign-in" });
    }
  };

  return (
    <div className="flex justify-center">
      <Button variant="secondary" onClick={handleSignOut}>
        Вийти
      </Button>
    </div>
  );
};

export { SignOut };
