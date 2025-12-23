import React from "react";

interface SpriteSvgProps {
  id: string;
  className?: string;
  ariaHidden?: boolean;
}

export const SpriteSvg: React.FC<SpriteSvgProps> = ({ id, className, ariaHidden = true }) => (
  <svg className={className} aria-hidden={ariaHidden ? "true" : undefined}>
    <use href={`/sprite.svg#${id}`}></use>
  </svg>
);
