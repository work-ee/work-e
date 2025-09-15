import { getTranslations } from "next-intl/server";

import { CheckArrowSvg, ClockSvg, SafetySvg } from "@/components/icons";

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <main className="center-page">
      <section className="section">
        <div className="container">
          <div className="text-center">
            {/* <h1 className="heading-h1 mb-4">Швидкий пошук роботи на Work - E</h1> */}
            {/* <p className="heading-h3 mb-4">Для всіх хто працює в IT</p> */}
            <h1 className="heading-h1 mb-4">{t("HomePage.title")}</h1>
            <p className="heading-h3 mb-4">{t("HomePage.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ul className="grid grid-cols-3">
            <li className="flex flex-col items-center gap-2 text-center">
              <b className="heading-h2 text-primary-700 font-black">90,000+</b>
              <p className="heading-h3">{t("HomePage.stats.candidates")}</p>
            </li>
            <li className="flex flex-col items-center gap-2 text-center">
              <b className="heading-h2 text-primary-700 font-black">50,000+</b>
              <p className="heading-h3">{t("HomePage.stats.companies")}</p>
            </li>
            <li className="flex flex-col items-center gap-2 text-center">
              <b className="heading-h2 text-primary-700 font-black">100%</b>
              <p className="heading-h3">{t("HomePage.stats.automation")}</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="mx-auto max-w-2xl text-center">{t("HomePage.description")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ul className="grid justify-around gap-12 xl:grid-cols-3">
            <li className="bg-secondary-50 flex flex-col items-center gap-4 rounded-2xl px-4 py-6 text-center">
              <h3
                className="heading-h3 text-primary-700"
                dangerouslySetInnerHTML={{ __html: t("HomePage.faq.1.question") }}
              />
              <CheckArrowSvg />
              <p dangerouslySetInnerHTML={{ __html: t("HomePage.faq.1.answer") }} />
            </li>
            <li className="bg-secondary-50 flex flex-col items-center gap-4 rounded-2xl px-4 py-6 text-center">
              <h3
                className="heading-h3 text-primary-700"
                dangerouslySetInnerHTML={{ __html: t("HomePage.faq.2.question") }}
              />
              <ClockSvg />
              <p dangerouslySetInnerHTML={{ __html: t("HomePage.faq.2.answer") }} />
            </li>
            <li className="bg-secondary-50 flex flex-col items-center gap-4 rounded-2xl px-4 py-6 text-center">
              <h3
                className="heading-h3 text-primary-700"
                dangerouslySetInnerHTML={{ __html: t("HomePage.faq.3.question") }}
              />
              <SafetySvg />
              <p dangerouslySetInnerHTML={{ __html: t("HomePage.faq.3.answer") }} />
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
