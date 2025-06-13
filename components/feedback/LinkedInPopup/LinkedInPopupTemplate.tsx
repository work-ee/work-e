import { Button } from "@/components/ui";

import { Modal } from "../Modal";

interface LinkedInPopupProps {
  onClose: () => void;
  title?: string;
  text: string;
}

export const LinkedInPopupTemplate = ({ onClose, title, text }: LinkedInPopupProps) => {
  return (
    <Modal
      onClose={onClose}
      title={title}
      actions={
        <div className="flex gap-18 w-full mt-4">
          <Button variant="secondary" className="flex-1 flex justify-center">
            Немає LinkedIn
          </Button>
          <Button className="flex-1 flex justify-center">LinkedIn</Button>
        </div>
      }
    >
      <p className="text-neutral-900 pr-15">{text}</p>
    </Modal>
  );
};
