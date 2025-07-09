// import ClientOnboarding from "@/components/onboarding/ClientOnboarding";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";

import GetSession from "@/lib/get-session";

export default async function ProfilePage() {
  const session = await GetSession();
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="heading-h2">Мій профіль</h1>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 italic">Welcome: </span>
              <span className="heading-h4 text-primary">{session?.user?.name}</span>
            </div>
          </div>

          <div className="max-w-[870px]">
            <Tabs defaultValue="profile" className="gap-8 mt-8">
              <TabsList className="bg-white h-auto rounded-none p-0 gap-4 flex justify-between">
                <TabsTrigger
                  value="profile"
                  className="cursor-pointer data-[state=active]:underline underline-offset-6 underline-primary-500 p-1 rounded-none data-[state=active]:shadow-none data-[state=active]:text-primary-500 transition duration-300 hover:text-primary-500"
                >
                  <h3 className="heading-h3">Профіль</h3>
                </TabsTrigger>

                <TabsTrigger
                  value="settings"
                  className="cursor-pointer data-[state=active]:underline underline-offset-6 underline-primary-500 p-1 rounded-none data-[state=active]:shadow-none data-[state=active]:text-primary-500 transition duration-300 hover:text-primary-500"
                >
                  <h3 className="heading-h3">Налаштування</h3>
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="profile"
                className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
              >
                <div className="flex flex-col">
                  <div className="text-neutral-800">
                    <p className="text-2xl">
                      Ця функція буде доступна зовсім скоро! <br /> Ми вже працюємо над нею
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="settings"
                className="data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:zoom-in data-[state=inactive]:animate-fade-out data-[state=inactive]:fade-out data-[state=inactive]:zoom-out"
              >
                <div className="flex flex-col">
                  <div className="text-neutral-800">
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
