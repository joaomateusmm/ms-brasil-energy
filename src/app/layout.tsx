import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
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
    "A MS Brasil Energy é uma empresa especializada em soluções energéticas, focada em transformar a maneira como Mato Grosso do Sul consome eletricidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body
          className={`${montserrat.variable} ${clash.variable} overflow-x-hidden scroll-smooth antialiased`}
        >
          <FloatingScrollbar />
          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
