"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import ScrollVelocity from "@/components/ScrollVelocity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Importa do Shadcn

const SolarModel3D = dynamic(() => import("@/components/SolarModel3D"), {
  ssr: false,
});

export default function ModelSectionMobile() {
  const specs = [
    {
      id: "item-1",
      title: "Vidro Solar",
      desc: "A camada superior de vidro temperado que protege as células contra impactos e danos externos.",
    },
    {
      id: "item-2",
      title: "Moldura de Alumínio",
      desc: "Estrutura externa que garante robustez, proteção contra deformações e facilita o transporte.",
    },
    {
      id: "item-3",
      title: "Encapsulante - EVA",
      desc: "Camadas de Etileno Acetato de Vinila (EVA) que envolvem as células, protegendo-as da umidade.",
    },
    {
      id: "item-4",
      title: "BackSheet",
      desc: "A camada plástica na parte de trás que oferece proteção elétrica e ambiental.",
    },
    {
      id: "item-5",
      title: "Células Fotovoltaicas",
      desc: "O núcleo da placa, são as células de silício que convertem a luz solar em eletricidade.",
    },
  ];

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center bg-[#191919] pt-12 pb-12">
      {/* Título de Fundo (ScrollVelocity) */}
      <div className="pointer-events-none absolute flex translate-y-[150px] flex-col items-start justify-center gap-10 text-center opacity-20 md:flex-row">
        <div>
          <h2 className="font-clash-display mb-6 text-5xl leading-55 font-semibold text-shadow-2xs">
            <ScrollVelocity
              texts={["Nossos Projetos", "Deslize para Baixo"]}
              velocity={50}
              className="custom-scroll-text text-5xl text-white/40 md:text-[150px]"
            />
          </h2>
        </div>
      </div>

      {/* Modelo 3D */}
      <div className="relative z-10 mt-10 h-[350px] w-full">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <span className="animate-pulse text-white/20">Carregando...</span>
            </div>
          }
        >
          <SolarModel3D />
        </Suspense>
      </div>

      {/* Lista de Especificações (Accordion Shadcn) */}
      <div className="z-10 mt-8 w-full max-w-md px-6">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {specs.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              // Estilização do Item (Borda amarela à esquerda e fundo sutil)
              className="border-b-0 border-l-2 border-[#ffd700] px-4 transition-all "
            >
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="font-montserrat text-left text-lg font-medium tracking-wider text-white">
                  {item.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm font-medium text-white/70">
                {item.desc}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
