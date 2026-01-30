"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Lock } from "lucide-react";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef } from "react";

import IntegrationCard from "@/components/SimulatorCard";
import IntegrationCard2 from "@/components/SimulatorCard2";
import IntegrationCard3 from "@/components/SimulatorCard3";

gsap.registerPlugin(ScrollTrigger);

interface SimulatorDesktopProps {
  handleValidation: (
    cardKey: "card1" | "card2" | "card3",
    isValid: boolean,
  ) => void;
  setBillValue: (val: number) => void;
  setLocationType: (val: string) => void; // Nova prop vinda do pai
  setAddress: (val: string) => void; // Nova prop vinda do pai
  openModal: () => void;
  isFormValid: boolean;
}

export default function SimulatorDesktop({
  handleValidation,
  setBillValue,
  setLocationType,
  setAddress,
  openModal,
  isFormValid,
}: SimulatorDesktopProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // --- Handlers Otimizados ---
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

  // --- Animações GSAP (Mantidas conforme original) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const triggerConfig = {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      };

      gsap.from(subTextRef.current, {
        scrollTrigger: triggerConfig,
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(textRef.current, {
        scrollTrigger: triggerConfig,
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(imageRef.current, {
        scrollTrigger: triggerConfig,
        y: 100,
        opacity: 0,
        duration: 1.5,
        delay: 2.3,
        ease: "power4.out",
      });

      const cardTargets = gsap.utils.toArray(".card-anim-target");
      gsap.fromTo(
        cardTargets,
        { y: 150, opacity: 0 },
        {
          scrollTrigger: triggerConfig,
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.6,
          stagger: 0.2,
          ease: "back.out(1.2)",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f4f4f4]"
    >
      <div
        ref={subTextRef}
        className="absolute top-[7%] z-20 text-center text-lg font-medium tracking-[0.2em] text-[rgba(0,0,0,0.8)]"
      >
        MS Brasil Energy
      </div>

      <h1
        ref={textRef}
        className="font-clash-display pointer-events-none relative z-0 -mt-[53vh] text-[10vw] leading-none font-medium tracking-tighter text-[rgba(0,0,0,0.8)] select-none"
      >
        Calculadora Solar
      </h1>

      <div
        ref={cardsRef}
        className="absolute inset-0 z-50 mb-6 flex w-full items-center justify-center gap-30 px-4"
      >
        {/* GRUPO 01 - Tipo de Local */}
        <div className="translate-y-[-50px]">
          <div className="card-anim-target flex flex-col items-center gap-6">
            <IntegrationCard
              onValidate={onValidateCard1}
              onValueChange={setLocationType} // Passando a função de valor
            />
          </div>
        </div>

        {/* GRUPO 02 - Endereço e Botão */}
        <div className="translate-y-[-25px]">
          <div className="card-anim-target flex flex-col items-center gap-6">
            <IntegrationCard2
              onValidate={onValidateCard2}
              onValueChange={setAddress} // Passando a função de valor
            />

            <button
              disabled={!isFormValid}
              onClick={openModal}
              className={`group relative flex items-center justify-center gap-2 rounded-full px-10 py-4 text-lg font-bold shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ${
                isFormValid
                  ? "cursor-pointer bg-emerald-500 text-black hover:-translate-y-1 hover:bg-emerald-500 hover:shadow-emerald-500/40 active:translate-y-0 active:scale-95"
                  : "cursor-not-allowed bg-gray-300 text-gray-500 grayscale"
              } `}
            >
              <span>{isFormValid ? "Simular" : "Preencha tudo"}</span>
              {isFormValid ? (
                <ChevronRight className="h-5 w-5 duration-300 group-hover:translate-x-1" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* GRUPO 03 - Conta de Luz */}
        <div className="translate-y-[-50px]">
          <div className="card-anim-target flex flex-col items-center gap-6">
            <IntegrationCard3
              onValidate={onValidateCard3}
              onValueChange={setBillValue}
            />
          </div>
        </div>
      </div>

      <div
        ref={imageRef}
        className="absolute bottom-0 z-10 flex h-auto w-full max-w-[1400px] items-end justify-center px-4"
      >
        <Image
          src="/assets/simulator/house.webp"
          alt="Casa Moderna Energia Solar"
          width={1400}
          height={900}
          priority
          className="h-auto w-full object-contain"
          style={{ maxHeight: "80vh" }}
        />
      </div>
    </section>
  );
}
