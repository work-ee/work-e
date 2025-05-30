"use client";

import { useState } from "react";

import CVUploadDialog from "@/components/CVUploadDialog";

export default function CVUploadShowDialog() {
  const [open, setOpen] = useState(true);

  return <CVUploadDialog open={open} onClose={() => setOpen(false)} />;
}
