import "./globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

import FloatingScrollbar from "@/components/FloatingScrollbar";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const clash = localFont({
  src: [
    {
      path: "../fonts/ClashDisplay-Variable.ttf",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MS Brasil Energy - Soluções em Energia Solar Residencial e Comercial",
  description:
    "A MS Brasil Energy projeta, instala e mantém sistemas fotovoltaicos sob medida para residências e empresas. Reduza sua conta de energia em até 85% com tecnologia de alta eficiência, opções de financiamento e suporte técnico local.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${montserrat.variable} ${clash.variable} scroll-smooth antialiased`}
      >
        <FloatingScrollbar />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
