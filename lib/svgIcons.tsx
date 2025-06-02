import React from "react";

interface SvgIconProps {
  id: string;
  className?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ id, className }) => (
  <svg className={className}>
    <use href={`/sprite.svg#${id}`}></use>
  </svg>
);
