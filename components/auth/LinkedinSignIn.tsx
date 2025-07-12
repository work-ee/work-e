"use client";

import { useState } from "react";

import clsx from "clsx";

import { LinkedinSvg } from "@/components/icons";

interface Props {
  className?: string;
  children?: React.ReactNode;
  callbackUrl?: string;
}
export const LinkedinSignIn = ({ className = "", children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  // ToDo: It's a default callback URL with next-auth
  // const router = useRouter();
  // const handleLinkedinSignIn = async () => {
  //   setIsLoading(true);
  //   const res = await signIn("linkedin", {
  //     redirect: false,
  //     callbackUrl,
  //   });
  //   if (res?.ok) {
  //     router.push(res.url!);
  //   } else {
  //     setIsLoading(false);
  //     alert("Problem with Linkedin sign in. Please try again later.");
  //     console.error("Linkedin sign in error:", res?.error);
  //   }
  // };

  const handleLinkedinSignInWithRedirect = async () => {
    setIsLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/users/linkedin/login/`;
  };

  return (
    <button
      onClick={handleLinkedinSignInWithRedirect}
      disabled={isLoading}
      className={clsx(
        "flex cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed justify-center items-center gap-3 px-4 min-w-[420px] py-3 border border-neutral-200 rounded-md hover:border-primary-900 transition-colors",
        className
      )}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      ) : (
        <LinkedinSvg />
      )}
      {children || "Продовжити з Linkedin"}
    </button>
  );
};
