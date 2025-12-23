"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Lock } from "lucide-react";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";

import ResultModal from "@/components/ResultModal";
import IntegrationCard from "@/components/SimulatorCard";
import IntegrationCard2 from "@/components/SimulatorCard2";
import IntegrationCard3 from "@/components/SimulatorCard3";

gsap.registerPlugin(ScrollTrigger);

export default function Simulator() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // --- ESTADOS ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billValue, setBillValue] = useState<number>(0);

  // Validação
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
        delay: 0.1,
        ease: "power3.out",
      });

      gsap.from(imageRef.current, {
        scrollTrigger: triggerConfig,
        y: 100,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power4.out",
      });

      const cardTargets = gsap.utils.toArray(".card-anim-target");

      // --- CORREÇÃO DA ANIMAÇÃO ---
      gsap.fromTo(
        cardTargets,
        {
          y: 150,
          opacity: 0, // Usar opacity puro
          // autoAlpha: 0, // REMOVIDO (Causa conflito com blur)
        },
        {
          scrollTrigger: triggerConfig,
          y: 0,
          opacity: 1, // Usar opacity puro
          // autoAlpha: 1, // REMOVIDO
          duration: 1,
          delay: 0.6,
          stagger: 0.2,
          ease: "back.out(1.2)",
          // force3D: true, // REMOVIDO (Causa conflito com blur)
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F5F5F7]"
    >
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monthlyBill={billValue}
      />

      <div
        ref={subTextRef}
        className="absolute top-[6%] z-20 text-center text-lg font-medium tracking-[0.2em] text-[rgba(0,0,0,0.8)]"
      >
        De energia solar: Solar Energy
      </div>

      <h1
        ref={textRef}
        className="font-clash-display pointer-events-none relative z-0 -mt-[52vh] text-[18vw] leading-none font-medium tracking-tighter text-[rgba(0,0,0,0.8)] select-none"
      >
        Simulador
      </h1>

      <div
        ref={cardsRef}
        className="absolute inset-0 z-50 mb-6 flex w-full items-center justify-center gap-30 px-4"
      >
        {/* GRUPO 01 - Esquerda */}
        <div className="translate-y-[-50px]">
          {/* REMOVIDO 'invisible' */}
          <div className="card-anim-target flex flex-col items-center gap-6">
            <IntegrationCard
              onValidate={(isValid: boolean) =>
                handleValidation("card1", isValid)
              }
            />
          </div>
        </div>

        {/* GRUPO 02 - Meio */}
        <div className="translate-y-[-25px]">
          {/* REMOVIDO 'invisible' */}
          <div className="card-anim-target flex flex-col items-center gap-6">
            <IntegrationCard2
              onValidate={(isValid) => handleValidation("card2", isValid)}
            />

            <button
              disabled={!isFormValid}
              onClick={() => setIsModalOpen(true)}
              className={`group relative flex items-center justify-center gap-2 rounded-full px-10 py-4 text-lg font-bold shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ${
                isFormValid
                  ? "cursor-pointer bg-yellow-400 text-black hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-[0_8px_25px_rgba(250,204,21,0.4)] active:translate-y-0 active:scale-95"
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

        {/* GRUPO 03 - Direita */}
        <div className="translate-y-[-50px]">
          {/* REMOVIDO 'invisible' */}
          <div className="card-anim-target flex flex-col items-center gap-6">
            <IntegrationCard3
              onValidate={(isValid) => handleValidation("card3", isValid)}
              onValueChange={(val) => setBillValue(val)}
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
          style={{
            maxHeight: "80vh",
          }}
        />
      </div>
    </section>
  );
}
