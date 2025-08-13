"use client";

import { useState } from "react";

import clsx from "clsx";

import { AlertInfo } from "@/components/feedback";
import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

import { useCvUpload } from "@/hooks/useCvUpload";

import { useModalsStore } from "@/stores/modalsStore";

interface CVUploadDialogProps {
  open: boolean;
  email?: string | null;
  onClose: () => void;
  onSuccessUpload?: () => void;
}

export default function CVUploadDialog({ open, email, onClose, onSuccessUpload }: CVUploadDialogProps) {
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const remindCV = useModalsStore((state) => state.remindCV);
  const setRemindCV = useModalsStore((state) => state.setRemindCV);
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

  const isUploadDisabled = ["uploading", "success", "fileSelected"].includes(status);
  const isSecondaryUploadButtonVisible = status === "error";

  const handleDialogClose = () => {
    if (status !== "success" && remindCV) {
      setShowReminderDialog(true);
    }
    onClose();
    resetState();
  };

  const handleDoNotRemind = () => {
    setRemindCV(false);
    setShowReminderDialog(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
        <DialogContent className="w-[327px] max-w-[unset] gap-4 rounded-xl border-none p-6 md:w-[800px] md:gap-6 md:rounded-2xl md:p-8">
          <DialogHeader className="h-[73px] md:h-[82px]">
            <DialogTitle className="heading-h3 md:heading-h2 text-center text-[18px] text-neutral-900 md:text-[36px]">
              Завантаж своє CV
            </DialogTitle>
            <DialogDescription className="text-body text-center text-[14px] text-neutral-700 md:text-[18px]">
              Та ми підберемо для тебе найрелевантніші вакансії
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div
              className={clsx(
                "m-auto h-[168px] w-[172px] rounded-xl border p-3 text-center md:h-[244px] md:w-[322px] md:p-8",
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
                  "mx-auto mb-2 h-6 w-6 fill-neutral-50 md:mb-4 md:h-12 md:w-12",
                  isUploadDisabled ? "stroke-neutral-400 text-neutral-400" : "text-primary-500 stroke-primary-500"
                )}
              />
              <p
                className={clsx(
                  "text-micro pb-2 text-[10px] md:pb-4 md:text-[14px]",
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
                  "text-micro pb-2 text-[10px] md:pb-4 md:text-[14px]",
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
            <div className="border-primary-500 relative mx-auto flex h-[52px] basis-full items-center gap-2 rounded-lg border px-4 py-3.5 md:h-[72px] md:gap-1">
              <SpriteSvg id="icon-pdf" className="fill-primary-500 h-6 w-6 text-neutral-900 md:h-10 md:w-10" />

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
                  className="fill-primary-500 h-4 w-4 text-neutral-900 md:h-6 md:w-6"
                />
              </button>
            </div>
            <div className="flex w-full flex-col gap-4">
              {message && (
                <div
                  className={clsx(
                    "text-body mx-auto text-center",
                    status === "error" ? "text-error-main" : "text-neutral-900",
                    status === "uploading" && "animate-pulse"
                  )}
                >
                  {message}
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
              )}
              {!message && (
                <p className="text-body hidden text-center md:block">
                  Якщо раптом у тебе немає CV, не хвилюйся, ти можеш створити його просто зараз
                </p>
              )}
            </div>
            <div className="flex w-full flex-col-reverse gap-4 md:flex-row md:gap-x-6">
              <Button
                variant="secondary"
                className="h-10 w-full items-center justify-center md:order-first md:h-[62px] md:w-[356px]"
                onClick={() => {}}
              >
                Створити CV
              </Button>
              {!message && (
                <p className="text-body text-center md:hidden">
                  Якщо раптом у тебе немає CV, не хвилюйся, ти можеш створити його просто зараз
                </p>
              )}
              <Button
                disabled={isSubmitDisabled}
                className="flex h-10 w-full items-center justify-center md:h-[62px] md:w-[356px]"
                onClick={() => handleSubmit()}
              >
                Зберегти CV
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <AlertInfo
        showOnMount={showReminderDialog && remindCV}
        title="Нагадування"
        text="Ей! З твоїм резюме ми зможемо знайти для тебе ще більше крутих пропозицій! Завантаж його, коли будеш готовий"
        buttonText="Завантажити CV"
        onButtonClick={handleDoNotRemind}
        onClose={() => setShowReminderDialog(false)}
      />
    </>
  );
}
