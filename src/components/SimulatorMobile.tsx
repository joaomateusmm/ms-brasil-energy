"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useCallback, useState } from "react";

// REMOVIDO: import ResultModalMobile... (Quem chama ele é o Simulator.tsx)
import IntegrationCard from "@/components/SimulatorCard";
import IntegrationCard2 from "@/components/SimulatorCard2";
import IntegrationCard3 from "@/components/SimulatorCard3";

interface SimulatorMobileProps {
  formStatus: { card1: boolean; card2: boolean; card3: boolean };
  handleValidation: (
    cardKey: "card1" | "card2" | "card3",
    isValid: boolean,
  ) => void;
  setBillValue: (val: number) => void;
  openModal: () => void;
  isFormValid: boolean;
}

export default function SimulatorMobile({
  formStatus,
  handleValidation,
  setBillValue,
  openModal,
  isFormValid,
}: SimulatorMobileProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const onValidateCard1 = useCallback(
    (isValid: boolean) => handleValidation("card1", isValid),
    [handleValidation],
  );

  const onValidateCard2 = useCallback(
    (isValid: boolean) => handleValidation("card2", isValid),
    [handleValidation],
  );

  const onValidateCard3 = useCallback(
    (isValid: boolean) => handleValidation("card3", isValid),
    [handleValidation],
  );

  const nextStep = () => {
    if (currentStep === 1 && !formStatus.card1)
      return alert("Selecione o tipo do local.");
    if (currentStep === 2 && !formStatus.card3)
      return alert("Preencha o valor da conta.");

    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-start overflow-hidden bg-[#f4f4f4] pt-12">
      {/* Título Mobile */}
      <h1 className="font-clash-display mb-4 text-4xl font-medium tracking-tighter text-[rgba(0,0,0,0.8)]">
        Simulador
      </h1>

      {/* Indicador de Passo */}
      <div className="mb-6 flex items-center gap-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-2 rounded-full transition-all duration-300 ${
              step === currentStep ? "w-8 bg-emerald-500" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Área do Card com Animação */}
      <div className="relative z-50 min-h-[420px] w-full max-w-[360px] px-2">
        <AnimatePresence mode="wait">
          {/* PASSO 1: Card 1 (Tipo de Local) */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full"
            >
              <IntegrationCard onValidate={onValidateCard1} />
            </motion.div>
          )}

          {/* PASSO 2: Card 3 (Valor da Conta) */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full"
            >
              <IntegrationCard3
                onValidate={onValidateCard3}
                onValueChange={setBillValue}
              />
            </motion.div>
          )}

          {/* PASSO 3: Card 2 (CEP/Localização) */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full"
            >
              <IntegrationCard2 onValidate={onValidateCard2} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controles de Navegação */}
      <div className="z-50 mt-6 flex w-full max-w-[360px] items-center justify-between gap-4 px-2 pb-8">
        {currentStep > 1 ? (
          <button
            onClick={prevStep}
            className="flex items-center gap-1 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-600 transition-transform active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar
          </button>
        ) : (
          <div />
        )}

        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={
              (currentStep === 1 && !formStatus.card1) ||
              (currentStep === 2 && !formStatus.card3)
            }
            className={`flex items-center gap-1 rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all active:scale-95 ${
              (currentStep === 1 && !formStatus.card1) ||
              (currentStep === 2 && !formStatus.card3)
                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            Próximo <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={openModal}
            disabled={!isFormValid}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold shadow-lg transition-transform active:scale-95 ${
              isFormValid
                ? "bg-emerald-500 text-black shadow-emerald-500/30 hover:bg-emerald-400"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            Ver Resultado{" "}
            {isFormValid ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <Lock className="h-3 w-3" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}