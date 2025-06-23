import { useCallback, useState } from "react";

type UploadStatus = "idle" | "loading" | "success" | "error";

interface UseCvUploadResult {
  uploadCv: (file: File, email: string) => Promise<void>;
  status: UploadStatus;
  message: string | null;
  resetUploadState: () => void;
}

export const useCvUpload = (): UseCvUploadResult => {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const resetUploadState = useCallback(() => {
    setStatus("idle");
    setMessage(null);
  }, []);

  const uploadCv = useCallback(async (file: File, email: string) => {
    if (!email) {
      setMessage("Email is required for upload.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("Завантаження CV...");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("cv_file", file);

    try {
      const getRes = await fetch("/api/cvs/by-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!getRes.ok) {
        throw new Error("Не вдалося отримати список CV.");
      }

      const existingCVs = await getRes.json();

      if (Array.isArray(existingCVs) && existingCVs.length > 0) {
        await Promise.all(
          existingCVs.map(async (cv) => {
            const deleteRes = await fetch(`/api/cvs/${cv.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!deleteRes.ok) {
              console.error(`Помилка при видаленні CV з id: ${cv.id}`);
            }
          })
        );
      }

      const uploadRes = await fetch("/api/cvs", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Помилка при збереженні нового CV.");
      }

      setMessage("CV успішно збережено!");
      setStatus("success");
    } catch (error) {
      console.error("Помилка при завантаженні CV:", error);
      setMessage("Сталася помилка при збереженні CV. Спробуйте ще раз.");
      setStatus("error");
    }
  }, []);

  return { uploadCv, status, message, resetUploadState };
};
