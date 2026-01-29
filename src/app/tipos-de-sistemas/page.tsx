"use client";

import { Atom, CheckCircle2, ShieldCheck, Zap, ZapOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import FaqSection from "@/components/FaqSection";
import Footer from "@/components/footer";
import HeaderDesktop from "@/components/HeaderDesktop";
import HeaderMobile from "@/components/HeaderMobile";
import SmoothScroll from "@/components/SmoothScroll";

export default function SystemTypesPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen w-full bg-[#f4f4f4] text-neutral-800">
        {/* --- HEADER --- */}
        <div className="relative z-50">
          <div className="hidden lg:block">
            <HeaderDesktop />
          </div>
          <div className="lg:hidden">
            <HeaderMobile />
          </div>
        </div>

        {/* --- HERO SECTION --- */}
        <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden bg-neutral-900 text-center text-white">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/page1/bg-pc.jpg"
              alt="Telhado Solar"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 pt-20">
            <span className="mb-4 block text-sm font-bold tracking-[0.2em] text-emerald-400 uppercase">
              Conhecimento
            </span>
            <h1 className="font-clash-display mb-6 text-4xl leading-tight font-bold md:text-6xl">
              Tipos de Sistemas <br />
              <span className="text-emerald-500">Fotovoltaicos</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80 md:text-xl">
              Entenda a diferença entre as tecnologias e descubra qual é a ideal
              para a sua necessidade em Mato Grosso do Sul.
            </p>
          </div>
        </section>

        {/* --- CONTEÚDO DOS SISTEMAS --- */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <div className="flex flex-col gap-24 md:gap-40">
            {/* 1. ON-GRID */}
            <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:justify-between">
              {/* Texto */}
              <div className="w-full md:w-1/2">
                <div className="mb-2 flex items-center gap-2 text-emerald-600">
                  <Zap className="h-6 w-6" />
                  <span className="font-bold tracking-wider uppercase">
                    Conectado à Rede
                  </span>
                </div>
                <h2 className="font-clash-display mb-6 text-4xl font-bold text-neutral-900">
                  Sistema Solar{" "}
                  <span className="text-emerald-500">On-Grid</span>
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-neutral-600">
                  O foco aqui é a economia máxima com o menor investimento
                  inicial. É o modelo mais utilizado no Brasil, conectado
                  diretamente à rede da concessionária. O excedente de energia
                  vira créditos para abater na sua conta final.
                </p>

                <ul className="mb-8 space-y-4">
                  <li className="font-montserrat flex cursor-default items-center justify-start gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm duration-300 hover:-translate-y-1">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-emerald-500 shadow-md">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <strong className="text-sm font-bold text-neutral-900">
                        Vantagem Principal:
                      </strong>
                      <span className="text-lg font-medium text-emerald-600">
                        Redução de até 85% na conta de energia.
                      </span>
                    </div>
                  </li>
                  <li className="font-montserrat flex cursor-default items-center justify-start gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm duration-300 hover:-translate-y-1">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-emerald-500 shadow-md">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <strong className="text-sm font-bold text-neutral-900">
                        Ideal para:
                      </strong>
                      <span className="text-lg font-medium text-emerald-600">
                        Quem busca o retorno de investimento{" "}
                        <span className="font-bold"> (payback)</span> mais
                        rápido.
                      </span>
                    </div>
                  </li>
                </ul>

                <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Ponto de atenção:</strong> Por segurança normativa,
                    se a rede da concessionária cair (apagão), o sistema desliga
                    automaticamente.
                  </p>
                </div>
              </div>

              {/* Imagem Substituída */}
              <div className="relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-3xl bg-white p-4 shadow-lg shadow-neutral-400 md:h-[450px] md:w-[450px]">
                {/* ATENÇÃO: Substitua o src abaixo pela sua imagem real */}
                <Image
                  src="/assets/page3/sistema-on-grid.webp"
                  alt="Esquema Sistema On-Grid"
                  fill
                  className="object-contain" // ou object-cover se preferir preencher tudo
                />
              </div>
            </div>

            {/* 2. OFF-GRID */}
            <div className="flex flex-col items-center gap-12 md:flex-row md:justify-between">
              {/* Imagem Substituída */}
              <div className="relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-3xl bg-white p-4 shadow-lg shadow-neutral-400 md:h-[450px] md:w-[450px]">
                {/* ATENÇÃO: Substitua o src abaixo pela sua imagem real */}
                <Image
                  src="/assets/page3/sistema-off-grid.webp"
                  alt="Esquema Sistema Off-Grid"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Texto */}
              <div className="w-full md:w-1/2">
                <div className="mb-2 flex items-center gap-2 text-blue-600">
                  <ZapOff className="h-6 w-6" />
                  <span className="font-bold tracking-wider uppercase">
                    Isolado da Rede
                  </span>
                </div>
                <h2 className="font-clash-display mb-6 text-4xl font-bold text-neutral-900">
                  Sistema Solar <span className="text-blue-500">Off-Grid</span>
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-neutral-600">
                  A solução definitiva para áreas rurais e locais sem acesso à
                  energia elétrica. No sistema Off-Grid, você é 100%
                  independente. Toda a energia é armazenada em baterias de alta
                  performance para uso noturno.
                </p>

                <ul className="mb-8 space-y-4">
                  <li className="font-montserrat flex cursor-default items-center justify-start gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm duration-300 hover:-translate-y-1">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-blue-500 shadow-md">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <strong className="text-sm font-bold text-neutral-900">
                        Vantagem Principal:
                      </strong>
                      <span className="text-lg font-medium text-blue-600">
                        Independência total da concessionária e fim das contas
                        de luz.
                      </span>
                    </div>
                  </li>
                  <li className="font-montserrat flex cursor-default items-center justify-start gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm duration-300 hover:-translate-y-1">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-blue-500 shadow-md">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <strong className="text-sm font-bold text-neutral-900">
                        Ideal para:
                      </strong>
                      <span className="text-lg font-medium text-blue-600">
                        Fazendas, sítios e bombeamento de água em todo o MS.
                      </span>
                    </div>
                  </li>
                </ul>

                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Diferencial:</strong> Energia limpa, silenciosa e
                    sem a necessidade de puxar quilômetros de fiação da rua.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. HÍBRIDO */}
            <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:justify-between">
              {/* Texto */}
              <div className="w-full md:w-1/2">
                <div className="mb-2 flex items-center gap-2 text-purple-600">
                  <Atom className="h-6 w-6" />
                  <span className="font-bold tracking-wider uppercase">
                    O Melhor dos Dois Mundos
                  </span>
                </div>
                <h2 className="font-clash-display mb-6 text-4xl font-bold text-neutral-900">
                  Sistema Solar <span className="text-purple-500">Híbrido</span>
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-neutral-600">
                  Tecnologia de ponta para quem não pode ficar sem energia.
                  Trabalha conectado à Energisa (gerando economia), mas possui
                  baterias de backup. Se a rede cair, o sistema assume em
                  milissegundos.
                </p>

                <ul className="mb-8 space-y-4">
                  <li className="font-montserrat flex cursor-default items-center justify-start gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm duration-300 hover:-translate-y-1">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-purple-500 shadow-md">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <strong className="block text-neutral-900">
                        Vantagem Principal:
                      </strong>
                      <span className="text-lg font-medium text-purple-600">
                        Segurança contra apagões + Economia mensal na conta.
                      </span>
                    </div>
                  </li>
                  <li className="font-montserrat flex cursor-default items-center justify-start gap-3 rounded-xl border border-neutral-100 bg-white p-4 shadow-sm duration-300 hover:-translate-y-1">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-purple-500 shadow-md">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <strong className="block text-neutral-900">
                        Ideal para:
                      </strong>
                      <span className="text-lg font-medium text-purple-600">
                        Residências de alto padrão, clínicas e comércios
                        essenciais.
                      </span>
                    </div>
                  </li>
                </ul>

                <div className="rounded-lg bg-purple-50 p-4">
                  <p className="text-sm text-purple-800">
                    <strong>Segurança:</strong> Proteção total para sua família
                    e patrimônio contra oscilações da rede elétrica.
                  </p>
                </div>
              </div>

              {/* Imagem Substituída */}
              <div className="relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-3xl bg-white p-4 shadow-lg shadow-neutral-400 md:h-[450px] md:w-[450px]">
                {/* ATENÇÃO: Substitua o src abaixo pela sua imagem real */}
                <Image
                  src="/assets/page3/sistema-hibrido.webp"
                  alt="Esquema Sistema Híbrido"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- DIFERENCIAIS (WHY CHOOSE US) --- */}
        <section className="bg-[#191919] py-20 text-white">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="font-clash-display mb-4 text-3xl font-bold md:text-5xl">
                Por que escolher a <br />
                <span className="text-emerald-500">MS Brasil Energy?</span>
              </h2>
              <p className="mx-auto max-w-2xl text-white/60">
                Localizada em Campo Grande/MS, nós entregamos soluções
                inteligentes para o homem do campo e para o morador da cidade.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  title: "Especialidade Regional",
                  desc: "Entendemos os desafios do clima e da rede elétrica do Mato Grosso do Sul. Projetos dimensionados para suportar nossas altas temperaturas.",
                },
                {
                  title: "Tecnologia de Ponta",
                  desc: "Trabalhamos com o que há de mais moderno em sistemas On-Grid, Off-Grid e Híbridos. Equipamentos de alta durabilidade que duram décadas.",
                },
                {
                  title: "Atendimento Próximo",
                  desc: "Diferente de grandes empresas nacionais, nós estamos aqui. Suporte técnico ágil e acompanhamento desde o projeto até o pós-venda.",
                },
                {
                  title: "Compromisso Econômico",
                  desc: "Nosso foco é o seu retorno financeiro. Eliminamos surpresas na conta de luz e valorizamos o seu imóvel.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#222] p-8 transition-colors hover:border-emerald-500/50"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="container mx-auto bg-[#f4f4f4] px-6 py-24 text-center">
          <div className="rounded-3xl bg-emerald-600 px-6 py-16 shadow-2xl shadow-emerald-500/20 md:px-12">
            <h2 className="font-clash-display mb-6 text-3xl font-bold text-white md:text-5xl">
              Cansado dos aumentos <br /> da conta de luz?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-emerald-100">
              O sol de Campo Grande é a solução! Envie uma foto da sua fatura de
              energia e nós calculamos o seu projeto em poucos minutos.
            </p>
            <Link
              href="https://wa.link/lfkh22"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-bold text-emerald-600 shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Solicitar Orçamento Grátis
            </Link>
          </div>
        </section>

        <FaqSection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
