"use client";

import React, { ChangeEvent, useState } from "react";

import { Button } from "../ui";
import { Textarea } from "../ui/shadcn/textarea";

export const CoverLetter = () => {
  const [text, setText] = useState("");

  const countWords = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const words = countWords(value);

    if (words <= 400) {
      setText(value);
    }
  };

  const wordCount = countWords(text);

  const generateCoverLetter = async () => {
    try {
      const response = await fetch("/api/generate-cover-letter-openAI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ position: "Frontend Developer" }),
      });

      const data = await response.json();
      if (data.text) {
        setText(data.text);
      } else {
        alert("Не вдалося згенерувати лист");
      }
    } catch (error) {
      console.error(error);
      alert("Сталася помилка при генерації");
    }
  };

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
          <Button variant="secondary" className="w-56.5 h-15.5" iconAI onClick={generateCoverLetter}>
            Згенерувати
          </Button>
          <div className=" text-sm text-secondary-500">{wordCount}/400</div>
        </div>
      </div>
    </section>
  );
};
