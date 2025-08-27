"use client";

import { SvgPuzzleSpinner } from "@/components/matching";

export const MatchingPreload = () => {
  return (
    <div className="container text-center">
      <div className="mx-auto mb-6 max-w-6xl text-center">
        <h1 className="heading-h1 text-primary-700">Збираємо пазл твоїх навичок...</h1>
      </div>

      <div className="mb-8 flex justify-center">
        <SvgPuzzleSpinner />
      </div>

      <div className="mx-auto mb-4 max-w-[480px] text-xl font-black">
        <p>Вакансія каже: “Я хочу ідеального кандидата” — Ми якраз перевіряємо, чи це ти</p>
        <p>Ще мить — і буде результат!</p>
      </div>
    </div>
  );
};
