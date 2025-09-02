"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import debounce from "lodash/debounce";
import { Controller, FieldError, useFieldArray, useForm } from "react-hook-form";

import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { AIControlledTextarea, DropdownBlock, ResumeFormListItem, ResumeFormSection } from "@/components/ui";
import { Button, Input } from "@/components/ui";

import { calculateDuration } from "@/lib/utils/dateUtils";

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
type OverviewData = string;

type ExperienceData = {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  userInput: string;
};
type PromptData = OverviewData | ExperienceData;

export default function CVForm() {
  const { profile, setProfile } = useProfileStore();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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
    });

    return () => {
      subscription.unsubscribe();
      debouncedSetProfile.cancel();
    };
  }, [watch, debouncedSetProfile]);

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

  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const toggleItem = (id: string) => setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

  const isFieldSuccess = (value: string | undefined, error: FieldError | undefined) => {
    return !error && !!value?.trim();
  };

  const handleGenerateClick = async (
    promptKey: string,
    data: PromptData,
    callback: (generatedText: string) => void
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptKey,
          data,
        }),
      });
      if (!response.ok) {
        throw new Error("Помилка при генерації тексту.");
      }
      const result = await response.json();
      callback(result.generatedText);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
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
                    triggerText={positionOptions.find((opt) => opt.value === field.value)?.label || "Оберіть посаду"}
                    options={positionOptions}
                    selectedLabel={positionOptions.find((opt) => opt.value === field.value)?.label}
                    onSelect={field.onChange}
                    className="mb-4 w-full"
                  />
                )}
              />
              <div className="flex flex-wrap justify-between gap-4">
                <Input
                  label="Ім’я *"
                  error={errors.personalInfo?.firstName?.message}
                  success={isFieldSuccess(watch("personalInfo.firstName"), errors.personalInfo?.firstName)}
                  {...register("personalInfo.firstName", { required: "Вкажіть ім'я" })}
                  placeholder="Оксана"
                  className="w-91"
                />
                <Input
                  label="Прізвище *"
                  error={errors.personalInfo?.lastName?.message}
                  success={isFieldSuccess(watch("personalInfo.lastName"), errors.personalInfo?.lastName)}
                  {...register("personalInfo.lastName", { required: "Вкажіть прізвище" })}
                  placeholder="Антонюк"
                  className="w-91"
                />
                <Input
                  label="Email *"
                  error={errors.personalInfo?.email?.message}
                  success={isFieldSuccess(watch("personalInfo.email"), errors.personalInfo?.email)}
                  {...register("personalInfo.email", {
                    required: "Вкажіть email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Некоректний формат email",
                    },
                  })}
                  placeholder="Oksana@gmail.com"
                  type="email"
                  className="w-91"
                />
                <Input
                  label="Телефон"
                  error={errors.personalInfo?.phone?.message}
                  success={isFieldSuccess(watch("personalInfo.phone"), errors.personalInfo?.phone)}
                  {...register("personalInfo.phone")}
                  placeholder="+3806356897"
                  type="tel"
                  className="w-91"
                />
                <Input
                  label="Країна"
                  error={errors.personalInfo?.country?.message}
                  success={isFieldSuccess(watch("personalInfo.country"), errors.personalInfo?.country)}
                  {...register("personalInfo.country")}
                  placeholder="Україна"
                  className="w-91"
                />
                <Input
                  label="Місто"
                  error={errors.personalInfo?.city?.message}
                  success={isFieldSuccess(watch("personalInfo.city"), errors.personalInfo?.city)}
                  {...register("personalInfo.city")}
                  placeholder="Львів"
                  className="w-91"
                />
              </div>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[1]}
              index={1}
              isOpen={openSections[1]}
              toggleSection={toggleSection}
            >
              <AIControlledTextarea
                value={watch("overview") || ""}
                onChange={(text) => setValue("overview", text)}
                isLoading={isLoading}
                onGenerateClick={() =>
                  handleGenerateClick("GENERATE_CV_SUMMARY_UK", watch("overview") || "", (generatedText) =>
                    setValue("overview", generatedText)
                  )
                }
                canGenerate={true}
                label="Огляд резюме"
                description="Опишіть свої головні досягнення, роль, мотивацію та ключові навички в 2-4  реченнях, на основі чого AI зможе згенерувати Огляд"
                error={error ? error.message : null}
              />
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[2]}
              index={2}
              isOpen={openSections[2]}
              toggleSection={toggleSection}
              actionButton={
                <Button
                  variant="secondary"
                  className="btn-sm mt-6"
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
                >
                  <SpriteSvg id="icon-plus" className="fill-primary-300 mx-auto h-6 w-6" />
                </Button>
              }
            >
              <div className="flex flex-wrap justify-between gap-4">
                {experienceArray.fields.map((field, i) => {
                  const isItemOpen = openItems[field.id] !== undefined ? openItems[field.id] : true;
                  const startDate = watch(`experience.${i}.startDate`);
                  const endDate = watch(`experience.${i}.endDate`);
                  const durationText = calculateDuration(startDate || "", endDate || "");
                  const positionTitle = watch(`experience.${i}.position`);

                  return (
                    <ResumeFormListItem
                      key={field.id}
                      title={`${positionTitle?.trim() || "Назва посади і місце роботи"} `}
                      subtitle={`${durationText || ""} `}
                      isOpen={isItemOpen}
                      onToggle={() => toggleItem(field.id)}
                    >
                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                          label="Посада"
                          error={errors.experience?.[i]?.position?.message}
                          success={isFieldSuccess(watch(`experience.${i}.position`), errors.experience?.[i]?.position)}
                          {...register(`experience.${i}.position`, { required: "Вкажіть посаду" })}
                        />
                        <Input
                          label="Компанія"
                          error={errors.experience?.[i]?.company?.message}
                          success={isFieldSuccess(watch(`experience.${i}.company`), errors.experience?.[i]?.company)}
                          {...register(`experience.${i}.company`, { required: "Вкажіть компанію" })}
                        />
                        <Input
                          label="Початок роботи"
                          type="date"
                          error={errors.experience?.[i]?.startDate?.message}
                          success={isFieldSuccess(
                            watch(`experience.${i}.startDate`),
                            errors.experience?.[i]?.startDate
                          )}
                          iconRight={<SpriteSvg id="icon-schedule" className="h-5 w-5 fill-current" />}
                          {...register(`experience.${i}.startDate`, { required: "Вкажіть дату початку" })}
                        />
                        <Input
                          label="Завершення роботи"
                          type="date"
                          iconRight={<SpriteSvg id="icon-schedule" className="h-5 w-5 fill-current" />}
                          error={errors.experience?.[i]?.endDate?.message}
                          success={isFieldSuccess(watch(`experience.${i}.endDate`), errors.experience?.[i]?.endDate)}
                          {...register(`experience.${i}.endDate`, { required: "Вкажіть дату завершення" })}
                        />
                      </div>
                      <AIControlledTextarea
                        value={watch(`experience.${i}.description`) || ""}
                        onChange={(text) => setValue(`experience.${i}.description`, text)}
                        isLoading={isLoading}
                        onGenerateClick={() => {
                          const dataToGenerate = {
                            jobTitle: watch(`experience.${i}.position`) || "",
                            company: watch(`experience.${i}.company`) || "",
                            startDate: watch(`experience.${i}.startDate`) || "",
                            endDate: watch(`experience.${i}.endDate`) || "",
                            userInput: watch(`experience.${i}.description`) || "",
                          };
                          handleGenerateClick("GENERATE_EXPERIENCE_DESCRIPTION_UK", dataToGenerate, (generatedText) =>
                            setValue(`experience.${i}.description`, generatedText)
                          );
                        }}
                        canGenerate={true}
                        label="Опис досвіду"
                        description="Опишіть свою головну роль та ключові навички в 2-4 реченнях, на основі чого AI зможе згенерувати Досвід"
                        error={error ? error.message : null}
                      />
                    </ResumeFormListItem>
                  );
                })}
              </div>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[3]}
              index={3}
              isOpen={openSections[3]}
              toggleSection={toggleSection}
              actionButton={
                <Button
                  variant="secondary"
                  className="btn-sm mt-6"
                  type="button"
                  onClick={() =>
                    educationArray.append({
                      specialization: "",
                      institution: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                >
                  <SpriteSvg id="icon-plus" className="fill-primary-300 mx-auto h-6 w-6" />
                </Button>
              }
            >
              <div className="flex flex-wrap justify-between gap-4">
                {educationArray.fields.map((field, i) => {
                  const isItemOpen = openItems[field.id] !== undefined ? openItems[field.id] : true;
                  const startDate = watch(`education.${i}.startDate`);
                  const endDate = watch(`education.${i}.endDate`);
                  const durationText = calculateDuration(startDate || "", endDate || "");
                  const specializationTitle = watch(`education.${i}.specialization`);

                  return (
                    <div key={field.id} className="mb-4 w-full border-b pb-4">
                      <div
                        className="flex cursor-pointer items-center justify-between"
                        onClick={() => toggleItem(field.id)}
                      >
                        <div className="flex-1">
                          <p className="text-body text-secondary-900 mb-1 w-full">
                            {specializationTitle?.trim() || "Назва освіти і заклад"}
                          </p>
                          <p className="text-micro text-secondary-900 mb-4 w-full">
                            Роки {durationText && `: ${durationText}`}
                          </p>
                        </div>
                        <Button className="h-6 w-6 flex-shrink-0">
                          <SpriteSvg
                            id={isItemOpen ? "icon-chevron-up" : "icon-chevron-down"}
                            className="h-6 w-6 fill-neutral-700"
                          />
                        </Button>
                      </div>

                      <div
                        className={clsx("overflow-hidden transition-all duration-300 ease-in-out", {
                          "max-h-0 opacity-0": !isItemOpen,
                          "max-h-full opacity-100": isItemOpen,
                        })}
                      >
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                          <Input
                            label="Спеціалізація"
                            error={errors.education?.[i]?.specialization?.message}
                            success={isFieldSuccess(
                              watch(`education.${i}.specialization`),
                              errors.education?.[i]?.specialization
                            )}
                            {...register(`education.${i}.specialization`, { required: "Вкажіть спеціалізацію" })}
                          />
                          <Input
                            label="Заклад"
                            error={errors.education?.[i]?.institution?.message}
                            success={isFieldSuccess(
                              watch(`education.${i}.institution`),
                              errors.education?.[i]?.institution
                            )}
                            {...register(`education.${i}.institution`, { required: "Вкажіть заклад" })}
                          />
                          <Input
                            label="Початок освіти"
                            type="date"
                            iconRight={
                              <svg className="h-5 w-5 fill-current">
                                <use href="/sprite.svg#icon-schedule"></use>
                              </svg>
                            }
                            error={errors.education?.[i]?.startDate?.message}
                            success={isFieldSuccess(
                              watch(`education.${i}.startDate`),
                              errors.education?.[i]?.startDate
                            )}
                            {...register(`education.${i}.startDate`, { required: "Вкажіть дату початку" })}
                          />
                          <Input
                            label="Завершення освіти"
                            type="date"
                            iconRight={
                              <svg className="h-5 w-5 fill-current">
                                <use href="/sprite.svg#icon-schedule"></use>
                              </svg>
                            }
                            error={errors.education?.[i]?.endDate?.message}
                            success={isFieldSuccess(watch(`education.${i}.endDate`), errors.education?.[i]?.endDate)}
                            {...register(`education.${i}.endDate`, { required: "Вкажіть дату завершення" })}
                          />
                        </div>
                        <AIControlledTextarea value="" onChange={() => {}} description="Опис" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[4]}
              index={4}
              isOpen={openSections[4]}
              toggleSection={toggleSection}
              actionButton={
                <Button
                  variant="secondary"
                  className="btn-sm mt-6"
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
                >
                  <SpriteSvg id="icon-plus" className="fill-primary-300 mx-auto h-6 w-6" />
                </Button>
              }
            >
              <div className="flex flex-wrap justify-between gap-4">
                {coursesArray.fields.map((field, i) => {
                  const isItemOpen = openItems[field.id] !== undefined ? openItems[field.id] : true;
                  const startDate = watch(`courses.${i}.startDate`);
                  const endDate = watch(`courses.${i}.endDate`);
                  const durationText = calculateDuration(startDate || "", endDate || "");
                  const specializationTitle = watch(`courses.${i}.specialization`);

                  return (
                    <div key={field.id} className="mb-4 w-full pb-4">
                      <div
                        className="flex cursor-pointer items-center justify-between"
                        onClick={() => toggleItem(field.id)}
                      >
                        <div className="flex-1">
                          <p className="text-body text-secondary-900 mb-1 w-full">
                            {specializationTitle?.trim() || "Назва курсу"}
                          </p>
                          <p className="text-micro text-secondary-900 mb-4 w-full">
                            Роки {durationText && `: ${durationText}`}
                          </p>
                        </div>
                        <button className="h-6 w-6 flex-shrink-0" type="button">
                          <SpriteSvg
                            id={isItemOpen ? "icon-arrow" : "icon-arrow-up"}
                            className="stroke-secondary-900 h-6 w-6 fill-neutral-50"
                          />
                        </button>
                      </div>

                      <div
                        className={clsx("overflow-hidden transition-all duration-300 ease-in-out", {
                          "max-h-0 opacity-0": !isItemOpen,
                          "max-h-full opacity-100": isItemOpen,
                        })}
                      >
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                          <Input
                            label="Спеціалізація"
                            error={errors.courses?.[i]?.specialization?.message}
                            success={isFieldSuccess(
                              watch(`courses.${i}.specialization`),
                              errors.courses?.[i]?.specialization
                            )}
                            {...register(`courses.${i}.specialization`, { required: "Вкажіть спеціалізацію" })}
                          />
                          <Input
                            label="Навчальний заклад"
                            error={errors.courses?.[i]?.institution?.message}
                            success={isFieldSuccess(
                              watch(`courses.${i}.institution`),
                              errors.courses?.[i]?.institution
                            )}
                            {...register(`courses.${i}.institution`, { required: "Вкажіть заклад" })}
                          />
                          <Input
                            label="Початок курсів"
                            type="date"
                            iconRight={
                              <svg className="h-5 w-5 fill-current">
                                <use href="/sprite.svg#icon-schedule"></use>
                              </svg>
                            }
                            error={errors.courses?.[i]?.startDate?.message}
                            success={isFieldSuccess(watch(`courses.${i}.startDate`), errors.courses?.[i]?.startDate)}
                            {...register(`courses.${i}.startDate`, { required: "Вкажіть дату початку" })}
                          />
                          <Input
                            label="Завершення курсів"
                            type="date"
                            iconRight={
                              <svg className="h-5 w-5 fill-current">
                                <use href="/sprite.svg#icon-schedule"></use>
                              </svg>
                            }
                            error={errors.courses?.[i]?.endDate?.message}
                            success={isFieldSuccess(watch(`courses.${i}.endDate`), errors.courses?.[i]?.endDate)}
                            {...register(`courses.${i}.endDate`, { required: "Вкажіть дату завершення" })}
                          />
                        </div>
                        <AIControlledTextarea value="" onChange={() => {}} description="Опис" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[5]}
              index={5}
              isOpen={openSections[5]}
              toggleSection={toggleSection}
              actionButton={
                <Button
                  variant="secondary"
                  className="btn-sm mt-6"
                  type="button"
                  onClick={() =>
                    progLangArray.append({
                      name: "",
                    })
                  }
                >
                  <SpriteSvg id="icon-plus" className="fill-primary-300 mx-auto h-6 w-6" />
                </Button>
              }
            >
              {progLangArray.fields.map((field, i) => {
                const isItemOpen = openItems[field.id] !== undefined ? openItems[field.id] : true;
                const progLangName = watch(`programmingLanguages.${i}.name`);

                return (
                  <div key={field.id} className="mb-4 w-full border-b pb-4">
                    <div
                      className="flex cursor-pointer items-center justify-between"
                      onClick={() => toggleItem(field.id)}
                    >
                      <p className="text-body text-secondary-900 mb-1 w-full">
                        {progLangName?.trim() || "Назва мови програмування"}
                      </p>
                      <Button className="h-6 w-6 flex-shrink-0">
                        <SpriteSvg
                          id={isItemOpen ? "icon-chevron-up" : "icon-chevron-down"}
                          className="h-6 w-6 fill-neutral-700"
                        />
                      </Button>
                    </div>

                    <div
                      className={clsx("overflow-hidden transition-all duration-300 ease-in-out", {
                        "max-h-0 opacity-0": !isItemOpen,
                        "max-h-full opacity-100": isItemOpen,
                      })}
                    >
                      <Input
                        key={field.id}
                        label="Мова"
                        error={errors.programmingLanguages?.[i]?.name?.message}
                        success={isFieldSuccess(
                          watch(`programmingLanguages.${i}.name`),
                          errors.programmingLanguages?.[i]?.name
                        )}
                        {...register(`programmingLanguages.${i}.name`, { required: "Вкажіть мову програмування" })}
                      />
                    </div>
                  </div>
                );
              })}
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[6]}
              index={6}
              isOpen={openSections[6]}
              toggleSection={toggleSection}
              actionButton={
                <Button
                  variant="secondary"
                  className="btn-sm mt-6"
                  type="button"
                  onClick={() =>
                    skillsArray.append({
                      name: "",
                    })
                  }
                >
                  <SpriteSvg id="icon-plus" className="fill-primary-300 mx-auto h-6 w-6" />
                </Button>
              }
            >
              {skillsArray.fields.map((field, i) => {
                const isItemOpen = openItems[field.id] !== undefined ? openItems[field.id] : true;
                const skillName = watch(`skills.${i}.name`);

                return (
                  <div key={field.id} className="mb-4 w-full border-b pb-4">
                    <div
                      className="flex cursor-pointer items-center justify-between"
                      onClick={() => toggleItem(field.id)}
                    >
                      <p className="text-body text-secondary-900 mb-1 w-full">{skillName?.trim() || "Назва навички"}</p>
                      <Button className="h-6 w-6 flex-shrink-0">
                        <SpriteSvg
                          id={isItemOpen ? "icon-chevron-up" : "icon-chevron-down"}
                          className="h-6 w-6 fill-neutral-700"
                        />
                      </Button>
                    </div>

                    <div
                      className={clsx("overflow-hidden transition-all duration-300 ease-in-out", {
                        "max-h-0 opacity-0": !isItemOpen,
                        "max-h-full opacity-100": isItemOpen,
                      })}
                    >
                      <Input
                        key={field.id}
                        label="Вкажіть навичку"
                        error={errors.skills?.[i]?.name?.message}
                        success={isFieldSuccess(watch(`skills.${i}.name`), errors.skills?.[i]?.name)}
                        {...register(`skills.${i}.name`, { required: "Вкажіть навичку" })}
                      />
                    </div>
                  </div>
                );
              })}
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[7]}
              index={7}
              isOpen={openSections[7]}
              toggleSection={toggleSection}
              actionButton={
                <Button
                  variant="secondary"
                  className="btn-sm mt-6"
                  type="button"
                  onClick={() => foreignLangArray.append({ name: "", level: undefined })}
                >
                  <SpriteSvg id="icon-plus" className="fill-primary-300 mx-auto h-6 w-6" />
                </Button>
              }
            >
              {foreignLangArray.fields.map((field, i) => {
                const isItemOpen = openItems[field.id] !== undefined ? openItems[field.id] : true;
                const langName = watch(`foreignLanguages.${i}.name`);

                return (
                  <div key={field.id} className="mb-4 w-full border-b pb-4">
                    <div
                      className="flex cursor-pointer items-center justify-between"
                      onClick={() => toggleItem(field.id)}
                    >
                      <p className="text-body text-secondary-900 mb-1 w-full">
                        {langName?.trim() || "Назва іноземної мови"}
                      </p>
                      <Button className="h-6 w-6 flex-shrink-0">
                        <SpriteSvg
                          id={isItemOpen ? "icon-chevron-up" : "icon-chevron-down"}
                          className="h-6 w-6 fill-neutral-700"
                        />
                      </Button>
                    </div>

                    <div
                      className={clsx("overflow-hidden transition-all duration-300 ease-in-out", {
                        "max-h-0 opacity-0": !isItemOpen,
                        "max-h-full opacity-100": isItemOpen,
                      })}
                    >
                      <Input
                        label="Вкажіть іноземну мову"
                        error={errors.foreignLanguages?.[i]?.name?.message}
                        success={isFieldSuccess(
                          watch(`foreignLanguages.${i}.name`),
                          errors.foreignLanguages?.[i]?.name
                        )}
                        {...register(`foreignLanguages.${i}.name`, { required: "Вкажіть іноземну мову" })}
                      />
                      <Input
                        label="Оберіть рівень"
                        error={errors.foreignLanguages?.[i]?.level?.message}
                        success={isFieldSuccess(
                          watch(`foreignLanguages.${i}.level`),
                          errors.foreignLanguages?.[i]?.level
                        )}
                        {...register(`foreignLanguages.${i}.level`, { required: "Вкажіть рівень" })}
                      />
                    </div>
                  </div>
                );
              })}
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[8]}
              index={8}
              isOpen={openSections[8]}
              toggleSection={toggleSection}
            >
              <AIControlledTextarea value="" onChange={() => {}} description="Вкажіть своє хобі" />
            </ResumeFormSection>

            <div className="flex w-full flex-col-reverse gap-4 md:flex-row md:gap-x-6">
              <Button
                variant="secondary"
                className="h-10 w-full items-center justify-center md:order-first md:h-[62px] md:w-[356px]"
                onClick={() => {}}
              >
                Відмінити
              </Button>

              <Button
                className="flex h-10 w-full items-center justify-center md:h-[62px] md:w-[356px]"
                onClick={() => {}}
              >
                Зберегти CV
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
