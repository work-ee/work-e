"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/Button";

const SignOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center">
      <Button variant="secondary" className="btn-sm" onClick={() => signOut({ callbackUrl: "/sign-in" })}>
        {children}
      </Button>
    </div>
  );
};

export { SignOut };
