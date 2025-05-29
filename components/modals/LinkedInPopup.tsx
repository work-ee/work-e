import { Modal } from "./Modal";

interface LinkedInPopupProps {
  onClose: () => void;
}

export default function LinkedInPopup({ onClose }: LinkedInPopupProps) {
  return (
    <Modal
      onClose={onClose}
      actions={
        <div className="flex justify-between mt-6 w-full">
          <button className="btn border-b-1">LinkedIn</button>
          <button className="btn">Немає LinkedIn</button>
        </div>
      }
    >
      <p className="color-neutral-900">
        Підключи LinkedIn, щоб ми могли зчитати твою професійну діяльність і заповнити твій профіль.
        <br />
        Ми не використовуємо ці дані ні для чого іншого лише для створення твого резюме та покращення результатів
        пошуку.
      </p>
    </Modal>
  );
}
