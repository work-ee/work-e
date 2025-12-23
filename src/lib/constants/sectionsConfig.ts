import { PromptKey } from "@/lib/prompts/prompts";

export type FieldConfig = {
  label: string;
  name: "position" | "company" | "startDate" | "endDate" | "specialization" | "institution" | "description";
  type?: "text" | "date" | "textarea";
};

export type SectionConfig = {
  titleField: "position" | "specialization";
  defaultTitle: string;
  fields: FieldConfig[];
  description: {
    label: string;
    description: string;
    promptKey?: PromptKey;
  };
};

export const sectionsConfig: Record<string, SectionConfig> = {
  experience: {
    titleField: "position",
    defaultTitle: "Назва посади і місце роботи",
    fields: [
      { label: "Посада", name: "position", type: "text" },
      { label: "Компанія", name: "company", type: "text" },
      { label: "Початок роботи", name: "startDate", type: "date" },
      { label: "Завершення роботи", name: "endDate", type: "date" },
    ],
    description: {
      label: "Опис досвіду",
      description:
        "Опишіть свою головну роль та ключові навички в 2-4 реченнях, на основі чого AI зможе згенерувати Досвід",
      promptKey: "GENERATE_EXPERIENCE_DESCRIPTION_UK",
    },
  },
  education: {
    titleField: "specialization",
    defaultTitle: "Освіта",
    fields: [
      { label: "Спеціалізація", name: "specialization", type: "text" },
      { label: "Заклад", name: "institution", type: "text" },
      { label: "Початок освіти", name: "startDate", type: "date" },
      { label: "Завершення освіти", name: "endDate", type: "date" },
    ],
    description: {
      label: "Опис",
      description: "Опишіть свою спеціалізацію та основні досягнення",
    },
  },
  courses: {
    titleField: "specialization",
    defaultTitle: "Назва курсу",
    fields: [
      { label: "Спеціалізація", name: "specialization", type: "text" },
      { label: "Навчальний заклад", name: "institution", type: "text" },
      { label: "Початок курсів", name: "startDate", type: "date" },
      { label: "Завершення курсів", name: "endDate", type: "date" },
    ],
    description: {
      label: "Опис",
      description: "Опишіть курс та отримані навички",
    },
  },
};
