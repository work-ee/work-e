/**
 * ** Example to use: **
 * await CVService.replaceUserCV(email, selectedFile);
 */

export class CVService {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  static async getCVsByEmail(email: string) {
    const response = await fetch(`${this.BASE_URL}/api/cvs/by-email/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) return [];
    return await response.json();
  }

  static async deleteCV(cvId: string) {
    await fetch(`${this.BASE_URL}/api/cvs/${cvId}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }

  static async uploadCV(email: string, file: File) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("cv_file", file);

    const response = await fetch(`${this.BASE_URL}/api/cvs/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Завантаження перервано. Будь ласка, спробуйте завантажити файл знову");
    }

    return response.json();
  }

  static async replaceUserCV(email: string, file: File) {
    // Delete existing CVs
    const existingCVs = await this.getCVsByEmail(email);
    if (Array.isArray(existingCVs) && existingCVs.length > 0) {
      await Promise.all(existingCVs.map((cv) => this.deleteCV(cv.id)));
    }

    // Upload new CV
    return await this.uploadCV(email, file);
  }
}
