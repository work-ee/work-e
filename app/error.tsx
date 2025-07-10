"use client";

import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "500 – Щось пішло не так",
};

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="flex max-w-2xl flex-col items-center justify-center mx-auto text-center">
            <Image
              src="/img/500.png"
              width={380}
              height={240}
              alt="Засмучений робот тримає зламану шестерню"
              priority
              className="select-none"
            />

            <h1 className="heading-h2 text-primary-500">Щось пішло не так…</h1>
            <div className="max-w-md text-lg text-slate-600 mt-4">
              {error.message ? (
                <p className="text-red-500">
                  <strong>Помилка:</strong> {error.message} <br />
                </p>
              ) : (
                <p>На жаль, сталася внутрішня помилка з нашого боку. Ми вже працюємо над вирішенням.</p>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/" className="flex-1">
                <Button variant="secondary">Повернутись на головну</Button>
              </Link>
              <Button onClick={() => reset()}>Оновити сторінку</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
