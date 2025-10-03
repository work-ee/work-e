import { GoogleGenerativeAI } from "@google/generative-ai";

import { NextRequest, NextResponse } from "next/server";

import { PROMPTS, PromptKey } from "@/lib/prompts/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { promptKey, data } = await request.json();

    if (!promptKey || !data) {
      return NextResponse.json({ error: "Необхідно вказати 'promptKey' та 'data'." }, { status: 400 });
    }

    const promptFunction = PROMPTS[promptKey as PromptKey];

    if (typeof promptFunction !== "function") {
      return NextResponse.json({ error: `Недійсний 'promptKey': ${promptKey}` }, { status: 400 });
    }

    const fullPrompt = promptFunction(data);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite-preview-06-17" });

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const generatedText = response.text();

    return NextResponse.json({ generatedText }, { status: 200 });
  } catch (error: unknown) {
    console.error("Помилка при генерації контенту:", error);

    let errorMessage = "Не вдалося згенерувати контент. Спробуйте ще раз.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
