"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowBigLeft, CircleCheckBig, CircleX, Send } from "lucide-react";

import { MatchingPreload, SvgProgressCounter } from "@/components/matching";
import { Button } from "@/components/ui";

import { ROUTES } from "@/lib/constants";

const TextMatch1 = () => {
  return (
    <div>
      <h2 className="heading-h2 text-primary-700">Поки що — не найкращий варіант.</h2>
      <div className="m-auto">
        <p>Але кожен пошук наближає до ідеального матчу.</p>
        <p>Подивись інші вакансії або онови профіль.</p>
      </div>
    </div>
  );
};

const TextMatch2 = () => {
  return (
    <div>
      <h2 className="heading-h2 text-primary-700">Потрібно попрацювати</h2>
      <div className="m-auto">
        <p>AI визначив, що твій профіль не повністю відповідає вимогам.</p>
        <p>Необхідно посилити слабкі сторони та підкреслити сильні навички — це допоможе покращити результат.</p>
      </div>
    </div>
  );
};

const TextMatch3 = () => {
  return (
    <div>
      <h2 className="heading-h2 text-primary-700">Є потенціал</h2>
      <div className="m-auto">
        <p>AI вважає, що твій профіль частково підходить.</p>
        <p>Підкресли сильні сторони в мотиваційному — це може змінити все.</p>
      </div>
    </div>
  );
};

const TextMatch4 = () => {
  return (
    <div>
      <h2 className="heading-h2 text-primary-700">Суперматч!</h2>
      <div className="m-auto">
        <p>Високий рівень відповідності.</p>
        <p>Це означає, що ти маєш усі шанси потрапити до наступного етапу.</p>
      </div>
    </div>
  );
};

const PROGRESS = 10;

const progressText =
  PROGRESS >= 90 ? <TextMatch4 /> : PROGRESS >= 70 ? <TextMatch3 /> : PROGRESS >= 50 ? <TextMatch2 /> : <TextMatch1 />;

// temporary async mock download page
const downloadPage = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Page downloaded");
    }, 2000);
  });
};

export const MatchingMain = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    downloadPage().then(() => setLoading(false));
    return (
      <section className="section">
        <MatchingPreload />
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container text-center">
        {progressText}

        <SvgProgressCounter percent={PROGRESS} className="my-4" />

        <div className="mx-auto mt-10 flex justify-center gap-12 text-left">
          <ul className="flex max-w-64 flex-col gap-5">
            <li className="flex items-start gap-2 leading-none">
              <CircleCheckBig color="#0fbb20" />
              <span className="flex-1 py-1">User Research</span>
            </li>

            <li className="flex items-start gap-2 leading-none">
              <CircleCheckBig color="#0fbb20" />
              <span className="flex-1 py-1">User Research</span>
            </li>
            <li className="flex items-start gap-2 leading-none">
              <CircleCheckBig color="#0fbb20" />
              <span className="flex-1 py-1">User Research</span>
            </li>
            <li className="flex items-start gap-2 leading-none">
              <CircleCheckBig color="#0fbb20" />
              <span className="flex-1 py-1">User Research</span>
            </li>
          </ul>

          <ul className="flex max-w-64 flex-col gap-5">
            <li className="flex items-start gap-2 leading-none">
              <CircleX color="#dd1111" />
              <span className="flex-1 py-1">Design Systems</span>
            </li>
            <li className="flex items-start gap-2 leading-none">
              <CircleX color="#dd1111" />
              <span className="flex-1 py-1">Design Systems</span>
            </li>
            <li className="flex items-start gap-2 leading-none">
              <CircleX color="#dd1111" />
              <span className="flex-1 py-1">Design Systems</span>
            </li>
          </ul>
        </div>

        <div className="mt-18">
          <div className="mt-8 flex justify-center gap-12">
            <Link href={ROUTES.jobs}>
              <Button variant="secondary" className="btn-sm min-w-[320px] justify-center">
                <ArrowBigLeft />
                Інші вакансії
              </Button>
            </Link>
            {/* <Link href="/profile">
              <Button variant="secondary" className="btn-sm min-w-[320px] justify-center">
                <ProfileSvg />
                Оновити профіль
              </Button>
            </Link> */}
            <Button
              className="btn-sm min-w-[320px] justify-center"
              onClick={() => alert('Done "Ви подали заявку на вакансію"')}
            >
              <Send />
              Податись
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
