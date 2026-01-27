import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import Footer from "@/components/footer";

export default function SobreNosPage() {
  return (
    <main className="min-h-screen w-full bg-[#191919] text-white">
      {/* Header Simples de Navegação */}
      <div className="container mx-auto px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Home
        </Link>
      </div>

      {/* Conteúdo Principal */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-clash-display mb-6 text-4xl font-bold md:text-6xl">
            Sobre a <span className="text-emerald-500">MS Brasil Energy</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-white/60 md:text-xl">
            Transformando a maneira como o Brasil consome energia.
            Sustentabilidade, economia e tecnologia de ponta para sua casa e
            empresa.
          </p>
        </div>

        {/* Grid de Informações (Placeholder) */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#222] p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Nossa Missão
            </h2>
            <p className="text-white/60">
              Levar energia limpa e renovável para todos os cantos do país,
              reduzindo custos e impactos ambientais através de soluções
              fotovoltaicas inovadoras.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#222] p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              Nossa Visão
            </h2>
            <p className="text-white/60">
              Ser referência nacional em eficiência energética, reconhecida pela
              qualidade técnica, atendimento humanizado e compromisso com o
              futuro do planeta.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
