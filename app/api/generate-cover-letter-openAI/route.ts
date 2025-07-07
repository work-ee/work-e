import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { position = "Frontend Developer" } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Ти HR-фахівець, який допомагає написати мотиваційні листи кандидату. Пиши коротко, 3-4 речення.",
        },
        {
          role: "user",
          content: `Напиши мотиваційний лист для кандидата що претендує на позицію ${position}. Поясни, чому кандидат є ідеальним.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 530,
    });

    const message = response.choices[0].message.content;

    return NextResponse.json({ text: message });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return NextResponse.json({ error: "Помилка генерації" }, { status: 500 });
  }
}
