"use client";

import { FC } from "react";

import { clsx } from "clsx";

interface Props {
  min: number;
  max: number;
  step?: number;
  fromValue: number;
  toValue: number;
  onChange: (from: number, to: number) => void;
  disabled?: boolean;
  activeThumb?: "from" | "to" | null;
}

export const Slider: FC<Props> = ({ min, max, step = 1, fromValue, toValue, onChange, disabled = false }) => {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrom = Number(e.target.value);
    if (newFrom <= toValue && newFrom >= min) {
      onChange(newFrom, toValue);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTo = Number(e.target.value);
    if (newTo >= fromValue && newTo <= max) {
      onChange(fromValue, newTo);
    }
  };

  const range = max - min;
  const leftPercent = ((fromValue - min) / range) * 100;
  const rightPercent = ((toValue - min) / range) * 100;

  return (
    <div className="mx-auto mb-0 w-full max-w-md">
      <div className="gap- flex justify-center gap-4.5">
        <input
          type="number"
          min={min}
          max={toValue}
          step={step}
          value={fromValue}
          onChange={handleFromChange}
          disabled={disabled}
          className={clsx(
            "h-[54px] w-[71px] rounded-lg border bg-neutral-50 px-4 py-3.5 text-center text-sm",
            "appearance-none",
            "[&::-webkit-inner-spin-button]:appearance-none",
            "[&::-webkit-outer-spin-button]:appearance-none",
            "[&::-webkit-inner-spin-button]:m-0",
            !disabled && "border-secondary-600 text-secondary-600",
            !disabled &&
              "hover:text-secondary-400 hover:border-secondary-400 hover:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.4)]",
            !disabled &&
              "active:text-secondary-500 active:border-secondary-500 active:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.6)]",
            "focus:outline-none",
            "focus:text-secondary-500 focus:border-secondary-500 focus:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.6)]",
            disabled && "cursor-not-allowed border-neutral-400 text-neutral-400"
          )}
        />

        <input
          type="number"
          min={fromValue}
          max={max}
          step={step}
          value={toValue}
          onChange={handleToChange}
          disabled={disabled}
          className={clsx(
            "h-[54px] w-[71px] rounded-lg border bg-neutral-50 px-4 py-3.5 text-center text-sm",
            "appearance-none",
            "[&::-webkit-inner-spin-button]:appearance-none",
            "[&::-webkit-outer-spin-button]:appearance-none",
            "[&::-webkit-inner-spin-button]:m-0",
            !disabled && "border-secondary-600 text-secondary-600",
            !disabled &&
              "hover:text-secondary-400 hover:border-secondary-400 hover:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.4)]",
            !disabled &&
              "active:text-secondary-500 active:border-secondary-500 active:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.6)]",
            "focus:outline-none",
            "focus:text-secondary-500 focus:border-secondary-500 focus:shadow-[0px_0px_8px_0px_rgba(120,170,227,0.6)]",
            disabled && "cursor-not-allowed border-neutral-400 text-neutral-400"
          )}
        />
      </div>

      <div className={clsx("relative mt-4.5 h-0.5 rounded-full", disabled ? "bg-neutral-100" : "bg-primary-100")}>
        <div
          className={clsx("absolute h-0.5 rounded-full", disabled ? "bg-neutral-300" : "bg-primary-400")}
          style={{
            left: `${leftPercent}%`,
            width: `${rightPercent - leftPercent}%`,
          }}
        />
      </div>

      <div className="relative -mt-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={fromValue}
          onChange={handleFromChange}
          disabled={disabled}
          className={clsx(
            "pointer-events-auto absolute z-10 w-full appearance-none bg-transparent",
            disabled && "cursor-not-allowed"
          )}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={toValue}
          onChange={handleToChange}
          disabled={disabled}
          className={clsx(
            "pointer-events-auto absolute z-20 w-full appearance-none bg-transparent",
            disabled && "cursor-not-allowed"
          )}
        />
      </div>
    </div>
  );
};
