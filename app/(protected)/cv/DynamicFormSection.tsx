import { FC, useState } from "react";

import { FieldError, FieldPath, UseFormReturn } from "react-hook-form";

import { SpriteSvg } from "@/components/icons/SpriteSvg";
import { AIControlledTextarea, Input, ResumeFormListItem } from "@/components/ui";

import { handleGenerateClick } from "@/lib/actions/handleGenerateClick";
import { sectionsConfig } from "@/lib/constants/sectionsConfig";
import { calculateDuration } from "@/lib/utils/dateUtils";
import { FormValues } from "@/lib/validations/cvSchema";

interface Props {
  register: UseFormReturn<FormValues>["register"];
  errors: UseFormReturn<FormValues>["formState"]["errors"];
  watch: UseFormReturn<FormValues>["watch"];
  setValue: UseFormReturn<FormValues>["setValue"];
  arr: { fields: { id: string }[] };
  openItems: Record<string, boolean>;
  toggleItem: (id: string) => void;
  isLoading: boolean;
  name: "experience" | "education" | "courses";
}

export const DynamicFormSection: FC<Props> = ({
  register,
  errors,
  watch,
  setValue,
  arr,
  openItems,
  toggleItem,
  name,
}) => {
  const [loading, setLoading] = useState(false);
  const config = sectionsConfig[name];

  if (!config) {
    console.error(`Configuration for section "${name}" not found.`);
    return null;
  }

  const isFieldSuccess = (value: string | undefined, error?: FieldError) => !error && !!value?.trim();

  const filterNonNullable = <T,>(item: T): item is NonNullable<T> => item !== undefined;

  const sectionErrors = Object.values(errors?.[name] ?? {}).filter(filterNonNullable) as Record<string, FieldError>[];

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {arr.fields.map((field, i) => {
        const isItemOpen = openItems[field.id] ?? true;

        const startDate = watch(`${name}.${i}.startDate` as FieldPath<FormValues>) || "";
        const endDate = watch(`${name}.${i}.endDate` as FieldPath<FormValues>) || "";
        const durationText = calculateDuration(String(startDate), String(endDate));

        const titleField = watch(`${name}.${i}.${config.titleField}` as FieldPath<FormValues>);
        const titleText = String(titleField || config.defaultTitle);

        const currentErrors = sectionErrors[i] ?? {};

        return (
          <ResumeFormListItem
            key={field.id}
            title={titleText}
            subtitle={durationText || ""}
            isOpen={isItemOpen}
            onToggle={() => toggleItem(field.id)}
          >
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {config.fields.map((fieldConfig) => (
                <Input
                  key={fieldConfig.name}
                  label={fieldConfig.label}
                  type={fieldConfig.type}
                  iconRight={
                    fieldConfig.type === "date" ? (
                      <SpriteSvg id="icon-schedule" className="h-5 w-5 fill-current" />
                    ) : undefined
                  }
                  error={currentErrors?.[fieldConfig.name]?.message}
                  success={isFieldSuccess(
                    String(watch(`${name}.${i}.${fieldConfig.name}` as FieldPath<FormValues>)),
                    currentErrors?.[fieldConfig.name]
                  )}
                  {...register(`${name}.${i}.${fieldConfig.name}` as FieldPath<FormValues>)}
                />
              ))}
            </div>

            <AIControlledTextarea
              value={String(watch(`${name}.${i}.description` as FieldPath<FormValues>) || "")}
              onChange={(text) => setValue(`${name}.${i}.description` as FieldPath<FormValues>, text)}
              isLoading={loading}
              onGenerateClick={() => {
                if (!config.description.promptKey) return;

                handleGenerateClick({
                  promptKey: config.description.promptKey,
                  data: {
                    jobTitle: String(watch(`${name}.${i}.position` as FieldPath<FormValues>) || ""),
                    company: String(watch(`${name}.${i}.company` as FieldPath<FormValues>) || ""),
                    startDate: String(watch(`${name}.${i}.startDate` as FieldPath<FormValues>) || ""),
                    endDate: String(watch(`${name}.${i}.endDate` as FieldPath<FormValues>) || ""),
                    userInput: String(watch(`${name}.${i}.description` as FieldPath<FormValues>) || ""),
                  },
                  callback: (generatedText) =>
                    setValue(`${name}.${i}.description` as FieldPath<FormValues>, generatedText),
                  setIsLoading: setLoading,
                });
              }}
              canGenerate={!!config.description.promptKey}
              label={config.description.label}
              description={config.description.description}
              error={currentErrors?.description?.message}
            />
          </ResumeFormListItem>
        );
      })}
    </div>
  );
};
