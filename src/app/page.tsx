"use client";

// --- 1. IMPORTS GERAIS E BIBLIOTECAS ---
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronsDown, ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// --- 2. IMPORTS DE COMPONENTES ---
import Footer from "@/components/footer";
import HeaderDesktop from "@/components/HeaderDesktop";
import RightHeroSection from "@/components/HeroSection2";
import HeroSection5 from "@/components/HeroSection5";
import ImageTrail from "@/components/ImageTrail";
// Import do Componente de Aviso Mobile
import MobileWarning from "@/components/MobileWarning";
import ModelSection from "@/components/ModelSection";
import PartnersSection from "@/components/PartnersSection";
import Simulator from "@/components/Simulator";
import VideoSection from "@/components/VideoSection";

// Registra o plugin globalmente
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // =====================================================================
  //  LÓGICA DA PARTE 1: HERO SECTION
  // =====================================================================
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState<boolean>(true);

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

  useLayoutEffect(() => {
    if (!heroVisible || !heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".hero-anim");

      gsap.fromTo(
        elements,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5,
        },
      );
    }, heroContainerRef);

    return () => ctx.revert();
  }, [heroVisible]);

  // =====================================================================
  //  LÓGICA DA PARTE 2: SOLAR SECTION (Correção de Scroll)
  // =====================================================================
  const solarContainerRef = useRef<HTMLDivElement>(null);
  const solarWrapperRef = useRef<HTMLDivElement>(null);

  // Configuração do Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    // Removemos lagSmoothing(0) para evitar pulos em carregamentos pesados

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  // Animação GSAP
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(solarContainerRef);
      const cards = q(".card");
      const wrapper = solarWrapperRef.current;

      if (!wrapper) return;

      // Cálculo preciso da largura
      const getScrollAmount = () => {
        const wrapperWidth = wrapper.scrollWidth;
        return -(wrapperWidth - window.innerWidth);
      };

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
      });

      // --- INTRO ---
      const introSection = q(".intro-text");
      const introElements = q(
        ".intro-text .overline, .intro-text .main-title, .intro-text .sub-text, .intro-text .scroll-hint",
      );

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: solarContainerRef.current,
          start: "top 60%",
          end: "top top",
          toggleActions: "play none none reverse",
        },
      });

      introTl.set(introSection, { autoAlpha: 1 });
      introTl.from(introElements, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // --- CARDS ---
      (cards as HTMLElement[]).forEach((card, index) => {
        const img = card.querySelector(".img");
        const texts = card.querySelector(".texts");
        const textChildren = texts ? texts.children : [];

        // CORREÇÃO AQUI: Mudámos de 'let' para 'const'
        const triggerConfig: ScrollTrigger.Vars = {
          trigger: index === 0 ? solarContainerRef.current : card,
          start: index === 0 ? "top center" : "left 80%",
          end: "center center",
          scrub: 0.5,
        };

        if (index !== 0) {
          triggerConfig.containerAnimation = tween;
        }

        const tl = gsap.timeline({ scrollTrigger: triggerConfig });

        tl.to(card, { autoAlpha: 1, duration: 0.1 });

        tl.fromTo(
          img,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "<",
        );

        if (texts) {
          tl.fromTo(
            texts,
            { opacity: 0 },
            { opacity: 1, duration: 0.1 },
            "-=0.8",
          );
        }

        if (textChildren.length > 0) {
          tl.fromTo(
            textChildren,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "back.out(1.2)",
            },
            "-=0.8",
          );
        }
      });

      // --- PINNING OTIMIZADO ---
      ScrollTrigger.create({
        trigger: solarContainerRef.current,
        start: "top top",
        end: () => `+=${wrapper.scrollWidth - window.innerWidth + 100}`,
        pin: true,
        animation: tween,
        scrub: 0.5,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }, solarContainerRef);

    return () => ctx.revert();
  }, []);

  // =====================================================================
  //  LÓGICA DA PARTE 3: HERO SECTION 3
  // =====================================================================
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

  // =====================================================================
  //  RENDERIZAÇÃO (JSX)
  // =====================================================================
  return (
    <main className="scroll-smooth text-white">
      {/* ------------------------------------------------ */}
      {/* 1. VISÃO MOBILE (Aviso bloqueia o resto)         */}
      {/* block lg:hidden -> Aparece no Mobile, Some no PC */}
      {/* ------------------------------------------------ */}
      <div className="block lg:hidden">
        <MobileWarning />
      </div>

      {/* ------------------------------------------------ */}
      {/* 2. VISÃO DESKTOP (Site completo)                 */}
      {/* hidden lg:block -> Some no Mobile, Aparece no PC */}
      {/* ------------------------------------------------ */}
      <div className="hidden w-full overflow-x-clip lg:block">
        {/* --- INÍCIO DA PARTE 1 (HeroSection) --- */}
        <section
          ref={heroSectionRef}
          className="page-1 relative z-10 flex h-screen w-full flex-row items-center justify-between px-18 text-[#191919]"
        >
          {heroVisible && (
            <>
              <HeaderDesktop />

              {/* CONTEÚDO ESQUERDA (Fixo) */}
              <div
                ref={heroContainerRef}
                className="hero-foreground bottom-18 left-18 z-40"
              >
                <div className="flex flex-col gap-6">
                  {/* Botão Explorar Site */}
                  <div className="hero-anim opacity-0">
                    <a
                      href="#solar"
                      className="group flex w-[190px] cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/10 bg-white/5 px-5 py-3 text-white/90 shadow-md backdrop-blur-xs duration-200 hover:bg-white/10"
                      aria-label="Explorar site"
                    >
                      <ChevronsDown className="h-5 w-5 -rotate-90 transform text-white/90 duration-300 group-hover:rotate-0" />
                      Fazer Simulação
                    </a>
                  </div>

                  {/* Título Principal */}
                  <h1 className="hero-anim font-clash-display text-[84px] leading-24 font-semibold text-white opacity-0">
                    Reduza em até 85%
                    <br /> sua conta de luz
                  </h1>

                  {/* Parágrafo Descritivo */}
                  <p className="hero-anim -mt-3 mb-3 text-2xl text-white opacity-0">
                    Simulador{" "}
                    <span className="text-yellow-300">Solar Energy.</span> Faça
                    sua simulação gratuita e descubra<br></br> como economizar
                    na sua conta de luz com energia solar.
                  </p>

                  {/* Formulário */}
                  <div className="hero-anim opacity-0">
                    <form
                      action="#"
                      className="flex h-16 w-[400px] items-center gap-3 rounded-full bg-white px-2 shadow-md"
                    >
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Coloque seu telefone aqui..."
                        aria-label="Fazer Orçamento"
                        required
                        className="flex-1 rounded-full bg-transparent px-4 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none"
                      />
                      <button
                        type="submit"
                        className="ml-1 cursor-pointer rounded-full bg-gray-800 px-7 py-3.5 text-sm font-semibold text-white shadow-md duration-200 hover:bg-gray-900 hover:brightness-90 hover:active:scale-95"
                      >
                        Fazer Orçamento
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* CONTEÚDO DIREITA (Importado) */}
              <RightHeroSection />
            </>
          )}
        </section>
        {/* --- FIM DA PARTE 1 --- */}

        {/* Inicio do Simulator */}

        <section className="h-screen bg-[#F4F4F4]">
          <Simulator />
        </section>

        {/* --- INÍCIO DA PARTE 2 (SolarSection) --- */}
        <section id="solar">
          <div
            ref={solarContainerRef}
            className="page-2 relative z-20 flex h-screen w-full items-center overflow-hidden bg-[#f4f4f4]"
          >
            <div
              style={{
                height: "500px",
                position: "relative",
                overflow: "hidden",
              }}
              className="absolute inset-0 z-30 h-full w-full overflow-hidden"
            >
              <ImageTrail
                items={[
                  "/assets/page2/trail/trail-1.png",
                  "/assets/page2/trail/trail-5.png",
                  "/assets/page2/trail/trail-8.png",
                  "/assets/page2/trail/trail-3.png",
                  "/assets/page2/trail/trail-4.png",
                  "/assets/page2/trail/trail-2.png",
                  "/assets/page2/trail/trail-7.png",
                  "/assets/page2/trail/trail-6.png",
                ]}
                variant={5}
              />
            </div>

            <div
              ref={solarWrapperRef}
              className="horizontal-wrapper relative flex h-full flex-nowrap items-center gap-[10vw] pr-[25vw] pl-[12vw] will-change-transform"
            >
              {/* INTRO TEXTO */}
              <div className="intro-text invisible z-40 -mt-[50px] flex w-[35vw] shrink-0 flex-col items-start justify-center gap-10 opacity-0 lg:w-[40vw]">
                <div className="text-content flex flex-col gap-[15px]">
                  <span className="mb-[5px] text-[0.85rem] font-semibold tracking-[3px] text-gray-800 uppercase overline">
                    Energia do Futuro
                  </span>

                  <h1 className="main-title text-shadow-lg-dark m-0 text-[3.2rem] leading-[1.1] font-bold text-gray-800 lg:text-[4.5rem]">
                    Que vale a pena,
                    <br />
                    <span className="highlight text-shadow-lg-light text-[#ffd700] italic">
                      você já sabe.
                    </span>
                  </h1>
                  <p className="sub-text m-0 max-w-[90%] text-lg leading-[1.3] font-normal text-[#5a5a5a]">
                    Mas separamos aqui as{" "}
                    <strong className="font-semibold text-gray-800">
                      principais vantagens
                    </strong>
                    <br />
                    para você transformar sua economia.
                  </p>
                </div>
                <div className="scroll-hint group flex items-center gap-[15px] opacity-70">
                  <div className="arrow-icon flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#303030] shadow-md duration-300 group-hover:translate-x-1">
                    <ChevronsDown className="h-6 w-6 stroke-2 duration-300 group-hover:-rotate-90" />
                  </div>
                  <span className="cursor-default text-[0.8rem] tracking-[2px] text-[#5a5a5a] uppercase duration-300 group-hover:tracking-[3px]">
                    Deslize para ver
                  </span>
                </div>
              </div>

              {/* CARD 1 */}
              <div className="card card-1 invisible relative z-40 flex h-[600px] w-[20vw] shrink-0 flex-col opacity-0">
                <div className="img img-1 mb-5 h-[300px] w-full rounded-[10px] bg-[url('/assets/page2/img-1.webp')] bg-cover bg-center"></div>
                <div className="texts w-full opacity-0">
                  <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px]">
                    <h1 className="number m-0 text-[3.5rem] font-bold text-[#ffd700] text-shadow-md">
                      01.
                    </h1>
                    <h1 className="title m-0 text-end text-[1.8rem] font-bold text-gray-800 text-shadow-md">
                      Redução de até
                      <br />
                      85% na Conta
                    </h1>
                  </div>
                  <p className="desc m-0 text-[14px] font-medium text-[#8b8b8b]">
                    Pare de alugar energia e comece a gerar a sua própria.
                    Transforme sua conta de luz em apenas uma taxa mínima e
                    sinta o alívio no orçamento mensal imediatamente após a
                    instalação.
                  </p>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="card card-2 invisible relative z-40 flex h-[600px] w-[20vw] shrink-0 translate-y-[100px] flex-col opacity-0">
                <div className="texts w-full opacity-0">
                  <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px]">
                    <h1 className="number m-0 text-[3.5rem] font-bold text-[#ffd700] text-shadow-md">
                      02.
                    </h1>
                    <h1 className="title m-0 text-end text-[1.8rem] font-bold text-gray-800 text-shadow-md">
                      Imune a inflação energética
                    </h1>
                  </div>
                  <p className="desc m-0 -mt-1 mb-3 text-[14px] font-medium text-[#8b8b8b]">
                    Diga adeus às bandeiras vermelhas e aos aumentos abusivos da
                    concessionária. Com energia solar, você blinda o seu
                    orçamento e sabe exatamente quanto vai gastar pelos próximos
                    25 anos.
                  </p>
                </div>
                <div className="img img-2 mb-5 h-[300px] w-full rounded-[10px] bg-[url('/assets/page2/img-2.webp')] bg-cover bg-center"></div>
              </div>

              {/* CARD 3 */}
              <div className="card card-3 invisible relative z-40 flex h-[600px] w-[28vw] shrink-0 flex-col opacity-0">
                <div className="img img-3 mb-5 h-[500px] w-full rounded-[10px] bg-[url('/assets/page2/img-3.webp')] bg-cover bg-center"></div>
                <div className="texts w-full opacity-0">
                  <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px]">
                    <h1 className="number m-0 text-[3.5rem] font-bold text-[#ffd700] text-shadow-md">
                      03.
                    </h1>
                    <h1 className="title m-0 text-end text-[1.8rem] font-bold text-gray-800 text-shadow-md">
                      Retorno Superior à Poupança
                    </h1>
                  </div>
                  <p className="desc m-0 text-[14px] font-medium text-[#8b8b8b]">
                    O sistema se paga sozinho com a economia gerada (Payback
                    médio de 3 a 5 anos). Após esse período, é lucro líquido
                    direto no seu bolso por décadas. É um investimento melhor
                    que a renda fixa.
                  </p>
                </div>
              </div>

              {/* CARD 4 */}
              <div className="card card-4 invisible relative z-40 flex h-[600px] w-[17vw] shrink-0 -translate-y-[0px] flex-col opacity-0">
                <div className="img img-4 mb-5 h-[400px] w-full rounded-[10px] bg-[url('/assets/page2/img-4.webp')] bg-cover bg-center"></div>
                <div className="texts w-full opacity-0">
                  <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px]">
                    <h1 className="number m-0 text-[3.5rem] font-bold text-[#ffd700] text-shadow-md">
                      04.
                    </h1>
                    <h1 className="title m-0 text-end text-[1.8rem] font-bold text-gray-800 text-shadow-md">
                      Valorização do seu Imóvel
                    </h1>
                  </div>
                  <p className="desc m-0 text-[14px] font-medium text-[#8b8b8b]">
                    Casas e empresas com energia solar valem, em média, 10% a
                    mais no mercado. Além de economizar, você torna seu imóvel
                    mais atraente e valioso para uma futura venda ou locação.
                  </p>
                </div>
              </div>

              {/* CARD 5 */}
              <div className="card card-4 invisible relative z-40 flex h-[600px] w-[25vw] shrink-0 -translate-y-[24px] flex-col opacity-0">
                <div className="texts w-full opacity-0">
                  <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px]">
                    <h1 className="number m-0 text-[3.5rem] font-bold text-[#ffd700] text-shadow-md">
                      05.
                    </h1>
                    <h1 className="title m-0 text-end text-[1.8rem] font-bold text-gray-800 text-shadow-md text-shadow-sm">
                      Tecnologia de Longa Duração
                    </h1>
                  </div>
                  <p className="desc m-0 mb-3 text-[14px] font-medium text-[#8b8b8b]">
                    Nossos painéis são projetados para durar mais de 25 anos com
                    eficiência máxima e exigem manutenção mínima (apenas limpeza
                    básica). Instale hoje e tenha tranquilidade por uma vida.
                  </p>
                </div>
                <div className="img img-4 mb-5 h-[300px] w-full rounded-[10px] bg-[url('/assets/page2/img-5.webp')] bg-cover bg-center"></div>
              </div>

              {/* CARD FINAL */}
              <div className="card card-4 invisible relative z-40 flex h-[600px] w-[25vw] shrink-0 -translate-y-[24px] flex-col opacity-0">
                <div className="texts flex w-full flex-col items-end justify-between opacity-0">
                  <div className="titles my-[10px] flex flex-row items-center gap-[30px]">
                    <h1 className="title font-clash-display m-0 text-end text-[3.3rem] font-bold text-gray-800 text-shadow-md">
                      Vem com a gente,{" "}
                      <span className="highlight font-clash-display text-[#ffd700] italic text-shadow-md">
                        o futuro é solar!
                      </span>
                    </h1>
                  </div>
                  <p className="desc m-0 mb-3 text-end text-[14px] font-medium text-[#8b8b8b]">
                    Ajude o planeta e gaste menos no final do mês, o melhor dos
                    2 mundos. Conheça sobre nós.
                  </p>
                  <Image
                    src="/assets/page1/logo.svg"
                    alt="Logo Solar Energy"
                    width={180}
                    height={180}
                    className="mt-5 rounded-[25px] shadow-md"
                  />
                  <span className="mt-4 mb-[5px] text-[0.85rem] font-semibold tracking-[3px] text-[#8b8b8b] uppercase overline">
                    Energia do Futuro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* --- FIM DA PARTE 2 --- */}

        {/* --- INÍCIO DA PARTE 3 (HeroSection3) --- */}
        <section
          ref={hero3ContainerRef}
          // sticky: Cola no topo para o vídeo passar por cima depois
          // z-0: Fica atrás do vídeo (que será z-50)
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
                  className="textos group z-50 flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-2xl bg-[#00413D] shadow-md duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
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
                  Nossa empresa está totalmente<br></br> comprometida com a
                  causa ambiental.
                </p>
                <button
                  type="button"
                  className="textos group z-50 flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-2xl bg-[#00413D] shadow-md duration-300 hover:shadow-lg active:scale-95"
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
        {/* --- FIM DA PARTE 3 --- */}

        {/* --- DEMAIS SEÇÕES (COMPONENTES ORIGINAIS) --- */}
        <VideoSection />

        <ModelSection />

        <HeroSection5 />

        <PartnersSection />

        <Footer />
      </div>
    </main>
  );
}
