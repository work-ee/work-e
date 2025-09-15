import { FC } from "react";

import { Controller, FieldError, UseFormReturn } from "react-hook-form";

import { DropdownBlock, Input } from "@/components/ui";

import { POSITION_OPTIONS } from "@/lib/constants/position";
import { FormValues } from "@/lib/validation/cvSchema";

interface Props {
  control: UseFormReturn<FormValues>["control"];
  register: UseFormReturn<FormValues>["register"];
  errors: UseFormReturn<FormValues>["formState"]["errors"];
  watch: UseFormReturn<FormValues>["watch"];
}

export const PersonalInfoSection: FC<Props> = ({ control, register, errors, watch }) => {
  const isFieldSuccess = (value: string | undefined, error: FieldError | undefined) => !error && !!value?.trim();

  return (
    <div>
      <Controller
        name="personalInfo.desiredPosition"
        control={control}
        rules={{ required: "Вкажіть бажану посаду" }}
        render={({ field }) => (
          <DropdownBlock
            label="Бажана посада *"
            triggerText={POSITION_OPTIONS.find((opt) => opt.value === field.value)?.label || "Оберіть посаду"}
            options={POSITION_OPTIONS}
            selectedLabel={POSITION_OPTIONS.find((opt) => opt.value === field.value)?.label}
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
            pattern: { value: /^\S+@\S+$/i, message: "Некоректний формат email" },
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
    </div>
  );
};
