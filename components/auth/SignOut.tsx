"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/Button";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout/`, {
        method: "POST",
        credentials: "include",
      });

      await signOut({ callbackUrl: "/sign-in" });
    } catch (err) {
      console.error("Logout error:", err);
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
