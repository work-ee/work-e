"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

import { Button } from "../ui";
import { CVUploadTrigger } from "./CVUploadPopup/CVUploadTrigger";

interface InfoDialogProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

export function InfoDialog({ open, title, description, onClose }: InfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="w-[600px] h-[219px] p-6 rounded-xl [&>button:last-of-type]:hidden">
        <DialogHeader>
          <DialogTitle className="heading-h3 text-center mb-2">{title}</DialogTitle>
          <DialogDescription className="text-bod mb-4 text-neutral-700">{description}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-x-6">
          <Button variant="secondary" className="w-[213px] h-[62px]" onClick={onClose}>
            Не нагадувати
          </Button>
          <CVUploadTrigger className="w-[315px] h-[62px]" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
