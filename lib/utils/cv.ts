import { ALLOWED_FILE_TYPE, MAX_FILE_SIZE_BYTES, MIN_FILE_SIZE_BYTES } from "@/lib/constants/cv";

export function validateCVFile(file: File): string | null {
  if (file.type !== ALLOWED_FILE_TYPE) {
    return "Невірний формат файлу. Будь ласка, завантажте CV у форматі PDF,";
  }

  if (file.size < MIN_FILE_SIZE_BYTES) {
    return "Файл замалий. Мінімальний розмір файлу – 100 байт. Будь ласка, завантажте повне CV,";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "Розмір файлу перевищує 10 МБ. Будь ласка, зменште розмір CV та спробуйте знову,";
  }

  return null;
}
