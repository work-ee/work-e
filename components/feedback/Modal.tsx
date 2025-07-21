interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}
export const Modal = ({ onClose, title, children, actions }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40">
      <div className="relative w-[600px] rounded-[16px] bg-white p-6 shadow-xl">
        <button className="absolute top-6 right-6" onClick={onClose} aria-label="Close">
          <img src="icons/close.svg" alt="Close icon" />
        </button>
        {title && <h3 className="heading-h3 pb-2 text-neutral-900">{title}</h3>}
        <div>{children}</div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
};
