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
        <button className="absolute top-6 right-6" onClick={onClose} aria-label="Close">
          <img src="icons/close.svg" />
        </button>
        {title && <h3 className="heading-h3 text-neutral-900 pb-2">{title}</h3>}
        <div>{children}</div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
};
