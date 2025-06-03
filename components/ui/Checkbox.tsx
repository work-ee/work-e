import { ChangeEvent, FC, useId } from "react";

import clsx from "clsx";

import { SvgIcon } from "@/components/ui/SvgIcon";

interface Props {
  name: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelMessage?: string;
  errorMessageText?: string;
  successMessageText?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: FC<Props> = ({
  name,
  checked = false,
  onChange,
  labelMessage,
  errorMessageText,
  successMessageText,
  disabled = false,
  className,
}) => {
  const id = useId();

  const hasError = Boolean(errorMessageText);
  const hasSuccess = !hasError && checked;

  const status = hasError ? "error" : hasSuccess ? "success" : "default";

  const borderClasses = {
    default:
      "border-primary-100 hover:border-primary-300 hover:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.4)] active:border-primary-500 active:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.6)]",
    success: "border-success-main shadow-none",
    error: "border-error-main shadow-none",
    disabled: "border-neutral-100 bg-neutral-100 cursor-not-allowed",
  };

  const baseWrapper = clsx("flex items-start gap-2", disabled && "opacity-60");

  const checkboxBase = clsx(
    "w-8 h-8 rounded-[8px] border bg-neutral-50 flex items-center justify-center transition-colors",
    disabled ? borderClasses.disabled : borderClasses[status]
  );

  const icon = (
    <SvgIcon
      id="icon-checkbox-check"
      className={clsx("w-4 h-4", {
        "fill-success-main": status === "success",
        "fill-error-main": status === "error",
        "fill-primary-300": status === "default",
      })}
    />
  );

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <label htmlFor={id} className={baseWrapper}>
        <span className={checkboxBase}>
          <input
            id={id}
            type="checkbox"
            name={name}
            onChange={onChange}
            checked={checked}
            disabled={disabled}
            className="sr-only"
          />
          {checked && icon}
        </span>
        {labelMessage && <span className="text-body select-none">{labelMessage}</span>}
      </label>
      {hasError && (
        <p className="text-micro2 text-error-main" role="alert">
          {errorMessageText}
        </p>
      )}
      {hasSuccess && successMessageText && (
        <p className="text-micro2 text-success-main" role="status">
          {successMessageText}
        </p>
      )}
    </div>
  );
};
