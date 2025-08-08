import { Suspense } from "react";

import AuthError from "./_AuthError";

function LoadingSpinner() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-4 text-slate-600">Loading error details...</p>
    </div>
  );
}

export default async function AuthErrorPage() {
  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="flex items-center justify-center">
            <Suspense fallback={<LoadingSpinner />}>
              <AuthError />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
