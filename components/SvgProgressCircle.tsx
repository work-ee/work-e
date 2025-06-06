"use client";

import React, { useEffect, useState } from "react";

type Props = {
  percent: number; // 0-100
};

export const SvgProgressCircle = ({ percent }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(percent);
    }, 200);
    return () => clearTimeout(timeout);
  }, [percent]);

  const size = 280;
  const stroke = 22;
  const center = size / 2;
  const radius = center - stroke;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div className="relative w-[280px] h-[280px] flex items-center justify-center">
      <svg width={size} height={size}>
        {/* base circle */}
        <circle cx={center} cy={center} r={radius} stroke="#ECF4FF" strokeWidth={stroke} fill="white" />

        {/* animated progress */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={progress < 100 ? "#FF6600" : "#00FF00"}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>

      {/* text in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-black font-rubik text-neutral-800">
        {progress}%
      </div>
    </div>
  );
};
