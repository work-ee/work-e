import { useCallback, useMemo, useRef, useState } from "react";

import { validateCVFile } from "@/lib/utils";

type Status = "idle" | "success" | "error" | "uploading" | "fileSelected";

export function useCvUpload(email?: string | null, onClose?: () => void) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorType, setErrorType] = useState<"offline" | "other" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const resetState = useCallback(() => {
    setFileName(null);
    setSelectedFile(null);
    setStatus("idle");
    setErrorType(null);
    setMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedFile || !email) {
      setStatus("error");
      setMessage("Оберіть файл і переконайтесь, що email вказано.");
      return;
    }

    setStatus("uploading");
    setMessage("Завантаження CV...");

    try {
      if (!navigator.onLine) {
        setStatus("error");
        setErrorType("offline");
        setMessage(
          "Немає з'єднання з Інтернетом. Будь ласка, перевірте ваше підключення до Інтернету і спробуйте ще раз,"
        );
        return;
      }

      const getRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cvs/by-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let existingCVs = [];
      if (getRes.ok) {
        existingCVs = await getRes.json();
      }

      if (Array.isArray(existingCVs) && existingCVs.length > 0) {
        await Promise.all(
          existingCVs.map(async (cv) => {
            const delRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cvs/${cv.id}/`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!delRes.ok) {
              console.error("Помилка при видаленні CV:", await delRes.text());
            }
          })
        );
      }

      const formData = new FormData();
      formData.append("email", email);
      formData.append("cv_file", selectedFile);

      const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cvs/`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const error = await uploadRes.json();
        throw new Error(error.message || "Не вдалося зберегти CV.");
      }

      setStatus("success");
      setMessage("CV успішно збережено!");

      onClose?.();
      resetState();
    } catch (error) {
      console.error("Помилка при збереженні CV:", error);
      setStatus("error");
      setErrorType("other");
      setMessage(error instanceof Error ? error.message : "Щось пішло не так.");
    }
  }, [selectedFile, email, onClose, resetState]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      resetState();

      if (!file) {
        setStatus("error");
        setMessage("Завантаження перервано. Будь ласка, спробуйте завантажити файл знову,");
        return;
      }

      setFileName(file.name);

      const errorMessage = validateCVFile(file);
      if (errorMessage) {
        setStatus("error");
        setMessage(errorMessage);
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);
      setStatus("fileSelected");
      setMessage("Файл готовий до відправки. Натисніть 'Зберегти CV'.");
    },
    [resetState]
  );

  const handleManualTrigger = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveFile = useCallback(() => {
    resetState();
  }, [resetState]);

  const isSubmitDisabled = useMemo(
    () => !selectedFile || status === "error" || status === "uploading",
    [selectedFile, status]
  );

  return {
    fileInputRef,
    fileName,
    status,
    message,
    isSubmitDisabled,
    handleManualTrigger,
    handleFileUpload,
    handleRemoveFile,
    handleSubmit,
    errorType,
    resetState,
  };
}
