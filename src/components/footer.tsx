"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Instagram } from "lucide-react";
import React, { useLayoutEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".footer-item");

      gsap.fromTo(
        items,
        {
          y: 30, // Reduzi um pouco o deslocamento para ficar mais sutil no mobile
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%", // Inicia um pouco antes no mobile
            toggleActions: "play none none reverse",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-50 w-full overflow-hidden bg-[#f4f4f4] px-6 pt-16 pb-8 text-neutral-800 md:px-12 lg:px-20 lg:pt-24 lg:pb-12"
    >
      {/* --- Parte Superior: Chamada para Ação --- */}
      <div className="flex flex-col gap-12 border-b border-black/10 pb-12 lg:flex-row lg:items-start lg:justify-between lg:pb-20">
        <div className="max-w-3xl">
          <h2 className="footer-item font-clash-display text-4xl leading-[1.1] font-semibold md:text-6xl lg:text-7xl">
            Vamos construir um <br />
            <span className="text-emerald-500">futuro sustentável.</span>
          </h2>
        </div>

        {/* --- Navegação --- */}
        <div className="footer-item flex flex-col gap-10 sm:flex-row sm:gap-20 lg:gap-24">
          {/* Coluna 1 */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <h3 className="font-clash-display text-base font-semibold tracking-wide text-emerald-500 uppercase lg:text-lg">
              Menu
            </h3>
            <ul className="font-montserrat flex flex-col gap-3 text-base font-medium text-black/80 lg:gap-2 lg:text-lg">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-emerald-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/sobre-nos"
                  className="transition-colors hover:text-emerald-500"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="#projetos"
                  className="transition-colors hover:text-emerald-500"
                >
                  Projetos
                </a>
              </li>
              <li>
                <a
                  href="#simulacao"
                  className="transition-colors hover:text-emerald-500"
                >
                  Calculadora Solar
                </a>
              </li>
              <li>
                <a
                  href="/tipos-de-sistemas"
                  className="transition-colors hover:text-emerald-500"
                >
                  Tipos de Sistemas
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 2 */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <h3 className="font-clash-display text-base font-semibold tracking-wide text-emerald-500 uppercase lg:text-lg">
              Social
            </h3>
            <ul className="font-montserrat flex flex-col gap-3 text-base font-medium text-neutral-800 lg:gap-4 lg:text-lg">
              <li>
                <a
                  href="https://www.instagram.com/msbrasilenergy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-emerald-500"
                >
                  <Instagram className="h-5 w-5" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/msbrasilenergy?mibextid=LQQJ4d&rdid=DwFU6nuDDll8081n&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DRLxtYfL3%2F%3Fmibextid%3DLQQJ4d#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-emerald-500"
                >
                  <Facebook className="h-5 w-5" /> Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Parte Inferior: Copyright --- */}
      <div className="footer-item mt-8 flex flex-col items-start gap-4 text-xs text-neutral-600 md:mt-12 md:flex-row md:items-center md:justify-between md:text-sm">
        <p>
          &copy; {new Date().getFullYear()} Solar Energy. Todos os direitos
          reservados.
        </p>

        <div className="flex flex-wrap gap-4 md:gap-8">
          <a
            href="/politica-de-privacidade"
            className="transition-colors duration-200 hover:text-emerald-500 hover:underline"
          >
            Política de Privacidade
          </a>
          <a
            href="/termos-de-uso"
            className="transition-colors duration-200 hover:text-emerald-500 hover:underline"
          >
            Termos de Uso
          </a>
        </div>
      </div>

      {/* Texto Grande Decorativo no Fundo */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden opacity-[0.01] select-none">
        <h1 className="font-clash-display translate-y-[20%] text-center text-[16vw] leading-none font-bold text-black">
          MS BRASIL
        </h1>
      </div>
    </footer>
  );
}
