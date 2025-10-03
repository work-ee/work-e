import { z } from "zod";

const nameValidator = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(2, `${fieldName} має містити мінімум 2 символи`)
    .max(50, `${fieldName} не може перевищувати 50 символів`)
    .regex(/^[^\d]*$/, `${fieldName} не може містити цифри`)
    .regex(/^[a-zA-Zа-яА-ЯіІїЇєЄ\s'-]+$/, `${fieldName} може містити тільки літери, пробіли, дефіси та апострофи`);

const phoneSchema = z
  .string()
  .transform((val) => val.trim())
  .refine(
    (phone) => !phone || /^\+?\d{10,15}$/.test(phone.replace(/\s/g, "")),
    "Некоректний формат телефонного номера."
  )
  .optional()
  .or(z.literal(""));

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

const hasAnyValue = (obj: Record<string, unknown>) => {
  return Object.values(obj).some((val) => {
    if (typeof val === "string") return val.trim().length > 0;
    return val !== undefined && val !== null && val !== "";
  });
};

const experienceSchema = z
  .object({
    position: z.string().optional(),
    company: z.string().optional(),
    startDate: z.string().optional().or(z.literal("")),
    endDate: z.string().optional().or(z.literal("")),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!hasAnyValue(data)) return true;
      return (
        data.position &&
        data.position.trim().length > 0 &&
        data.company &&
        data.company.trim().length > 0 &&
        data.startDate &&
        data.startDate.trim().length > 0 &&
        data.endDate &&
        data.endDate.trim().length > 0 &&
        data.description &&
        data.description.trim().length > 0
      );
    },
    {
      message: "Всі поля є обов'язковими якщо розділ заповнюється",
      path: ["position"],
    }
  )
  .refine(
    (data) => {
      if (!hasAnyValue(data)) return true;
      if (!data.startDate || !data.endDate) return true;

      const start = new Date(data.startDate);
      const end = new Date(data.endDate);

      return !isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start;
    },
    {
      message: "Дата закінчення має бути пізніше дати початку",
      path: ["endDate"],
    }
  );

const educationSchema = z
  .object({
    specialization: z.string().optional(),
    institution: z.string().optional(),
    startDate: z.string().optional().or(z.literal("")),
    endDate: z.string().optional().or(z.literal("")),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!hasAnyValue(data)) return true;
      return (
        data.specialization &&
        data.specialization.trim().length > 0 &&
        data.institution &&
        data.institution.trim().length > 0 &&
        data.startDate &&
        data.startDate.trim().length > 0 &&
        data.endDate &&
        data.endDate.trim().length > 0 &&
        data.description &&
        data.description.trim().length > 0
      );
    },
    {
      message: "Всі поля є обов'язковими якщо розділ заповнюється",
      path: ["specialization"],
    }
  )
  .refine(
    (data) => {
      if (!hasAnyValue(data)) return true;
      if (!data.startDate || !data.endDate) return true;

      const start = new Date(data.startDate);
      const end = new Date(data.endDate);

      return !isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start;
    },
    {
      message: "Дата закінчення має бути пізніше дати початку",
      path: ["endDate"],
    }
  );

const courseSchema = z
  .object({
    specialization: z.string().optional(),
    institution: z.string().optional(),
    startDate: z.string().optional().or(z.literal("")),
    endDate: z.string().optional().or(z.literal("")),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!hasAnyValue(data)) return true;
      return (
        data.specialization &&
        data.specialization.trim().length > 0 &&
        data.institution &&
        data.institution.trim().length > 0 &&
        data.startDate &&
        data.startDate.trim().length > 0 &&
        data.endDate &&
        data.endDate.trim().length > 0 &&
        data.description &&
        data.description.trim().length > 0
      );
    },
    {
      message: "Всі поля є обов'язковими якщо розділ заповнюється",
      path: ["specialization"],
    }
  )
  .refine(
    (data) => {
      if (!hasAnyValue(data)) return true;
      if (!data.startDate || !data.endDate) return true;

      const start = new Date(data.startDate);
      const end = new Date(data.endDate);

      return !isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start;
    },
    {
      message: "Дата закінчення має бути пізніше дати початку",
      path: ["endDate"],
    }
  );

const programmingLanguageSchema = z
  .object({
    name: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.name || data.name.trim().length === 0) return true;
      return data.name.trim().length >= 1;
    },
    {
      message: "Введіть назву мови програмування",
      path: ["name"],
    }
  );

const skillSchema = z
  .object({
    name: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.name || data.name.trim().length === 0) return true;
      return data.name.trim().length >= 1;
    },
    {
      message: "Введіть назву навички",
      path: ["name"],
    }
  );

export const cvSchema = z.object({
  personalInfo: personalInfoSchema,
  overview: z.string().optional(),
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  courses: z.array(courseSchema).optional(),
  programmingLanguages: z.array(programmingLanguageSchema).optional(),
  skills: z.array(skillSchema).optional(),
  foreignLanguages: z
    .array(
      z
        .object({
          name: z.string().trim().optional(),
          level: z.enum(["beginner", "intermediate", "advanced", "fluent", "native"]).optional(),
        })
        .refine(
          (item) => {
            const hasName = item.name && item.name.trim().length > 0;
            const hasLevel = item.level !== undefined;

            if (!hasName && !hasLevel) return true;
            return hasName && hasLevel;
          },
          {
            message: "Заповніть назву мови та оберіть рівень",
            path: ["name"],
          }
        )
    )
    .optional(),
  hobbies: z.string().optional(),
});

export type FormValues = z.infer<typeof cvSchema>;
