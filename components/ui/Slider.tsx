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
    if (newFrom <= toValue) {
      onChange(newFrom, toValue);
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTo = Number(e.target.value);
    if (newTo >= fromValue) {
      onChange(fromValue, newTo);
    }
  };

  const range = max - min;
  const leftPercent = ((fromValue - min) / range) * 100;
  const rightPercent = ((toValue - min) / range) * 100;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-2 flex justify-between px-2" style={{ marginBottom: "8px", gap: "19px" }}>
        <div
          className="text-secondary-200 border-secondary-200 flex items-center justify-center rounded-lg border text-sm"
          style={{
            width: 96,
            height: 44,
            padding: "10px 32px",
          }}
        >
          {fromValue}
        </div>
        <div
          className="text-secondary-200 border-secondary-200 flex items-center justify-center rounded-lg border text-sm"
          style={{
            width: 96,
            height: 44,
            padding: "10px 32px",
          }}
        >
          {toValue}
        </div>
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
          style={{
            WebkitAppearance: "none",
            appearance: "none",
          }}
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
          style={{
            WebkitAppearance: "none",
            appearance: "none",
          }}
        />
      </div>
    </div>
  );
};
