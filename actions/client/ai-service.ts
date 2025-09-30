/**
 * ** Example to use: **
 * await AIService.generateCoverLetter(jobDescription);
 */

export class AIService {
  static async generateCoverLetter(jobDescription: string): Promise<string> {
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
    return data.coverLetter;
  }
}
