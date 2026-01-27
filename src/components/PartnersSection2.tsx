"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";

// Lista de Parceiros
const partners = [
  { name: "Partner 1", src: "/assets/page6/logo-1.webp" },
  { name: "Partner 2", src: "/assets/page6/logo-2.webp" },
  { name: "Partner 3", src: "/assets/page6/logo-3.webp" },
  { name: "Partner 4", src: "/assets/page6/logo-4.webp" },
  { name: "Partner 5", src: "/assets/page6/logo-5.webp" },
];

export default function PartnersSection2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animação de Entrada do Título
      gsap.from(".partner-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // 2. Animação de Entrada do Slider
      gsap.from(sliderRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // 3. Carrossel Infinito
      if (sliderRef.current) {
        gsap.to(sliderRef.current, {
          x: "-50%", // Move metade da largura (pois duplicamos a lista)
          duration: 25, // Velocidade do loop
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
      className="relative z-50 w-full overflow-hidden bg-[#191919] py-12 text-[#f4f4f4]"
    >
      {/* Texto Decorativo de Fundo (Marca d'água) */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden select-none">
        <span className="font-clash-display absolute -top-10 left-1/2 -translate-x-1/2 text-[20vw] leading-none font-bold whitespace-nowrap text-[#1d1d1d6b]">
          Parceiros
        </span>
      </div>

      <div className="relative container mx-auto flex flex-col items-center gap-12 text-center">
        {/* Título Centralizado */}
        <div className="partner-title flex flex-col items-center gap-2">
          <span className="text-xs font-bold tracking-[0.2em] text-emerald-500 uppercase">
            Confiança
          </span>
          <h2 className="font-clash-display text-4xl font-semibold md:text-5xl">
            Nossos Parceiros
          </h2>
        </div>

        {/* Área do Carrossel (Centralizada e com Máscara) */}
        <div className="mask-gradient w-full max-w-5xl overflow-hidden">
          <div ref={sliderRef} className="flex w-max items-center gap-16 py-4">
            {/* Lista Duplicada para Loop Infinito Suave */}
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="relative h-20 w-32 cursor-pointer transition-all duration-300 hover:scale-110 md:h-24 md:w-40"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  className="object-contain opacity-60 brightness-200 contrast-0 grayscale transition-all duration-300 hover:opacity-100 hover:brightness-100 hover:contrast-100 hover:grayscale-0"
                  sizes="(max-width: 768px) 100px, 160px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estilos CSS Inline para a Máscara de Degradê */}
      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
          /* Fallback para webkit (Chrome/Safari) */
          -webkit-mask-image: linear-gradient(
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
