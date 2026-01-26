"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TechNatureDesktop() {
  const hero3ContainerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
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
          <Image
            src="/assets/page3/Aliados.png"
            alt="Tecnologias de energia solar"
            width={220}
            height={400}
            className="textos absolute translate-x-[440px] -translate-y-[110px] will-change-transform"
            style={{ width: "auto", height: "auto" }}
          />

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
            <button
              type="button"
              className="textos group z-50 flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-2xl bg-emerald-500 shadow-md duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              <ChevronsLeft className="h-8 w-8 stroke-2 text-white duration-300 group-hover:-rotate-90" />
            </button>

            <Image
              src="/assets/page3/lado-tecnologia.png"
              alt="Tecnologias"
              width={1200}
              height={400}
              className="tech-img absolute translate-x-[30px] translate-y-[80px] will-change-transform"
              style={{ width: "auto", height: "auto" }}
            />
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
            <button
              type="button"
              className="textos group z-50 flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-2xl bg-emerald-500 shadow-md duration-300 hover:shadow-lg active:scale-95"
            >
              <ChevronsRight className="h-8 w-8 stroke-2 text-white duration-300 group-hover:rotate-90" />
            </button>

            <Image
              src="/assets/page3/lado-natureza.png"
              alt="Tecnologias de energia solar"
              width={1000}
              height={400}
              className="nature-img absolute -translate-x-[40px] translate-y-[108px] will-change-transform"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </main>
      </div>
    </section>
  );
}
