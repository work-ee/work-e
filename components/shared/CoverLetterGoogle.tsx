"use client";

import React, { ChangeEvent, useState } from "react";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";

import { Button } from "../ui";
import { Textarea } from "../ui/shadcn/textarea";

interface CoverLetterGoogleProps {
  jobDescription: string;
}

const MAX_CHAR_LIMIT = 1500;

export const CoverLetterGoogle = ({ jobDescription }: CoverLetterGoogleProps) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const countCharacters = (text: string): number => text.trim().length;
  const isDisabled = !jobDescription.trim() || isLoading;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const characters = countCharacters(value);

    if (characters <= MAX_CHAR_LIMIT || value.length < text.length) {
      setText(value);
      setError(null);
    } else {
      setError(`Кількість символів перевищує ліміт у ${MAX_CHAR_LIMIT}.`);
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

      if (countCharacters(generatedText) <= MAX_CHAR_LIMIT) {
        setText(generatedText);
      } else {
        const trimmedText = generatedText.substring(0, MAX_CHAR_LIMIT);
        setText(trimmedText + "...");
        setError(`Згенерований текст був обрізаний до ${MAX_CHAR_LIMIT} слів.`);
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

  const characterCount = countCharacters(text);

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
          className="border-secondary-300 input-text text-secondary-400 min-h-[241px] w-full resize-none gap-3 rounded-lg border px-8 pt-2.5 pb-26.5 outline-none hover:outline-none focus:outline-none active:outline-none"
        />
        <div className="absolute right-8 bottom-8 left-8 flex items-center justify-between">
          <Button variant="secondary" className="h-15.5 w-56.5" onClick={handleGenerateClick} disabled={isDisabled}>
            <SpriteSvg
              id="icon-AI"
              className={clsx(
                "mx-auto h-6 w-6",
                {
                  "stroke-primary-300 fill-primary-300": !isDisabled,
                  "fill-neutral-100 stroke-neutral-100": isDisabled,
                },
                !isDisabled &&
                  "group-hover:stroke-primary-700 group-hover:fill-primary-700 group-active:stroke-primary-900 group-active:fill-primary-900"
              )}
            />
            {isLoading ? "Генеруємо..." : "Згенерувати"}
          </Button>
          <div className="text-secondary-600 text-sm">
            {characterCount}/{MAX_CHAR_LIMIT}
          </div>
        </div>
      </div>
    </section>
  );
};
