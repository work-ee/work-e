"use client";

import { useState } from "react";

import { LinkedInPopupTemplate } from "./LinkedInPopupTemplate";

interface LinkedInShowPopupProps {
  variant: "default" | "withHeader";
}

export const LinkedInShowPopup = ({ variant }: LinkedInShowPopupProps) => {
  const [show, setShow] = useState(true);
  const baseText =
    "Підключи LinkedIn, щоб ми могли зчитати твою професійну діяльність і заповнити твій профіль. \n Ці дані будуть використані виключно для створення вашого резюме та покращення результатів пошуку.";
  const extendedText =
    "Без LinkedIn нам важко зрозуміти твій досвід. \n Додай його, коли будеш готовий — \n це відкриє більше релевантних вакансій!";
  if (!show) return null;
  return (
    <LinkedInPopupTemplate
      onClose={() => setShow(false)}
      title={variant === "withHeader" ? "Додайте LinkedIn" : undefined}
      text={variant === "withHeader" ? extendedText : baseText}
    />
  );
};
