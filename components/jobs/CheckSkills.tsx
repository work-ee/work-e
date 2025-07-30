"use client";

import { Check, X } from "lucide-react";

import { ModalCheckSkills } from "../feedback/ModalCheckSkills";

export const CheckSkills = () => {
  return (
    <>
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
    </>
  );
};
