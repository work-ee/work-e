import { GoogleGenerativeAI } from "@google/generative-ai";

import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription || jobDescription.trim() === "") {
      return NextResponse.json(
        { error: "Будь ласка, вставте повний опис вакансії для генерації мотиваційного листа." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite-preview-06-17" });

    const fullPrompt = `**LANGUAGE INSTRUCTION: Analyze the language of the "Job Description". The cover letter MUST BE WRITTEN IN THE SAME LANGUAGE.** If the "Job Description" is in Ukrainian, write in Ukrainian. If the "Job Description" is in English, write in English. If the "Job Description" is in Polish, write in Polish. DO NOT respond in Ukrainian if the job description is not in Ukrainian.

You are an experienced career consultant specializing in writing effective cover letters.
Your task is to analyze the following "Job Description" and create a **concise (3-4 sentences)**, yet **compelling cover letter** that is perfectly suited for this specific vacancy.

**CRITICAL INSTRUCTION: The generated cover letter MUST NOT contain ANY placeholders, square brackets, or any text that needs to be filled in by the user (e.g., "[Company Name]", "[Job Title]", "[Your Name]", "(your experience)"). IF THE COMPANY NAME OR JOB TITLE CANNOT BE CONFIDENTLY EXTRACTED, USE GENERIC PHRASES LIKE "your company" or "the position" INSTEAD OF PLACEHOLDERS.**

**Key Content Requirements:**
1.  **Greeting:** The letter must start with an appropriate greeting.
2.  **Position and Company:** Accurately extract the job title and company name from the "Job Description" and use them directly. If the job title or company name is not clearly specified, use a general phrase (e.g., "this opportunity" or "your esteemed organization") rather than a placeholder.
3.  **Ideal Candidate:** Explain why the candidate (on whose behalf the letter is written) is ideal for this vacancy. Focus on the **key requirements and responsibilities** mentioned in the "Job Description", and demonstrate alignment with them using general phrasing about **relevant skills, experience, personal qualities, and potential value**. Always rely on the information contained within the provided "Job Description".
4.  **Format:** The letter must be a continuous text.
5.  **Conciseness:** Adhere strictly to a length of 3-4 sentences.

**Job Description:**
"${jobDescription}"`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const generatedText = response.text();

    return NextResponse.json({ coverLetter: generatedText }, { status: 200 });
  } catch (error: unknown) {
    console.error("Помилка при генерації мотиваційного листа:", error);

    let errorMessage = "Не вдалося згенерувати мотиваційний лист. Спробуйте ще раз.";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as { message: string }).message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
