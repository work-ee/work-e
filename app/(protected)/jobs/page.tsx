import { promises as fs } from "fs";

import MagicSvg from "@/components/icons/MagicSvg";
import { CardList } from "@/components/jobs/CardList";
import { FilterList } from "@/components/jobs/FilterList";
import { Search } from "@/components/jobs/Search";
import { Button } from "@/components/ui";

import { cn } from "@/lib/utils";

import { JobProps } from "@/types/jobs";

async function getJobs(): Promise<{ data: JobProps[]; length?: number }> {
  try {
    const file = await fs.readFile(process.cwd() + "/public/data/jobs.json", "utf8");
    return { data: JSON.parse(file), length: JSON.parse(file).length };
  } catch (error) {
    console.error("Error reading users data:", error);
    return { data: [], length: 0 };
  }
}

export default async function ProfilePage() {
  const jobs = await getJobs();

  return (
    <main className="_center-page">
      <section className="section">
        <div className="container">
          <div className="relative flex flex-wrap items-center gap-4">
            <h1 className="heading-h2">UX/UI Designer</h1>
            <span className="heading-h3 inline-flex text-neutral-500">{jobs.length}</span>

            <Search />
          </div>

          <div className="aside-wrapper">
            <article className="article">
              {jobs.data.length === 0 ? (
                <h1 className="heading-h2 text-primary-700 text-center">No jobs found 😔</h1>
              ) : (
                <CardList data={jobs.data} className="grid grid-cols-1 gap-4" />
              )}
            </article>

            <aside className="aside">
              <div className="border-primary-100 flex flex-col gap-4 rounded-md p-6 shadow-[0_0_0_2px_var(--color-primary-100)] sm:px-6">
                <h3 className="heading-h3 text-primary-700">
                  Твій AI-кар'єрний стратег: Персоналізовані CV та листи – автоматично!
                </h3>
                <p>
                  Забудь про стандартні відгуки та години ручної роботи! Тепер розумний AI індивідуально адаптує ключові
                  аспекти твого CV та пише унікальний, аргументований супровідний лист для кожної вакансії. Максимізуй
                  свої шанси та вражай рекрутерів без зайвих зусиль!
                </p>

                <Button className="justify-center">
                  <MagicSvg />
                  Активувати
                </Button>
              </div>

              <div className={cn("flex flex-col gap-4 rounded-md p-6 sm:px-6")}>
                <FilterList />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
