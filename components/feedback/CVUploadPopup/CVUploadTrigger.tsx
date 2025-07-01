"use client";

import { useState } from "react";

import CVUploadDialog from "@/components/feedback/CVUploadPopup/CVUploadDialog";
import { Button } from "@/components/ui/Button";

interface CVUploadTriggerProps {
  email?: string | null;
}

export function CVUploadTrigger({ email }: CVUploadTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Завантаж своє CV</Button>
      <CVUploadDialog open={open} email={email} onClose={() => setOpen(false)} />
    </>
  );
}
