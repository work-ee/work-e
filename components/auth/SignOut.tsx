"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/Button";

const SignOut = () => {
  return (
    <div className="flex justify-center">
      <Button variant="secondary" className="btn-sm" onClick={() => signOut({ callbackUrl: "/sign-in" })}>
        Вийти
      </Button>
    </div>
  );
};

export { SignOut };
