import { FC } from "react";

import { clsx } from "clsx";

interface Props {
  name: string;
  compId?: string;
  isChecked?: boolean;
  disabled?: boolean;
  onChange: () => void;
}

export const Toggle: FC<Props> = ({ name, compId = "toggleId", isChecked = false, disabled = false, onChange }) => {
  return (
    <label
      htmlFor={compId}
      className={clsx("relative inline-block w-[50px] h-[26px]", disabled ? "cursor-not-allowed" : "cursor-pointer")}
    >
      <input
        id={compId}
        name={name}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only peer"
      />

      <span
        className={clsx(
          "absolute top-0 left-0 right-0 h-[26px] rounded-[16px] border transition-colors duration-500",
          disabled
            ? "border-neutral-200 peer-hover:border-neutral-400"
            : isChecked
              ? "border-primary-400 hover:hover:border-primary-600"
              : "border-primary-100 hover:hover:border-primary-200"
        )}
      />

      <span
        className={clsx(
          "absolute rounded-full transition-all duration-500",
          "top-1/2 -translate-y-1/2",
          isChecked ? "w-[32px] h-[32px] left-[23px]" : "w-[20px] h-[20px] left-[2px]",
          disabled
            ? "bg-neutral-200 border border-neutral-200 peer-hover:border-neutral-400"
            : isChecked
              ? "bg-primary-400 border border-primary-400 peer-hover:bg-primary-600 peer-hover:border-primary-600"
              : "bg-primary-100 border border-primary-100 peer-hover:bg-primary-200 peer-hover:border-primary-200"
        )}
      />
    </label>
  );
};
