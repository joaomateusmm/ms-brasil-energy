"use client";

import { ChevronsDown, PhoneCall } from "lucide-react";

export function ProjectActionButtons() {
  // FUNÇÃO DE SCROLL
  const handleScrollToSimulacao = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById("simulacao");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/20 duration-300 hover:scale-105 hover:bg-emerald-500 active:scale-95 sm:w-auto">
        <PhoneCall className="h-4 w-4" />
        Falar com Consultor
      </button>

      <a
        href="#simulacao"
        onClick={handleScrollToSimulacao}
        className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-8 py-4 font-semibold text-white duration-300 hover:border-white/40 hover:bg-white/5 active:scale-95 sm:w-auto"
      >
        <ChevronsDown className="h-5 w-5 -rotate-90 transform text-white/90 duration-300 group-hover:-rotate-180" />
        Simular Economia
      </a>
    </div>
  );
}
