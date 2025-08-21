"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import debounce from "lodash/debounce";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { DropdownBlock, ResumeFormSection } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/shadcn/textarea";

import { useProfileStore } from "@/stores/profileStore";
import { Course, Education, Experience, Language, UserProfile } from "@/types/profile";

type FormValues = {
  personalInfo: {
    desiredPosition?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    country?: string;
    city?: string;
  };
  overview?: string;
  experience: Experience[];
  education: Education[];
  courses: Course[];
  programmingLanguages: { name: string }[];
  skills: { name: string }[];
  foreignLanguages: Language[];
  hobbies?: string;
};

export default function CVForm() {
  const { profile, setProfile } = useProfileStore();
  console.log("Profile1", profile);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      personalInfo: {
        desiredPosition: profile.personalInfo?.desiredPosition || "",
        firstName: profile.personalInfo?.firstName || "",
        lastName: profile.personalInfo?.lastName || "",
        email: profile.personalInfo?.email || "",
        phone: profile.personalInfo?.phone || "",
        country: profile.personalInfo?.country || "",
        city: profile.personalInfo?.city || "",
      },
      overview: profile.overview || "",
      experience: profile.experience?.length
        ? profile.experience
        : [{ position: "", company: "", startDate: "", endDate: "", description: "" }],
      education: profile.education?.length
        ? profile.education
        : [{ specialization: "", institution: "", startDate: "", endDate: "" }],
      courses: profile.courses?.length
        ? profile.courses
        : [{ specialization: "", institution: "", startDate: "", endDate: "", description: "" }],
      programmingLanguages: profile.programmingLanguages?.map((name) => ({ name })) || [{ name: "" }],
      skills: profile.skills?.map((name) => ({ name })) || [{ name: "" }],
      foreignLanguages: profile.foreignLanguages || [{ name: "", level: undefined }],
      hobbies: profile.hobbies || "",
    },
  });

  const debouncedSetProfile = useRef(
    debounce((data: Partial<UserProfile>) => {
      setProfile(data);
    }, 1000)
  ).current;

  useEffect(() => {
    const subscription = watch((value) => {
      const transformedData: Partial<UserProfile> = {
        personalInfo: { ...value.personalInfo },
        overview: value.overview,
        experience: value.experience?.filter((item) => item !== undefined),
        education: value.education?.filter((item) => item !== undefined),
        courses: value.courses?.filter((item) => item !== undefined),
        programmingLanguages: value.programmingLanguages
          ?.map((item) => item?.name)
          .filter((name): name is string => typeof name === "string"),
        skills: value.skills?.map((item) => item?.name).filter((name): name is string => typeof name === "string"),
        foreignLanguages: value.foreignLanguages?.filter((item) => item !== undefined),
        hobbies: value.hobbies,
      };
      debouncedSetProfile(transformedData);
      console.log("Profile2", profile);
    });

    return () => {
      subscription.unsubscribe();
      debouncedSetProfile.cancel();
    };
  }, [watch, debouncedSetProfile]);

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
  const toggleSection = (index: number) => setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));

  const experienceArray = useFieldArray({ control, name: "experience" });
  const educationArray = useFieldArray({ control, name: "education" });
  const coursesArray = useFieldArray({ control, name: "courses" });
  const progLangArray = useFieldArray({ control, name: "programmingLanguages" });
  const skillsArray = useFieldArray({ control, name: "skills" });
  const foreignLangArray = useFieldArray({ control, name: "foreignLanguages" });

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
    const transformedData: Partial<UserProfile> = {
      personalInfo: { ...data.personalInfo },
      overview: data.overview,
      experience: data.experience?.filter((item) => item !== undefined),
      education: data.education?.filter((item) => item !== undefined),
      courses: data.courses?.filter((item) => item !== undefined),
      programmingLanguages: data.programmingLanguages?.map((item) => item?.name).filter(Boolean),
      skills: data.skills?.map((item) => item?.name).filter(Boolean),
      foreignLanguages: data.foreignLanguages?.filter((item) => item !== undefined),
      hobbies: data.hobbies,
    };
    setProfile(transformedData);
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
              <Controller
                name="personalInfo.desiredPosition"
                control={control}
                rules={{ required: "Вкажіть бажану посаду" }}
                render={({ field }) => (
                  <DropdownBlock
                    label="Бажана посада *"
                    triggerText={
                      positionOptions.find((opt) => opt.value === field.value)?.label || positionOptions[0].label
                    }
                    options={positionOptions}
                    selectedLabel={positionOptions.find((opt) => opt.value === field.value)?.label}
                    onSelect={field.onChange}
                    className="mb-4 w-full"
                  />
                )}
              />
              {errors.personalInfo?.desiredPosition && (
                <p className="text-sm text-red-500">{errors.personalInfo.desiredPosition.message}</p>
              )}
              <div className="flex flex-wrap justify-between gap-4">
                <Input
                  label="Ім’я *"
                  {...register("personalInfo.firstName", { required: true })}
                  placeholder="Оксана"
                  className="w-91"
                />
                <Input
                  label="Прізвище *"
                  {...register("personalInfo.lastName", { required: true })}
                  placeholder="Антонюк"
                  className="w-91"
                />
                <Input
                  label="Email *"
                  {...register("personalInfo.email", { required: true })}
                  placeholder="Oksana@gmail.com"
                  type="email"
                  className="w-91"
                />
                <Input
                  label="Телефон"
                  {...register("personalInfo.phone")}
                  placeholder="+3806356897"
                  type="tel"
                  className="w-91"
                />
                <Input label="Країна" {...register("personalInfo.country")} placeholder="Україна" className="w-91" />
                <Input label="Місто" {...register("personalInfo.city")} placeholder="Львів" className="w-91" />
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
                  <Input label="Посада" {...register(`experience.${i}.position`)} />
                  <Input label="Компанія" {...register(`experience.${i}.company`)} />
                  <Input label="Початок роботи" type="date" {...register(`experience.${i}.startDate`)} />
                  <Input label="Завершення роботи" type="date" {...register(`experience.${i}.endDate`)} />
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
                    position: "",
                    company: "",
                    startDate: "",
                    endDate: "",
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
                  <Input label="Початок" type="date" {...register(`education.${i}.startDate`)} />
                  <Input label="Завершення" type="date" {...register(`education.${i}.endDate`)} />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  educationArray.append({
                    specialization: "",
                    institution: "",
                    startDate: "",
                    endDate: "",
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
                  <Input label="Початок" type="date" {...register(`courses.${i}.startDate`)} />
                  <Input label="Завершення" type="date" {...register(`courses.${i}.endDate`)} />
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
                    startDate: "",
                    endDate: "",
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
                <Input key={field.id} label="Мова" {...register(`programmingLanguages.${i}.name`)} />
              ))}
              <button type="button" onClick={() => progLangArray.append({ name: "" })} className="btn-secondary">
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
                <Input key={field.id} label="Навичка" {...register(`skills.${i}.name`)} />
              ))}
              <button type="button" onClick={() => skillsArray.append({ name: "" })} className="btn-secondary">
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
                  <Input label="Мова" {...register(`foreignLanguages.${i}.name`)} />
                  <Input label="Рівень" {...register(`foreignLanguages.${i}.level`)} />
                </div>
              ))}
              <button
                type="button"
                onClick={() => foreignLangArray.append({ name: "", level: undefined })}
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
                className={clsx(
                  "border-secondary-300 input-text min-h-[150px] w-full resize-none rounded-lg border px-8 pt-2.5 outline-none"
                )}
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
