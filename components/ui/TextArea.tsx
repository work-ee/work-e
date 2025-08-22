"use client";

import React, { ChangeEvent } from "react";

import clsx from "clsx";

import { SpriteSvg } from "@/components/icons/SpriteSvg";

import { Button } from "../ui";
import { Textarea } from "../ui/shadcn/textarea";

interface AIControlledTextareaProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  maxCharLimit?: number;
  onGenerateClick?: () => void;
  canGenerate?: boolean;
  label?: string;
  description?: string;
  error?: string | null;
  className?: string;
  placeholder?: string;
  isGenerated?: boolean;
}

export const AIControlledTextarea = ({
  value,
  onChange,
  isLoading,
  maxCharLimit = 1500,
  onGenerateClick,
  canGenerate = false,
  label,
  description,
  error,
  className,
  placeholder,
  isGenerated,
}: AIControlledTextareaProps) => {
  const characterCount = value.trim().length;
  const showGenerateButton = canGenerate && onGenerateClick;

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const isDisabled = isLoading || !value.trim() || isGenerated;

  return (
    <section className={clsx("section container", className)}>
      {(label || description) && (
        <>
          {label && <h3 className="heading-h3 neutral-900 mb-2">{label}</h3>}
          {description && <p className="text-micro neutral-900 mb-4">{description}</p>}
        </>
      )}

      <div className="_w-[920px] relative">
        <Textarea
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          className={clsx(
            "border-secondary-300 input-text min-h-[241px] w-full resize-none gap-3 rounded-lg border px-8 pt-2.5 pb-26.5 outline-none hover:outline-none focus:outline-none active:outline-none",
            {
              "border-error-main text-error-main": error,
              "text-secondary-400": !error,
            }
          )}
        />
        <div className="absolute right-8 bottom-8 left-8 flex items-center justify-between">
          {showGenerateButton && (
            <Button variant="secondary" className="btn-sm" onClick={onGenerateClick} disabled={isDisabled}>
              <SpriteSvg
                id="icon-AI"
                className={clsx(
                  "mx-auto h-6 w-6",
                  {
                    "stroke-primary-300 fill-primary-300": !isDisabled,
                    "fill-neutral-100 stroke-neutral-100": isDisabled,
                  },
                  !isDisabled &&
                    "group-hover:stroke-primary-700 group-hover:fill-primary-700 group-active:stroke-primary-900 group-active:fill-primary-900"
                )}
              />
              {isLoading ? "Генеруємо..." : "Згенерувати"}
            </Button>
          )}

          <div
            className={clsx("text-sm", {
              "text-error-main": error,
              "text-secondary-600": !error,
            })}
          >
            {characterCount}/{maxCharLimit}
          </div>
        </div>
      </div>

      {error && (
        <p className="text-error-main text-micro mt-1 flex items-center">
          <SpriteSvg id="icon-danger" className="text-error-main mr-1 h-4 w-4" />
          {error}
        </p>
      )}
    </section>
  );
};
