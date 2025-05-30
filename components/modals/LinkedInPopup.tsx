import { Button } from "../ui";
import { Modal } from "./Modal";

interface LinkedInPopupProps {
  onClose: () => void;
}

export default function LinkedInPopup({ onClose }: LinkedInPopupProps) {
  return (
    <Modal
      onClose={onClose}
      actions={
        <div className="flex justify-between w-full p-[10px] mt-4">
          <Button variant="secondary">LinkedIn</Button>
          <Button>Немає LinkedIn</Button>
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
