"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

interface SimulatorCard3Props {
  className?: string;
  onValidate?: (isValid: boolean) => void;
  onValueChange?: (value: number) => void;
}

const SimulatorCard3 = ({
  className,
  onValidate,
  onValueChange,
}: SimulatorCard3Props) => {
  const [inputValue, setInputValue] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // --- LÓGICA PRINCIPAL CORRIGIDA ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Limpa e formata o input
    const rawValue = e.target.value.replace(/\D/g, "");

    if (!rawValue) {
      setInputValue("");
      if (onValidate) onValidate(false); // Invalida se estiver vazio
      if (onValueChange) onValueChange(0);
      return;
    }

    // 2. Converte para número e formata BRL
    const amount = parseFloat(rawValue) / 100;
    const formatted = amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setInputValue(formatted);

    // 3. Valida e Envia para o pai IMEDIATAMENTE (Sem useEffect)
    // Regra: Valor >= 150
    const isValid = amount >= 150;

    if (onValidate) {
      onValidate(isValid);
    }

    if (onValueChange) {
      onValueChange(amount);
    }
  };

  const handleBlur = () => {
    const rawValue = inputValue.replace(/\D/g, "");
    if (!rawValue) return;
    const numericValue = parseFloat(rawValue) / 100;

    if (numericValue < 150) {
      toast.custom(() => (
        <div className="animate-in slide-in-from-bottom-5 fade-in zoom-in-95 relative flex w-full max-w-md flex-col items-start rounded-xl border border-neutral-200 bg-white p-4 shadow-xl duration-300 ease-out">
          <h1 className="mb-1 text-sm font-semibold text-neutral-600">
            Valor Mínimo
          </h1>
          <p className="text-sm font-semibold text-neutral-500">
            Você deve adicionar um valor acima de{" "}
            <span className="text-emerald-500">R$ 150,00</span> para continuar
            com a simulação.
          </p>
        </div>
      ));
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative flex cursor-default items-center justify-center pt-0 lg:pt-[270px]"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        className={`relative flex min-h-[400px] w-full shrink-0 cursor-default flex-col items-center overflow-hidden rounded-3xl border-2 border-transparent bg-black/10 p-6 shadow-lg backdrop-blur-2xl lg:h-[560px] lg:w-[413px] lg:p-8 ${className}`}
      >
        <div
          ref={contentRef}
          className="relative z-10 flex h-full w-full flex-col items-center justify-center pt-4 will-change-transform lg:pt-8"
        >
          <h2 className="font-clash-display text-center text-xl leading-tight font-semibold text-white drop-shadow-md lg:text-2xl">
            Quanto é o seu gasto <br /> médio{" "}
            <span className="text-emerald-500">mensal</span> com <br /> conta de
            luz?
          </h2>

          <div className="my-8 h-[2px] w-[80%] rounded-full bg-white shadow-sm lg:my-10"></div>

          <div className="flex w-full flex-col items-center gap-4 px-2">
            <input
              type="text"
              placeholder="R$ 0,00"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="w-full max-w-[280px] rounded-[10px] border-2 border-white/80 bg-white/5 p-3 text-center text-2xl font-bold text-white placeholder-white/40 shadow-lg backdrop-blur-sm transition-all focus:border-emerald-500 focus:bg-white/10 focus:outline-none lg:text-3xl"
            />
            <p className="mt-2 text-center text-sm font-medium text-emerald-500 drop-shadow-md">
              *Dados fornecidos na sua conta de luz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorCard3;
