import React from "react";

import clsx from "clsx";

export type Variant = "main" | "secondary";
type Props = {
  children: React.ReactNode;
  variant?: Variant;
  icon?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  children,
  variant = "main",
  icon = false,
  disabled = false,
  onClick,
  type = "button",
}: Props) => {
  const base =
    "group rounded-[8px] py-4 px-8 font-bold inline-flex items-center gap-2 border transition-colors duration-200 btn";

  const variants = {
    main: clsx(
      "text-neutral-50 border",
      "bg-prymary-500 border-prymary-500",
      "hover:bg-prymary-600 hover:border-prymary-600",
      "active:bg-prymary-800 active:border-prymary-800",
      "disabled:bg-neutral-200 disabled:border-neutral-200 disabled:text-neutral-50"
    ),
    secondary: clsx(
      "bg-neutral-50 border",
      "text-prymary-300 border-prymary-300",
      "hover:text-prymary-700 hover:border-prymary-700",
      "active:text-prymary-900 active:border-prymary-900",
      "disabled:text-neutral-50 disabled:border-neutral-200"
    ),
  };

  const fillClasses = {
    main: {
      default: "fill-prymary-500",
      hover: "group-hover:fill-prymary-600",
      active: "group-active:fill-prymary-800",
      disabled: "group-disabled:fill-neutral-200",
    },
    secondary: {
      default: "fill-neutral-50",
      hover: "group-hover:fill-neutral-50",
      active: "group-active:fill-neutral-50",
      disabled: "group-disabled:fill-neutral-50",
    },
  };

  const Icon = () => (
    <svg
      className={clsx(
        "h-5 w-5 stroke-current",
        fillClasses[variant].default,
        fillClasses[variant].hover,
        fillClasses[variant].active,
        fillClasses[variant].disabled
      )}
      aria-hidden="true"
    >
      <use xlinkHref="/sprite.svg#icon-off" />
    </svg>
  );

  return (
    <button
      type={type}
      className={clsx(base, variants[variant])}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      aria-label={typeof children === "string" ? children : "button"}
    >
      {icon && <Icon />}
      {children}
    </button>
  );
};
