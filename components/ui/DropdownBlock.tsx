"use client";

import { FC, useState } from "react";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./shadcn/dropdown-menu";

interface DropdownMenuItemOption {
  value: string;
  label: string;
}

type DropdownOption = DropdownMenuItemOption;

interface DropdownBlockProps {
  triggerText: string;
  options: DropdownOption[];
  onSelect?: (value: string, label: string) => void;
  selectedLabel?: string;
  label?: string;
  className?: string;
}

export const DropdownBlock: FC<DropdownBlockProps> = ({
  triggerText,
  options,
  onSelect,
  selectedLabel,
  label,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalLabel, setInternalLabel] = useState<string>("");

  const handleSelect = (value: string, lbl: string) => {
    setInternalLabel(lbl);
    if (onSelect) {
      onSelect(value, lbl);
    }
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      {label && <DropdownMenuLabel className="label-text p-0 pb-1 text-neutral-800">{label}</DropdownMenuLabel>}

      <DropdownMenuTrigger
        className={clsx(
          "flex items-center justify-between",
          "h-[44px] w-[267px]",
          "border-secondary-900 border",
          "px-[16px] py-[10px]",
          "rounded-[8px]",
          "focus:outline-none",
          "relative",
          className
        )}
      >
        <span className="text-secondary-900 flex-grow text-left">{selectedLabel || internalLabel || triggerText}</span>

        <div
          className={clsx(
            "absolute top-0 right-0 bottom-0",
            "h-full w-[44px]",
            "bg-secondary-50",
            "rounded-r-[8px]",
            "flex items-center justify-center"
          )}
        >
          <div className="bg-secondary-900 absolute left-0 h-full w-px" />
          <SpriteSvg
            id={isOpen ? "icon-arrow-up" : "icon-arrow"}
            className="fill-secondary-50 stroke-secondary-900 h-[24px] w-[24px]"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={clsx(
          "w-[var(--radix-dropdown-menu-trigger-width)]",
          "pt-4 pr-[19px] pb-4 pl-[19px]",
          "mt-2 rounded-[8px] bg-white",
          "flex flex-col gap-[10px]"
        )}
        align="start"
      >
        {options.map((option, index) => (
          <DropdownMenuItem
            key={option.value || `item-${index}`}
            onSelect={() => handleSelect(option.value, option.label)}
            className={clsx(
              "h-[25px] w-full",
              "px-[8px] py-[2px]",
              "rounded-[8px]",
              "cursor-pointer",
              "text-secondary-500",
              "focus:bg-secondary-50 data-[highlighted]:bg-secondary-50",
              "hover:text-secondary-500 focus:text-secondary-500"
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
