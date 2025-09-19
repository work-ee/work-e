"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";

import { Controller, FieldError, useFieldArray, useForm, useWatch } from "react-hook-form";

import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { AIControlledTextarea, DropdownBlock, ResumeFormListItem, ResumeFormSection } from "@/components/ui";
import { Button, Input } from "@/components/ui";

import { handleGenerateClick } from "@/lib/actions/handleGenerateClick";
import { LEVEL_LANG_OPTIONS } from "@/lib/constants/languageLevels";
import { calculateDuration } from "@/lib/utils/dateUtils";
import { FormValues, cvSchema } from "@/lib/validation/cvSchema";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

import { updateUserProfile } from "@/actions/server/user";
import { useProfileStore } from "@/stores/profileStore";
import { UserProfile } from "@/types/profile";

import { DynamicFormSection } from "./DynamicFormSection";
import { PersonalInfoSection } from "./PersonalInfoSection";

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
  const debouncedSetProfile = useDebouncedCallback(setProfile, 1000);

  const watchedFields = useWatch({ control });

  useEffect(() => {
    const transformedData: Partial<UserProfile> = {
      ...profile,
      personalInfo: {
        ...profile.personalInfo,
        ...watchedFields.personalInfo,
      },
      overview: watchedFields.overview,
      experience: watchedFields.experience?.filter((item) => item !== undefined),
      education: watchedFields.education?.filter((item) => item !== undefined),
      courses: watchedFields.courses?.filter((item) => item !== undefined),
      programmingLanguages: watchedFields.programmingLanguages
        ?.map((item) => item?.name)
        .filter((name): name is string => typeof name === "string"),
      skills: watchedFields.skills
        ?.map((item) => item?.name)
        .filter((name): name is string => typeof name === "string"),
      foreignLanguages: watchedFields.foreignLanguages?.filter((item) => item !== undefined),
      hobbies: watchedFields.hobbies,
    };

    debouncedSetProfile(transformedData);
  }, [watchedFields, debouncedSetProfile, profile]);

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
  // const [error, setError] = useState<Error | null>(null);

  const experienceArray = useFieldArray({ control, name: "experience" });
  const educationArray = useFieldArray({ control, name: "education" });
  const coursesArray = useFieldArray({ control, name: "courses" });
  const progLangArray = useFieldArray({ control, name: "programmingLanguages" });
  const skillsArray = useFieldArray({ control, name: "skills" });
  const foreignLangArray = useFieldArray({ control, name: "foreignLanguages" });

  const isFieldSuccess = (value: string | undefined, error: FieldError | undefined) => {
    return !error && !!value?.trim();
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
              <PersonalInfoSection control={control} register={register} errors={errors} watch={watch} />
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
                onGenerateClick={() => {
                  handleGenerateClick({
                    promptKey: "GENERATE_CV_SUMMARY_UK",
                    data: watch("overview") || "",
                    callback: (generatedText: string) => setValue("overview", generatedText),
                    setIsLoading,
                  });
                }}
                canGenerate={true}
                label="Огляд резюме"
                description="Опишіть свої головні досягнення, роль, мотивацію та ключові навички в 2-4  реченнях, на основі чого AI зможе згенерувати Огляд"
                // error={error ? error.message : null}
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
              <DynamicFormSection
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                arr={experienceArray}
                openItems={openItems}
                toggleItem={toggleItem}
                isLoading={isLoading}
              />
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
                          triggerText={LEVEL_LANG_OPTIONS.find((opt) => opt.value === field.value)?.label || "Оберіть"}
                          options={LEVEL_LANG_OPTIONS}
                          selectedLabel={LEVEL_LANG_OPTIONS.find((opt) => opt.value === field.value)?.label}
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
