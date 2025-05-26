"use client";

import { Button } from "@/components/ui/button1";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LinkedInDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LinkedInDialog({ open, onClose }: LinkedInDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Підключення LinkedIn</DialogTitle>
          <DialogDescription>
            Підключи LinkedIn, щоб ми могли зчитати твою професійну діяльність і заповнити твій профіль.
            <br />
            Ми не використовуємо ці дані ні для чого іншого — лише для створення твого резюме та покращення результатів
            пошуку.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between mt-6">
          <Button variant="link">LinkedIn</Button>
          <Button variant="link">Немає LinkedIn</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
