"use client";

import { useState } from "react";

import { LinkedInPopupTemplate } from "./LinkedInPopupTemplate";

interface LinkedInShowPopupProps {
  variant: "default" | "withHeader";
}

export const LinkedInShowPopup = ({ variant }: LinkedInShowPopupProps) => {
  const [show, setShow] = useState(true);
  const baseText =
    "Підключи LinkedIn, щоб ми могли зчитати твою професійну діяльність і заповнити твій профіль.\nМи не використовуємо ці дані ні для чого іншого — лише для створення твого резюме та покращення результатів пошуку.";
  const extendedText =
    "Без LinkedIn нам важко зрозуміти твій досвід. Додай його, коли будеш готовий — це відкриє більше релевантних вакансій!";
  if (!show) return null;
  return (
    <LinkedInPopupTemplate
      onClose={() => setShow(false)}
      title={variant === "withHeader" ? "Додайте LinkedIn" : undefined}
      text={variant === "withHeader" ? extendedText : baseText}
    />
  );
};
