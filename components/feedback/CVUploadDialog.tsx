"use client";

import { useRef, useState } from "react";

import clsx from "clsx";

// import { UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

interface CVUploadDialog {
  open: boolean;
  onClose: () => void;
}

export default function CVUploadDialog({ open, onClose }: CVUploadDialog) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploading(true);
      setUploadedFileName(file.name);
      setTimeout(() => {
        setUploading(false);
      }, 2000);
    } else {
      alert("Будь ласка, завантаж PDF файл");
    }
  };

  const handleManualTrigger = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Завантаж своє CV, <br /> щоб ми підібрали для тебе найрелевантніші вакансії
          </DialogTitle>
          <DialogDescription>Ми рекомендуємо завантажувати PDF файли для кращої обробки.</DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div
            className={clsx(
              "border-2 border-dashed border-primary-300 p-6 rounded-lg text-center cursor-pointer",
              "hover:border-primary-500 transition-colors"
            )}
            onClick={handleManualTrigger}
          >
            <svg className="mx-auto w-8 h-8 text-primary-500 mb-2">
              <use xlinkHref="/sprite.svg#icon-uploading-filed" />
            </svg>
            {/* <UploadIcon className="mx-auto w-8 h-8 text-primary-500 mb-2" /> */}
            <p className="font-medium">Завантаж CV у форматі PDF</p>
            <button type="button" onClick={handleManualTrigger} className="mt-2 text-primary-600 underline">
              Натиснути тут
            </button>
            <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleFileUpload} hidden />
          </div>

          {uploading && <div className="text-sm text-primary-600 animate-pulse">Завантаження...</div>}

          {uploadedFileName && !uploading && (
            <div className="text-sm text-green-600">
              Завантажено: <strong>{uploadedFileName}</strong>
            </div>
          )}

          <div className="flex justify-between gap-4 pt-4">
            <Button variant="secondary">Створити CV</Button>
            <Button>Зберегти CV</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
