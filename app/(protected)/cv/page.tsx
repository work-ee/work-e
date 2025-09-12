"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useRef, useState } from "react";

import debounce from "lodash/debounce";
import { Controller, FieldError, useFieldArray, useForm } from "react-hook-form";

import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { AIControlledTextarea, DropdownBlock, ResumeFormListItem, ResumeFormSection } from "@/components/ui";
import { Button, Input } from "@/components/ui";

import { calculateDuration } from "@/lib/utils/dateUtils";
import { FormValues, cvSchema } from "@/lib/validation/cvSchema";

import { updateUserProfile } from "@/actions/server/user";
import { useProfileStore } from "@/stores/profileStore";
import { UserProfile } from "@/types/profile";

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
  const { profile, setProfile, isProfileLoading, fetchCurrentUser } = useProfileStore();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
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
        : [{ specialization: "", institution: "", startDate: "", endDate: "", description: "" }],
      courses: profile.courses?.length
        ? profile.courses
        : [{ specialization: "", institution: "", startDate: "", endDate: "", description: "" }],
      programmingLanguages: profile.programmingLanguages?.map((name) => ({ name })) || [{ name: "" }],
      skills: profile.skills?.map((name) => ({ name })) || [{ name: "" }],
      foreignLanguages: profile.foreignLanguages?.length ? profile.foreignLanguages : [{ name: "", level: undefined }],
      hobbies: profile.hobbies || "",
    },
    resolver: zodResolver(cvSchema),
  });

  const [message, setMessage] = useState<string | null>(null);

  const debouncedSetProfile = useRef(
    debounce((data: Partial<UserProfile>) => {
      setProfile(data);
    }, 1000)
  ).current;

  useEffect(() => {
    const subscription = watch((value) => {
      const transformedData: Partial<UserProfile> = {
        ...profile,
        personalInfo: {
          ...profile.personalInfo,
          ...value.personalInfo,
        },
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
  }, [watch, debouncedSetProfile, profile]);

  const onSubmit = async (data: FormValues) => {
    setMessage(null);

    const userId = profile.personalInfo?.id;

    function mapProfileToBackend(profile: UserProfile) {
      return {
        desired_position: profile.personalInfo?.desiredPosition,
        first_name: profile.personalInfo?.firstName,
        last_name: profile.personalInfo?.lastName,
        email: profile.personalInfo?.email,
        phone: profile.personalInfo?.phone,
        country: profile.personalInfo?.country,
        city: profile.personalInfo?.city,
        overview: profile.overview,
        experience: profile.experience
          ?.map(
            (exp) =>
              `Position: ${exp.position || ""}, Company: ${exp.company || ""}, ` +
              `Start: ${exp.startDate || ""}, End: ${exp.endDate || ""}, Description: ${exp.description || ""}`
          )
          .join(" | "),
        education: profile.education
          ?.map(
            (edu) =>
              `Specialization: ${edu.specialization || ""}, Institution: ${edu.institution || ""}, ` +
              `Start: ${edu.startDate || ""}, End: ${edu.endDate || ""}, Description: ${edu.description || ""}`
          )
          .join(" | "),
        courses: profile.courses
          ?.map(
            (course) =>
              `Specialization: ${course.specialization || ""}, Institution: ${course.institution || ""}, ` +
              `Start: ${course.startDate || ""}, End: ${course.endDate || ""}, Description: ${course.description || ""}`
          )
          .join(" | "),
        programming_languages: profile.programmingLanguages?.join(", "),
        skills: profile.skills?.join(", "),
        foreign_languages: profile.foreignLanguages?.map((lang) => `${lang.name || ""}:${lang.level || ""}`).join(", "),
        hobbies: profile.hobbies,
      };
    }

    const transformedData: Partial<UserProfile> = {
      ...profile,
      personalInfo: {
        ...profile.personalInfo,
        ...data.personalInfo,
      },
      overview: data.overview,
      experience: data.experience,
      education: data.education,
      courses: data.courses,
      programmingLanguages: data.programmingLanguages
        ?.map((item) => item?.name)
        .filter((name): name is string => typeof name === "string"),
      skills: data.skills?.map((item) => item?.name).filter((name): name is string => typeof name === "string"),
      foreignLanguages: data.foreignLanguages,
      hobbies: data.hobbies,
    };

    setProfile(transformedData);
    const userPayload = mapProfileToBackend(profile);

    try {
      if (!userId) {
        throw new Error("User ID не знайдено. Дані профілю не завантажені.");
      }

      const result = await updateUserProfile(userPayload, Number(userId));

      if (result.success) {
        setMessage("✅ Дані збережено успішно");
        await fetchCurrentUser();
      } else {
        setMessage("❌ Помилка при збереженні");
      }
    } catch (err) {
      setMessage("❌ Сталася помилка");
      console.error(err);
    }
  };

  const handleCancel = () => {
    reset();
    setMessage("Форму скинуто");
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

  const levelLangOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "fluent", label: "Fluent" },
    { value: "native", label: "Native" },
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
                          {...register(`experience.${i}.position`)}
                        />
                        <Input
                          label="Компанія"
                          error={errors.experience?.[i]?.company?.message}
                          success={isFieldSuccess(watch(`experience.${i}.company`), errors.experience?.[i]?.company)}
                          {...register(`experience.${i}.company`)}
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
                          {...register(`experience.${i}.startDate`)}
                        />
                        <Input
                          label="Завершення роботи"
                          type="date"
                          iconRight={<SpriteSvg id="icon-schedule" className="h-5 w-5 fill-current" />}
                          error={errors.experience?.[i]?.endDate?.message}
                          success={isFieldSuccess(watch(`experience.${i}.endDate`), errors.experience?.[i]?.endDate)}
                          {...register(`experience.${i}.endDate`)}
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
                    <ResumeFormListItem
                      key={field.id}
                      title={`${specializationTitle?.trim() || "Освіта"} `}
                      subtitle={`${durationText || ""} `}
                      isOpen={isItemOpen}
                      onToggle={() => toggleItem(field.id)}
                    >
                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                          label="Спеціалізація"
                          error={errors.education?.[i]?.specialization?.message}
                          success={isFieldSuccess(
                            watch(`education.${i}.specialization`),
                            errors.education?.[i]?.specialization
                          )}
                          {...register(`education.${i}.specialization`)}
                        />
                        <Input
                          label="Заклад"
                          error={errors.education?.[i]?.institution?.message}
                          success={isFieldSuccess(
                            watch(`education.${i}.institution`),
                            errors.education?.[i]?.institution
                          )}
                          {...register(`education.${i}.institution`)}
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
                          success={isFieldSuccess(watch(`education.${i}.startDate`), errors.education?.[i]?.startDate)}
                          {...register(`education.${i}.startDate`)}
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
                          {...register(`education.${i}.endDate`)}
                        />
                      </div>
                      <AIControlledTextarea
                        value={watch(`education.${i}.description`) || ""}
                        onChange={(text) => setValue(`education.${i}.description`, text)}
                        description="Опис"
                      />
                    </ResumeFormListItem>
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
                    <ResumeFormListItem
                      key={field.id}
                      title={`${specializationTitle?.trim() || "Назва курсу"} `}
                      subtitle={`${durationText || ""} `}
                      isOpen={isItemOpen}
                      onToggle={() => toggleItem(field.id)}
                    >
                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                          label="Спеціалізація"
                          error={errors.courses?.[i]?.specialization?.message}
                          success={isFieldSuccess(
                            watch(`courses.${i}.specialization`),
                            errors.courses?.[i]?.specialization
                          )}
                          {...register(`courses.${i}.specialization`)}
                        />
                        <Input
                          label="Навчальний заклад"
                          error={errors.courses?.[i]?.institution?.message}
                          success={isFieldSuccess(watch(`courses.${i}.institution`), errors.courses?.[i]?.institution)}
                          {...register(`courses.${i}.institution`)}
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
                          {...register(`courses.${i}.startDate`)}
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
                          {...register(`courses.${i}.endDate`)}
                        />
                      </div>
                      <AIControlledTextarea
                        value={watch(`courses.${i}.description`) || ""}
                        onChange={(text) => setValue(`courses.${i}.description`, text)}
                        description="Опис"
                      />
                    </ResumeFormListItem>
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
                  <ResumeFormListItem
                    key={field.id}
                    title={`${progLangName?.trim() || "Назва мови програмування"} `}
                    subtitle={""}
                    isOpen={isItemOpen}
                    onToggle={() => toggleItem(field.id)}
                  >
                    <Input
                      label="Мова"
                      error={errors.programmingLanguages?.[i]?.name?.message}
                      success={isFieldSuccess(
                        watch(`programmingLanguages.${i}.name`),
                        errors.programmingLanguages?.[i]?.name
                      )}
                      {...register(`programmingLanguages.${i}.name`)}
                    />
                  </ResumeFormListItem>
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
                  <ResumeFormListItem
                    key={field.id}
                    title={`${skillName?.trim() || "Назва навички"} `}
                    subtitle={""}
                    isOpen={isItemOpen}
                    onToggle={() => toggleItem(field.id)}
                  >
                    <Input
                      label="Вкажіть навичку"
                      error={errors.skills?.[i]?.name?.message}
                      success={isFieldSuccess(watch(`skills.${i}.name`), errors.skills?.[i]?.name)}
                      {...register(`skills.${i}.name`)}
                    />
                  </ResumeFormListItem>
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
                  onClick={() => foreignLangArray.append({ name: "", level: "Beginner" })}
                >
                  <SpriteSvg id="icon-plus" className="fill-primary-300 mx-auto h-6 w-6" />
                </Button>
              }
            >
              {foreignLangArray.fields.map((field, i) => {
                const isItemOpen = openItems[field.id] !== undefined ? openItems[field.id] : true;
                const langName = watch(`foreignLanguages.${i}.name`);
                return (
                  <ResumeFormListItem
                    key={field.id}
                    title={`${langName?.trim() || "Назва іноземної мови"} `}
                    subtitle={""}
                    isOpen={isItemOpen}
                    onToggle={() => toggleItem(field.id)}
                  >
                    <Input
                      label="Вкажіть іноземну мову"
                      error={errors.foreignLanguages?.[i]?.name?.message}
                      success={isFieldSuccess(langName, errors.foreignLanguages?.[i]?.name)}
                      {...register(`foreignLanguages.${i}.name`)}
                    />
                    <Controller
                      name={`foreignLanguages.${i}.level`}
                      control={control}
                      render={({ field }) => (
                        <DropdownBlock
                          label="Оберіть рівень"
                          triggerText={levelLangOptions.find((opt) => opt.value === field.value)?.label || "Оберіть"}
                          options={levelLangOptions}
                          selectedLabel={levelLangOptions.find((opt) => opt.value === field.value)?.label}
                          onSelect={field.onChange}
                          className="mb-4 w-full"
                        />
                      )}
                    />
                  </ResumeFormListItem>
                );
              })}
            </ResumeFormSection>

            <ResumeFormSection
              title={sectionTitles[8]}
              index={8}
              isOpen={openSections[8]}
              toggleSection={toggleSection}
            >
              <AIControlledTextarea
                value={watch("hobbies") || ""}
                onChange={(text) => setValue("hobbies", text)}
                description="Вкажіть своє хобі"
              />
            </ResumeFormSection>

            <div className="flex w-full flex-col-reverse gap-4 md:flex-row md:gap-x-6">
              <Button
                variant="secondary"
                className="h-10 w-full items-center justify-center md:order-first md:h-[62px] md:w-[356px]"
                onClick={handleCancel}
              >
                Відмінити
              </Button>

              <Button
                type="submit"
                disabled={isProfileLoading}
                className="flex h-10 w-full items-center justify-center md:h-[62px] md:w-[356px]"
                onClick={() => {}}
              >
                {isProfileLoading ? "Завантаження..." : "Зберегти CV"}
              </Button>
            </div>
            {message && <p className="mt-2 text-sm">{message}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
