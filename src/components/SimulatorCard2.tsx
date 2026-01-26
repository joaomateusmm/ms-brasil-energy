"use client";

import { ChevronRight, Loader2, LocateFixed } from "lucide-react";
import { useEffect, useState } from "react";

interface SimulatorCard2Props {
  className?: string;
  onValidate?: (isValid: boolean) => void;
}

const SimulatorCard2 = ({ className, onValidate }: SimulatorCard2Props) => {
  // --- LÓGICA (ESTADOS) ---
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- VALIDAÇÃO AUTOMÁTICA ---
  useEffect(() => {
    if (onValidate) {
      const isValid = inputValue.length >= 8;
      onValidate(isValid);
    }
  }, [inputValue, onValidate]);

  // --- LÓGICA DE CEP (BrasilAPI) ---
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < inputValue.length) {
      setInputValue(value);
      return;
    }

    const rawValue = value.replace(/\D/g, "");
    if (rawValue.length > 8) return;

    let formattedValue = rawValue;
    if (rawValue.length > 5) {
      formattedValue = rawValue.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    setInputValue(formattedValue);

    if (rawValue.length === 8) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://brasilapi.com.br/api/cep/v2/${rawValue}`,
        );
        if (!response.ok) throw new Error("CEP não encontrado");

        const data = await response.json();
        const address = `${data.street ? data.street + ", " : ""}${data.city} - ${data.state}`;
        setInputValue(address);
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // --- LÓGICA DE GPS ---
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada.");
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await response.json();
          const addr = data.address;
          const city = addr.city || addr.town || addr.village || "";
          const state = addr.state || "";
          const road = addr.road || "";
          const fullAddress = `${road ? road + ", " : ""}${city} - ${state}`;
          setInputValue(fullAddress);
        } catch (error) {
          console.error("Erro no GPS", error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Permissão negada ou erro", error);
        setIsLoading(false);
      },
    );
  };

  return (
    <>
      <style>{`
        .input-autofill-fix:-webkit-autofill,
        .input-autofill-fix:-webkit-autofill:hover, 
        .input-autofill-fix:-webkit-autofill:focus, 
        .input-autofill-fix:-webkit-autofill:active {
            -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
            -webkit-transition-delay: 9999s;
            -webkit-text-fill-color: white !important;
        }
      `}</style>

      {/* WRAPPER: Responsivo */}
      <div className="relative flex cursor-default items-center justify-center pt-0 lg:pt-[270px]">
        {/* CARD: Responsivo */}
        <div
          className={`relative flex min-h-[400px] w-full shrink-0 cursor-default flex-col items-center overflow-hidden rounded-3xl border-2 border-transparent bg-black/10 p-6 shadow-lg backdrop-blur-2xl lg:h-[560px] lg:w-[413px] lg:p-8 ${className}`}
        >
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center pt-4 lg:pt-10">
            {/* TÍTULO */}
            <h2 className="font-clash-display text-center text-xl leading-tight font-semibold text-white drop-shadow-md lg:text-2xl">
              Onde pretende <br />
              <span className="text-emerald-500">realizar</span> a instalação?
            </h2>

            {/* SEPARATOR */}
            <div className="my-8 h-[2px] w-[80%] rounded-full bg-white shadow-sm lg:my-10"></div>

            {/* INPUT E BOTÃO */}
            <div className="flex w-full flex-col items-center gap-6 px-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleCepChange}
                disabled={isLoading}
                placeholder={
                  isLoading ? "Buscando..." : "Digite o CEP, cidade..."
                }
                className={`input-autofill-fix w-full max-w-[280px] rounded-[10px] border-2 border-white/80 bg-white/5 p-3 text-center text-base text-white placeholder-white/60 shadow-lg backdrop-blur-sm transition-all focus:border-emerald-500 focus:bg-white/10 focus:outline-none lg:text-lg ${isLoading ? "cursor-wait opacity-50" : ""}`}
              />

              <button
                onClick={handleUseLocation}
                disabled={isLoading}
                className="group -mt-2 flex cursor-pointer items-center justify-center gap-1 text-base font-medium text-emerald-500 transition-colors hover:text-emerald-300 lg:-mt-3 lg:text-lg"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <LocateFixed className="h-5 w-5 duration-300 group-hover:-translate-x-1" />
                )}

                <span>
                  {isLoading ? "Localizando..." : "Usar minha localização"}
                </span>

                {!isLoading && (
                  <ChevronRight className="h-5 w-5 duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimulatorCard2;
