"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import clsx from "clsx";
import { signIn } from "next-auth/react";

import { GoogleSvg } from "@/components/icons";

interface Props {
  className?: string;
  children?: React.ReactNode;
  callbackUrl?: string;
}
export const GoogleSignIn = ({ className = "", children, callbackUrl = "/onboarding" }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const res = await signIn("google", {
      redirect: false,
      callbackUrl,
    });

    if (res?.ok) {
      router.push(res.url!);
    } else {
      setIsLoading(false);
      alert("Problem with Google sign in. Please try again later.");
      console.error("Google sign in error:", res?.error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className={clsx(
        "hover:border-primary-900 flex min-w-[420px] cursor-pointer items-center justify-center gap-3 rounded-md border border-neutral-200 px-4 py-3 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
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
