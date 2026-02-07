"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Efeito de "Revelação": O vídeo sobe como uma tampa
      gsap.fromTo(
        containerRef.current,
        {
          clipPath: "inset(100% 0% 0% 0%)", // Começa 100% escondido (cortado embaixo)
        },
        {
          clipPath: "inset(0% 0% 0% 0%)", // Revela 100%
          ease: "none", // Mantém linear para o scroll controlar a velocidade
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // Começa quando o topo do vídeo entra na parte de baixo da tela

            // --- AQUI ESTÁ O AJUSTE DE VELOCIDADE ---
            // "top 25%" significa: A animação termina quando o topo do vídeo estiver a 25% do topo da tela.
            // Quanto MAIOR a porcentagem (ex: 50%), MENOS você precisa scrollar (mais rápido).
            // Quanto MENOR a porcentagem (ex: 0% ou "top"), MAIS você precisa scrollar (mais lento).
            end: "top 75%",

            // Troquei 'true' por '1'. Isso adiciona 1 segundo de "delay" suave
            // para a animação não ficar travada friamente no scroll.
            scrub: 2,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      // O z-50 é vital para ficar ACIMA da TechNature
      className="relative z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/video/video-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/40" />

      <h1 className="font-clash-display relative z-10 text-center text-6xl font-bold text-white">
        O Futuro é Agora
      </h1>
    </section>
  );
}
