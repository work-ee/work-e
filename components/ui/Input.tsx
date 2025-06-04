import React, { InputHTMLAttributes } from "react";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  success?: string;
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
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  success,
  iconLeft,
  iconRight,
  errorIcon,
  successIcon,
  disabled = false,
  required,
  className,
  ...rest
}) => {
  const hasIcons = iconLeft || iconRight;
  const isUnlabeled = !label;
  const showPlaceholder = isUnlabeled && placeholder;
  const showErrorMessage = Boolean(error?.trim());
  const showSuccessMessage = !showErrorMessage && Boolean(success?.trim());
  let contentColorClass: string;

  if (error) {
    contentColorClass = "text-error-main";
  } else if (success) {
    contentColorClass = "text-success-main";
  } else if (disabled) {
    contentColorClass = "text-neutral-200";
  } else if (isUnlabeled) {
    contentColorClass = value !== "" ? "text-secondary-200" : "text-secondary-100";
  } else {
    contentColorClass = "text-secondary-100";
  }

  let borderColorClass: string;

  if (error) {
    borderColorClass = "border-error-main";
  } else if (success) {
    borderColorClass = "border-success-main";
  } else if (disabled) {
    borderColorClass = "border-neutral-200";
  } else if (isUnlabeled) {
    borderColorClass = value !== "" ? "border-secondary-200" : "border-secondary-100 focus:border-secondary-500";
  } else {
    borderColorClass = "border-secondary-100";
  }

  let iconBgClass: string;

  if (error) {
    iconBgClass = "bg-error-bg";
  } else if (success) {
    iconBgClass = "bg-success-bg";
  } else if (disabled) {
    iconBgClass = "bg-neutral-100";
  } else {
    iconBgClass = "bg-secondary-50";
  }

  const unlabeledInputShadowClass =
    isUnlabeled && !disabled && !error && !success ? "input-unlabeled-shadow-styles" : "";

  const inputContainerClasses = clsx(
    "relative flex items-stretch rounded-[8px] overflow-hidden border",
    borderColorClass,
    contentColorClass,
    unlabeledInputShadowClass,
    className
  );

  const inputClasses = clsx(
    "appearance-none outline-none flex-grow py-[10px] px-[32px] leading-tight",
    "bg-neutral-50",
    "input-text",
    "text-current",
    "placeholder-current",
    "disabled:bg-neutral-50 disabled:cursor-not-allowed",
    {
      "rounded-r-[8px]": iconLeft,
      "rounded-l-[8px]": iconRight,
      "rounded-[8px]": !hasIcons,
    }
  );

  const iconSectionClasses = clsx(
    "flex items-center justify-center w-[44px] pointer-events-none z-10",
    iconBgClass,
    borderColorClass,
    contentColorClass,
    {
      "border-l": iconRight,
      "border-r": iconLeft,
    }
  );

  const renderMessageIcon = (
    iconProp: React.ReactElement<React.SVGProps<SVGSVGElement>> | undefined,
    defaultId: string
  ) => {
    const messageIconClasses = clsx("h-4 w-4 mr-1", {
      "text-error-main": error,
      "text-success-main": success,
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
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-2 label-text text-neutral-800">
          {label}
        </label>
      )}
      <div className={inputContainerClasses} style={error ? { boxShadow: "0px 0px 8px 0px #DD111166" } : undefined}>
        {iconLeft && <div className={clsx(iconSectionClasses, "rounded-l-[8px]")}>{iconLeft}</div>}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          {...(showPlaceholder && { placeholder })}
          className={inputClasses}
          disabled={disabled}
          required={required}
          {...rest}
        />
        {iconRight && <div className={clsx(iconSectionClasses, "rounded-r-[8px]")}>{iconRight}</div>}
      </div>

      {showErrorMessage && (
        <p className="text-error-main text-micro mt-1 flex items-center">
          {renderMessageIcon(errorIcon, "icon-danger")}
          {error}
        </p>
      )}

      {showSuccessMessage && (
        <p className="text-success-main text-micro mt-1 flex items-center">
          {renderMessageIcon(successIcon, "icon-check")}
          {success}
        </p>
      )}
    </div>
  );
};
