"use client";

import { Suspense } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui";

const errorMessages = {
  Configuration: "There was a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in. \n Please contact support if you believe this is an error.",
  Verification: "The verification link was invalid or has expired.",
  Default: "An unexpected error occurred during authentication.",
  Callback: "Authentication failed. Please try again.",
  OAuthSignin: "Error constructing an authorization URL.",
  OAuthCallback: "Error in handling the response from the OAuth provider.",
  OAuthCreateAccount: "Could not create account with the OAuth provider.",
  EmailCreateAccount: "Could not create account with email provider.",
  SignOut: "Error signing out.",
  SessionRequired: "Please sign in to access this page.",
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as keyof typeof errorMessages;

  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
            <div>
              <div className="mx-auto mb-4 h-20 w-20 text-red-500">
                <svg className="h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h1 className="heading-h2 text-primary-500">Authentication Error</h1>
              <p className="mt-2 text-slate-600">{errorMessage}</p>
              {error && <p className="mt-2 text-sm text-gray-500">Error code: {error}</p>}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/sign-in">
                <Button variant="secondary" className="w-full justify-center">
                  Try signing in again
                </Button>
              </Link>

              <Link
                href="/"
                // className="flex-1"
              >
                <Button className="w-full justify-center">Return to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function AuthError() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div>Loading...</div>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
