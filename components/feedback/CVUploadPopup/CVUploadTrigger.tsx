"use client";

import { useState } from "react";

import clsx from "clsx";

import CVUploadDialog from "@/components/feedback/CVUploadPopup/CVUploadDialog";
import { Button } from "@/components/ui/Button";

interface CVUploadTriggerProps {
  email?: string | null;
  onSuccessUpload?: () => void;
  variant?: "button" | "link";
}

export function CVUploadTrigger({ email, onSuccessUpload, variant = "button" }: CVUploadTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {variant === "button" ? (
        <Button onClick={() => setOpen(true)}>Завантаж своє CV</Button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={clsx("text-primary-500 underline hover:text-primary-700 transition-colors")}
        >
          додай CV
        </button>
      )}
      <CVUploadDialog open={open} email={email} onClose={() => setOpen(false)} onSuccessUpload={onSuccessUpload} />
    </>
  );
}
