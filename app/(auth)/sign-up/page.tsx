import React from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { LinkedinSignIn } from "@/components/auth/LinkedinSignIn";
import { BuildingSvg, SearchJobSvg } from "@/components/icons";

import { auth } from "@/lib/auth";

export default async function Register() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="flex items-center justify-center gap-6 flex-col">
            <div className="flex flex-col text-center">
              <h1 className="heading-h2">Зареєструватись на Work - E</h1>
            </div>

            <ul className="flex gap-4">
              <li>
                <a
                  href="#"
                  className="p-5 flex flex-col min-w-[18rem] items-center gap-3 text-primary-900 border border-primary-900 rounded hover:shadow-lg transition"
                >
                  <SearchJobSvg />
                  <h3 className="heading-h3">Шукаю роботу</h3>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  aria-disabled="true"
                  className="p-5 flex flex-col min-w-[18rem] items-center gap-3 text-primary-900 border border-primary-900 rounded hover:shadow-lg transition"
                >
                  <BuildingSvg />
                  <h3 className="heading-h3">Шукаю спеціаліста</h3>
                </a>
              </li>
            </ul>

            <div className="text-center my-4 flex flex-col gap-4">
              <h2 className="heading-h3">Продовжити з</h2>
              <div className="text-center gap-2 flex flex-col">
                <GoogleSignIn />
                <LinkedinSignIn />
              </div>
            </div>

            <div className="text-neutral-800">
              або{" "}
              <Link className="text-link underline" href="sign-in">
                увійти
              </Link>{" "}
              в існуючий
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
