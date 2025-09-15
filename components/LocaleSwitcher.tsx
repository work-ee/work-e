"use client";

import * as React from "react";
import { useTransition } from "react";

import { useLocale } from "next-intl";

import { FlagUkrSvg, FlagUsaSvg } from "@/components/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";

import type { Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";

export const LocaleSwitcher = () => {
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [locale] = React.useState<Locale>(currentLocale as Locale);

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select defaultValue={locale} onValueChange={onChange} disabled={isPending}>
        <SelectTrigger
          data-size="lg"
          className="text-primary-900 min-w-28 cursor-pointer border-0 text-lg font-black shadow-none focus-visible:ring-0"
          aria-label="Select Language"
        >
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem className="text-primary-900 cursor-pointer font-black" value="uk">
            <FlagUkrSvg className="size-8" />
            <span>UA</span>
          </SelectItem>
          <SelectItem className="text-primary-900 cursor-pointer font-black" value="en">
            <FlagUsaSvg className="size-8" />
            <span>EN</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
