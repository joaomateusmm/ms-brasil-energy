"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface SimulatorCardProps {
  className?: string;
  onValidate?: (isValid: boolean) => void;
}

const SimulatorCard = ({ className, onValidate }: SimulatorCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (onValidate) {
      const isValid = selectedOption !== null;
      onValidate(isValid);
    }
  }, [selectedOption, onValidate]);

  const options = [
    { id: "residencial", label: "Residencial", icon: "/icons/home.png" },
    { id: "empresarial", label: "Empresarial", icon: "/icons/skyline.png" },
    { id: "rural", label: "Área Rural", icon: "/icons/farm.png" },
    {
      id: "sem_conexao",
      label: "Sem conexão com a rede",
      icon: "/icons/energy.png",
    },
  ];

  return (
    // WRAPPER (Mantém layout)
    <div className="relative flex cursor-default items-center justify-center pt-[270px]">
      {/* O CARD VISUAL (Simplificado) */}
      {/* Removemos refs, eventos de mouse e will-change-transform */}
      <div
        className={`relative flex h-[560px] w-[413px] shrink-0 flex-col items-center overflow-hidden rounded-3xl border-2 border-transparent bg-black/10 p-8 shadow-[0_0px_8px_rgba(0,0,0,0.2)] backdrop-blur-2xl ${className}`}
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <h2 className="font-clash-display text-center text-2xl leading-tight font-semibold text-white drop-shadow-md">
            Qual é o tipo do local que <br />
            irá <span className="text-yellow-400">instalar</span> o gerador?
          </h2>

          <div className="my-6 h-[2px] w-[80%] rounded-full bg-white shadow-sm"></div>

          <div className="mt-2 grid w-full grid-cols-2 gap-x-6 gap-y-8 px-2">
            {options.map((opt) => (
              <div key={opt.id} className="flex flex-col items-center gap-3">
                <button
                  onClick={() => setSelectedOption(opt.id)}
                  className={`relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                    selectedOption === opt.id
                      ? "ring-3 ring-yellow-400"
                      : "hover:ring-2 hover:ring-white/50"
                  } `}
                >
                  <div className="relative h-12 w-12">
                    <Image
                      src={opt.icon}
                      alt={opt.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>
                <span className="text-md text-center leading-tight font-medium text-white drop-shadow-md">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorCard;
