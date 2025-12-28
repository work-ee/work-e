"use client";

import { useState } from "react";

import clsx from "clsx";

import { GoogleSvg } from "@/components/icons";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
export const GoogleSignIn = ({ children, ...props }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = getSupabaseBrowserClient();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/onboarding`,
        skipBrowserRedirect: false,
      },
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className={clsx(
        "hover:border-primary-700 flex min-w-105 cursor-pointer items-center justify-center gap-3 rounded-md border border-neutral-200 px-4 py-3 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      )}
      {...props}
    >
      {isLoading ? (
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      ) : (
        <GoogleSvg />
      )}
      {children || "Продовжити з Google"}
    </button>
  );
};
