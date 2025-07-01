import { GoogleGenerativeAI } from "@google/generative-ai";

import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { prompt, jobTitle, companyName } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const fullPrompt = `Напиши стислий мотиваційний лист (3-4 речення) для вакансії "${jobTitle || "не вказано"}" у компанії "${companyName || "невідомій компанії"}" на основі наступних ключових думок/інформації: "${prompt}". Поясни, чому кандидат є ідеальним.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const generatedText = response.text();

    return NextResponse.json({ coverLetter: generatedText }, { status: 200 });
  } catch (error) {
    console.error("Помилка при генерації мотиваційного листа:", error);
    return NextResponse.json({ error: "Не вдалося згенерувати мотиваційний лист. Спробуйте ще раз." }, { status: 500 });
  }
}
