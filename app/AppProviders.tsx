import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
};

export default function AppProviders({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionProvider>{children}</SessionProvider>
    </NextIntlClientProvider>
  );
}
