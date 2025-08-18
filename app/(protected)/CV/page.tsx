"use client";

import { useState } from "react";

import clsx from "clsx";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { DropdownBlock, Input, ResumeFormSection } from "@/components/ui";
import { Textarea } from "@/components/ui/shadcn/textarea";

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
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      personal: {
        position: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
      },
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

  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({ 0: true });

  const experienceArray = useFieldArray({ control, name: "experience" });
  const educationArray = useFieldArray({ control, name: "education" });
  const coursesArray = useFieldArray({ control, name: "courses" });
  const progLangArray = useFieldArray({ control, name: "programmingLanguages" });
  const skillsArray = useFieldArray({ control, name: "skills" });
  const foreignLangArray = useFieldArray({ control, name: "foreignLanguages" });

  const toggleSection = (index: number) => setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));

  const positionOptions = [
    { value: "frontend", label: "Front-end розробник" },
    { value: "backend", label: "Back-end розробник" },
    { value: "fullstack", label: "Full-stack розробник" },
    { value: "qa", label: "QA інженер" },
    { value: "pm", label: "Project Manager" },
    { value: "designer", label: "UI/UX дизайнер" },
    { value: "devops", label: "DevOps інженер" },
  ];

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <main className="center-page">
      <section className="section flex-1">
        <div className="container">
          <h1 className="heading-h1 mb-10">CV</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[870px] space-y-4">
            <ResumeFormSection
              title={sectionTitles[0]}
              index={0}
              isOpen={openSections[0]}
              toggleSection={toggleSection}
            >
              {/* <div className=""> */}
              <Controller
                name="personal.position"
                control={control}
                rules={{ required: "Вкажіть бажану посаду" }}
                render={({ field }) => (
                  <DropdownBlock
                    label="Бажана посада"
                    triggerText={positionOptions[0].label}
                    options={positionOptions}
                    selectedLabel={positionOptions.find((opt) => opt.value === field.value)?.label}
                    onSelect={field.onChange}
                    className="mb-4 w-full"
                  />
                )}
              />
              {errors.personal?.position && <p className="text-sm text-red-500">{errors.personal.position.message}</p>}
              <div className="flex flex-wrap justify-between gap-4">
                <Input
                  label="Ім’я *"
                  placeholder="Оксана"
                  required
                  {...register("personal.firstName", { required: true })}
                  className="w-91"
                />
                <Input
                  label="Прізвище *"
                  placeholder="Антонюк"
                  required
                  {...register("personal.lastName", { required: true })}
                  className="w-91"
                />
                <Input
                  label="Email *"
                  placeholder="Oksena.Ankonuk@gmail.com"
                  type="email"
                  required
                  {...register("personal.email", { required: true })}
                  className="w-91"
                />
                <Input
                  label="Телефон"
                  placeholder="+3806356897"
                  type="tel"
                  {...register("personal.phone")}
                  className="w-91"
                />
                <Input label="Країна" placeholder="Україна" {...register("personal.country")} className="w-91" />
                <Input label="Місто" placeholder="Львів" {...register("personal.city")} className="w-91" />
              </div>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[1]}
              index={1}
              isOpen={openSections[1]}
              toggleSection={toggleSection}
            >
              <p className="mb-2 text-sm text-neutral-600">
                Опишіть свої головні досягнення, роль, мотивацію та ключові навички в 2-4 реченнях.
              </p>
              <Textarea
                className={clsx(
                  "border-secondary-300 input-text min-h-[241px] w-full resize-none rounded-lg border px-8 pt-2.5 outline-none"
                )}
                {...register("overview")}
              />
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[2]}
              index={2}
              isOpen={openSections[2]}
              toggleSection={toggleSection}
            >
              {experienceArray.fields.map((field, i) => (
                <div key={field.id} className="mb-4 grid gap-4 border-b pb-4">
                  <Input label="Посада" {...register(`experience.${i}.role`)} />
                  <Input label="Компанія" {...register(`experience.${i}.company`)} />
                  <Input label="Початок роботи" type="date" {...register(`experience.${i}.start`)} />
                  <Input label="Завершення роботи" type="date" {...register(`experience.${i}.end`)} />
                  <Textarea
                    className="border-secondary-300 input-text min-h-[150px] w-full resize-none rounded-lg border px-8 pt-2.5 outline-none"
                    {...register(`experience.${i}.description`)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  experienceArray.append({
                    role: "",
                    company: "",
                    start: "",
                    end: "",
                    description: "",
                  })
                }
                className="btn-secondary"
              >
                Додати ще місце роботи
              </button>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[3]}
              index={3}
              isOpen={openSections[3]}
              toggleSection={toggleSection}
            >
              {educationArray.fields.map((field, i) => (
                <div key={field.id} className="mb-4 grid gap-4 border-b pb-4">
                  <Input label="Спеціалізація" {...register(`education.${i}.specialization`)} />
                  <Input label="Заклад" {...register(`education.${i}.institution`)} />
                  <Input label="Початок" type="date" {...register(`education.${i}.start`)} />
                  <Input label="Завершення" type="date" {...register(`education.${i}.end`)} />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  educationArray.append({
                    specialization: "",
                    institution: "",
                    start: "",
                    end: "",
                  })
                }
                className="btn-secondary"
              >
                Додати ще місце навчання
              </button>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[4]}
              index={4}
              isOpen={openSections[4]}
              toggleSection={toggleSection}
            >
              {coursesArray.fields.map((field, i) => (
                <div key={field.id} className="mb-4 grid gap-4 border-b pb-4">
                  <Input label="Спеціалізація" {...register(`courses.${i}.specialization`)} />
                  <Input label="Заклад" {...register(`courses.${i}.institution`)} />
                  <Input label="Початок" type="date" {...register(`courses.${i}.start`)} />
                  <Input label="Завершення" type="date" {...register(`courses.${i}.end`)} />
                  <Textarea
                    className="border-secondary-300 input-text min-h-[120px] w-full resize-none rounded-lg border px-8 pt-2.5 outline-none"
                    {...register(`courses.${i}.description`)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  coursesArray.append({
                    specialization: "",
                    institution: "",
                    start: "",
                    end: "",
                    description: "",
                  })
                }
                className="btn-secondary"
              >
                Додати ще курси
              </button>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[5]}
              index={5}
              isOpen={openSections[5]}
              toggleSection={toggleSection}
            >
              {progLangArray.fields.map((field, i) => (
                <Input key={field.id} label="Мова" {...register(`programmingLanguages.${i}.language`)} />
              ))}
              <button type="button" onClick={() => progLangArray.append({ language: "" })} className="btn-secondary">
                Додати ще мову
              </button>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[6]}
              index={6}
              isOpen={openSections[6]}
              toggleSection={toggleSection}
            >
              {skillsArray.fields.map((field, i) => (
                <Input key={field.id} label="Навичка" {...register(`skills.${i}.skill`)} />
              ))}
              <button type="button" onClick={() => skillsArray.append({ skill: "" })} className="btn-secondary">
                Додати ще навичку
              </button>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[7]}
              index={7}
              isOpen={openSections[7]}
              toggleSection={toggleSection}
            >
              {foreignLangArray.fields.map((field, i) => (
                <div key={field.id} className="mb-4 grid gap-4 border-b pb-4">
                  <Input label="Мова" {...register(`foreignLanguages.${i}.language`)} />
                  <Input label="Рівень" {...register(`foreignLanguages.${i}.level`)} />
                </div>
              ))}
              <button
                type="button"
                onClick={() => foreignLangArray.append({ language: "", level: "" })}
                className="btn-secondary"
              >
                Додати ще мову
              </button>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[8]}
              index={8}
              isOpen={openSections[8]}
              toggleSection={toggleSection}
            >
              <Textarea
                className="border-secondary-300 input-text min-h-[150px] w-full resize-none rounded-lg border px-8 pt-2.5 outline-none"
                {...register("hobbies")}
              />
            </ResumeFormSection>

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
