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

  const isDisabled = !jobDescription.trim() || isLoading || text.trim().length > 0;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    const characters = countCharacters(value);

    if (characters > MAX_CHAR_LIMIT) {
      const exceededBy = characters - MAX_CHAR_LIMIT;
      setError(`Перевищено ліміт на ${exceededBy} символів.`);
    } else {
      setError(null);
    }
  };

  const handleGenerateClick = async () => {
    if (!jobDescription.trim()) {
      setError("Будь ласка, вставте повний опис вакансії для генерації мотиваційного листа.");
      return;
    }

    if (text.trim().length > 0) {
      setError("Поле вже містить текст. Очистіть його, щоб згенерувати новий лист.");
      return;
    }
    if (countCharacters(text) > MAX_CHAR_LIMIT) {
      setError(`Кількість символів перевищує ліміт у ${MAX_CHAR_LIMIT}. Будь ласка, скоротіть текст.`);
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
        setError(null);
      } else {
        const trimmedText = generatedText.substring(0, MAX_CHAR_LIMIT);
        setText(trimmedText + "...");
        setError(`Згенерований текст був обрізаний до ${MAX_CHAR_LIMIT} символів.`);
      }
    } catch (error: unknown) {
      console.error("Помилка генерації мотиваційного листа:", error);
      if (error instanceof Error) {
        setError(error.message || "Виникла помилка під час генерації листа. Спробуйте ще раз.");
      } else {
        setError("Виникла невідома помилка. Спробуйте ще раз.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const characterCount = countCharacters(text);

  return (
    <section className="section container">
      <h3 className="heading-h3 neutral-900 mb-2">Мотиваційний лист</h3>
      <p className="text-micro neutral-900 mb-4">
        3-4 речення, що пояснюють, чому ви є ідеальним кандидатом на конкретну вакансію
      </p>

      {/* !ToDo: remove hardcoded width */}
      <div className="_w-[920px] relative">
        <Textarea
          value={text}
          onChange={handleChange}
          className={clsx(
            "border-secondary-300 input-text min-h-[241px] w-full resize-none gap-3 rounded-lg border px-8 pt-2.5 pb-26.5 outline-none hover:outline-none focus:outline-none active:outline-none",
            {
              "border-error-main text-error-main": error,
              "text-secondary-400": !error,
            }
          )}
        />
        <div className="absolute right-8 bottom-8 left-8 flex items-center justify-between">
          <Button variant="secondary" className="btn-sm" onClick={handleGenerateClick} disabled={isDisabled}>
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
          <div
            className={clsx("text-sm", {
              "text-error-main": error,
              "text-secondary-600": !error,
            })}
          >
            {characterCount}/{MAX_CHAR_LIMIT}
          </div>
        </div>
      </div>

      {error && (
        <p className="text-error-main text-micro mt-1 flex items-center">
          <SpriteSvg id="icon-danger" className="text-error-main mr-1 h-4 w-4" />
          {error}
        </p>
      )}
    </section>
  );
};
