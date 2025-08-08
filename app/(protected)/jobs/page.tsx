import Image from "next/image";

import { AsideAiInfo, AsideFilterList, CardList, Search } from "@/components/jobs";

import { cn } from "@/lib/utils";

import { getAllJobs } from "@/actions/server/jobs";

export default async function ProfilePage() {
  const jobs = await getAllJobs();

  return (
    <main className="center-page">
      <section className="section flex-1">
        <div className="container">
          <div className="relative flex flex-wrap items-center gap-4">
            <h1 className="heading-h2">UX/UI Designer</h1>
            <span className="heading-h3 inline-flex text-neutral-500">{jobs.length}</span>

            <Search />
          </div>

          <div className="aside-wrapper">
            <article className="article">
              {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
                  <h2 className="heading-h2 text-primary-700">Поки що тиша, але ми вже шукаємо щось саме для тебе.</h2>
                  <Image
                    className="mx-auto"
                    src="/img/no_vacancy.png"
                    alt="No results found"
                    priority
                    width={700}
                    height={600}
                  />
                  <p className="heading-h3">
                    Спробуй змінити фільтри або трохи оновити профіль — це допоможе нам краще розуміти твої потреби.
                    {/* Схоже, що наразі немає вакансій, які відповідають вашим критеріям. Спробуйте змінити фільтри або
                    пошук. */}
                  </p>
                </div>
              ) : (
                <CardList data={jobs} className="grid grid-cols-1 gap-4" />
              )}
            </article>

            <aside className="aside">
              <AsideAiInfo />

              <div className={cn("flex flex-col gap-4 rounded-md p-6 sm:px-6")}>
                <AsideFilterList />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
