import { useCallback, useMemo, useRef, useState } from "react";

import { validateCVFile } from "@/lib/utils";

type Status = "idle" | "success" | "error" | "uploading";

export function useCvUpload(email?: string | null, onClose?: () => void) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const resetState = useCallback(() => {
    setFileName(null);
    setSelectedFile(null);
    setStatus("idle");
    setMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      resetState();

      if (!file) return;

      const errorMessage = validateCVFile(file);
      if (errorMessage) {
        setStatus("error");
        setMessage(errorMessage);
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);
      setStatus("success");
      setMessage("Ще декілька кроків і робота мрії — твоя!");
    },
    [resetState]
  );

  const handleManualTrigger = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveFile = useCallback(() => {
    resetState();
  }, [resetState]);

  const getLineColor = useMemo(() => {
    switch (status) {
      case "success":
        return "bg-success-main";
      case "error":
        return "bg-error-main";
      case "uploading":
        return "bg-success-main animate-pulse";
      default:
        return "bg-neutral-500";
    }
  }, [status]);

  const handleSubmit = useCallback(async () => {
    if (!selectedFile || !email) {
      setStatus("error");
      setMessage("Оберіть файл і переконайтесь, що email вказано.");
      return;
    }

    setStatus("uploading");
    setMessage("Завантаження CV...");

    try {
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
      setMessage(error instanceof Error ? error.message : "Щось пішло не так.");
    }
  }, [selectedFile, email, onClose, resetState]);

  const isSubmitDisabled = useMemo(
    () => !selectedFile || status === "error" || status === "uploading",
    [selectedFile, status]
  );

  return {
    fileInputRef,
    fileName,
    selectedFile,
    status,
    message,
    isSubmitDisabled,
    handleManualTrigger,
    handleFileUpload,
    handleRemoveFile,
    handleSubmit,
    getLineColor,
    resetState,
  };
}
