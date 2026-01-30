"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useCallback, useState } from "react";

// Importamos apenas os Cards aqui. O Modal é gerenciado pelo pai (Simulator.tsx)
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
  setLocationType: (val: string) => void; // Nova prop
  setAddress: (val: string) => void; // Nova prop
  openModal: () => void;
  isFormValid: boolean;
}

export default function SimulatorMobile({
  formStatus,
  handleValidation,
  setBillValue,
  setLocationType,
  setAddress,
  openModal,
  isFormValid,
}: SimulatorMobileProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Callbacks otimizados
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
    <div className="flex min-h-[85vh] w-full flex-col items-center justify-start overflow-hidden bg-[#f4f4f4] pt-12 pb-10">
      {/* Título Mobile */}
      <h1 className="font-clash-display mb-6 text-center text-3xl font-medium tracking-tighter text-[rgba(0,0,0,0.8)]">
        Simulador Solar
      </h1>

      {/* Indicador de Passo */}
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-2 rounded-full transition-all duration-300 ${
              step === currentStep ? "w-8 bg-emerald-500" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* ÁREA DO CARD COM ANIMAÇÃO */}
      <div className="relative z-50 mx-auto min-h-[450px] w-full max-w-[350px] px-2">
        <AnimatePresence mode="wait">
          {/* PASSO 1: Card 1 (Tipo de Local) */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 left-0 mx-auto w-full"
            >
              <IntegrationCard
                onValidate={onValidateCard1}
                onValueChange={setLocationType}
              />
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
              className="absolute right-0 left-0 mx-auto w-full"
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
              className="absolute right-0 left-0 mx-auto w-full"
            >
              <IntegrationCard2
                onValidate={onValidateCard2}
                onValueChange={setAddress}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controles de Navegação */}
      <div className="z-50 mt-8 flex w-full max-w-[350px] items-center justify-between gap-4 px-4">
        {currentStep > 1 ? (
          <button
            onClick={prevStep}
            className="flex h-12 items-center gap-1 rounded-full border border-gray-300 px-6 text-sm font-bold text-gray-600 transition-transform active:scale-95"
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
            className={`flex h-12 items-center gap-1 rounded-full px-8 text-sm font-bold text-white shadow-lg transition-all active:scale-95 ${
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
            className={`flex h-12 items-center gap-2 rounded-full px-6 text-sm font-bold shadow-lg transition-transform active:scale-95 ${
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
