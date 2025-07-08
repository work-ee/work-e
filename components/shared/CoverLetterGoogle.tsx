"use client";

import React, { ChangeEvent, useState } from "react";

import { Button } from "../ui";
import { Textarea } from "../ui/shadcn/textarea";

interface CoverLetterGoogleProps {
  jobDescription: string;
}

export const CoverLetterGoogle = ({ jobDescription }: CoverLetterGoogleProps) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countWords = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const words = countWords(value);

    if (words <= 400 || value.length < text.length) {
      setText(value);
      setError(null);
    } else {
      setError("Кількість слів перевищує ліміт у 400.");
      console.error(error);
    }
  };

  const handleGenerateClick = async () => {
    if (!jobDescription.trim()) {
      setError("Будь ласка, вставте повний опис вакансії для генерації мотиваційного листа.");
      console.error(error);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-cover-letter-google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: jobDescription,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Невідома помилка генерації.");
      }

      const data = await response.json();
      const generatedText = data.coverLetter;

      if (countWords(generatedText) <= 400) {
        setText(generatedText);
      } else {
        const wordsArray = generatedText.split(/\s+/);
        const trimmedText = wordsArray.slice(0, 400).join(" ");
        setText(trimmedText + "...");
        setError("Згенерований текст був обрізаний до 400 слів.");
        console.error(error);
      }
    } catch (error: unknown) {
      console.error("Помилка генерації мотиваційного листа:", error);
      if (error instanceof Error) {
        setError(error.message || "Виникла помилка під час генерації листа. Спробуйте ще раз.");
        console.error(error);
      } else {
        setError("Виникла невідома помилка. Спробуйте ще раз.");
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const wordCount = countWords(text);

  return (
    <section className="section container">
      <h3 className="heading-h2 neutral-900 mb-2">Мотиваційний лист</h3>
      <p className="text-micro neutral-900 mb-4">
        3-4 речення, що пояснюють, чому ви є ідеальним кандидатом на конкретну вакансію
      </p>

      <div className="relative w-[920px]">
        <Textarea
          value={text}
          onChange={handleChange}
          className="w-full h-[241px] gap-3 pt-2.5 px-8 pb-10 rounded-lg border border-secondary-300 resize-none outline-none focus:outline-none active:outline-none hover:outline-none input-text text-secondary-400"
        />
        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
          <Button variant="secondary" className="w-56.5 h-15.5" iconAI onClick={handleGenerateClick}>
            {isLoading ? "Генеруємо..." : "Згенерувати"}
          </Button>
          <div className="text-sm text-secondary-500">{wordCount}/400</div>
        </div>
      </div>
    </section>
  );
};
