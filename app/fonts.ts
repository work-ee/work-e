import { Nunito_Sans, Rubik } from "next/font/google";

export const rubik = Rubik({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});
