"use client";

import { useCallback, useState } from "react";

import ResultModal from "@/components/ResultModal";
import ResultModalMobile from "@/components/ResultModalMobile";
import SimulatorDesktop from "@/components/SimulatorDesktop";
import SimulatorMobile from "@/components/SimulatorMobile";

export default function Simulator() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billValue, setBillValue] = useState<number>(0);
  const [locationType, setLocationType] = useState<string>("");
  const [address, setAddress] = useState<string>("");

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
    setLocationType,
    setAddress,
    openModal: () => setIsModalOpen(true),
    isFormValid,
  };

  return (
    <>
      <div className="hidden lg:block">
        <ResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          monthlyBill={billValue}
          locationType={locationType}
          address={address}
        />
        <SimulatorDesktop {...sharedProps} />
      </div>

      <div className="lg:hidden">
        <ResultModalMobile
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          monthlyBill={billValue}
          locationType={locationType}
          address={address}
        />
        <SimulatorMobile {...sharedProps} />
      </div>
    </>
  );
}
