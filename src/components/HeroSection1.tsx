"use client";

import gsap from "gsap";
import { ArrowRight, Star, Zap } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// Imports dos Headers
import HeaderDesktop from "@/components/HeaderDesktop";
import HeaderMobile from "@/components/HeaderMobile";

interface HeroSection1Props {
  onScrollToSimulacao: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function HeroSection1({
  onScrollToSimulacao,
}: HeroSection1Props) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState<boolean>(true);

  // --- OBSERVER ---
  useEffect(() => {
    const target = heroSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHeroVisible(entry.isIntersecting);
        });
      },
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // --- ANIMAÇÃO GSAP ---
  useLayoutEffect(() => {
    if (!heroVisible || !heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".hero-anim");

      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    }, heroContainerRef);

    return () => ctx.revert();
  }, [heroVisible]);

  return (
    <section
      ref={heroSectionRef}
      className="relative h-screen w-full overflow-hidden bg-gray-900"
    >
      {/* 1. IMAGEM DE FUNDO (Background Responsivo) */}
      <div className="absolute inset-0 z-0">
        {/* === IMAGEM MOBILE (Aparece só em telas pequenas) === */}
        <div className="block h-full w-full md:hidden">
          <Image
            src="/assets/page1/bg-mobile.jpg" // 🔴 AQUI: Coloque a imagem vertical para celular
            alt="Energia Renovável Mobile"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        {/* === IMAGEM DESKTOP (Aparece só em telas médias/grandes) === */}
        <div className="hidden h-full w-full md:block">
          <Image
            src="/assets/page1/bg-pc.jpg" // 🔴 AQUI: Coloque a imagem horizontal para PC
            alt="Energia Renovável Desktop"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
      </div>

      {/* 2. HEADERS (Desktop & Mobile) */}
      <div className="relative z-50">
        <div className="hidden lg:block">
          <HeaderDesktop />
        </div>
        <div className="lg:hidden">
          <HeaderMobile />
        </div>
      </div>

      {/* 3. CONTEÚDO CENTRAL */}
      {heroVisible && (
        <div
          ref={heroContainerRef}
          className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 pt-20 text-center"
        >
          {/* Título Principal */}
          <h1 className="hero-anim font-clash-display max-w-4xl text-4xl leading-tight font-bold tracking-tight text-white opacity-0 md:max-w-7xl md:text-6xl lg:text-7xl">
            Criando um Futuro Sustentável com Energia Solar.
          </h1>

          {/* Subtítulo */}
          <p className="hero-anim font-montserrat mt-6 max-w-2xl text-lg text-white/90 opacity-0 md:text-xl">
            Descubra como a energia solar pode transformar a sua casa ou
            empresa, reduzindo custos em até 85%.
          </p>

          {/* Botão de Ação */}
          <div className="hero-anim mt-8 opacity-0">
            <a
              href="#simulacao"
              onClick={onScrollToSimulacao}
              className="group flex items-center gap-2 rounded-full bg-[#C1F12E] px-8 py-4 text-base font-bold text-[#0F2830] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(193,241,46,0.5)] active:scale-95"
            >
              <span className="font-montserrat">Fazer Simulação Gratuita</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* 4. CARDS FLUTUANTES */}
          <div className="hero-anim mt-16 flex w-full max-w-4xl flex-col items-center gap-4 px-4 opacity-0 md:mt-24 md:flex-row md:justify-center">
            {/* Card 1 */}
            <div className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md transition-transform hover:bg-white/20 md:w-auto md:pr-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/20">
                <Image
                  src="/assets/page1/worker.jpg"
                  alt="Técnico"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="font-montserrat text-lg font-bold text-white">
                  Energia Inteligente
                </h3>
                <p className="font-montserrat text-xs text-white/70">
                  Descubra o poder da transformação solar.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md transition-transform hover:bg-white/20 md:w-auto md:pr-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/20 bg-gray-500"
                  >
                    <Image
                      src={`/assets/page3/avatar-${i}.png`}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20 bg-[#C1F12E] text-[10px] font-bold text-[#0F2830]">
                  80+
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-[#C1F12E] text-[#C1F12E]"
                    />
                  ))}
                </div>
                <p className="font-montserrat mt-1 text-xs text-white/70">
                  Mais de 200 clientes satisfeitos pelo Brasil.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
