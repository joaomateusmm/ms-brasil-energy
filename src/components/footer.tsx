"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Facebook,
  Instagram,
  Linkedin,
  MoveRight,
  Twitter,
} from "lucide-react";
import React, { useLayoutEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Seleciona todos os elementos com a classe 'footer-item'
      const items = gsap.utils.toArray(".footer-item");

      gsap.fromTo(
        items,
        {
          y: 50, // Começa 50px abaixo
          opacity: 0, // Invisível
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1, // Um item aparece 0.1s depois do outro (efeito cascata)
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%", // Inicia quando o topo do footer entra nos 85% da tela
            toggleActions: "play none none reverse", // Toca ao entrar
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-50 w-full bg-[#f4f4f4] px-8 pt-24 pb-12 text-neutral-800 md:px-20"
    >
      {/* --- Parte Superior: Chamada para Ação --- */}
      <div className="flex flex-col items-start justify-between gap-12 border-b border-white/10 pb-20 lg:flex-row">
        <div className="max-w-3xl">
          <h2 className="footer-item font-clash-display mb-6 text-5xl leading-[1.1] font-semibold md:text-7xl">
            Vamos construir um <br />
            <span className="text-emerald-500">futuro sustentável.</span>
          </h2>

          <button className="footer-item group mt-8 flex items-center gap-4 text-xl font-medium text-black transition-all duration-300 hover:text-emerald-500">
            <span className="relative">Fazer Orçamento Agora</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-black">
              <MoveRight className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
            </span>
          </button>
        </div>

        {/* --- Navegação --- */}
        <div className="footer-item flex flex-col gap-16 sm:flex-row sm:gap-24">
          {/* Coluna 1 */}
          <div className="flex flex-col gap-6">
            <h3 className="font-clash-display text-lg font-semibold tracking-wide text-emerald-500 uppercase">
              Menu
            </h3>
            <ul className="font-montserrat flex flex-col gap-2 text-lg font-medium text-black/80">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-emerald-500"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#simulacao"
                  className="transition-colors hover:text-emerald-500"
                >
                  Simulador de Energia
                </a>
              </li>
              <li>
                <a
                  href="#solar"
                  className="transition-colors hover:text-emerald-500"
                >
                  Benefícios
                </a>
              </li>
              <li>
                <a
                  href="#projetos"
                  className="transition-colors hover:text-emerald-500"
                >
                  Serviços
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
            </ul>
          </div>

          {/* Coluna 2 */}
          <div className="flex flex-col gap-6">
            <h3 className="font-clash-display text-lg font-semibold tracking-wide text-emerald-500 uppercase">
              Social
            </h3>
            <ul className="font-montserrat flex flex-col gap-4 text-lg font-medium text-neutral-800">
              <li>
                <a
                  href="https://www.instagram.com/msbrasilenergy/"
                  className="flex items-center gap-2 transition-colors hover:text-emerald-500"
                >
                  <Instagram className="h-5 w-5" /> Instagram
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="flex items-center gap-2 transition-colors hover:text-emerald-500"
                >
                  <Linkedin className="h-5 w-5" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 transition-colors hover:text-emerald-500"
                >
                  <Facebook className="h-5 w-5" /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 transition-colors hover:text-emerald-500"
                >
                  <Twitter className="h-5 w-5" /> Twitter
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>

      {/* --- Parte Inferior: Copyright --- */}
      <div className="footer-item mt-12 flex flex-col items-center justify-between gap-6 text-sm text-neutral-800 md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} Solar Energy. Todos os direitos
          reservados.
        </p>

        <div className="flex gap-8">
          <a
            href="#"
            className="transition-colors duration-200 hover:text-emerald-500 hover:underline"
          >
            Política de Privacidade
          </a>
          <a
            href="#"
            className="transition-colors duration-200 hover:text-emerald-500 hover:underline"
          >
            Termos de Uso
          </a>
        </div>
      </div>

      {/* Texto Grande Decorativo no Fundo (Opcional - Estilo Lando) */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden opacity-[0.02] select-none">
        <h1 className="font-clash-display translate-y-[30%] text-center text-[20vw] leading-none font-bold">
          SOLAR
        </h1>
      </div>
    </footer>
  );
}
