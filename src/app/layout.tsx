import type { Metadata } from "next";
import { clashDisplay, satoshi } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ktenor",
  description: "Premium websites, designed and built end to end.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sk"
      data-theme="dark"
      className={`${clashDisplay.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
