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
}

export const Slider: FC<Props> = ({ min, max, step = 1, fromValue, toValue, onChange }) => {
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

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative h-2 bg-neutral-200 rounded-full">
        <div
          className="absolute h-2 bg-primary-400 rounded-full"
          style={{
            left: `${((fromValue - min) / (max - min)) * 100}%`,
            width: `${((toValue - fromValue) / (max - min)) * 100}%`,
          }}
        />
      </div>

      <div className="relative -mt-3">
        <div className="flex justify-between mt-2 text-sm text-neutral-700">
          <span>{fromValue}</span>
          <span>{toValue}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={fromValue}
          onChange={handleFromChange}
          className={clsx("absolute w-full appearance-none pointer-events-auto bg-transparent", "z-10")}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={toValue}
          onChange={handleToChange}
          className={clsx("absolute w-full appearance-none pointer-events-auto bg-transparent", "z-20")}
        />
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6; /* primary-400 */
          border: 2px solid white;
          box-shadow: 0 0 0 2px #3b82f6;
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          border: 2px solid white;
          box-shadow: 0 0 0 2px #3b82f6;
          cursor: pointer;
        }

        input[type="range"] {
          height: 26px;
        }
      `}</style>
    </div>
  );
};
