import React from "react";

interface SvgIconProps {
  id: string;
  className?: string;
  ariaHidden?: boolean;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ id, className, ariaHidden = true }) => (
  <svg className={className} aria-hidden={ariaHidden ? "true" : undefined}>
    <use href={`/sprite.svg#${id}`}></use>
  </svg>
);
