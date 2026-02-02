"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Definimos estilos fixos aqui para garantir contraste
      toastOptions={{
        style: {
          background: "#FFFFFF", // Fundo Branco fixo
          color: "#18181b", // Texto Preto (Zinc-900) fixo
          border: "1px solid #e4e4e7", // Borda cinza clara
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Sombra suave
        },
        classNames: {
          toast: "group toast group-[.toaster]:font-sans",
          description: "group-[.toast]:text-[#18181b]", // Descrição cinza
          actionButton: "group-[.toast]:bg-[#10b981] group-[.toast]:text-white", // Botão Emerald
          cancelButton:
            "group-[.toast]:bg-[#f4f4f5] group-[.toast]:text-[#18181b]", // Botão Cancelar
        },
      }}
      icons={{
        // Adicionei cores fixas aos ícones também para combinar
        success: <CircleCheckIcon className="size-4 text-[#10b981]" />, // Verde
        info: <InfoIcon className="size-4 text-[#3b82f6]" />, // Azul
        warning: <TriangleAlertIcon className="size-4 text-[#f59e0b]" />, // Laranja
        error: <OctagonXIcon className="size-4 text-[#ef4444]" />, // Vermelho
        loading: <Loader2Icon className="size-4 animate-spin text-[#71717a]" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
