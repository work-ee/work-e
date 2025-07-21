"use client";

import { useState } from "react";

import clsx from "clsx";

import CVUploadDialog from "@/components/feedback/CVUploadPopup/CVUploadDialog";
import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { Button } from "@/components/ui/Button";

interface CVUploadTriggerProps {
  email?: string | null;
  onSuccessUpload?: () => void;
  variant?: "button" | "link";
  className?: string;
}

export function CVUploadTrigger({ email, onSuccessUpload, variant = "button", className }: CVUploadTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {variant === "button" ? (
        <Button onClick={() => setOpen(true)} className={clsx(className)}>
          <SpriteSvg id="icon-upload" className="h-5 w-5 fill-neutral-50" /> Завантаж своє CV
        </Button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={clsx("text-primary-500 hover:text-primary-700 underline transition-colors", className)}
        >
          додай CV
        </button>
      )}
      <CVUploadDialog open={open} email={email} onClose={() => setOpen(false)} onSuccessUpload={onSuccessUpload} />
    </>
  );
}
