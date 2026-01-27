"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Roboto_Flex } from "next/font/google";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";

import VariableProximity from "@/components/VariableProximity";

// CORREÇÃO AQUI:
// Removemos 'wght' da lista de eixos (axes).
// O Next.js carrega o peso variável automaticamente.
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  axes: ["opsz"], // Mantemos apenas 'opsz' (Optical Size)
  display: "swap",
});

// ... O resto do código permanece igual ...
const partners = [
  { name: "Partner 1", src: "/assets/page6/logo-1.webp" },
  { name: "Partner 2", src: "/assets/page6/logo-2.webp" },
  { name: "Partner 3", src: "/assets/page6/logo-3.webp" },
  { name: "Partner 4", src: "/assets/page6/logo-4.webp" },
  { name: "Partner 5", src: "/assets/page6/logo-5.webp" },
];

export default function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animação de Entrada
      gsap.from(".partner-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // 2. Carrossel Infinito
      const totalWidth = sliderRef.current?.scrollWidth;
      if (totalWidth) {
        gsap.to(sliderRef.current, {
          x: "-50%",
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-50 w-full overflow-hidden bg-[#f4f4f4] py-24 text-[#191919]"
    >
      {/* Elemento Decorativo de Fundo */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden select-none">
        <span className="font-clash-display absolute -top-10 -left-20 rotate-[-5deg] text-[20vw] leading-none font-bold text-[#e5e5e559] opacity-60">
          Parceiros
        </span>
      </div>

      <div className="relative container mx-auto px-8 md:px-20">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
          {/* --- Lado Esquerdo: Texto --- */}
          <div className="z-10 max-w-xl">
            {/* Título Interativo */}
            <div
              ref={titleRef}
              className="mb-8 cursor-default"
              style={{ position: "relative" }}
            >
              <h2 className="text-6xl leading-[0.9] font-bold uppercase md:text-8xl">
                <VariableProximity
                  label={"Nossos"}
                  className={`${robotoFlex.className} tracking-tighter text-gray-800`}
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />

                {/* A animação vai funcionar porque o 'wght' é padrão da fonte variável */}
                <VariableProximity
                  label={"Parceiros"}
                  className={`${robotoFlex.className} tracking-tighter text-gray-800`}
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 800, 'opsz' 40"
                  containerRef={titleRef}
                  radius={100}
                  falloff="linear"
                />
              </h2>
            </div>

            <p className="partner-text border-l-4 border-[#ffd700] pl-6 text-lg leading-relaxed text-gray-600 md:text-xl">
              Temos orgulho de colaborar com líderes da indústria que
              compartilham a nossa paixão por um futuro sustentável e eficiente.
              Juntos, levamos energia limpa para cada canto do país.
            </p>
          </div>

          {/* --- Lado Direito: Carrossel de Logos --- */}
          <div className="mask-gradient w-full overflow-hidden lg:w-1/2">
            <div
              ref={sliderRef}
              className="flex w-max items-center gap-16 py-4"
            >
              {/* Lista Duplicada para Loop */}
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="relative h-20 w-32 cursor-pointer grayscale transition-all duration-300 hover:scale-110 hover:grayscale-0 md:h-24 md:w-40"
                >
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100px, 160px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}
