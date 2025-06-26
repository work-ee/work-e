import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ALLOWED_FILE_TYPE, MAX_FILE_SIZE_BYTES, MIN_FILE_SIZE_BYTES } from "./constants/cv";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateCVFile(file: File): string | null {
  if (file.type !== ALLOWED_FILE_TYPE) {
    return "Невірний формат. Завантажте CV у PDF.";
  }

  if (file.size < MIN_FILE_SIZE_BYTES) {
    return `Файл замалий. Мінімум ${MIN_FILE_SIZE_BYTES} байт.`;
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "Файл перевищує 10MB. Зменште розмір.";
  }

  return null;
}
