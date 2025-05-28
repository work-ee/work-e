"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/ButtonArrow";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut();
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
