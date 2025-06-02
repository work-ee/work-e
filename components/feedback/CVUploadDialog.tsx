"use client";

import { useRef, useState } from "react";

import clsx from "clsx";

import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

import { SvgIcon } from "@/lib/svgIcons";

interface CVUploadDialog {
  open: boolean;
  onClose: () => void;
}

export default function CVUploadDialog({ open, onClose }: CVUploadDialog) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<"success" | "error" | "idle">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [showPreviewBlock, setShowPreviewBlock] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setMessage(null);
    setStatus("idle");

    if (!file) return;

    if (file.type !== "application/pdf") {
      setStatus("error");
      setMessage("Упс, сталася помилка, переконайся що CV у форматі pdf і спробуй ще раз");
      setShowPreviewBlock(true);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatus("error");
      setMessage("Файл завеликий. Максимальний розмір — 5MB.");
      setShowPreviewBlock(true);
      return;
    }

    setShowPreviewBlock(true);
    setFileName(file.name);

    setTimeout(() => {
      setStatus("success");
      setMessage("Ще декілька кроків і робота мрії — твоя");
    }, 2000);
  };

  const handleManualTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setStatus("idle");
    setMessage(null);
    setShowPreviewBlock(false);
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
            <SvgIcon
              id="icon-uploading-filed"
              className="mx-auto w-12 h-12 text-primary-500 mb-4 fill-neutral-50 stroke-primary-500"
            />
            <p className="text-micro pb-4">Завантаж CV у форматі PDF</p>
            <button type="button" onClick={handleManualTrigger} className="btn text-primary-500 underline">
              Натиснути тут
            </button>
            <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleFileUpload} hidden />
          </div>

          {showPreviewBlock && (
            <>
              <div
                className="flex items-center gap-3 mt-6 border rounded-lg px-4 py-4 w-[736px] h-[72px] mx-auto relative"
                style={{ borderWidth: 1, borderRadius: 8 }}
              >
                <SvgIcon id="icon-pdf" className="w-6 h-6 text-neutral-900" />
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
            </>
          )}

          <div className="flex justify-between gap-4 pt-6">
            <Button variant="secondary">Створити CV</Button>
            <Button disabled={status !== "success"}>Зберегти CV</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
