import { z } from "zod";

const nameValidator = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, `${fieldName} обов'язкове для заповнення`)
    .min(2, `${fieldName} має містити мінімум 2 символи`)
    .max(50, `${fieldName} не може перевищувати 50 символів`)
    .regex(/^[^\d]*$/, `${fieldName} не може містити цифри`)
    .regex(/^[a-zA-Zа-яА-ЯіІїЇєЄ\s'-]+$/, `${fieldName} може містити тільки літери, пробіли, дефіси та апострофи`)
    .refine((val) => val.trim().length > 0, `${fieldName} не може бути пустим`);

// const optionalUrlValidator = (fieldName: string, pattern?: RegExp, allowedExtensions?: string[]) =>
//   z
//     .string()
//     .trim()
//     .optional()
//     .refine(
//       (val) => {
//         if (!val || val === "") return true;

//         try {
//           new URL(val);
//         } catch {
//           return false;
//         }

//         if (pattern && !pattern.test(val)) return false;

//         if (allowedExtensions) {
//           const extension = val.split(".").pop()?.toLowerCase();
//           return allowedExtensions.includes(extension || "");
//         }

//         return true;
//       },
//       {
//         message: allowedExtensions
//           ? `${fieldName} має бути посиланням на файл з розширенням: ${allowedExtensions.join(", ")}`
//           : `Введіть дійсне посилання для ${fieldName}`,
//       }
//     )
//     .transform((val) => val || "");

export const UserProfileSchema = z.object({
  first_name: nameValidator("Ім'я"),
  last_name: nameValidator("Прізвище"),
  email: z
    .string()
    .trim()
    .min(1, "Email обов'язковий для заповнення")
    .email({ message: "Введіть дійсну електронну адресу" })
    .toLowerCase(),
  // linkedin_url: optionalUrlValidator(
  //   "LinkedIn профіль",
  //   /^https?:\/\/(www\.)?linkedin\.com\/.*$/
  // ),
  // cv: optionalUrlValidator(
  //   "CV",
  //   undefined,
  //   ['pdf', 'doc', 'docx']
  // ),
});

export type UserProfileData = z.infer<typeof UserProfileSchema>;
