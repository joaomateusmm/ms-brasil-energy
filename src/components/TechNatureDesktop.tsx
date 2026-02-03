"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TechNatureDesktop() {
  const hero3ContainerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // BLINDAGEM: Verifica se o elemento existe
    if (!hero3ContainerRef.current) return;

    const ctx = gsap.context(() => {
      // --- ANIMAÇÃO LADO TECNOLOGIA ---
      gsap.from(".tech-img", {
        x: -250,
        opacity: 0,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: hero3ContainerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 2,
        },
      });

      // --- ANIMAÇÃO LADO NATUREZA ---
      gsap.from(".nature-img", {
        x: 250,
        opacity: 0,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: hero3ContainerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 2,
        },
      });

      // --- ANIMAÇÃO DOS TEXTOS ---
      gsap.from(".textos", {
        y: 100,
        opacity: 0,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: hero3ContainerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 0.5,
        },
      });
    }, hero3ContainerRef);

    return () => ctx.revert();
  }, []);

  // Sticky Header Effect
  useEffect(() => {
    const el = hero3ContainerRef.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.documentElement.classList.add("hero3-active");
          } else {
            document.documentElement.classList.remove("hero3-active");
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("hero3-active");
    };
  }, []);

  return (
    <section
      ref={hero3ContainerRef}
      className="page-3 sticky top-0 z-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f4f4f4] text-[#191919]"
    >
      <div className="pointer-events-auto flex h-screen items-center justify-center">
        <main className="flex flex-row gap-32">
          {/* Logo Central */}
          <div className="textos absolute translate-x-[440px] -translate-y-[110px] will-change-transform">
            {/* CORREÇÃO: Wrapper com dimensões relativas e Image com fill */}
            <div className="relative h-[400px] w-[220px]">
              <Image
                src="/assets/page3/Aliados.png"
                alt="Tecnologias de energia solar"
                fill
                sizes="220px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Lado tecnologia */}
          <div className="flex flex-col items-end">
            <div className="textos text-gray-800">
              <h1 className="font-clash-display -mb-8 text-end text-[120px] font-semibold">
                Tec-
              </h1>
              <h1 className="font-clash-display text-end text-[120px] font-semibold">
                nologia
              </h1>
            </div>

            <p className="textos mb-10 text-end text-[30px] leading-10 text-gray-700">
              Utilizamos tecnologia de ponta do<br></br> mercado, a mais
              avançada até agora.
            </p>

            <div className="tech-img absolute translate-x-[30px] translate-y-[80px] will-change-transform">
              {/* CORREÇÃO: Wrapper com dimensões relativas e Image com fill */}
              <div className="relative h-[400px] w-[1200px]">
                <Image
                  src="/assets/page3/lado-tecnologia.png"
                  alt="Tecnologias"
                  fill
                  sizes="100vw"
                  className="object-contain object-right" // object-right alinha melhor aqui
                />
              </div>
            </div>
          </div>

          {/* Lado natureza */}
          <div className="flex flex-col items-start">
            <div className="textos text-gray-800">
              <h1 className="font-clash-display -mb-8 text-start text-[120px] font-semibold">
                Natu-
              </h1>
              <h1 className="font-clash-display text-start text-[120px] font-semibold">
                reza
              </h1>
            </div>

            <p className="textos mb-10 text-start text-[30px] leading-10 text-gray-700">
              Nossa empresa está totalmente<br></br> comprometida com a causa
              ambiental.
            </p>

            <div className="nature-img absolute -translate-x-[40px] translate-y-[108px] will-change-transform">
              {/* CORREÇÃO: Wrapper com dimensões relativas e Image com fill */}
              <div className="relative h-[400px] w-[1000px]">
                <Image
                  src="/assets/page3/lado-natureza.png"
                  alt="Tecnologias de energia solar"
                  fill
                  sizes="100vw"
                  className="object-contain object-left" // object-left alinha melhor aqui
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
