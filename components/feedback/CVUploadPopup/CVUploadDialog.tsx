"use client";

import { useRef, useState } from "react";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

interface CVUploadDialog {
  open: boolean;
  email?: string | null;
  onClose: () => void;
}

export default function CVUploadDialog({ open, email, onClose }: CVUploadDialog) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"success" | "error" | "idle">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setMessage(null);
    setStatus("idle");

    if (!file) return;

    if (file.type !== "application/pdf") {
      setStatus("error");
      setMessage("Упс, сталася помилка, переконайся що CV у форматі pdf і спробуй ще раз");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setStatus("error");
      setMessage("Файл завеликий. Максимальний розмір — 1MB.");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
    setStatus("success");
    setMessage("Ще декілька кроків і робота мрії — твоя");
    e.target.value = "";
  };

  const handleManualTrigger = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setSelectedFile(null);
    setStatus("idle");
    setMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getLineColor = () => {
    switch (status) {
      case "success":
        return "bg-success-main";
      case "error":
        return "bg-error-main";
      default:
        return "bg-neutral-900";
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !email) return;

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

      if (!getRes.ok) throw new Error("Не вдалося отримати список CV");

      const existingCVs = await getRes.json();

      if (Array.isArray(existingCVs) && existingCVs.length > 0) {
        for (const cv of existingCVs) {
          const deleteRes = await fetch(`/api/cvs/${cv.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!deleteRes.ok) {
            throw new Error(`Помилка при видаленні CV з id: ${cv.id}`);
          }
        }
      }

      const uploadRes = await fetch("/api/cvs", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Помилка при збереженні нового CV");

      setMessage("CV успішно збережено!");
      setStatus("success");
      setSelectedFile(null);
      setFileName(null);
    } catch (error) {
      console.error(error);
      setMessage("Сталася помилка при збереженні CV");
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[800px] p-8 max-w-[unset]">
        <DialogHeader>
          <DialogTitle className="heading-h3 text-center neutral-900">
            Завантаж своє CV, <br /> щоб ми підібрали для тебе найрелевантніші вакансії
          </DialogTitle>
        </DialogHeader>

        <div>
          <div
            className={clsx(
              "border-2 border border-primary-500 p-6 rounded-lg text-center cursor-pointer w-[257px] h-[260px] m-auto p-10",
              "hover:border-primary-500 transition-colors"
            )}
            onClick={handleManualTrigger}
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
              <div className={clsx("h-1 rounded", getLineColor())}></div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
              aria-label="Видалити файл"
            >
              &times;
            </button>
          </div>

          {message && (
            <div
              className={clsx(
                "text-sm mt-2 mx-auto text-center",
                status === "error" ? "text-error-main" : "text-neutral-900"
              )}
            >
              {message}
            </div>
          )}

          <div className="flex justify-between gap-4 pt-6">
            <Button variant="secondary">Створити CV</Button>
            <Button
              disabled={status !== "success"}
              onClick={() => {
                handleSubmit();
              }}
            >
              Зберегти CV
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
