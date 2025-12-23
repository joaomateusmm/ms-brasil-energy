"use client";

import { ChevronsDown, PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";

// Lista de Produtos
const products = [
  {
    id: 1,
    name: "Painéis Solares",
    description: "Fotovoltaicos Monocristalinos",
    image: "/assets/page5/products/paineis.png",
    hoverImage: "/assets/page5/products/paineis-hover.webp",
  },
  {
    id: 2,
    name: "Inversores",
    description: "Conversão CC para CA",
    image: "/assets/page5/products/inversores.png",
    hoverImage: "/assets/page5/products/inversores-hover.jpg",
  },
  {
    id: 3,
    name: "Estruturas",
    description: "Suporte e Fixação",
    image: "/assets/page5/products/estruturas.png",
    hoverImage: "/assets/page5/products/estruturas-hover.jpeg",
  },
  {
    id: 4,
    name: "Baterias",
    description: "Armazenamento Off-Grid",
    image: "/assets/page5/products/baterias.png",
    hoverImage: "/assets/page5/products/baterias-hover.webp",
  },
  {
    id: 5,
    name: "Controladores",
    description: "Gestão de Carga",
    image: "/assets/page5/products/controladores.png",
    hoverImage: "/assets/page5/products/controladores-hover.webp",
  },
  {
    id: 6,
    name: "Cabos e Conectores",
    description: "Conexões Seguras",
    image: "/assets/page5/products/cabos.png",
    hoverImage: "/assets/page5/products/cabos-hover.webp",
  },
  {
    id: 7,
    name: "Protetores de Surto",
    description: "Segurança DPS",
    image: "/assets/page5/products/protetores.png",
    hoverImage: "/assets/page5/products/protetores-hover.jpg",
  },
  {
    id: 8,
    name: "Monitoramento",
    description: "Software e Hardware",
    image: "/assets/page5/products/monitoramento.png",
    hoverImage: "/assets/page5/products/monitoramento-hover.jpg",
  },
];

export default function HeroSection5() {
  // FUNÇÃO DE SCROLL (Simples e Compatível com Lenis)
  const handleScrollToSimulacao = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById("simulacao");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative z-50 w-full bg-[#191919] px-8 pt-20 pb-20 text-white md:px-20">
      {/* --- Cabeçalho da Secção --- */}
      <div className="mx-28 -mt-6 text-center">
        <p className="mb-4 text-lg text-white/60 md:text-xl">
          Dê uma olhada no nosso catálogo, todos os produtos com a qualidade
          Solar Energy que você merece.
        </p>
      </div>

      {/* --- Grid de Produtos --- */}
      <div className="mx-28 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          // Wrapper para alinhar Card + Texto verticalmente
          <div key={product.id} className="flex flex-col gap-4">
            {/* 1. O CARD (Apenas Imagens) */}
            <div className="group relative h-[420px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#222222] transition-all duration-200 hover:border-[#ffd700]">
              {/* Imagem Padrão (Flutuando no centro) */}
              <div className="relative flex h-full w-full items-center justify-center p-8">
                <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </div>

              {/* ANIMAÇÃO DE HOVER (Cortina) */}
              <div className="ease absolute inset-0 z-20 h-full w-full -translate-y-full bg-[#111] transition-transform delay-150 duration-500 group-hover:translate-y-0">
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} aplicado`}
                  fill
                  className="rounded-b-4xl object-cover opacity-90"
                />
              </div>
            </div>

            {/* 2. INFORMAÇÕES (Fora do Card) */}
            <div className="flex flex-col items-end px-2 text-right">
              <span className="mb-1 text-xs font-bold tracking-wider text-[#ffd700] uppercase">
                {product.description}
              </span>
              <h3 className="font-clash-display text-3xl leading-none font-semibold text-white">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* --- RODAPÉ COM CHAMADA PARA AÇÃO --- */}
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center gap-6 pt-24 text-center">
        <h1 className="font-clash-display w-full max-w-[400px] text-4xl font-semibold">
          Quer um atendimento personalizado?
        </h1>
        <p className="max-w-[350px] text-[#ffd700]">
          Entre em contato conosco para soluções sob medida para o seu projeto.
        </p>

        <div className="flex items-center justify-center gap-5">
          <button className="mt-2 flex cursor-pointer items-center gap-2 rounded-xl bg-gray-800 px-6 py-4 font-semibold duration-300 hover:scale-105 hover:active:scale-95">
            <PhoneCall className="h-4 w-4 text-white/90" />
            Contate-nos
          </button>
          <a
            href="#simulacao"
            onClick={handleScrollToSimulacao}
            className="group mt-2 flex cursor-pointer items-center gap-2 rounded-xl bg-gray-800 px-6 py-4 font-semibold duration-300 hover:scale-105 hover:active:scale-95"
            aria-label="Ir para simulação"
          >
            <ChevronsDown className="h-5 w-5 -rotate-90 transform text-white/90 duration-300 group-hover:-rotate-180" />
            Fazer Simulação
          </a>
        </div>
      </div>
    </section>
  );
}
