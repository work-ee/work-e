"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function LinkedInCallbackPage() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/current/`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setUser(data);

        // // Редирект після успішного отримання даних
        // setTimeout(() => {
        //   router.push("/dashboard");
        // }, 2000);
      } catch (err: any) {
        console.error("LinkedIn sign in error:", err);
        setError(err.message);

        setTimeout(() => {
          router.push("/sign-in?error=callback_failed");
        }, 3000);
      }
    };

    fetchUserData();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="rounded-full h-12 w-12 bg-red-100 mx-auto flex items-center justify-center">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="mt-4 text-red-600">Помилка авторизації. Перенаправляємо на сторінку входу...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Завершуємо авторизацію LinkedIn...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="rounded-full h-12 w-12 bg-green-100 mx-auto flex items-center justify-center">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Ласкаво просимо, {user?.first_name || user?.username}!
        </h1>
        {/* <p className="mt-2 text-gray-600">Перенаправляємо на головну сторінку...</p> */}
      </div>
    </div>
  );
}
