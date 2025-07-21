import React from "react";

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
        <div className="mt-4 flex w-full gap-18">
          <Button variant="secondary" className="flex flex-1 justify-center">
            Немає LinkedIn
          </Button>

          <Button className="flex flex-1 justify-center">
            <img src="icons/linkedin.svg" alt="LinkedIn icon" />
            LinkedIn
          </Button>
        </div>
      }
    >
      <p className="pr-15 text-neutral-900">
        {text.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </Modal>
  );
};
