"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

import { useCvUpload } from "@/hooks/useCvUpload";

import { InfoDialog } from "../InfoDialog";

interface CVUploadDialogProps {
  open: boolean;
  email?: string | null;
  onClose: () => void;
  onSuccessUpload?: () => void;
}

export default function CVUploadDialog({ open, email, onClose, onSuccessUpload }: CVUploadDialogProps) {
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const {
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
  } = useCvUpload(email, () => {
    onClose();
    onSuccessUpload?.();
  });

  const getStatusColor = {
    success: "bg-success-main",
    error: "bg-error-main",
    uploading: "bg-success-main animate-pulse",
    idle: "bg-neutral-500",
  }[status];

  const isUploadDisabled = status === "success";
  const isSecondaryUploadButtonVisible = status === "error";

  useEffect(() => {
    if (status === "success") {
      onSuccessUpload?.();
    }
  }, [status, onSuccessUpload]);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            if (status !== "success") {
              setShowReminderDialog(true);
            }
            onClose();
            resetState();
          }
        }}
      >
        <DialogContent className="w-[800px] p-8 max-w-[unset] rounded-2xl border-none gap-6">
          <DialogHeader className="h-[82px]">
            <DialogTitle className="heading-h2 text-neutral-900 text-center text-[36px]">Завантаж своє CV</DialogTitle>
            <DialogDescription className="text-body text-neutral-700 text-center text-[18px]">
              Та ми підберемо для тебе найрелевантніші вакансії
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-6 justify-center">
            <div
              className={clsx(
                "border rounded-xl text-center w-[322px] h-[244px] m-auto p-8",
                isUploadDisabled
                  ? "border-neutral-200 pointer-events-none"
                  : "border-primary-500 cursor-pointer hover:border-primary-500 transition-colors"
              )}
              onClick={!isUploadDisabled ? handleManualTrigger : undefined}
              role="button"
              aria-label="Завантажити CV"
              tabIndex={isUploadDisabled ? -1 : 0}
              onKeyDown={(e) => {
                if (!isUploadDisabled && (e.key === "Enter" || e.key === " ")) {
                  handleManualTrigger();
                }
              }}
            >
              <SpriteSvg
                id="icon-uploading-filed"
                className={clsx(
                  "mx-auto w-12 h-12 mb-4 fill-neutral-50",
                  isUploadDisabled ? "text-neutral-400 stroke-neutral-400" : "text-primary-500 stroke-primary-500"
                )}
              />
              <p className={clsx("text-micro pb-4", isUploadDisabled ? "text-neutral-400" : "")}>
                Завантаж CV : у форматі{" "}
                <span className={isUploadDisabled ? "text-neutral-400" : "text-primary-500"}>PDF</span>
              </p>
              <p className={clsx("text-micro pb-4", isUploadDisabled ? "text-neutral-400" : "")}>
                максимальний розмір файлу{" "}
                <span className={isUploadDisabled ? "text-neutral-400" : "text-primary-500"}>10MB</span>
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isUploadDisabled) {
                    handleManualTrigger();
                  }
                }}
                className={clsx(
                  "btn underline",
                  isUploadDisabled ? "text-neutral-400 cursor-not-allowed" : "text-primary-500"
                )}
                disabled={isUploadDisabled}
              >
                Натиснути тут
              </button>
              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFileUpload}
                hidden
                disabled={isUploadDisabled}
              />
            </div>

            <div className="flex items-center gap-1 border border-primary-500 rounded-lg px-4 py-4 h-[72px] mx-auto relative basis-full">
              <SpriteSvg id="icon-pdf" className="w-10 h-10 text-neutral-900 fill-primary-500" />
              <div className="flex-1">
                <div className="text-sm mb-1">{fileName || "Назва файлу"}</div>
                <div className="h-1 w-full flex rounded overflow-hidden">
                  {status === "error" && errorType === "offline" ? (
                    <>
                      <div className="w-1/2 bg-error-main" />
                      <div className="w-1/2 bg-neutral-500" />
                    </>
                  ) : (
                    <div className={clsx("w-full", getStatusColor)} />
                  )}
                </div>
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
                  "text-body mx-auto text-center",
                  status === "error" ? "text-error-main" : "text-neutral-900",
                  status === "uploading" && "animate-pulse"
                )}
              >
                {message}{" "}
                {isSecondaryUploadButtonVisible && (
                  <button
                    type="button"
                    onClick={handleManualTrigger}
                    className="btn text-primary-500 cursor-pointer contents"
                  >
                    натиснувши тут
                  </button>
                )}
              </div>
            ) : (
              <p className="text-body text-center">
                Якщо раптом у тебе немає CV, не хвилюйся, ти можеш створити його просто зараз
              </p>
            )}

            <div className="flex gap-x-6">
              <Button variant="secondary" className="w-[356px] h-[62px] justify-center items-center" onClick={() => {}}>
                Створити CV
              </Button>
              <Button
                disabled={isSubmitDisabled}
                className="w-[356px] h-[62px] flex justify-center items-center"
                onClick={() => handleSubmit()}
              >
                Зберегти CV
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <InfoDialog
        open={showReminderDialog}
        title="Нагадування"
        description="Ей! З твоїм резюме ми зможемо знайти для тебе ще більше крутих пропозицій! Завантаж його, коли будеш готовий "
        onClose={() => setShowReminderDialog(false)}
      />
    </>
  );
}
