"use client";

import { useState } from "react";

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
    fileSelected: "bg-success-main",
  }[status];

  const isUploadDisabled = status === "uploading" || status === "success" || status === "fileSelected";
  const isSecondaryUploadButtonVisible = status === "error";
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
        <DialogContent className="w-[800px] max-w-[unset] gap-6 rounded-2xl border-none p-8">
          <DialogHeader className="h-[82px]">
            <DialogTitle className="heading-h2 text-center text-[36px] text-neutral-900">Завантаж своє CV</DialogTitle>
            <DialogDescription className="text-body text-center text-[18px] text-neutral-700">
              Та ми підберемо для тебе найрелевантніші вакансії
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap justify-center gap-6">
            <div
              className={clsx(
                "m-auto h-[244px] w-[322px] rounded-xl border p-8 text-center",
                isUploadDisabled
                  ? "pointer-events-none border-neutral-200"
                  : "border-primary-500 hover:border-primary-500 cursor-pointer transition-colors"
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
                  "mx-auto mb-4 h-12 w-12 fill-neutral-50",
                  isUploadDisabled ? "stroke-neutral-400 text-neutral-400" : "text-primary-500 stroke-primary-500"
                )}
              />
              <p
                className={clsx(
                  "text-micro pb-4",
                  status === "success" ? "text-neutral-200" : isUploadDisabled ? "text-neutral-400" : ""
                )}
              >
                Завантаж CV : у форматі{" "}
                <span
                  className={
                    status === "success"
                      ? "text-neutral-200"
                      : isUploadDisabled
                        ? "text-neutral-400"
                        : "text-primary-500"
                  }
                >
                  PDF
                </span>
              </p>
              <p
                className={clsx(
                  "text-micro pb-4",
                  status === "success" ? "text-neutral-200" : isUploadDisabled ? "text-neutral-400" : ""
                )}
              >
                максимальний розмір файлу{" "}
                <span
                  className={
                    status === "success"
                      ? "text-neutral-200"
                      : isUploadDisabled
                        ? "text-neutral-400"
                        : "text-primary-500"
                  }
                >
                  10MB
                </span>
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
                  isUploadDisabled ? "cursor-not-allowed text-neutral-400" : "text-primary-500"
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

            <div className="border-primary-500 relative mx-auto flex h-[72px] basis-full items-center gap-1 rounded-lg border px-4 py-4">
              <SpriteSvg id="icon-pdf" className="fill-primary-500 h-10 w-10 text-neutral-900" />
              <div className="flex-1">
                <div className="mb-1 text-sm">{fileName || "Назва файлу"}</div>
                <div className="flex h-1 w-full overflow-hidden rounded">
                  {status === "error" && errorType === "offline" ? (
                    <>
                      <div className="bg-error-main w-1/2" />
                      <div className="w-1/2 bg-neutral-500" />
                    </>
                  ) : (
                    <div className={clsx("w-full", getStatusColor)} />
                  )}
                </div>
              </div>
              <button
                onClick={handleRemoveFile}
                className="text-primary-300 hover:text-primary-500 cursor-pointer transition-colors"
                aria-label="Видалити файл"
                type="button"
              >
                <SpriteSvg
                  id="icon-close-without-circle"
                  className="fill-primary-500 h-[14px] w-[14px] text-neutral-900"
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
                    className="btn text-primary-500 contents cursor-pointer"
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
              <Button variant="secondary" className="h-[62px] w-[356px] items-center justify-center" onClick={() => {}}>
                Створити CV
              </Button>
              <Button
                disabled={isSubmitDisabled}
                className="flex h-[62px] w-[356px] items-center justify-center"
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
