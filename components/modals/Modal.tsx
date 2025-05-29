interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}
export const Modal = ({ onClose, title, children, actions }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-100 ">
      <div className="w-[600px] rounded-[16px] p-6 shadow-xl bg-white relative">
        <button className="absolute top-3 right-0" onClick={onClose} aria-label="Close">
          <img src="img/close.svg" />
        </button>
        {title && <h2>{title}</h2>}
        <div>{children}</div>
        {actions && <div className="flex justify-between">{actions}</div>}
      </div>
    </div>
  );
};
