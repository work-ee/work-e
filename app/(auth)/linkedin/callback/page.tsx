"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { BackendUser } from "@/types/next-auth";

export default function LinkedInCallbackPage() {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDataAndSignIn = async () => {
      try {
        // -> Step 1: Get user data from Django backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/current/`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setUser(data);

        // -> Step 2: Sign in via NextAuth with the received data
        setIsSigningIn(true);
        const result = await signIn("linkedin-django", {
          redirect: false,
          userData: JSON.stringify(data),
        });

        if (result?.ok) {
          // -> Redirect to onboarding after successful sign-in
          setTimeout(() => {
            router.push("/onboarding");
            router.refresh();
          }, 1000);
        } else {
          throw new Error("Failed to sign in to NextAuth: " + result?.error);
        }
      } catch (err) {
        console.error("LinkedIn sign in error:", err);
        setError(err instanceof Error ? err.message : String(err));

        setTimeout(() => {
          router.push("/sign-in?error=callback_failed");
        }, 3000);
      }
    };

    fetchUserDataAndSignIn();
  }, [router]);

  if (error) {
    return (
      <div className="center-page">
        <div className="container">
          <div className="flex items-center justify-center gap-2 flex-col">
            <div className="rounded-full h-12 w-12 bg-red-100 mx-auto flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="mt-4 text-red-600">Помилка авторизації. Перенаправляємо на сторінку входу...</p>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="center-page">
        <div className="container">
          <div className="flex items-center justify-center gap-2 flex-col">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {!isSigningIn ? "Отримуємо дані користувача..." : "Завершуємо авторизацію LinkedIn..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="center-page">
      <div className="container">
        <div className="flex items-center justify-center gap-2 flex-col">
          <div className="rounded-full h-12 w-12 bg-green-100 mx-auto flex items-center justify-center">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Ласкаво просимо, {user?.first_name || user?.username}!
          </h1>
        </div>
      </div>
    </div>
  );
}
