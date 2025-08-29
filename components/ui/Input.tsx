import React, { InputHTMLAttributes } from "react";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  name: string;
  error?: string;
  success?: boolean | string;
  iconLeft?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  iconRight?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  errorIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  successIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  name,
  error,
  success,
  iconLeft,
  iconRight,
  errorIcon,
  successIcon,
  disabled = false,
  required,
  className,
  type = "text",
  ...rest
}) => {
  const isSuccess = Boolean(success);
  const hasSuccessMessage = typeof success === "string" && success.trim().length > 0;
  const showErrorMessage = Boolean(error?.trim());
  const showSuccessMessage = isSuccess && hasSuccessMessage;

  const inputContainerClasses = clsx(
    "relative flex items-stretch rounded-[8px] overflow-hidden border",
    {
      "border-error-main text-error-main": error,
      "border-success-main text-success-main": isSuccess && hasSuccessMessage,
      "border-neutral-200 text-neutral-200": disabled,
      "border-secondary-900 text-secondary-900":
        (!isSuccess || (isSuccess && !hasSuccessMessage)) && !error && !disabled,
      "focus-within:border-secondary-500 focus-within:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.6)]": !disabled,
    },
    className
  );

  const inputClasses = clsx(
    "flex-grow py-[10px] px-[12px] rounded-[8px] outline-none bg-neutral-50 text-current",
    "placeholder:text-current",
    "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0",
    {
      "cursor-not-allowed": disabled,
      "rounded-r-none": iconLeft,
      "rounded-l-none": iconRight,
    },
    {
      "[&::-webkit-calendar-picker-indicator]:opacity-0": type === "date",
      "[&::-webkit-calendar-picker-indicator]:absolute": type === "date",
      "[&::-webkit-calendar-picker-indicator]:w-full": type === "date",
      "[&::-webkit-calendar-picker-indicator]:h-full": type === "date",
      "[&::-webkit-calendar-picker-indicator]:cursor-pointer": type === "date",
      "[&::-webkit-calendar-picker-indicator]:right-0": type === "date",
    }
  );

  const iconSectionClasses = clsx("flex items-center justify-center w-[44px] pointer-events-none z-10 border-l", {
    "border-error-main text-error-main bg-error-bg": error,
    "border-success-main text-success-main bg-success-bg": isSuccess && hasSuccessMessage,
    "border-neutral-200 text-neutral-200 bg-neutral-100": disabled,
    "border-secondary-900 text-secondary-900 bg-secondary-50":
      (!isSuccess || (isSuccess && !hasSuccessMessage)) && !error && !disabled,
  });

  const renderMessageIcon = (
    iconProp: React.ReactElement<React.SVGProps<SVGSVGElement>> | undefined,
    defaultId: string
  ) => {
    const messageIconClasses = clsx("h-4 w-4 mr-1", {
      "text-error-main": error,
      "text-success-main": isSuccess && hasSuccessMessage,
    });
    if (iconProp) {
      const originalClassName = iconProp.props.className;
      return React.cloneElement(iconProp, {
        className: clsx(originalClassName, messageIconClasses),
      });
    }
    return <SpriteSvg id={defaultId} className={messageIconClasses} />;
  };

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label-text mb-2 block font-medium text-neutral-800">
          {label}
          {isSuccess && !hasSuccessMessage && (
            <SpriteSvg id="icon-double-check" className="text-success-main ml-1 inline-block h-4 w-4" />
          )}
        </label>
      )}
      <div className={inputContainerClasses}>
        {iconLeft && <div className={clsx(iconSectionClasses, "rounded-l-[8px] border-r border-l-0")}>{iconLeft}</div>}
        <input
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          className={inputClasses}
          type={type}
          {...rest}
        />
        {iconRight && <div className={clsx(iconSectionClasses, "rounded-r-[8px] border-l")}>{iconRight}</div>}
      </div>
      {showErrorMessage && (
        <p className="text-error-main mt-1 flex items-center text-sm">
          {renderMessageIcon(errorIcon, "icon-danger")}
          {error}
        </p>
      )}
      {showSuccessMessage && (
        <p className="text-success-main mt-1 flex items-center text-sm">
          {renderMessageIcon(successIcon, "icon-check")}
          {success}
        </p>
      )}
    </div>
  );
};
