"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useLayoutEffect, useRef } from "react";

export default function VideoSection() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const element = containerRef.current;

      // Mantive a tua animação, mas ajustei o 'y'
      // Como ela já vem de baixo pelo scroll natural,
      // uma animação pequena (50px) fica elegante.
      gsap.fromTo(
        element,
        {
          y: 50,
        },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            // Ajustei o trigger para disparar assim que a secção começa a cobrir
            start: "top 100%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.documentElement.classList.add("video-active");
          } else {
            document.documentElement.classList.remove("video-active");
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("video-active");
    };
  }, []);

  return (
    <section
      ref={containerRef}
      // z-50: Garante que passa POR CIMA da HeroSection3 (que é z-0)
      // relative: Necessário para o scroll funcionar
      // bg-[#f4f4f4]: Fundo sólido para não deixar ver o que está atrás
      className="page-4 relative z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-[#f4f4f4]"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        // src="/assets/video/video-bg.mp4"
        src="/assets/video/video-bg.mp4" // Confirmei o caminho baseado no teu histórico
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/20" />

      {/* Texto de exemplo para visualizar o efeito */}
      <h1 className="font-clash-display relative z-10 hidden text-6xl font-bold text-white/20 md:flex">
        O Futuro é Agora
      </h1>
      <h1 className="font-clash-display relative z-10 flex text-center text-4xl font-bold text-white/20 md:hidden">
        O Futuro é Agora
      </h1>
    </section>
  );
}
