import React from "react";

import Link from "next/link";

import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { LinkedinSignIn } from "@/components/auth/LinkedinSignIn";
import { BuildingSvg, SearchJobSvg } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";

export default async function Register() {
  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="flex min-h-[420px] flex-col items-center gap-8">
            <div className="flex flex-col text-center">
              <h1 className="heading-h2">Зареєструватись на Work - E</h1>
            </div>

            <Tabs defaultValue="sign-in" className="gap-8">
              <TabsList className="flex h-auto justify-between rounded-none bg-white p-0">
                <TabsTrigger
                  value="sign-in"
                  className="data-[state=active]:bg-secondary-50 data-[state=active]:outline-primary-700 h-auto min-w-[18rem] rounded-none p-5 outline transition duration-300"
                >
                  <div className="text-primary-900 flex flex-col items-center gap-3">
                    <SearchJobSvg className="size-12" />
                    <h3 className="heading-h3">Шукаю роботу</h3>
                  </div>
                </TabsTrigger>

                <TabsTrigger
                  value="sign-up"
                  className="data-[state=active]:bg-secondary-50 data-[state=active]:outline-primary-700 h-auto min-w-[18rem] rounded-none p-5 outline transition duration-300"
                >
                  <div className="text-primary-900 flex flex-col items-center gap-3">
                    <BuildingSvg className="size-12" />
                    <h3 className="heading-h3">Шукаю спеціаліста</h3>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="sign-in"
                className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="my-4 flex flex-col gap-4 text-center">
                    <div className="flex flex-col gap-2 text-center">
                      <GoogleSignIn />
                      <LinkedinSignIn />
                    </div>
                  </div>

                  <div className="text-neutral-800">
                    <Link className="text-link font-rubik font-medium" href="/sign-in">
                      Увійти в існуючий
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="sign-up"
                className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="my-4 flex flex-col gap-4 text-center">
                    <p className="text-2xl">
                      Ця функція буде доступна зовсім скоро! <br /> Ми вже працюємо над нею
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
}
