"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";

export default function SolarBenefitsMobile() {
  const sectionRef = useRef<HTMLElement>(null);

  // ANIMAÇÃO DOS CARDS (Imagem -> Texto)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Seleciona todos os cards
      const cards = gsap.utils.toArray<HTMLElement>(".benefit-card");

      cards.forEach((card, index) => {
        // Define a direção (Esquerda ou Direita)
        const xOffset = index % 2 === 0 ? -50 : 50;

        // Seleciona os elementos internos do card atual
        const imageContainer = card.querySelector(".benefit-image");
        const textContainer = card.querySelector(".benefit-text");

        // Cria uma timeline para sequenciar: Imagem -> Texto
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Inicia quando o topo do card entra na tela
            toggleActions: "play none none reverse",
          },
        });

        // 1. Anima a Imagem
        tl.fromTo(
          imageContainer,
          { opacity: 0, x: xOffset },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          },
        );
        tl.fromTo(
          textContainer,
          { opacity: 0, x: xOffset }, // O texto vem da mesma direção
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8", // Começa 0.2s APÓS o início da imagem (1s - 0.8s = 0.2s de "atraso visual")
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      id: "01",
      title: "Redução de até 85% na Conta",
      desc: "Pare de alugar energia e comece a gerar a sua própria. Transforme sua conta de luz em apenas uma taxa mínima.",
      img: "/assets/page2/img-1.webp",
    },
    {
      id: "02",
      title: "Imune a inflação energética",
      desc: "Diga adeus às bandeiras vermelhas e aos aumentos abusivos da concessionária.",
      img: "/assets/page2/img-2.webp",
    },
    {
      id: "03",
      title: "Retorno Superior à Poupança",
      desc: "O sistema se paga sozinho com a economia gerada (Payback médio de 3 a 5 anos).",
      img: "/assets/page2/img-3.webp",
    },
    {
      id: "04",
      title: "Valorização do seu Imóvel",
      desc: "Casas e empresas com energia solar valem, em média, 10% a mais no mercado.",
      img: "/assets/page2/img-4.webp",
    },
    {
      id: "05",
      title: "Tecnologia de Longa Duração",
      desc: "Nossos painéis são projetados para durar mais de 25 anos com eficiência máxima.",
      img: "/assets/page2/img-5.webp",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="solar-mobile"
      className="relative w-full overflow-hidden bg-[#f4f4f4] px-6 py-16"
    >
      {/* INTRODUÇÃO (Pode ter uma animação simples também se quiser) */}
      <div className="mb-12 flex flex-col gap-4">
        <span className="text-xs font-semibold tracking-[3px] text-gray-800 uppercase overline">
          Energia do Futuro
        </span>
        <h1 className="text-4xl leading-tight font-bold text-gray-800">
          Que vale a pena, <br />
          <span className="text-emerald-500 italic">você já sabe.</span>
        </h1>
        <p className="text-lg text-[#5a5a5a]">
          Mas separamos aqui as{" "}
          <strong className="text-gray-800">principais vantagens</strong> para
          você transformar sua economia.
        </p>
      </div>

      {/* LISTA DE CARDS */}
      <div className="flex flex-col gap-16">
        {benefits.map((item) => (
          <div
            key={item.id}
            className="benefit-card flex flex-col gap-4" // Wrapper principal
          >
            {/* Imagem (Alvo 1) */}
            <div className="benefit-image relative h-64 w-full overflow-hidden rounded-2xl opacity-0 shadow-lg">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Texto (Alvo 2) */}
            <div className="benefit-text opacity-0">
              <div className="mb-2 flex items-center gap-4">
                <span className="text-4xl font-bold text-emerald-500 drop-shadow-sm">
                  {item.id}.
                </span>
                <h2 className="text-xl leading-tight font-bold text-gray-800">
                  {item.title}
                </h2>
              </div>
              <p className="text-sm font-medium text-[#8b8b8b]">{item.desc}</p>
            </div>
          </div>
        ))}

        {/* CARD FINAL (Convite) */}
        <div className="mt-8 flex flex-col items-center gap-6 text-center">
          <h2 className="font-clash-display text-4xl font-bold text-gray-800">
            Vem com a gente, <br />
            <span className="text-emerald-500 italic">o futuro é solar!</span>
          </h2>
          <p className="text-sm font-medium text-[#8b8b8b]">
            Ajude o planeta e gaste menos no final do mês.
          </p>
          <div className="relative h-32 w-32 overflow-hidden">
            <Image
              src="/assets/page2/logo-preto.webp"
              alt="Logo Solar Energy"
              width={180}
              height={180}
              className="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
