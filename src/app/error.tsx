"use client";

import { startTransition, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";

import { ROUTES } from "@/lib/constants";

export const metadata = {
  title: "500 – Щось пішло не так",
};

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: Props) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
            <Image
              src="/img/500.png"
              width={380}
              height={240}
              alt="Засмучений робот тримає зламану шестерню"
              priority
              className="select-none"
            />

            <h1 className="heading-h2 text-primary-500">Щось пішло не так…</h1>
            <div className="mt-4 max-w-md text-lg text-slate-600">
              {error.message ? (
                <p className="text-red-500">
                  <strong>Помилка:</strong> {error.message} <br />
                </p>
              ) : (
                <p>На жаль, сталася внутрішня помилка з нашого боку. Ми вже працюємо над вирішенням.</p>
              )}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={ROUTES.home} className="flex-1">
                <Button variant="secondary">Повернутись на головну</Button>
              </Link>
              <Button onClick={reload}>Оновити сторінку</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
