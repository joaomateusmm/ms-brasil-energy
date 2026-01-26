"use client";

// --- 1. IMPORTS GERAIS ---
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

import Footer from "@/components/footer";
// --- 2. IMPORTS DE COMPONENTES ORGANIZADOS ---
import HeroSection1 from "@/components/HeroSection1";
import HeroSection5 from "@/components/HeroSection5";
import ModelSection from "@/components/ModelSection";
import PartnersSection from "@/components/PartnersSection";
import Simulator from "@/components/Simulator";
import SolarBenefitsSection from "@/components/SolarBenefitsSection";
import TechNatureSection from "@/components/TechNatureSection";
import VideoSection from "@/components/VideoSection";

// Registra o plugin globalmente
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // REF PARA O LENIS (Controle de scroll suave)
  const lenisRef = useRef<Lenis | null>(null);

  // Configuração Global do Lenis (Mantida da original)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  // Função para scroll suave até o simulador (Passada como prop)
  const handleScrollToSimulacao = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    lenisRef.current?.scrollTo("#simulacao", {
      offset: 0,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <main className="scroll-smooth bg-[#f4f4f4] text-white">
      <div className="w-full">
        <HeroSection1 onScrollToSimulacao={handleScrollToSimulacao} />

        <section id="simulacao" className="bg-[#F4F4F4]">
          <Simulator />
        </section>

        <SolarBenefitsSection />

        <TechNatureSection />

        <VideoSection />
        <ModelSection />
        <HeroSection5 />
        <PartnersSection />
        <Footer />
      </div>
    </main>
  );
}
