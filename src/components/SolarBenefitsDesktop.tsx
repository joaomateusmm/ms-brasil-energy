"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SolarBenefitsSection() {
  const solarContainerRef = useRef<HTMLDivElement>(null);
  const solarWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 1. BLINDAGEM PRINCIPAL:
    // Se a div container ou o wrapper ainda não existem (são null), CANCELA TUDO.
    // Isso impede que o GSAP tente buscar coisas dentro de "null".
    if (!solarContainerRef.current || !solarWrapperRef.current) return;

    // Registra o plugin aqui dentro ou fora, mas garanta que ele esteja registrado
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(solarContainerRef);
      const cards = q(".card");
      const wrapper = solarWrapperRef.current; // Já checamos lá em cima, mas o TS gosta de garantir

      if (!wrapper) return;

      const getScrollAmount = () => {
        const wrapperWidth = wrapper.scrollWidth;
        // Adicionamos uma pequena folga para garantir que o último card estacione bem
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

      // 2. BLINDAGEM DA INTRO:
      // Só cria a timeline se o texto de intro foi encontrado pelo seletor 'q'
      if (introSection.length > 0 && introElements.length > 0) {
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
      }

      // --- CARDS ---
      // O forEach não quebra se o array for vazio, mas é bom saber que ele roda seguro
      if (cards.length > 0) {
        (cards as HTMLElement[]).forEach((card, index) => {
          const img = card.querySelector(".img");
          const texts = card.querySelector(".texts");
          const textChildren = texts ? texts.children : [];

          const triggerConfig: ScrollTrigger.Vars = {
            trigger: index === 0 ? solarContainerRef.current : card,
            // Ajuste no start para o último card não demorar a aparecer
            start: index === 0 ? "top center" : "left 95%",
            end: "center center",
            scrub: 0.5,
          };

          if (index !== 0) {
            triggerConfig.containerAnimation = tween;
          }

          const tl = gsap.timeline({ scrollTrigger: triggerConfig });

          // 1. TORNA O CARD VISÍVEL (Independente de ter imagem ou não)
          tl.to(card, { autoAlpha: 1, duration: 0.5 });

          // 2. ANIMA A IMAGEM (Apenas se ela existir)
          if (img) {
            tl.fromTo(
              img,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
              "<",
            );
          }

          // 3. ANIMA OS TEXTOS
          if (texts) {
            tl.fromTo(
              texts,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.5 },
              "-=0.4",
            );
          }

          if (textChildren.length > 0) {
            tl.fromTo(
              textChildren,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.2)",
              },
              "-=0.8",
            );
          }
        });
      }

      if (solarContainerRef.current) {
        ScrollTrigger.create({
          trigger: solarContainerRef.current,
          start: "top top",
          // O final do scroll deve ser exatamente o tamanho que o wrapper corre
          end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
          pin: true,
          animation: tween,
          scrub: 0.5,
          invalidateOnRefresh: true,
        });
      }
    }, solarContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="solar">
      <div
        ref={solarContainerRef}
        className="page-2 relative z-20 flex h-screen w-full items-center overflow-hidden bg-[#f4f4f4]"
      >
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
                <span className="highlight text-shadow-lg-light text-emerald-500 italic">
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
                <h1 className="number m-0 text-[3.5rem] font-bold text-emerald-500 text-shadow-md">
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
                Transforme sua conta de luz em apenas uma taxa mínima.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="card card-2 invisible relative z-40 flex h-[600px] w-[20vw] shrink-0 translate-y-[100px] flex-col opacity-0">
            <div className="texts w-full opacity-0">
              <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px]">
                <h1 className="number m-0 text-[3.5rem] font-bold text-emerald-500 text-shadow-md">
                  02.
                </h1>
                <h1 className="title m-0 text-end text-[1.8rem] font-bold text-gray-800 text-shadow-md">
                  Imune a inflação energética
                </h1>
              </div>
              <p className="desc m-0 -mt-1 mb-3 text-[14px] font-medium text-[#8b8b8b]">
                Diga adeus às bandeiras vermelhas e aos aumentos abusivos da
                concessionária.
              </p>
            </div>
            <div className="img img-2 mb-5 h-[300px] w-full rounded-[10px] bg-[url('/assets/page2/img-2.webp')] bg-cover bg-center"></div>
          </div>

          {/* CARD 3 */}
          <div className="card card-3 invisible relative z-40 flex h-[600px] w-[28vw] shrink-0 flex-col opacity-0">
            <div className="img img-3 mb-5 h-[500px] w-full rounded-[10px] bg-[url('/assets/page2/img-3.webp')] bg-cover bg-center"></div>
            <div className="texts w-full opacity-0">
              <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px]">
                <h1 className="number m-0 text-[3.5rem] font-bold text-emerald-500 text-shadow-md">
                  03.
                </h1>
                <h1 className="title m-0 text-end text-[1.8rem] font-bold text-gray-800 text-shadow-md">
                  Retorno Superior a Outros Investimentos
                </h1>
              </div>
              <p className="desc m-0 text-[14px] font-medium text-[#8b8b8b]">
                O sistema se paga sozinho com a economia gerada, com um Payback
                médio de 18 meses a 2 anos.
              </p>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="card card-4 invisible relative z-40 flex h-[600px] w-[17vw] shrink-0 -translate-y-[0px] flex-col opacity-0">
            <div className="img img-4 mb-5 h-[400px] w-full rounded-[10px] bg-[url('/assets/page2/img-4.webp')] bg-cover bg-center"></div>
            <div className="texts w-full opacity-0">
              <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px]">
                <h1 className="number m-0 text-[3.5rem] font-bold text-emerald-500 text-shadow-md">
                  04.
                </h1>
                <h1 className="title m-0 text-end text-[1.8rem] font-bold text-gray-800 text-shadow-md">
                  Valorização do seu Imóvel
                </h1>
              </div>
              <p className="desc m-0 text-[14px] font-medium text-[#8b8b8b]">
                Casas e empresas com energia solar valem, em média, 10% a mais
                no mercado.
              </p>
            </div>
          </div>

          {/* CARD 5 */}
          <div className="card card-4 invisible relative z-40 flex h-[600px] w-[25vw] shrink-0 -translate-y-[24px] flex-col opacity-0">
            <div className="texts w-full opacity-0">
              <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px]">
                <h1 className="number m-0 text-[3.5rem] font-bold text-emerald-500 text-shadow-md">
                  05.
                </h1>
                <h1 className="title m-0 text-end text-[1.8rem] font-bold text-gray-800 text-shadow-md">
                  Tecnologia de Longa Duração
                </h1>
              </div>
              <p className="desc m-0 mb-3 text-[14px] font-medium text-[#8b8b8b]">
                Nossos painéis são projetados para durar mais de 25 anos com
                eficiência máxima.
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
                  <span className="highlight font-clash-display text-emerald-500 italic text-shadow-md">
                    o futuro é solar!
                  </span>
                </h1>
              </div>
              <p className="desc m-0 mb-3 text-end text-[14px] font-medium text-[#8b8b8b]">
                Ajude o planeta e gaste menos no final do mês.
              </p>
              <Image
                src="/assets/page2/logo-preto.webp"
                alt="Logo MS Brasil Energy"
                width={180}
                height={180}
                className="mt-5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
