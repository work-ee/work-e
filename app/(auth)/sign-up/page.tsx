import React from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { LinkedinSignIn } from "@/components/auth/LinkedinSignIn";
import { BuildingSvg, SearchJobSvg } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";

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
          <div className="flex items-center gap-8 flex-col min-h-[420px]">
            <div className="flex flex-col text-center">
              <h1 className="heading-h2">Зареєструватись на Work - E</h1>
            </div>

            <Tabs defaultValue="sign-in" className="gap-8">
              <TabsList className="bg-white h-auto rounded-none p-0 flex justify-between">
                <TabsTrigger
                  value="sign-in"
                  className="min-w-[18rem] data-[state=active]:bg-secondary-50 p-5 h-auto outline data-[state=active]:outline-primary-700 rounded-none transition duration-300"
                >
                  <div className="flex flex-col items-center gap-3 text-primary-900">
                    <SearchJobSvg className="size-12" />
                    <h3 className="heading-h3">Шукаю роботу</h3>
                  </div>
                </TabsTrigger>

                <TabsTrigger
                  value="sign-up"
                  className="min-w-[18rem] data-[state=active]:bg-secondary-50 p-5 h-auto outline data-[state=active]:outline-primary-700 rounded-none transition duration-300"
                >
                  <div className="flex flex-col items-center gap-3 text-primary-900">
                    <BuildingSvg className="size-12" />
                    <h3 className="heading-h3">Шукаю спеціаліста</h3>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="sign-in"
                className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="text-center my-4 flex flex-col gap-4">
                    <div className="text-center gap-2 flex flex-col">
                      <GoogleSignIn />
                      <LinkedinSignIn />
                    </div>
                  </div>

                  <div className="text-neutral-800">
                    <Link className="text-link font-medium font-rubik text-primary-500" href="/sign-in">
                      Увійти в існуючий
                    </Link>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="sign-up"
                className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="text-center my-4 flex flex-col gap-4">
                    <p className="text-2xl ">
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
