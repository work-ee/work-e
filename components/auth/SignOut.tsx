"use client";

import { Button } from "@/components/ui/Button";

import { useAuth } from "@/hooks/useAuth";

const SignOut = () => {
  const { logout } = useAuth();

  return (
    <div className="flex justify-center">
      <Button variant="secondary" onClick={logout}>
        Вийти
      </Button>
    </div>
  );
};

export { SignOut };
