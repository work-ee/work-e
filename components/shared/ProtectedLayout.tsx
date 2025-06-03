"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/sign-in");
    }
  }, [loading, isLoggedIn, router]);

  if (loading || !isLoggedIn) {
    return <p className="center-page text-center">Завантаження...</p>;
  }

  return <>{children}</>;
}
