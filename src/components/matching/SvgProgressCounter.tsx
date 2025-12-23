"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  percent?: number;
  className?: string;
};

export const SvgProgressCounter = ({ percent = 0, className }: Props) => {
  const [progress, setProgress] = useState(percent);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(percent);
    }, 200);
    return () => clearTimeout(timeout);
  }, [percent]);

  const normalizedProgress = Math.max(0, Math.min(100, percent));
  const angle = (normalizedProgress / 100) * 180;
  const radians = (angle * Math.PI) / 180;

  const centerX = 148;
  const centerY = 148;
  const radius = 148;

  const endX = centerX + radius * Math.cos(Math.PI - radians);
  const endY = centerY - radius * Math.sin(Math.PI - radians);

  const progressColor = progress >= 90 ? "#33B55F" : progress >= 70 ? "#9BEEB7 " : "#FD7958";

  const createProgressPath = () => {
    if (normalizedProgress === 0) return "";
    const largeArcFlag = angle > 180 ? 1 : 0;
    return `M ${centerX} ${centerY} L 0 ${centerY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  const progressPath = createProgressPath();

  return (
    <div className={cn("flex justify-center p-4", className)}>
      <svg width="296" height="146" viewBox="0 0 296 146" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1150_2046)">
          <mask id="path-1-inside-1_1150_2046" fill="white">
            <path d="M296 148C296 128.564 292.172 109.319 284.734 91.3629C277.296 73.4067 266.395 57.0913 252.652 43.3482C238.909 29.6051 222.593 18.7035 204.637 11.2658C186.681 3.82813 167.436 -8.49559e-07 148 0C128.564 8.49559e-07 109.319 3.82813 91.3628 11.2658C73.4067 18.7035 57.0913 29.6051 43.3482 43.3482C29.6051 57.0913 18.7035 73.4067 11.2658 91.3629C3.82813 109.319 -1.69912e-06 128.564 0 148L148 148H296Z" />
          </mask>
          <path
            d="M296 148C296 128.564 292.172 109.319 284.734 91.3629C277.296 73.4067 266.395 57.0913 252.652 43.3482C238.909 29.6051 222.593 18.7035 204.637 11.2658C186.681 3.82813 167.436 -8.49559e-07 148 0C128.564 8.49559e-07 109.319 3.82813 91.3628 11.2658C73.4067 18.7035 57.0913 29.6051 43.3482 43.3482C29.6051 57.0913 18.7035 73.4067 11.2658 91.3629C3.82813 109.319 -1.69912e-06 128.564 0 148L148 148H296Z"
            fill="white"
            stroke="#ECF4FF"
            strokeWidth="48"
            mask="url(#path-1-inside-1_1150_2046)"
          />
          {normalizedProgress > 0 && (
            <path
              d={progressPath}
              fill={progressColor}
              strokeLinecap="round"
              style={{
                transition: "fill 1s ease-in-out",
                transformOrigin: "center",
              }}
            />
          )}

          <text
            x="148"
            y="90"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-rubik fill-neutral-800 text-7xl font-black"
          >
            {Math.round(normalizedProgress)}%
          </text>
        </g>
        <defs>
          <clipPath id="clip0_1150_2046">
            <rect width="296" height="146" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
