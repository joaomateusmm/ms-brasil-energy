"use client";

import { useState } from "react";

import ResultModal from "@/components/ResultModal";
import SimulatorDesktop from "@/components/SimulatorDesktop";
import SimulatorMobile from "@/components/SimulatorMobile";

export default function Simulator() {
  // --- ESTADOS GERAIS (Compartilhados entre Mobile e Desktop) ---
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

  const handleValidation = (
    cardKey: "card1" | "card2" | "card3",
    isValid: boolean,
  ) => {
    setFormStatus((prev) => {
      if (prev[cardKey] === isValid) return prev;
      return { ...prev, [cardKey]: isValid };
    });
  };

  const sharedProps = {
    formStatus,
    handleValidation,
    setBillValue,
    openModal: () => setIsModalOpen(true),
    isFormValid,
  };

  return (
    <>
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monthlyBill={billValue}
      />

      {/* RENDERIZAÇÃO CONDICIONAL VIA CSS */}

      {/* 1. Versão Desktop (Escondida no Mobile) */}
      <div className="hidden lg:block">
        <SimulatorDesktop {...sharedProps} />
      </div>

      {/* 2. Versão Mobile (Escondida no Desktop) */}
      <div className="lg:hidden">
        <SimulatorMobile {...sharedProps} />
      </div>
    </>
  );
}
