"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import ScrollVelocity from "@/components/ScrollVelocity";

// --- COMPONENTE LABEL COM DESCRIÇÃO MINIMALISTA ---
const Label = ({
  text,
  description,
  top,
  left,
  right,
  align = "left",
  width = "100px",
}: {
  text: string;
  description: string;
  top: string;
  left?: string;
  right?: string;
  align?: "left" | "right";
  width?: string;
}) => {
  return (
    <div
      className="group pointer-events-auto absolute z-50 flex cursor-default flex-col justify-center"
      style={{ top, left, right }}
    >
      <div
        className={`flex items-end gap-0 ${
          align === "right" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* BLOCO DE TEXTO + LINHA */}
        <div
          className={`flex flex-col ${align === "right" ? "items-end" : "items-start"} relative mb-[6px]`}
        >
          {/* Título Principal */}
          <span
            className="mb-1 text-[10px] font-bold tracking-[2px] whitespace-nowrap text-white uppercase transition-colors duration-300 group-hover:text-[#ffd700] md:text-xs"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            {text}
          </span>

          {/* DESCRIÇÃO (Aparece no Hover, por baixo do título) */}
          {/* Mudanças: position absolute bottom-full -> top-full (para aparecer em baixo) 
              Removido bg-black, border, padding. Adicionado text-gray-400. 
          */}
          <div
            className={`pointer-events-none absolute top-full mt-2 w-48 -translate-y-2 text-[12px] leading-tight font-medium text-white/60 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
              align === "right" ? "right-0 text-right" : "left-0 text-left"
            }`}
          >
            {description}
          </div>

          {/* Linha Horizontal */}
          <div
            className="h-[2px] bg-white transition-all duration-300 group-hover:bg-[#ffd700]"
            style={{ width }}
          ></div>
        </div>

        {/* LINHA DIAGONAL */}
        <div
          className={`h-[2px] w-8 origin-left bg-white transition-all duration-300 group-hover:bg-[#ffd700] ${
            align === "right"
              ? "-translate-x-[1px] -translate-y-[6px] rotate-45"
              : "origin-right translate-x-[1px] -translate-y-[6px] -rotate-45"
          }`}
        ></div>
      </div>
    </div>
  );
};

const SolarModel3D = dynamic(() => import("@/components/SolarModel3D"), {
  ssr: false,
});

export default function ModelSection() {
  return (
    <section className="relative z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-[#191919]">
      <div className="pointer-events-none absolute inset-0 mx-auto h-full w-full max-w-[1400px]">
        {/* ESQUERDA */}
        <Label
          text="Moldura de Alumínio"
          description="Estrutura externa que garante robustez, proteção contra deformações e facilita o transporte e a instalação. "
          top="30%"
          left="23%"
          width="120px"
          align="right"
        />
        <Label
          text="BackSheet"
          description="A camada plástica na parte de trás que oferece proteção elétrica e ambiental, variando conforme o tipo de célula utilizada. "
          top="60%"
          left="19%"
          width="85px"
          align="right"
        />

        {/* DIREITA */}
        <Label
          text="Vidro Solar"
          description="A camada superior de vidro temperado que protege as células contra impactos e danos externos."
          top="20%"
          right="16%"
          width="100px"
          align="left"
        />
        <Label
          text="Encapsulante - EVA"
          description="Camadas de Etileno Acetato de Vinila (EVA) que envolvem as células, protegendo-as da umidade, poeira e vibrações, além de uni-las às outras camadas."
          top="42%"
          right="19%"
          width="160px"
          align="left"
        />
        <Label
          text="Células Fotovoltaicas"
          description="O núcleo da placa, são as células de silício (ou outro material semicondutor) que convertem a luz solar em eletricidade pelo efeito fotovoltaico"
          top="82%"
          right="28%"
          width="140px"
          align="left"
        />
      </div>

      <div className="absolute flex flex-col items-start justify-center gap-10 pb-6 text-center md:flex-row">
        <div>
          <h2 className="font-clash-display mb-6 text-5xl leading-55 font-semibold text-shadow-2xs">
            <ScrollVelocity
              texts={["Nossos Produtos", "Deslize para Baixo"]}
              velocity={50}
              className="custom-scroll-text text-5xl text-white/8 md:text-[150px]"
            />
          </h2>
        </div>
      </div>

      <div className="h-full w-full">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <span className="animate-pulse text-white/20">
                A carregar 3D...
              </span>
            </div>
          }
        >
          <SolarModel3D />
        </Suspense>
      </div>
    </section>
  );
}
