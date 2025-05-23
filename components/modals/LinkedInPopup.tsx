interface LinkedInPopupProps {
  onClose: () => void;
}

export default function LinkedInPopup({ onClose }: LinkedInPopupProps) {
  return (
    <div>
      <div>
        <button onClick={onClose} aria-label="Close">
          ×
        </button>
        <p>
          Підключи LinkedIn, щоб ми могли зчитати твою професійну діяльність і заповнити твій профіль.
          <br />
          Ми не використовуємо ці дані ні для чого іншого лише для створення твого резюме та покращення результатів
          пошуку.
        </p>
        <div>
          <button>LinkedIn</button>
          <button>Немає LinkedIn</button>
        </div>
      </div>
    </div>
  );
}
