"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

import { Button } from "../ui";
import { CVUploadTrigger } from "./CVUploadPopup/CVUploadTrigger";

interface InfoDialogProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onDoNotRemind: () => void;
}

export function InfoDialog({ open, title, description, onClose, onDoNotRemind }: InfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="h-[219px] w-[600px] rounded-xl p-6 [&>button:last-of-type]:hidden">
        <DialogHeader>
          <DialogTitle className="heading-h3 mb-2 text-center">{title}</DialogTitle>
          <DialogDescription className="text-bod mb-4 text-neutral-700">{description}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-x-6">
          <Button variant="secondary" className="h-[62px] w-[213px]" onClick={onDoNotRemind}>
            Не нагадувати
          </Button>
          <CVUploadTrigger className="h-[62px] w-[315px]" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
