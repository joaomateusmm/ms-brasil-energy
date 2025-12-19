"use client";

import gsap from "gsap";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";

export default function Simulator() {
  // Refs para animações
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // --- Animações GSAP de Entrada ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. O Texto Pequeno aparece suavemente
      gsap.from(subTextRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // 2. O Título "Simulador" cresce e sobe
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.1,
        ease: "power3.out",
      });

      // 3. A Casa sobe da base para a frente do texto
      gsap.from(imageRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power4.out",
      });

      // 4. Os Grupos de Cards (Card + Numero) entram
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: 0.8,
          stagger: 0.2,
          ease: "back.out(1.2)",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Estilo base para o card de vidro (Clean, sem borda forte)
  const glassCardStyle =
    "w-[413px] h-[560px] rounded-[25px] bg-white/10 backdrop-blur-xl shadow-[0_0px_8px_0_rgba(0,0,0,0.15)] transition-transform duration-300 border border-white/10";

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F5F5F7]"
    >
      <div
        ref={subTextRef}
        className="absolute top-[9%] z-20 text-center text-lg font-medium tracking-[0.2em] text-[rgba(0,0,0,0.8)]"
      >
        De energia solar: Solar Energy
      </div>

      <h1
        ref={textRef}
        className="font-clash-display pointer-events-none relative z-0 -mt-[44vh] text-[18vw] leading-none font-medium tracking-tighter text-[rgba(0,0,0,0.8)] select-none"
      >
        Simulador
      </h1>

      {/* Faixa branca inferior (mascaramento) */}
      <div className="absolute z-40 h-[200px] w-screen translate-y-[535px] bg-[#F5F5F7]"></div>

      {/* --- CONTAINER DOS CARDS --- */}
      <div
        ref={cardsRef}
        className="absolute inset-0 z-50 flex w-full items-center justify-center gap-30 px-4"
      >
        {/* GRUPO 01 - Esquerda (Mais baixo - Desce 25px) */}
        <div className="flex translate-y-[25px] flex-col items-center gap-6">
          <div className={glassCardStyle}></div>
          <span className="font-clash-display text-4xl font-bold text-yellow-400 drop-shadow-sm">
            01
          </span>
        </div>

        {/* GRUPO 02 - Meio (Neutro - Centro exato) */}
        <div className="flex translate-y-0 flex-col items-center gap-6">
          <div className={glassCardStyle}></div>
          <span className="font-clash-display text-4xl font-bold text-yellow-400 drop-shadow-sm">
            02
          </span>
        </div>

        {/* GRUPO 03 - Direita (Mais alto - Sobe 25px) */}
        <div className="flex -translate-y-[25px] flex-col items-center gap-6">
          <div className={glassCardStyle}></div>
          <span className="font-clash-display text-4xl font-bold text-yellow-400 drop-shadow-sm">
            03
          </span>
        </div>
      </div>

      {/* Imagem da Casa */}
      <div
        ref={imageRef}
        className="absolute bottom-0 z-10 flex h-auto w-full max-w-[1400px] items-end justify-center px-4"
      >
        <Image
          src="/assets/simulator/house.png"
          alt="Casa Moderna Energia Solar"
          width={1400}
          height={900}
          priority
          className="h-auto w-full translate-y-[320px] object-contain drop-shadow-2xl"
          style={{
            maxHeight: "140vh",
          }}
        />
      </div>
    </section>
  );
}
