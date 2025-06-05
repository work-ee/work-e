import { Button } from "@/components/ui/Button";

import { signOut } from "@/lib/auth";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/sign-in" });
      }}
    >
      <div className="flex justify-center">
        <Button variant="secondary">Вийти</Button>
      </div>
    </form>
  );
};

export { SignOut };
