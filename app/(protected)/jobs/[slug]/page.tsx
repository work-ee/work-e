import { notFound } from "next/navigation";

import clsx from "clsx";
import { Check, Mail, X } from "lucide-react";

import { MagicSvg } from "@/components/icons";
import { Button } from "@/components/ui";

import { getJobBySlug } from "@/actions/server/jobs";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function JobArticlePage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  const { body, jobFormat, isApplied } = job || {};

  if (!job) {
    notFound();
  }

  return (
    <main className="center-page">
      <section className="section flex-1">
        <div className="container">
          <div className="relative flex flex-col gap-1">
            <span className="heading-h3 font-rubik flex items-center">
              {body?.logo && (
                <img src={body.logo} alt={`${body.company} icon`} className="mr-2 inline-flex max-w-[24px]" />
              )}
              {body?.company}
            </span>

            <h2 className="heading-h2 text-primary-700 mb-2 leading-tight">{body?.title}</h2>
            <ul className="flex flex-wrap gap-1">
              {jobFormat?.map((tag, index) => (
                <li key={index} className={clsx("bg-accent-50 text-primary-700 rounded-md px-2 py-1 text-xs")}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="aside-wrapper">
            <article className="article">
              <div className="prose prose-lg max-w-none p-8">
                {body?.text ? (
                  <div className="fullText leading-relaxed whitespace-pre-wrap text-gray-700">
                    <p>{body.text}</p>
                    <br />

                    <div>
                      <h3 className="heading-h3 my-2 mt-6">Про роль:</h3>
                      <p>
                        Ми шукаємо талановитого та мотивованого UX/UI Дизайнера, який приєднається до нашої команди для
                        створення виняткового користувацького досвіду для наших веб- та мобільних продуктів. Ви будете
                        відігравати ключову роль у всьому процесі дизайну: від дослідження потреб користувачів та
                        генерації ідей до створення візуально привабливих та функціональних інтерфейсів. Якщо ви
                        захоплюєтеся вирішенням складних завдань та створенням продуктів, якими дійсно люблять
                        користуватися, ця вакансія для вас!
                      </p>
                    </div>

                    <div>
                      <h3 className="heading-h3 my-2 mt-6">Вимоги:</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-6">
                        <li>
                          Від 2-3 років підтвердженого досвіду на позиції UX/UI Дизайнера, Продуктового Дизайнера або на
                          аналогічній ролі.
                        </li>
                        <li>
                          Сильне портфоліо, що демонструє ваш досвід у розробці UX/UI для веб- та/або мобільних
                          застосунків (будь ласка, додайте посилання).
                        </li>
                        <li>
                          Досконале володіння інструментами для дизайну та прототипування (наприклад, Figma, Sketch,
                          Adobe XD).
                        </li>
                        <li>
                          Глибоке розуміння принципів користувацького досвіду (UX), включаючи методи дослідження,
                          проєктування інформаційної архітектури, створення прототипів та тестування юзабіліті.
                        </li>
                        <li>
                          Знання англійської мови на рівні, достатньому для читання професійної літератури та
                          документації (Intermediate або вище).
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="heading-h3 my-2 mt-6">Що ми пропонуємо:</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-6">
                        <li>Конкурентна заробітна плата та бонуси за досягнення цілей.</li>
                        <li>Гнучкий графік роботи та можливість працювати віддалено.</li>
                        <li>Професійний розвиток: курси, тренінги та конференції.</li>
                        <li>Дружня команда та підтримка колег.</li>
                        <li>Комфортний офіс у центрі міста з усіма зручностями.</li>
                        <li>
                          Сильне портфоліо, що демонструє ваш досвід у розробці UX/UI для веб- та/або мобільних
                          застосунків (будь ласка, додайте посилання).
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 italic">No detailed description available for this position.</div>
                )}

                {body?.url && (
                  <div className="mt-6 text-sm text-gray-500">
                    <span className="font-semibold">Source:</span>{" "}
                    <a
                      href={body.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {body.url}
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-8 border-b border-gray-200 pb-8">
                <div className="flex items-center justify-between px-4">
                  <div className="-items-center flex flex-col gap-1">
                    {/* <div className="text-sm text-gray-500">Job ID: {job.id}</div> */}
                    <div className="text-sm text-gray-500">2 години тому | 16 переглядів</div>
                  </div>
                  {isApplied && (
                    <div className="flex items-center gap-2 text-green-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">Applied</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <Button className="" variant="secondary">
                  <MagicSvg />
                  Порівняти свої навички
                </Button>

                {/* <Button>
                  <Mail />
                  Подати заявку
                </Button> */}
              </div>
            </article>

            <aside className="aside">
              <div className="border-primary-100 flex flex-col gap-4 rounded-md p-6 shadow-[0_0_0_2px_var(--color-primary-100)] sm:px-6 lg:sticky lg:top-6">
                {/* <h3 className="heading-h3 text-primary-700">
                  Твій AI-кар'єрний стратег: Персоналізовані CV та листи – автоматично!
                </h3>
                <p>
                  Забудь про стандартні відгуки та години ручної роботи! Тепер розумний AI індивідуально адаптує ключові
                  аспекти твого CV та пише унікальний, аргументований супровідний лист для кожної вакансії. Максимізуй
                  свої шанси та вражай рекрутерів без зайвих зусиль!
                </p> */}

                <ul className="flex flex-col gap-4">
                  <li className="relative flex items-center gap-2">
                    <Check className="size-8 text-green-500" />
                    <strong>Тільки віддалено</strong>
                  </li>
                  <li className="relative flex items-center gap-2">
                    <Check className="size-8 text-green-500" />
                    <strong>Повна зайнятість</strong>
                  </li>
                  <li className="relative flex items-center gap-2">
                    <X className="size-8 text-red-500" />
                    <strong>Агенція</strong>
                    <i className="error-msg absolute -bottom-full mb-1 max-w-full truncate p-2 text-sm text-red-500">
                      Не збігається з типом компанії
                    </i>
                  </li>
                  <li className="relative flex items-center gap-2">
                    <X className="size-8 text-red-500" />
                    <strong>Зарплатна плата</strong>
                    <i className="error-msg absolute -bottom-full mb-1 max-w-full truncate p-2 text-sm text-red-500">
                      Не вказано
                    </i>
                  </li>
                </ul>

                <Button className="mt-6 justify-center">
                  <Mail />
                  Подати заявку
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.body.title} at ${job.body.company}`,
    description: job.body.text || `${job.body.title} position at ${job.body.company}`,
  };
}
