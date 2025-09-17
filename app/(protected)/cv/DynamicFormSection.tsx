import { FC } from "react";

import { FieldError, UseFormReturn } from "react-hook-form";

import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { AIControlledTextarea, Input, ResumeFormListItem } from "@/components/ui";

import { FormValues } from "@/lib/validation/cvSchema";

interface Props {
  register: UseFormReturn<FormValues>["register"];
  errors: UseFormReturn<FormValues>["formState"]["errors"];
  watch: UseFormReturn<FormValues>["watch"];
  setValue: UseFormReturn<FormValues>["setValue"];
  arr: { fields: { id: string }[] };
  openItems: Record<string, boolean>;
  toggleItem: (id: string) => void;
  calculateDuration: (start: string, end: string) => string | null;
  isLoading: boolean;
  handleGenerateClick: (
    type: string,
    data: {
      jobTitle: string;
      company: string;
      startDate: string;
      endDate: string;
      userInput: string;
    },
    callback: (generatedText: string) => void
  ) => void;
  error?: FieldError;
}

export const DynamicFormSection: FC<Props> = ({
  register,
  errors,
  watch,
  setValue,
  arr,
  openItems,
  toggleItem,
  calculateDuration,
  isLoading,
  handleGenerateClick,
  error,
}) => {
  const isFieldSuccess = (value: string | undefined, error: FieldError | undefined) => !error && !!value?.trim();

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {arr.fields.map((field, i) => {
        const isItemOpen = openItems[field.id] ?? true;
        const startDate = watch(`experience.${i}.startDate`);
        const endDate = watch(`experience.${i}.endDate`);
        const durationText = calculateDuration(startDate || "", endDate || "");
        const positionTitle = watch(`experience.${i}.position`);

        return (
          <ResumeFormListItem
            key={field.id}
            title={positionTitle?.trim() || "Назва посади і місце роботи"}
            subtitle={durationText || ""}
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
                success={isFieldSuccess(watch(`experience.${i}.startDate`), errors.experience?.[i]?.startDate)}
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
              canGenerate
              label="Опис досвіду"
              description="Опишіть свою головну роль та ключові навички в 2-4 реченнях, на основі чого AI зможе згенерувати Досвід"
              error={error?.message || null}
            />
          </ResumeFormListItem>
        );
      })}
    </div>
  );
};
