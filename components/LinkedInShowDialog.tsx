"use client";

import { useState } from "react";

import LinkedInDialog from "@/components/LinkedInDialog";

export default function LinkedInShowDialog() {
  const [open, setOpen] = useState(true);

  return <LinkedInDialog open={open} onClose={() => setOpen(false)} />;
}
