"use client";

import Image from "next/image";
import { memo, useState } from "react";

interface SimulatorCardProps {
  className?: string;
  onValidate?: (isValid: boolean) => void;
  // Esta função envia o nome do local (ex: "Residencial") para o simulador principal
  onValueChange?: (value: string) => void;
}

// Usamos memo para evitar re-renderizações desnecessárias quando o pai atualiza
const SimulatorCard = memo(
  ({ className, onValidate, onValueChange }: SimulatorCardProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const options = [
      { id: "residencial", label: "Residencial", icon: "/icons/home.png" },
      { id: "empresarial", label: "Empresarial", icon: "/icons/skyline.png" },
      { id: "rural", label: "Área Rural", icon: "/icons/farm.png" },
      { id: "sem_conexao", label: "Sem rede", icon: "/icons/energy.png" },
    ];

    const handleSelect = (id: string, label: string) => {
      // Evita processamento se clicar no que já está selecionado
      if (selectedOption === id) return;

      setSelectedOption(id);

      // 1. Avisa que o card está validado (para liberar o botão "Próximo")
      if (onValidate) {
        onValidate(true);
      }

      // 2. Envia o texto amigável
      if (onValueChange) {
        onValueChange(label);
      }
    };

    return (
      <div className="relative flex cursor-default items-center justify-center pt-0 lg:pt-[270px]">
        <div
          className={`relative flex min-h-[400px] w-full shrink-0 flex-col items-center overflow-hidden rounded-3xl border-2 border-transparent bg-black/10 p-6 shadow-lg backdrop-blur-2xl lg:h-[560px] lg:w-[413px] lg:p-8 ${className}`}
        >
          <div className="relative z-10 flex h-full flex-col items-center justify-center">
            <h2 className="font-clash-display text-center text-xl leading-tight font-semibold text-white drop-shadow-md lg:text-2xl">
              Qual é o tipo do local que <br />
              irá <span className="text-emerald-500">instalar</span> o gerador?
            </h2>

            <div className="my-6 h-[2px] w-[80%] rounded-full bg-white shadow-sm"></div>

            <div className="mt-2 grid w-full grid-cols-2 gap-4 px-2 lg:gap-x-6 lg:gap-y-8">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className="flex flex-col items-center gap-2 lg:gap-3"
                >
                  <button
                    onClick={() => handleSelect(opt.id, opt.label)}
                    type="button" // Boa prática adicionar type="button"
                    className={`relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 lg:h-24 lg:w-24 ${
                      selectedOption === opt.id
                        ? "ring-3 ring-emerald-500"
                        : "hover:ring-2 hover:ring-white/50"
                    } `}
                  >
                    <div className="relative h-10 w-10 lg:h-12 lg:w-12">
                      <Image
                        src={opt.icon}
                        alt={opt.label}
                        fill
                        // "sizes" está correto aqui. Se o erro persistir, limpe o cache do navegador.
                        sizes="50px"
                        className="object-contain"
                      />
                    </div>
                  </button>
                  <span className="lg:text-md text-center text-sm leading-tight font-medium text-white drop-shadow-md">
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

// Necessário para debugging quando se usa memo
SimulatorCard.displayName = "SimulatorCard";

export default SimulatorCard;
