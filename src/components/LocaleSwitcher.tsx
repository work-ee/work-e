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
  const [locale, setLocale] = React.useState<Locale>(currentLocale as Locale);

  React.useEffect(() => {
    setLocale(currentLocale as Locale);
  }, [currentLocale]);

  function onChange(value: string) {
    const newLocale = value as Locale;
    setLocale(newLocale);

    startTransition(() => {
      setUserLocale(newLocale);
    });
  }

  return (
    <div className="relative min-w-30" suppressHydrationWarning>
      <Select value={locale} onValueChange={onChange} disabled={isPending}>
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
