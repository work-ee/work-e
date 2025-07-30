"use client";

import { Check, X } from "lucide-react";

import { ModalCheckSkills } from "../feedback/ModalCheckSkills";

export const AsideCheckSkills = () => {
  return (
    <div className="border-primary-100 flex flex-col gap-4 rounded-md p-6 shadow-[0_0_0_2px_var(--color-primary-100)] sm:px-6 lg:sticky lg:top-6">
      <ul className="flex flex-col gap-4">
        <li className="relative flex items-center gap-2">
          <Check className="size-8 text-green-500" />
          <strong>Тільки віддалено</strong>
        </li>
        <li className="relative flex items-center gap-2">
          <Check className="size-8 text-green-500" />
          <strong>Повна зайнятість</strong>
        </li>
        <li className="relative flex items-center gap-2">
          <X className="size-8 text-red-500" />
          <strong>Агенція</strong>
          <i className="error-msg absolute -bottom-full mb-1 max-w-full truncate p-2 text-sm text-red-500">
            Не збігається з типом компанії
          </i>
        </li>
        <li className="relative flex items-center gap-2">
          <X className="size-8 text-red-500" />
          <strong>Зарплатна плата</strong>
          <i className="error-msg absolute -bottom-full mb-1 max-w-full truncate p-2 text-sm text-red-500">
            Не вказано
          </i>
        </li>
      </ul>

      <div className="mt-6 w-full">
        <ModalCheckSkills />
      </div>
    </div>
  );
};
