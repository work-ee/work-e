"use client";

import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";

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
      <DialogContent className="h-55 w-150 rounded-xl p-6 [&>button:last-of-type]:hidden">
        <DialogHeader>
          <DialogTitle className="heading-h3 mb-2 text-center">{title}</DialogTitle>
          <DialogDescription className="text-bod mb-4 text-neutral-700">{description}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-x-6">
          <Button variant="secondary" className="h-15.5 w-53.25" onClick={onDoNotRemind}>
            Не нагадувати
          </Button>
          <CVUploadTrigger className="h-15.5 w-78.75" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
