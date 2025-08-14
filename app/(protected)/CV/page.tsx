"use client";

import { useState } from "react";

import clsx from "clsx";
import { useFieldArray, useForm } from "react-hook-form";

import { SpriteSvg } from "@/components/icons/SpriteSvg";

type FormValues = {
  personal: {
    position: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
  };
  overview: string;
  experience: { role: string; company: string; start: string; end: string; description: string }[];
  education: { specialization: string; institution: string; start: string; end: string }[];
  courses: { specialization: string; institution: string; start: string; end: string; description: string }[];
  programmingLanguages: { language: string }[];
  skills: { skill: string }[];
  foreignLanguages: { language: string; level: string }[];
  hobbies: string;
};

export default function CVForm() {
  const sectionTitles = [
    "Особисті дані",
    "Огляд",
    "Досвід",
    "Освіта",
    "Курси",
    "Мова програмування",
    "Навички",
    "Іноземна мова",
    "Хобі",
  ];

  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({
    0: true,
  });

  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      personal: { position: "", firstName: "", lastName: "", email: "", phone: "", country: "", city: "" },
      overview: "",
      experience: [{ role: "", company: "", start: "", end: "", description: "" }],
      education: [{ specialization: "", institution: "", start: "", end: "" }],
      courses: [{ specialization: "", institution: "", start: "", end: "", description: "" }],
      programmingLanguages: [{ language: "" }],
      skills: [{ skill: "" }],
      foreignLanguages: [{ language: "", level: "" }],
      hobbies: "",
    },
  });

  const experienceArray = useFieldArray({ control, name: "experience" });
  const educationArray = useFieldArray({ control, name: "education" });
  const coursesArray = useFieldArray({ control, name: "courses" });
  const progLangArray = useFieldArray({ control, name: "programmingLanguages" });
  const skillsArray = useFieldArray({ control, name: "skills" });
  const foreignLangArray = useFieldArray({ control, name: "foreignLanguages" });

  const toggleSection = (index: number) => setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <main className="center-page">
      <section className="section flex-1">
        <div className="container">
          <h1 className="heading-h1 mb-10">CV</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[870px] space-y-4">
            <Section title={sectionTitles[0]} index={0} isOpen={openSections[0]} toggleSection={toggleSection}>
              <div className="grid gap-4">
                <Input label="Бажана посада" {...register("personal.position")} />
                <Input label="Ім’я *" required {...register("personal.firstName", { required: true })} />
                <Input label="Прізвище *" required {...register("personal.lastName", { required: true })} />
                <Input label="Email *" type="email" required {...register("personal.email", { required: true })} />
                <Input label="Телефон" type="tel" {...register("personal.phone")} />
                <Input label="Країна" {...register("personal.country")} />
                <Input label="Місто" {...register("personal.city")} />
              </div>
            </Section>

            <Section title={sectionTitles[1]} index={1} isOpen={openSections[1]} toggleSection={toggleSection}>
              <p className="mb-2 text-sm text-neutral-600">
                Опишіть свої головні досягнення, роль, мотивацію та ключові навички в 2-4 реченнях, на основі чого AI
                зможе згенерувати Огляд
              </p>
              <textarea {...register("overview")} rows={4} className="w-full rounded border p-2" />
            </Section>

            <Section title={sectionTitles[2]} index={2} isOpen={openSections[2]} toggleSection={toggleSection}>
              {experienceArray.fields.map((field, i) => (
                <div key={field.id} className="mb-4 grid gap-4 border-b pb-4">
                  <Input label="Посада" {...register(`experience.${i}.role` as const)} />
                  <Input label="Компанія" {...register(`experience.${i}.company` as const)} />
                  <Input label="Початок роботи" type="date" {...register(`experience.${i}.start` as const)} />
                  <Input label="Завершення роботи" type="date" {...register(`experience.${i}.end` as const)} />
                  <Textarea label="Опис досвіду" {...register(`experience.${i}.description` as const)} />
                </div>
              ))}
              <button
                type="button"
                onClick={() => experienceArray.append({ role: "", company: "", start: "", end: "", description: "" })}
                className="btn-secondary"
              >
                Додати ще місце роботи
              </button>
            </Section>

            <Section title={sectionTitles[3]} index={3} isOpen={openSections[3]} toggleSection={toggleSection}>
              {educationArray.fields.map((field, i) => (
                <div key={field.id} className="mb-4 grid gap-4 border-b pb-4">
                  <Input label="Спеціалізація" {...register(`education.${i}.specialization` as const)} />
                  <Input label="Назва навчального закладу" {...register(`education.${i}.institution` as const)} />
                  <Input label="Початок освіти" type="date" {...register(`education.${i}.start` as const)} />
                  <Input label="Завершення освіти" type="date" {...register(`education.${i}.end` as const)} />
                </div>
              ))}
              <button
                type="button"
                onClick={() => educationArray.append({ specialization: "", institution: "", start: "", end: "" })}
                className="btn-secondary"
              >
                Додати ще місце навчання
              </button>
            </Section>

            <Section title={sectionTitles[4]} index={4} isOpen={openSections[4]} toggleSection={toggleSection}>
              {coursesArray.fields.map((field, i) => (
                <div key={field.id} className="mb-4 grid gap-4 border-b pb-4">
                  <Input label="Спеціалізація" {...register(`courses.${i}.specialization` as const)} />
                  <Input label="Навчальний заклад" {...register(`courses.${i}.institution` as const)} />
                  <Input label="Початок курсів" type="date" {...register(`courses.${i}.start` as const)} />
                  <Input label="Завершення курсів" type="date" {...register(`courses.${i}.end` as const)} />
                  <Textarea label="Опис" {...register(`courses.${i}.description` as const)} />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  coursesArray.append({ specialization: "", institution: "", start: "", end: "", description: "" })
                }
                className="btn-secondary"
              >
                Додати ще курси
              </button>
            </Section>

            <Section title={sectionTitles[5]} index={5} isOpen={openSections[5]} toggleSection={toggleSection}>
              {progLangArray.fields.map((field, i) => (
                <Input key={field.id} label="Мова" {...register(`programmingLanguages.${i}.language` as const)} />
              ))}
              <button type="button" onClick={() => progLangArray.append({ language: "" })} className="btn-secondary">
                Додати ще мову
              </button>
            </Section>

            <Section title={sectionTitles[6]} index={6} isOpen={openSections[6]} toggleSection={toggleSection}>
              {skillsArray.fields.map((field, i) => (
                <Input key={field.id} label="Навичка" {...register(`skills.${i}.skill` as const)} />
              ))}
              <button type="button" onClick={() => skillsArray.append({ skill: "" })} className="btn-secondary">
                Додати ще навичку
              </button>
            </Section>

            <Section title={sectionTitles[7]} index={7} isOpen={openSections[7]} toggleSection={toggleSection}>
              {foreignLangArray.fields.map((field, i) => (
                <div key={field.id} className="mb-4 grid gap-4 border-b pb-4">
                  <Input label="Мова" {...register(`foreignLanguages.${i}.language` as const)} />
                  <Input label="Рівень" {...register(`foreignLanguages.${i}.level` as const)} />
                </div>
              ))}
              <button
                type="button"
                onClick={() => foreignLangArray.append({ language: "", level: "" })}
                className="btn-secondary"
              >
                Додати ще мову
              </button>
            </Section>

            <Section title={sectionTitles[8]} index={8} isOpen={openSections[8]} toggleSection={toggleSection}>
              <Textarea label="Хобі" {...register("hobbies")} />
            </Section>

            <div className="mt-6">
              <button type="submit" className="rounded bg-blue-600 px-6 py-2 text-white">
                Зберегти
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function Section({
  title,
  index,
  isOpen,
  toggleSection,
  children,
}: {
  title: string;
  index: number;
  isOpen?: boolean;
  toggleSection: (index: number) => void;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-b border-neutral-300">
      <legend className="flex w-full items-center justify-between py-4">
        <span className="heading-h3">{title}</span>
        <button type="button" onClick={() => toggleSection(index)} aria-expanded={isOpen}>
          <SpriteSvg
            id="icon-arrow"
            className={clsx(
              "h-6 w-6 fill-neutral-50 stroke-neutral-900 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </legend>
      <div
        className={clsx(
          "transform overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-8 py-4">{children}</div>
      </div>
    </fieldset>
  );
}

const Input = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <label className="flex flex-col gap-1">
    <span>{label}</span>
    <input {...props} className="rounded border p-2" />
  </label>
);

const Textarea = ({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <label className="flex flex-col gap-1">
    <span>{label}</span>
    <textarea {...props} className="rounded border p-2" />
  </label>
);
