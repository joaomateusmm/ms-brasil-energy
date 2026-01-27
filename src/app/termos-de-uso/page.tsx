import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Scale,
  ScrollText,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import Footer from "@/components/footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function TermsOfUsePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen w-full bg-[#191919] text-white selection:bg-emerald-500/30">
        {/* --- HEADER DE NAVEGAÇÃO --- */}
        <div className="container mx-auto px-6 py-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-500 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Voltar para o Início
          </Link>
        </div>

        {/* --- HERO SECTION --- */}
        <section className="container mx-auto px-6 pt-10 pb-12 text-center md:pt-16 md:pb-20">
          <h1 className="font-clash-display mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            Termos de <span className="text-emerald-500">Uso</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-white/60">
            Regras e diretrizes para o uso do nosso site e serviços. Ao navegar
            aqui, você concorda com as condições abaixo.
          </p>
        </section>

        {/* --- CONTEÚDO PRINCIPAL --- */}
        <section className="container mx-auto max-w-5xl px-6 pb-24">
          <div className="flex flex-col gap-8">
            {/* Aceitação */}
            <div className="rounded-3xl border border-white/10 bg-[#222] p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3 text-emerald-500">
                <ScrollText className="h-6 w-6" />
                <h2 className="text-xl font-bold tracking-wider uppercase">
                  1. Aceitação dos Termos
                </h2>
              </div>
              <p className="leading-relaxed text-white/80">
                Ao acessar e utilizar o site da{" "}
                <strong>MS Brasil Energy</strong>, você aceita e concorda em
                cumprir os termos e disposições deste contrato. Caso não
                concorde com qualquer parte destes termos, você não deve
                utilizar nosso site ou serviços.
              </p>
            </div>

            {/* Sobre o Simulador (CRÍTICO) */}
            <div className="rounded-3xl border border-emerald-500/20 bg-[#222] p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3 text-emerald-500">
                <Zap className="h-6 w-6" />
                <h2 className="text-xl font-bold tracking-wider uppercase">
                  2. Simulador Solar e Estimativas
                </h2>
              </div>
              <p className="mb-4 leading-relaxed text-white/80">
                O simulador de energia solar disponível neste site é uma
                ferramenta educativa e de estimativa.
              </p>
              <ul className="list-inside list-disc space-y-2 text-white/70">
                <li>
                  <strong>Caráter Estimativo:</strong> Os resultados
                  apresentados (economia mensal, payback, geração) são baseados
                  em médias históricas de irradiação solar em Mato Grosso do Sul
                  e tarifas vigentes, podendo sofrer variações.
                </li>
                <li>
                  <strong>Não Garantia:</strong> A simulação não constitui uma
                  proposta comercial vinculativa. O valor final do projeto
                  depende de visita técnica, condições do telhado e
                  disponibilidade de equipamentos.
                </li>
              </ul>
            </div>

            {/* Financiamento */}
            <div className="rounded-3xl border border-white/10 bg-[#222] p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3 text-emerald-500">
                <Scale className="h-6 w-6" />
                <h2 className="text-xl font-bold tracking-wider uppercase">
                  3. Condições de Pagamento e Financiamento
                </h2>
              </div>
              <p className="mb-4 leading-relaxed text-white/80">
                A MS Brasil Energy facilita o acesso ao crédito através de
                parcerias com instituições financeiras (Bradesco, CAIXA, Itaú,
                Santander, Sicredi).
              </p>
              <p className="text-sm text-white/60">
                A aprovação do crédito, taxas de juros e prazos são de total
                responsabilidade dos bancos parceiros e estão sujeitos à análise
                de perfil do cliente. A MS Brasil Energy atua apenas como
                facilitadora e não garante a aprovação do financiamento.
              </p>
            </div>

            {/* Prazo e Entrega */}
            <div className="rounded-3xl border border-white/10 bg-[#222] p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3 text-emerald-500">
                <BookOpen className="h-6 w-6" />
                <h2 className="text-xl font-bold tracking-wider uppercase">
                  4. Prazos e Instalação
                </h2>
              </div>
              <p className="leading-relaxed text-white/80">
                O status do prazo de entrega é definido como{" "}
                <strong>&quot;A Combinar&quot;</strong>. O cronograma exato será
                estabelecido em contrato após a visita técnica, variando
                conforme a complexidade do projeto, a liberação da
                concessionária de energia local e a disponibilidade logística.
              </p>
            </div>

            {/* Limitação de Responsabilidade */}
            <div className="rounded-3xl border border-white/10 bg-[#222] p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3 text-emerald-500">
                <AlertTriangle className="h-6 w-6" />
                <h2 className="text-xl font-bold tracking-wider uppercase">
                  5. Limitação de Responsabilidade
                </h2>
              </div>
              <p className="leading-relaxed text-white/80">
                A MS Brasil Energy envidará esforços para manter as informações
                do site precisas e atualizadas. No entanto, não nos
                responsabilizamos por eventuais erros tipográficos, interrupções
                no site ou danos decorrentes do uso das informações aqui
                contidas.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-white/40">
                Última atualização: Janeiro de 2026.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
