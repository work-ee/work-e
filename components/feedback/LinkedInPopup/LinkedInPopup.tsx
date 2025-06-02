import { Button } from "../../ui";
import { Modal } from "../Modal";

interface LinkedInPopupProps {
  onClose: () => void;
}

export default function LinkedInPopup({ onClose }: LinkedInPopupProps) {
  return (
    <Modal
      onClose={onClose}
      actions={
        <div className="flex gap-18 w-full mt-4">
          <Button variant="secondary" className="flex-1 flex justify-center">
            Немає LinkedIn
          </Button>
          <Button className="flex-1 flex justify-center">LinkedIn</Button>
        </div>
      }
    >
      <p className="text-neutral-900 pr-15">
        Підключи LinkedIn, щоб ми могли зчитати твою професійну діяльність і заповнити твій профіль.
        <br />
        Ми не використовуємо ці дані ні для чого іншого лише для створення твого резюме та покращення результатів
        пошуку.
      </p>
    </Modal>
  );
}
