import { ReactNode } from "react";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";

type ResumeFormListItemProps = {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export const ResumeFormListItem = ({ title, subtitle, isOpen, onToggle, children }: ResumeFormListItemProps) => {
  return (
    <div className="mb-4 w-full pb-4">
      <div className="flex cursor-pointer items-center justify-between" onClick={onToggle}>
        <div className="flex-1">
          <p className="text-body text-secondary-900 mb-1 w-full">{title}</p>
          {subtitle && <p className="text-micro text-secondary-900 mb-4 w-full">Роки {subtitle && `: ${subtitle}`}</p>}
        </div>
        <button
          className="h-6 w-6 flex-shrink-0 cursor-pointer"
          type="button"
          aria-expanded={isOpen}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          <SpriteSvg
            id="icon-arrow"
            className={clsx(
              "stroke-secondary-900 h-6 w-6 fill-neutral-50 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </div>
      <div
        className={clsx("overflow-hidden transition-all duration-300 ease-in-out", {
          "max-h-0 opacity-0": !isOpen,
          "max-h-full opacity-100": isOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
};
