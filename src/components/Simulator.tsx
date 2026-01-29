"use client";

import { useCallback, useState } from "react";

import ResultModal from "@/components/ResultModal"; // Modal Desktop
import ResultModalMobile from "@/components/ResultModalMobile"; // Modal Mobile
import SimulatorDesktop from "@/components/SimulatorDesktop";
import SimulatorMobile from "@/components/SimulatorMobile";

export default function Simulator() {
  // --- ESTADOS GERAIS ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billValue, setBillValue] = useState<number>(0);

  // --- VALIDAÇÃO ---
  const [formStatus, setFormStatus] = useState({
    card1: false,
    card2: false,
    card3: false,
  });

  const isFormValid = Object.values(formStatus).every(
    (status) => status === true,
  );

  const handleValidation = useCallback(
    (cardKey: "card1" | "card2" | "card3", isValid: boolean) => {
      setFormStatus((prev) => {
        if (prev[cardKey] === isValid) return prev;
        return { ...prev, [cardKey]: isValid };
      });
    },
    [],
  );

  const sharedProps = {
    formStatus,
    handleValidation,
    setBillValue,
    openModal: () => setIsModalOpen(true),
    isFormValid,
  };

  return (
    <>
      {/* AQUI ESTÁ A LÓGICA DE TROCA DE MODAL:
        Renderizamos os dois, mas usamos CSS para mostrar apenas um por vez.
      */}

      {/* 1. Modal e Simulador DESKTOP (Visível apenas em telas grandes lg:block) */}
      <div className="hidden lg:block">
        <ResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          monthlyBill={billValue}
        />
        <SimulatorDesktop {...sharedProps} />
      </div>

      {/* 2. Modal e Simulador MOBILE (Visível apenas em telas pequenas lg:hidden) */}
      <div className="lg:hidden">
        <ResultModalMobile
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          monthlyBill={billValue}
        />
        <SimulatorMobile {...sharedProps} />
      </div>
    </>
  );
}
