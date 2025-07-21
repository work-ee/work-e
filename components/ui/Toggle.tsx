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
  const handleChange = () => {
    if (!disabled) {
      onChange();
    }
  };

  return (
    <label
      className={clsx("relative inline-block h-[26px] w-[50px]", disabled ? "cursor-not-allowed" : "cursor-pointer")}
    >
      <input
        id={compId}
        name={name}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className="peer sr-only"
      />

      <span
        className={clsx(
          "absolute top-0 right-0 left-0 h-[26px] rounded-[16px] border transition-colors duration-500",
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
          isChecked ? "left-[23px] h-[32px] w-[32px]" : "left-[2px] h-[20px] w-[20px]",
          disabled
            ? "border border-neutral-200 bg-neutral-200 peer-hover:border-neutral-400"
            : isChecked
              ? "bg-primary-400 border-primary-400 peer-hover:bg-primary-600 peer-hover:border-primary-600 border"
              : "bg-primary-100 border-primary-100 peer-hover:bg-primary-200 peer-hover:border-primary-200 border"
        )}
      />
    </label>
  );
};
