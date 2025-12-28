"use client";

import { useRouter } from "next/dist/client/components/navigation";

import { Button, Variant } from "@/components/ui/Button";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

const supabase = getSupabaseBrowserClient();

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  redirectTo?: string;
  variant?: Variant;
};

const SignOut = ({ children, redirectTo = "/sign-in", variant = "secondary", ...props }: Props) => {
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // setCurrentUser(null);
    router.replace(redirectTo);
    router.refresh();
  };

  return (
    <Button onClick={handleSignOut} variant={variant} {...props}>
      {children}
    </Button>
  );
};

export { SignOut };
