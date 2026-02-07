"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TechNatureDesktop() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // BLINDAGEM
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // --- TIMELINE PRINCIPAL ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Começa quando o topo da seção entra em baixo
          end: "top top", // Termina quando a seção ocupa a tela toda
          scrub: 3, // AUMENTEI MUITO O SCRUB: Isso dá o "peso" e a lentidão
        },
      });

      // 1. Animação da Tecnologia (Vindo da ESQUERDA)
      tl.from(
        ".tech-img",
        {
          x: -650, // Reduzi levemente a distância para ajudar na sensação de lentidão
          opacity: 0,
          scale: 0.9, // Adicionei scale para dar profundidade na entrada
          ease: "power1.out", // Easing mais suave, sem "explosão" inicial
        },
        0,
      )

        // 2. Animação da Natureza (Vindo da DIREITA)
        .from(
          ".nature-img",
          {
            x: 650,
            opacity: 0,
            scale: 0.9,
            ease: "power1.out",
          },
          0,
        )

        // 3. Animação do Texto Central
        .from(
          ".textos-centro",
          {
            y: 80,
            opacity: 0,
            scale: 0.95,
            ease: "power1.out", // Mantive consistente com as imagens
          },
          0.15,
        ); // Atraso sutil

      // --- PINAGEM (TRAVAR A TELA) ---
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden bg-[#f4f4f4] text-[#191919]"
    >
      {/* --- CAMADA 1: TECNOLOGIA (ESQUERDA) --- */}
      <div className="tech-img absolute bottom-0 left-0 z-10 h-[90vh] w-[45vw] will-change-transform">
        <div className="relative h-full w-full">
          <Image
            src="/assets/page3/lado-tecnologia.png"
            alt="Tecnologia Solar"
            fill
            className="object-contain object-left-bottom"
            priority
          />
        </div>
      </div>

      {/* --- CAMADA 2: NATUREZA (DIREITA) --- */}
      <div className="nature-img absolute right-0 bottom-0 z-10 h-[90vh] w-[45vw] will-change-transform">
        <div className="relative h-full w-full">
          <Image
            src="/assets/page3/lado-natureza.png"
            alt="Natureza Preservada"
            fill
            className="object-contain object-right-bottom"
            priority
          />
        </div>
      </div>

      {/* --- CAMADA 3: CONTEÚDO CENTRALIZADO --- */}
      <div className="textos-centro relative z-20 flex flex-col items-center px-4 text-center">
        <h2 className="font-clash-display mb-6 text-[80px] leading-[0.9] font-semibold tracking-tight md:text-[110px]">
          Tecnologia <br /> & Natureza
        </h2>
        <p className="max-w-[600px] text-[20px] leading-snug font-medium text-gray-700 md:text-[26px]">
          Utilizamos tecnologia de ponta totalmente comprometida com a
          preservação ambiental.
        </p>
      </div>
    </section>
  );
}
