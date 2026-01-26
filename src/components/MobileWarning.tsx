import { Laptop, Monitor } from "lucide-react";
import React from "react";

export default function MobileWarning() {
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-full flex-col items-center justify-center bg-[#191919] p-8 text-center text-white">
      {/* Círculo decorativo de fundo */}
      <div className="absolute h-[300px] w-[300px] animate-pulse rounded-full bg-[#ffd700]/5 blur-[80px]" />

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Ícones animados */}
        <div className="flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-[#ffffff]/5 shadow-2xl backdrop-blur-md">
            <Laptop className="h-10 w-10 text-[#ffd700]" />
          </div>
        </div>

        {/* Textos */}
        <div className="max-w-md space-y-4">
          <h1 className="font-clash-display text-4xl leading-tight font-bold">
            Experiência desenhada para <br />
            <span className="text-[#ffd700]">Telas Grandes</span>
          </h1>

          <p className="text-sm font-medium text-white/80">
            No momento, nosso site oferece uma experiência visual imersiva que
            só é possível em computadores. Por favor, acesse através de um
            Desktop ou Notebook para ver a mágica acontecer.
          </p>
        </div>

        {/* Botão Decorativo (apenas visual) */}
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-xs font-semibold tracking-widest text-gray-300 uppercase ring-1 ring-white/10">
          <Monitor className="h-4 w-4" />
          Aguardamos você no PC
        </div>
      </div>
    </div>
  );
}
