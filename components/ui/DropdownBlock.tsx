"use client";

import { FC, useState } from "react";

import { clsx } from "clsx";

import { SvgIcon } from "@/lib/svgIcons";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./shadcn/dropdown-menu";

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
}

export const DropdownBlock: FC<DropdownBlockProps> = ({ triggerText, options, onSelect, selectedLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={clsx(
          "flex items-center justify-between",
          "w-[267px] h-[44px]",
          "border",
          "border-secondary-100",
          "px-[16px] py-[10px]",
          "rounded-[8px]",
          "focus:outline-none",
          "relative"
        )}
      >
        <span className="flex-grow text-left text-secondary-500">{selectedLabel || triggerText}</span>

        <div
          className={clsx(
            "absolute right-0 top-0 bottom-0",
            "w-[44px]",
            "h-full",
            "bg-secondary-50",
            "rounded-r-[8px]",
            "flex items-center justify-center"
          )}
        >
          <div className="absolute left-0 w-px h-full bg-secondary-100" />
          <SvgIcon
            id={isOpen ? "icon-arrow-up" : "icon-arrow"}
            className="w-[24px] h-[24px] fill-secondary-50 stroke-secondary-100"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={clsx(
          "w-[229px]",
          "pt-4",
          "pb-4",
          "pl-[19px]",
          "pr-[19px]",
          "mt-2",
          "bg-white",
          "rounded-[8px]",
          "flex flex-col gap-[10px]"
        )}
        align="start"
      >
        {options.map((option, index) => (
          <DropdownMenuItem
            key={option.value || `item-${index}`}
            onSelect={() => onSelect && onSelect(option.value, option.label)}
            className={clsx(
              "w-full",
              "h-[25px]",
              "px-[8px] py-[2px]",
              "rounded-[8px]",
              "text-secondary-500",
              "cursor-pointer",
              "focus:bg-secondary-50",
              "data-[highlighted]:bg-secondary-50",
              "text-secondary-500 hover:text-secondary-500 focus:text-secondary-500"
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
