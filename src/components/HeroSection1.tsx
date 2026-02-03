"use client";

import gsap from "gsap";
import { ChevronsRight, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const newsData = [
  {
    title: "Energia solar cresce 31,4% em Janeiro.",
    desc: "A produção de energia solar das usinas fotovoltaicas conectadas ao Sistema Interligado Nacional (SIN) cresceu 31,4%...  Ler Mais. ",
    image: "/assets/page2/img-3.webp",
    link: "https://www.portalsolar.com.br/noticias/operacao-e-expansao/geracao-de-energia-solar-cresce-31-4-na-primeira-quinzena-de-janeiro",
  },
  {
    title: "Taxação do sol: o que é e como funciona essa tarifa?",
    desc: "A taxação do sol não é um imposto sobre a energia solar. Trata-se da cobrança gradual pelo uso dos fios de distribuição...  Ler Mais. ",
    image: "/assets/page2/img-1.webp",
    link: "https://www.portalsolar.com.br/taxacao-do-sol",
  },
  {
    title: "Sol mais forte, atenção redobra.",
    desc: "O verão é marcado por sol intenso, dias mais longos e temperaturas elevadas. Para o setor de energia solar, esse período ...  Ler Mais.",
    image: "/assets/page2/img-2.webp",
    link: "https://www.portalsolar.com.br/noticias/operacao-e-expansao/oem/sol-forte-atencao-redobrada",
  },
];

export default function HeroSection1() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState<boolean>(true);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Estados para animação suave de troca de texto
  const [fadeClass, setFadeClass] = useState("opacity-100");

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Inicia o fade out
      setFadeClass("opacity-0");

      // 2. Espera a animação de saída terminar (300ms) para trocar os dados
      setTimeout(() => {
        setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
        // 3. Inicia o fade in
        setFadeClass("opacity-100");
      }, 300);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentNews = newsData[currentNewsIndex];

  useEffect(() => {
    const target = heroSectionRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setHeroVisible(entry.isIntersecting));
      },
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    // 1. BLINDAGEM GSAP
    if (!heroVisible || !heroContainerRef.current) return;

    // Verifica se os elementos realmente existem antes de animar
    const elements = heroContainerRef.current.querySelectorAll(".hero-anim");
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
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
      className="relative min-h-screen w-full overflow-hidden bg-gray-900 pb-20 lg:pb-0"
    >
      {/* BACKGROUNDS (LCP - Priority True) */}
      <div className="absolute inset-0 z-0">
        {/* MOBILE BACKGROUND */}
        <div className="relative h-full w-full lg:hidden">
          <Image
            src="/assets/page1/bg-mobile.webp"
            alt="Hero Mobile"
            fill
            priority={true}
            // CORREÇÃO: Dizemos que até 1024px é 100vw, acima disso é insignificante (1px)
            sizes="(max-width: 1024px) 100vw, 1px"
            className="object-cover opacity-65"
          />
        </div>

        {/* DESKTOP BACKGROUND */}
        <div className="relative hidden h-full w-full lg:block">
          <Image
            src="/assets/page1/bg-pc.jpg"
            alt="Hero Desktop"
            fill
            priority={true}
            // CORREÇÃO: Dizemos que a partir de 1024px é 100vw, abaixo disso é insignificante
            sizes="(min-width: 1024px) 100vw, 1px"
            className="object-cover opacity-80"
          />
        </div>
      </div>

      {heroVisible && (
        <div
          ref={heroContainerRef}
          className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 pt-35 text-center md:pt-45"
        >
          <h1 className="hero-anim font-montserrat max-w-4xl text-4xl leading-tight font-bold tracking-tight text-white opacity-0 md:max-w-7xl md:text-6xl lg:text-7xl">
            Criando um Futuro Sustentável com Energia Solar.
          </h1>

          <p className="hero-anim font-montserrat text-md mt-6 max-w-2xl text-white/90 opacity-0 md:text-xl">
            Descubra como a energia solar pode transformar a sua casa ou
            empresa, reduzindo custos em até 85%.
          </p>

          <div className="hero-anim mt-8 opacity-0">
            <a
              href="#projetos"
              className="group flex items-center gap-2 rounded-3xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/20 duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              <span className="font-montserrat">Conheça Nosso Trabalho</span>
              <ChevronsRight className="h-5 w-5 duration-300 group-hover:rotate-90" />
            </a>
          </div>

          <div className="hero-anim mt-16 flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 opacity-0 md:mt-24 md:flex-row md:justify-center">
            <div className="flex flex-col items-start justify-center">
              <p className="font-montserrat mt-2 mb-1 text-xs font-medium text-neutral-300">
                Últimas Notícias - Clique para ler:
              </p>

              {/* CARD 1: NOTÍCIAS */}
              <Link
                href={currentNews.link}
                className="animate-in fade-in flex h-[160px] w-full cursor-pointer items-center gap-5 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/20 md:w-96 md:pr-8"
              >
                {/* CONTAINER DA IMAGEM RELATIVO */}
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/20">
                  <Image
                    src={currentNews.image}
                    alt="Notícia"
                    fill
                    sizes="(max-width: 768px) 80px, 80px" // Tamanho pequeno e fixo
                    className={`object-cover transition-opacity duration-300 ${fadeClass}`}
                  />
                </div>

                <div className="flex h-full flex-col justify-center text-left">
                  <div
                    className={`transition-opacity duration-300 ${fadeClass}`}
                  >
                    <h3 className="font-montserrat line-clamp-1 text-base font-bold text-emerald-500">
                      {currentNews.title}
                    </h3>
                    <div className="my-2 w-full border-t border-white/10"></div>
                    <p className="font-montserrat line-clamp-3 text-xs leading-relaxed text-white/80">
                      {currentNews.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* CARD 2: INSTAGRAM */}
            <Link
              href="https://www.instagram.com/msbrasilenergy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[160px] w-full cursor-pointer items-center gap-5 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-all duration-500 hover:bg-white/20 md:mt-6 md:w-96 md:pr-8"
            >
              <div className="flex shrink-0 -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/20 bg-gray-500"
                  >
                    {/* AVATARES PEQUENOS */}
                    <Image
                      src={`/assets/page1/avatar-${i}.webp`}
                      alt="Avatar"
                      fill
                      sizes="40px" // Tamanho fixo muito pequeno
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20 bg-emerald-500 text-[10px] font-bold text-[#0F2830]">
                  5k+
                </div>
              </div>

              <div className="flex w-full flex-col justify-center text-left">
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-emerald-500" />
                  <span className="font-montserrat text-sm font-bold text-emerald-500 uppercase">
                    Instagram
                  </span>
                </div>
                <div className="my-2 w-full border-t border-white/10"></div>
                <p className="font-montserrat text-xs leading-relaxed text-white/80">
                  Mais de{" "}
                  <span className="font-bold text-white">
                    +5.900 seguidores
                  </span>{" "}
                  só no Instagram, vem com a gente!
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
