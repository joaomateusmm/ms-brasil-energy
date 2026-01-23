"use client";

import gsap from "gsap";
import { ChevronsRight, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // IMPORTADO O LINK
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// Imports dos Headers
import HeaderDesktop from "@/components/HeaderDesktop";
import HeaderMobile from "@/components/HeaderMobile";

interface HeroSection1Props {
  onScrollToSimulacao: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// === DADOS DAS NOTÍCIAS (Card Esquerdo) ===
const newsData = [
  {
    title: "Energia solar cresce 31,4% em Janeiro.",
    desc: "A produção de energia solar das usinas fotovoltaicas conectadas ao Sistema Interligado Nacional (SIN) cresceu 31,4% (...) Ler Mais. ",
    image: "/assets/page2/img-3.webp",
    link: "https://www.portalsolar.com.br/noticias/operacao-e-expansao/geracao-de-energia-solar-cresce-31-4-na-primeira-quinzena-de-janeiro", // 🔴 AQUI: Coloque o link da notícia 1
  },
  {
    title: "Taxação do sol: o que é e como funciona essa tarifa?",
    desc: "A taxação do sol não é um imposto sobre a energia solar. Trata-se da cobrança gradual pelo uso dos fios de distribuição para quem instalar sistemas após 2023, (...) Ler Mais. ",
    image: "/assets/page2/img-1.webp",
    link: "https://www.portalsolar.com.br/taxacao-do-sol", // 🔴 AQUI: Coloque o link da notícia 2
  },
  {
    title: "Sustentabilidade",
    desc: "Redução de CO2 equivalente a 1000 árvores.",
    image: "/assets/page2/img-2.webp",
    link: "/blog/sustentabilidade", // 🔴 AQUI: Coloque o link da notícia 3
  },
];

export default function HeroSection1({
  onScrollToSimulacao,
}: HeroSection1Props) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState<boolean>(true);

  // === LÓGICA DO CARROSSEL DE NOTÍCIAS ===
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    // Troca a notícia a cada 10 segundos (conforme seu código anterior)
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentNews = newsData[currentNewsIndex];

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
            src="/assets/page1/bg-mobile.jpg"
            alt="Energia Renovável Mobile"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        {/* === IMAGEM DESKTOP (Aparece só em telas médias/grandes) === */}
        <div className="hidden h-full w-full md:block">
          <Image
            src="/assets/page1/bg-pc.jpg"
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
          <h1 className="hero-anim font-montserrat max-w-4xl text-4xl leading-tight font-bold tracking-tight text-white opacity-0 md:max-w-7xl md:text-6xl lg:text-7xl">
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
              className="group flex items-center gap-2 rounded-3xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/20 duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              <span className="font-montserrat">Conheça Nosso Trabalho</span>
              <ChevronsRight className="h-5 w-5 duration-300 group-hover:rotate-90" />
            </a>
          </div>

          {/* 4. CARDS FLUTUANTES (MODIFICADOS) */}
          <div className="hero-anim mt-16 flex w-full max-w-5xl flex-col items-center gap-4 px-4 opacity-0 md:mt-24 md:flex-row md:justify-center">
            {/* CARD 1: CARROSSEL DE NOTÍCIAS COM LINK */}
            <Link
              href={currentNews.link}
              key={currentNewsIndex}
              // MUDANÇAS AQUI:
              // 1. 'p-6' (mais espaçamento interno = mais altura)
              // 2. 'md:w-96' (mais largo no PC)
              // 3. 'min-h-[140px]' (garante uma altura mínima)
              className="animate-in fade-in flex min-h-[140px] w-full cursor-pointer items-center gap-5 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md duration-500 hover:bg-white/20 md:w-96 md:pr-8"
            >
              {/* MUDANÇA NA IMAGEM: Aumentei para h-20 w-20 */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/20">
                <Image
                  src={currentNews.image}
                  alt="Notícia"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center text-left">
                {/* Ajustei ligeiramente o tamanho da fonte do título */}
                <h3 className="font-montserrat text-base font-bold text-[#C1F12E]">
                  {currentNews.title}
                </h3>
                <p className="font-montserrat line-clamp-5 text-xs leading-relaxed text-white/80">
                  {currentNews.desc}
                </p>
              </div>
            </Link>

            {/* CARD 2: INSTAGRAM SOCIAL PROOF */}
            <div className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md transition-transform hover:bg-white/20 md:w-auto md:pr-8">
              {/* Avatares */}
              <div className="flex shrink-0 -space-x-3">
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
                {/* Indicador de quantidade */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20 bg-[#C1F12E] text-[10px] font-bold text-[#0F2830]">
                  5k+
                </div>
              </div>

              {/* Texto Instagram */}
              <div className="text-left">
                <div className="mb-1 flex items-center gap-1">
                  <Instagram className="h-3 w-3 text-white/70" />
                  <span className="text-[10px] font-bold tracking-wide text-white/50 uppercase">
                    Instagram
                  </span>
                </div>
                <p className="font-montserrat text-xs leading-snug text-white">
                  Mais de{" "}
                  <span className="font-bold text-[#C1F12E]">
                    +5.900 seguidores
                  </span>{" "}
                  só no Instagram, vem com a gente!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
