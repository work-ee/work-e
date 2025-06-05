"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import clsx from "clsx";
import { signIn } from "next-auth/react";

import { GoogleSvg } from "@/components/icons/GoogleSvg";

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
        "flex cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed justify-center items-center gap-3 px-4 min-w-[420px] py-3 border border-neutral-200 rounded-md hover:border-primary-900 transition-colors",
        className
      )}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      ) : (
        <GoogleSvg />
      )}
      {children || "Продовжити з Google"}
    </button>
  );
};
