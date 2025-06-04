"use client";

import { useState } from "react";

import CVUploadDialog from "@/components/feedback/CVUploadPopup/CVUploadDialog";
import { Button } from "@/components/ui/Button";

export function CVUploadTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Завантаж своє CV</Button>
      <CVUploadDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
