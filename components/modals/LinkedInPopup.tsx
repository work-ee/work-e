import "../../app/globals.css";

interface LinkedInPopupProps {
  onClose: () => void;
}

export default function LinkedInPopup({ onClose }: LinkedInPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-100 ">
      <div className="w-[600px] rounded-[24px] p-6 shadow-xl bg-white relative">
        <button className="absolute top-3 right-0" onClick={onClose} aria-label="Close">
          <img src="img/close.svg" />
        </button>
        <p>
          Підключи LinkedIn, щоб ми могли зчитати твою професійну діяльність і заповнити твій профіль.
          <br />
          Ми не використовуємо ці дані ні для чого іншого лише для створення твого резюме та покращення результатів
          пошуку.
        </p>
        <div className="flex justify-between mt-6">
          <button className="btn border-b-1 ">LinkedIn</button>
          <button className="btn">Немає LinkedIn</button>
        </div>
      </div>
    </div>
  );
}
