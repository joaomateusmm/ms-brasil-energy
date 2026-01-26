"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TechNatureMobile() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animação dos Textos e Botões (Fade Up Simples)
      gsap.from(".content-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // 2. Imagem Tecnologia (Vem da Esquerda)
      gsap.fromTo(
        ".tech-mobile-img",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            scrub: 1,
          },
        },
      );

      // 3. Imagem Natureza (Vem da Direita)
      gsap.fromTo(
        ".nature-mobile-img",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            scrub: 1,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100vh] w-full flex-col overflow-hidden bg-[#f4f4f4] text-[#191919]"
    >
      {/* Imagem Decorativa Topo ("Aliados") */}
      <div className="content-anim flex justify-center pt-8">
        <Image
          src="/assets/page3/Aliados.png"
          alt="Aliados"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* CONTEÚDO CENTRAL */}
      <div className="relative z-20 flex flex-col items-center px-4 pt-25 text-center">
        {/* Títulos Lado a Lado */}
        <div className="content-anim flex w-full flex-row items-start justify-center gap-8 leading-[0.9]">
          {/* Lado Tecnologia */}
          <div className="flex flex-col items-end text-right">
            <h1 className="font-clash-display text-5xl font-semibold text-gray-800">
              Tecno
              <br />
              logia
            </h1>
            <p className="font-montserrat mt-2 max-w-[140px] text-[13px] font-medium text-gray-600">
              Tecnologia de última geração.
            </p>
          </div>

          {/* Lado Natureza */}
          <div className="flex flex-col items-start text-left">
            <h1 className="font-clash-display text-5xl font-semibold text-gray-800">
              Natu
              <br />
              reza
            </h1>
            <p className="font-montserrat mt-2 max-w-[140px] text-[13px] font-medium text-gray-600">
              Compromisso ambiental absoluto.
            </p>
          </div>
        </div>

        {/* Botões Lado a Lado */}
        <div className="content-anim mt-12 flex w-full max-w-xs items-center justify-center gap-6">
          <button
            type="button"
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-emerald-500 shadow-lg transition-transform active:scale-95"
            aria-label="Ver Tecnologia"
          >
            <ChevronsLeft className="h-5 w-5 text-white transition-transform group-hover:-translate-x-1" />
          </button>

          <button
            type="button"
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-emerald-500 shadow-lg transition-transform active:scale-95"
            aria-label="Ver Natureza"
          >
            <ChevronsRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* ÁREA DAS IMAGENS (AUMENTADAS E REPOSICIONADAS) */}
      {/* Aumentei height para 55% e ajustei posicionamento */}
      <div className="absolute right-0 bottom-0 left-0 z-10 flex h-[55%] w-full items-center justify-center overflow-visible">
        <div className="tech-mobile-img relative h-full w-full">
          <Image
            src="/assets/page3/lado-tecnologia.png"
            alt="Tecnologias"
            width={1600}
            height={800}
            className="tech-img absolute -translate-x-[40px] translate-y-[230px] scale-150 will-change-transform"
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        <div className="nature-mobile-img relative h-full w-full">
          <Image
            src="/assets/page3/lado-natureza.png"
            alt="Tecnologias de energia solar"
            width={1000}
            height={400}
            className="nature-img absolute translate-x-[40px] translate-y-[50px] scale-150 will-change-transform"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>

      {/* Elemento Gráfico de Fundo */}
      <div className="absolute top-[20%] left-[10%] -z-0 h-32 w-32 rounded-full bg-[#C1F12E]/20 blur-3xl"></div>
    </section>
  );
}
