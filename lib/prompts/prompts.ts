export const PROMPTS = {
  COVER_LETTER: (
    jobDescription: string
  ) => `**LANGUAGE INSTRUCTION: Analyze the language of the "Job Description". The cover letter MUST BE WRITTEN IN THE SAME LANGUAGE.** If the "Job Description" is in Ukrainian, write in Ukrainian. If the "Job Description" is in English, write in English. If the "Job Description" is in Polish, write in Polish. DO NOT respond in Ukrainian if the job description is not in Ukrainian.

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
"${jobDescription}"`,

  GENERATE_CV_SUMMARY_UK: (userInput: string) => `
    Your task is to act as a professional career consultant.
    Based on the following unstructured text provided by the user, please generate a concise and impactful resume summary.

    User's input:
    ${userInput}

    The summary should be 2-4 sentences long, **up to 1500 characters**, and must:
    - Highlight key achievements and their impact.
    - Clearly define the desired professional role or field.
    - Emphasize core skills and unique experience.
    - Use an active, professional voice.
    - Be written entirely in Ukrainian.
    - Start immediately with the summary text, without a heading or salutation.
    - If the user's input lacks some information, create the best possible summary using the available data.
  `,
  GENERATE_EXPERIENCE_DESCRIPTION_UK: (data: {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    userInput: string;
  }) => `
    You are a professional resume writer. Your task is to generate a compelling and detailed job description for a resume, based on the following information.

    Job Details:
    - Job Title: ${data.jobTitle}
    - Company: ${data.company}
    - Start Date: ${data.startDate}
    - End Date: ${data.endDate}

    User's input regarding their role, skills, and achievements:
    ${data.userInput}

    The description should be up to 1500 characters and must:
    - Synthesize the structured job details and the user's input into a coherent paragraph or a few bullet points.
    - Focus on achievements and quantifiable results rather than just duties.
    - Use strong action verbs.
    - Highlight key skills and their application in the role.
    - Be written entirely in Ukrainian.
    - Start immediately with the text, without a heading.
    - If some fields are missing (e.g., job title or dates), still create the best possible description using the available information.
  `,
};

export type PromptKey = keyof typeof PROMPTS;
