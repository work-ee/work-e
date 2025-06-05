import type { SvgProps } from "@/types/globals";

export const FlagUkrSvg = ({ ...props }: SvgProps) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16 31C24.3 31 31 24.3 31 16H1C1 24.3 7.7 31 16 31Z" fill="#FFE62E" />
    <path d="M16 1C7.7 1 1 7.7 1 16H31C31 7.7 24.3 1 16 1Z" fill="#428BC1" />
  </svg>
);
