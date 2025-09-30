import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import AppInitializerWrapper from "@/components/initializer/AppInitializerWrapper";
import { Footer, Header } from "@/components/shared";
import { Toaster } from "@/components/ui/shadcn/sonner";

import { getMessages } from "@/i18n/getMessages";

import AppProviders from "./AppProviders";
import { nunitoSans, rubik } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Work-E",
  description: "Платформа для пошуку роботи та розміщення вакансій",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${rubik.variable} ${nunitoSans.variable} antialiased`}>
        <AppInitializerWrapper />

        <AppProviders locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
        </AppProviders>

        <Toaster
          expand={false}
          position="top-right"
          toastOptions={{
            style: {
              width: "600px",
            },
          }}
        />
      </body>
    </html>
  );
}
