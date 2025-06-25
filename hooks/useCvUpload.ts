import { useCallback, useRef, useState } from "react";

import { deleteCVs, getExistingCVs, uploadCV } from "@/lib/api/cvs";
import { validateCVFile } from "@/lib/utils/pdfFileValidation";

export type UploadStatus = "idle" | "success" | "error" | "uploading";

export function useCvUpload(email?: string | null, onClose?: () => void) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const resetState = useCallback(() => {
    setFileName(null);
    setSelectedFile(null);
    setStatus("idle");
    setMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleManualTrigger = () => fileInputRef.current?.click();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    resetState();

    if (!file) return;

    const error = validateCVFile(file);
    if (error) {
      setStatus("error");
      setMessage(error);
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
    setStatus("success");
    setMessage("Ще декілька кроків — і робота мрії твоя!");
  };

  const handleRemoveFile = () => resetState();

  const handleSubmit = async () => {
    if (!selectedFile || !email) {
      setMessage("Оберіть файл і переконайтесь, що вказано email.");
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setMessage("Завантаження...");

    try {
      const existing = await getExistingCVs(email);
      if (existing.length) await deleteCVs(existing);
      await uploadCV(selectedFile, email);

      setStatus("success");
      setMessage("CV успішно збережено!");
      onClose?.();
      resetState();
    } catch (error: unknown) {
      console.error("Помилка при завантаженні CV:", error);

      let errorMessage = "Сталася помилка. Спробуйте ще раз.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setMessage(errorMessage);
      setStatus("error");
    }
  };

  return {
    fileInputRef,
    fileName,
    selectedFile,
    status,
    message,
    isSubmitDisabled: !selectedFile || status === "error" || status === "uploading",
    handleManualTrigger,
    handleFileUpload,
    handleRemoveFile,
    handleSubmit,
    resetState,
  };
}
