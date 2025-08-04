"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import clsx from "clsx";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { GoogleSvg } from "@/components/icons";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  callbackUrl?: string;
}
export const GoogleSignIn = ({ className = "", children, callbackUrl = "/onboarding", ...props }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      const res = await signIn("google", {
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      if (res?.ok && res.url) {
        router.push(res.url);
      } else {
        throw new Error("Unexpected response from authentication service");
      }
    } catch (error) {
      console.error("Google sign in error:", error);

      const errorMessage = error instanceof Error ? error.message : "Невідома помилка під час входу";

      toast.error(`Помилка входу через Google: ${errorMessage}`);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className={clsx(
        "hover:border-primary-700 flex min-w-[420px] cursor-pointer items-center justify-center gap-3 rounded-md border border-neutral-200 px-4 py-3 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        className
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
