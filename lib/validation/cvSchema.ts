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

const phoneSchema = z
  .string()
  .refine(
    (phone) => !phone || /^\+?\d{10,15}$/.test(phone.replace(/\s/g, "")),
    "Некоректний формат телефонного номера."
  )
  .optional();

const personalInfoSchema = z.object({
  id: z.number().optional(),
  desiredPosition: z.string().min(1, "Бажана посада є обов'язковою."),
  firstName: nameValidator("Ім'я"),
  lastName: nameValidator("Прізвище"),
  email: z
    .string()
    .trim()
    .min(1, "Email обов'язковий для заповнення")
    .email({ message: "Введіть дійсну електронну адресу" })
    .toLowerCase(),
  phone: phoneSchema,
  country: z.string().optional(),
  city: z.string().optional(),
});

const experienceSchema = z.object({
  position: z.string().optional(),
  company: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const educationSchema = z.object({
  specialization: z.string().optional(),
  institution: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const courseSchema = z.object({
  specialization: z.string().optional(),
  institution: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const programmingLanguageSchema = z.object({
  name: z.string().optional(),
});

const skillSchema = z.object({
  name: z.string().optional(),
});

const foreignLanguageSchema = z.object({
  name: z.string().optional(),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Fluent", "Native"]).optional(),
});

export const cvSchema = z.object({
  personalInfo: personalInfoSchema,
  overview: z.string().optional(),
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  courses: z.array(courseSchema).optional(),
  programmingLanguages: z.array(programmingLanguageSchema).optional(),
  skills: z.array(skillSchema).optional(),
  foreignLanguages: z.array(foreignLanguageSchema).optional(),
  hobbies: z.string().optional(),
});

export type FormValues = z.infer<typeof cvSchema>;
