"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

interface CVUploadDialogProps {
  open: boolean;
  email?: string | null;
  onClose: () => void;
}

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MIN_FILE_SIZE_BYTES = 100;
const ALLOWED_FILE_TYPE = "application/pdf";

export default function CVUploadDialog({ open, email, onClose }: CVUploadDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"success" | "error" | "idle" | "uploading">("idle");
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

      if (!file) {
        setStatus("idle");
        setMessage(null);
        return;
      }

      if (file.type !== ALLOWED_FILE_TYPE) {
        setStatus("error");
        setMessage("Упс, сталася помилка, переконайтеся, що CV у форматі PDF і спробуйте ще раз.");
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setStatus("error");
        setMessage(`Файл завеликий. Максимальний розмір — ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }

      if (file.size < MIN_FILE_SIZE_BYTES) {
        setStatus("error");
        setMessage(`Файл замалий. Мінімальний розмір CV — ${MIN_FILE_SIZE_BYTES} байтів.`);
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
        return "bg-primary-500 animate-pulse";
      case "idle":
      default:
        return "bg-neutral-900";
    }
  }, [status]);

  const handleSubmit = useCallback(async () => {
    if (!selectedFile || !email) {
      setMessage("Будь ласка, оберіть файл та переконайтеся, що ваш email вказано.");
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setMessage("Завантаження CV...");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("cv_file", selectedFile);

    try {
      const getRes = await fetch("/api/cvs/by-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let existingCVs = [];
      if (getRes.ok) {
        existingCVs = await getRes.json();
      } else if (getRes.status === 404 || getRes.status === 204) {
        existingCVs = [];
      } else {
        const errorBody = await getRes.json();
        throw new Error(errorBody.message || "Не вдалося отримати список CV для перевірки.");
      }

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
        const uploadErrorBody = await uploadRes.json();
        throw new Error(uploadErrorBody.message || "Помилка при збереженні нового CV.");
      }

      setMessage("CV успішно збережено!");
      setStatus("success");
      setTimeout(() => {
        onClose();
        resetState();
      }, 2000);
    } catch (error) {
      console.error("Помилка при завантаженні CV:", error);

      let errorMessage = "Сталася помилка при збереженні CV. Спробуйте ще раз.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setMessage(errorMessage);
      setStatus("error");
    }
  }, [selectedFile, email, onClose, resetState]);

  const isSubmitDisabled = useMemo(() => {
    return !selectedFile || status === "error" || status === "uploading";
  }, [selectedFile, status]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
          resetState();
        }
      }}
    >
      <DialogContent className="w-[800px] p-8 max-w-[unset]">
        <DialogHeader>
          <DialogTitle className="heading-h3 text-center neutral-900">
            Завантаж своє CV, <br /> щоб ми підібрали для тебе найрелевантніші вакансії
          </DialogTitle>
          <DialogDescription className="sr-only">
            Це діалогове вікно дозволяє завантажити ваше CV у форматі PDF, щоб ми могли підібрати для вас
            найрелевантніші вакансії.
          </DialogDescription>
        </DialogHeader>

        <div>
          <div
            className={clsx(
              "border-2 border border-primary-500 p-6 rounded-lg text-center cursor-pointer w-[257px] h-[260px] m-auto p-10",
              "hover:border-primary-500 transition-colors"
            )}
            onClick={handleManualTrigger}
            role="button"
            aria-label="Завантажити CV"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleManualTrigger();
              }
            }}
          >
            <SpriteSvg
              id="icon-uploading-filed"
              className="mx-auto w-12 h-12 text-primary-500 mb-4 fill-neutral-50 stroke-primary-500"
            />
            <p className="text-micro pb-4">Завантаж CV у форматі PDF</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleManualTrigger();
              }}
              className="btn text-primary-500 underline"
            >
              Натиснути тут
            </button>
            <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleFileUpload} hidden />
          </div>

          <div
            className="flex items-center gap-3 mt-6 border rounded-lg px-4 py-4 w-[736px] h-[72px] mx-auto relative"
            style={{ borderWidth: 1, borderRadius: 8 }}
          >
            <SpriteSvg id="icon-pdf" className="w-6 h-6 text-neutral-900" />
            <div className="flex-1">
              <div className="text-sm mb-1">{fileName || "Назва файлу"}</div>
              <div className={clsx("h-1 rounded", getLineColor)}></div>
            </div>
            {fileName && (
              <button
                onClick={handleRemoveFile}
                className="text-neutral-500 hover:text-neutral-900 transition-colors"
                aria-label="Видалити файл"
                type="button"
              >
                &times;
              </button>
            )}
          </div>

          {message && (
            <div
              className={clsx(
                "text-sm mt-2 mx-auto text-center",
                status === "error" ? "text-error-main" : "text-neutral-900",
                status === "uploading" && "animate-pulse"
              )}
            >
              {message}
            </div>
          )}

          <div className="flex justify-between gap-4 pt-6">
            <Button variant="secondary" onClick={() => {}}>
              Створити CV
            </Button>
            <Button disabled={isSubmitDisabled} onClick={handleSubmit}>
              Зберегти CV
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
