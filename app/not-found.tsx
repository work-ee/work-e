import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui";

export const metadata = {
  title: "404 – Сторінку не знайдено",
};

export default function NotFound() {
  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="flex max-w-2xl flex-col items-center justify-center mx-auto text-center">
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
            <div className="flex flex-wrap flex-1 justify-center gap-4 mt-8 w-full">
              <Link href="/" className="flex-1">
                <Button className="justify-center w-full">Повернутись на головну</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
