import React from "react";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";

export type Variant = "main" | "secondary";
type Props = {
  children: React.ReactNode;
  variant?: Variant;
  icon?: boolean;
  iconAI?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export const Button = ({
  children,
  variant = "main",
  icon = false,
  iconAI = false,
  disabled = false,
  onClick,
  type = "submit",
  className,
}: Props) => {
  const base =
    "group rounded-[8px] py-3.5 px-7.5 btn inline-flex items-center gap-2 border-2 transition-colors duration-200 cursor-pointer ";

  const variants = {
    main: clsx(
      "text-neutral-50",
      "bg-primary-500 border-primary-500",
      !disabled && "hover:bg-primary-600 hover:border-primary-600 hover:shadow-[4px_4px_10px_0px_rgba(75,116,226,0.4)]",
      "active:bg-primary-800 active:border-primary-800 active:shadow-[4px_4px_10px_0px_rgba(4,23,75,0.4)]",
      "disabled:bg-neutral-200 disabled:border-neutral-200 disabled:text-neutral-50 disabled:cursor-not-allowed"
    ),
    secondary: clsx(
      "bg-neutral-50 border-primary-300 text-primary-500",
      !disabled &&
        "hover:text-primary-700 hover:border-primary-700 hover:shadow-[4px_4px_10px_0px_rgba(80,149,192,0.4)]",
      "active:text-primary-900 active:border-primary-900 active:shadow-[4px_4px_10px_0px_rgba(39,114,160,0.4)]",
      "disabled:text-neutral-300 disabled:border-neutral-200 disabled:cursor-not-allowed"
    ),
  };

  const fillClasses = {
    main: {
      default: "fill-primary-500",
      hover: !disabled ? "group-hover:fill-primary-600" : "",
      active: "group-active:fill-primary-800",
      disabled: "group-disabled:fill-neutral-200",
    },
    secondary: {
      default: "fill-neutral-50",
      hover: !disabled ? "group-hover:fill-neutral-50" : "",
      active: "group-active:fill-neutral-50",
      disabled: "group-disabled:fill-neutral-50",
    },
  };

  return (
    <button
      type={type}
      className={clsx(base, variants[variant], className)}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      aria-label={typeof children === "string" ? children : "button"}
    >
      {icon && (
        <SpriteSvg
          id="icon-off"
          className={clsx(
            "h-5 w-5 stroke-current",
            fillClasses[variant].default,
            fillClasses[variant].hover,
            fillClasses[variant].active,
            fillClasses[variant].disabled
          )}
        />
      )}
      {iconAI && (
        <SpriteSvg
          id="icon-AI"
          className={clsx(
            "h-5 w-5 stroke-current",
            fillClasses[variant].default,
            fillClasses[variant].hover,
            fillClasses[variant].active,
            fillClasses[variant].disabled
          )}
        />
      )}
      {children}
    </button>
  );
};
