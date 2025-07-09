"use client";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

import { useCvUpload } from "@/hooks/useCvUpload";

interface CVUploadDialogProps {
  open: boolean;
  email?: string | null;
  onClose: () => void;
}

export default function CVUploadDialog({ open, email, onClose }: CVUploadDialogProps) {
  const {
    fileInputRef,
    fileName,
    status,
    message,
    handleManualTrigger,
    handleFileUpload,
    handleRemoveFile,
    handleSubmit,
    isSubmitDisabled,
    resetState,
  } = useCvUpload(email, onClose);

  const getStatusColor = {
    success: "bg-success-main",
    error: "bg-error-main",
    uploading: "bg-success-main animate-pulse",
    idle: "bg-neutral-500",
  }[status];

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
      <DialogContent className="w-[800px]  p-8 max-w-[unset] rounded-2xl border-none gap-6">
        <DialogHeader className="h-[82px]">
          <DialogTitle className="heading-h2 text-neutral-900 text-center text-[36px]">Завантаж своє CV</DialogTitle>
          <DialogDescription className="text-body text-neutral-700 text-center text-[18px]">
            Та ми підберемо для тебе найрелевантніші вакансії
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-6 justify-center">
          <div
            className={clsx(
              "border border-primary-500 rounded-xl text-center cursor-pointer w-[322px] h-[244px] m-auto p-8",
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
            <p className="text-micro pb-4">
              Завантаж CV : у форматі <span className="text-primary-500">PDF</span>
            </p>
            <p className="text-micro pb-4">
              максимальний розмір файлу <span className="text-primary-500">10MB</span>
            </p>
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

          <div className="flex items-center gap-1 border border-primary-500 rounded-lg px-4 py-4 h-[72px] mx-auto relative basis-full">
            <SpriteSvg id="icon-pdf" className="w-10 h-10 text-neutral-900 fill-primary-500" />
            <div className="flex-1">
              <div className="text-sm mb-1">{fileName || "Назва файлу"}</div>
              <div className={clsx("h-1 rounded", getStatusColor)} />
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-primary-300 hover:text-primary-500 transition-colors cursor-pointer"
              aria-label="Видалити файл"
              type="button"
            >
              <SpriteSvg
                id="icon-close-without-circle"
                className="w-[14px] h-[14px] text-neutral-900 fill-primary-500"
              />
            </button>
          </div>

          {message ? (
            <div
              className={clsx(
                "text-body mx-auto",
                status === "error" ? "text-error-main" : "text-neutral-900",
                status === "uploading" && "animate-pulse"
              )}
            >
              {message}
            </div>
          ) : (
            <p className="text-body">Якщо раптом у тебе немає CV, не хвилюйся, ти можеш створити його просто зараз</p>
          )}

          <div className="flex gap-x-6">
            <Button variant="secondary" className="w-[356px] h-[62px] justify-center items-center" onClick={() => {}}>
              Створити CV
            </Button>
            <Button
              disabled={isSubmitDisabled}
              className="w-[356px] h-[62px] flex  justify-center items-center"
              onClick={handleSubmit}
            >
              Зберегти CV
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
