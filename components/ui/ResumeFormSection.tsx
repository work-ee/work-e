import clsx from "clsx";

import { SpriteSvg } from "../icons/SpriteSvg";

export const ResumeFormSection = ({
  title,
  index,
  isOpen,
  toggleSection,
  children,
}: {
  title: string;
  index: number;
  isOpen?: boolean;
  toggleSection: (index: number) => void;
  children: React.ReactNode;
}) => {
  return (
    <fieldset className={clsx("transition-all duration-300", isOpen ? "border-none" : "border-b border-neutral-900")}>
      <legend className="flex w-full items-center justify-between py-4">
        <span className="heading-h3">{title}</span>
        <button type="button" onClick={() => toggleSection(index)} aria-expanded={isOpen}>
          <SpriteSvg
            id="icon-arrow"
            className={clsx(
              "h-6 w-6 fill-neutral-50 stroke-neutral-900 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </legend>

      <div
        className={clsx(
          "transform overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={clsx("transition-all duration-300", isOpen && "border-secondary-900 rounded-2xl border p-8")}>
          {children}
        </div>
      </div>
    </fieldset>
  );
};
