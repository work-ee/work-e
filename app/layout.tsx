import type { Metadata } from "next";

import AppInitializerWrapper from "@/components/initializer/AppInitializerWrapper";
import { Footer, Header } from "@/components/shared";
import { Toaster } from "@/components/ui/shadcn/sonner";

import { nunitoSans, rubik } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Work-E",
  description: "Платформа для пошуку роботи та розміщення вакансій",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${nunitoSans.variable} antialiased`}>
        <AppInitializerWrapper />
        <Header />
        {children}
        <Footer />

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
