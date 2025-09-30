import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui";

import { ROUTES } from "@/lib/constants";

export const metadata = {
  title: "404 – Сторінку не знайдено",
};

export default function NotFound() {
  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
            <Image
              src="/img/404.png"
              width={420}
              height={240}
              alt="Милий робот з лупою шукає сторінку"
              priority
              className="select-none"
            />
            <p className="text-xl text-slate-600">
              Схоже, цієї сторінки не існує або вона була переміщена. <br />
              Перевірте адресу або поверніться на головну.
            </p>
            <div className="mt-8 flex w-full flex-1 flex-wrap justify-center gap-4">
              <Link href={ROUTES.home} className="flex-1">
                <Button className="w-full justify-center">Повернутись на головну</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
