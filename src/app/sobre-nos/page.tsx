import {
  CheckCircle2,
  Leaf,
  Rocket,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import Footer from "@/components/footer";
import HeaderDesktop from "@/components/HeaderDesktop";
import HeaderMobile from "@/components/HeaderMobile";
import PartnersSection2 from "@/components/PartnersSection2"; // Certifique-se que o caminho está correto
import SmoothScroll from "@/components/SmoothScroll";

export default function SobreNosPage() {
  const banks = ["Bradesco", "CAIXA", "Itaú", "Santander", "Sicredi"];

  return (
    <SmoothScroll>
      <main className="min-h-screen w-full bg-[#191919] text-white selection:bg-emerald-500/30">
        <div className="relative z-50">
          <div className="hidden lg:block">
            <HeaderDesktop />
          </div>
          <div className="lg:hidden">
            <HeaderMobile />
          </div>
        </div>

        {/* --- HERO SECTION --- */}
        <section className="container mx-auto px-6 pt-32 pb-20 text-center md:pt-35 md:pb-32">
          <h1 className="font-clash-display mb-6 text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
            Transformando a energia de <br />
            <span className="text-emerald-500">Mato Grosso do Sul.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-white/60 md:text-xl">
            Somos especialistas em soluções energéticas, focados em inovação,
            economia e sustentabilidade. A MS Brasil Energy é a sua parceira na
            jornada rumo à independência energética.
          </p>
        </section>

        {/* --- QUEM SOMOS (HIGHLIGHT) --- */}
        <section className="w-full border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto grid gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-emerald-500/20 blur-3xl"></div>
              <h2 className="font-clash-display relative mb-6 text-3xl font-semibold md:text-4xl">
                Quem é a <br /> MS Brasil Energy?
              </h2>
              <div className="h-1 w-20 rounded-full bg-emerald-500"></div>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-white/80">
                A MS Brasil Energy é uma empresa especializada na instalação,
                manutenção e projetos de sistemas de energia solar fotovoltaica.
                Nascemos com o propósito de oferecer aos nossos clientes a
                oportunidade de gerar a própria energia, economizar
                drasticamente na conta de luz e contribuir ativamente para um
                futuro mais sustentável.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                Nosso foco é democratizar o acesso à tecnologia solar para
                residências, comércios e propriedades rurais em todo o estado.
              </p>
            </div>
          </div>
        </section>

        {/* --- PILARES (MISSÃO, VISÃO, VALORES) --- */}
        <section className="container mx-auto px-6 py-24">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold tracking-widest text-emerald-500 uppercase">
              Nossa Essência
            </span>
            <h2 className="font-clash-display mt-2 text-3xl font-bold md:text-4xl">
              O que nos move?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* CARD MISSÃO */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#222] p-8 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                <Rocket className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Missão</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Democratizar o acesso à energia limpa e renovável. Queremos
                capacitar nossos clientes a conquistarem sua independência
                energética, garantindo economia e impacto ambiental positivo
                através de soluções personalizadas.
              </p>
            </div>

            {/* CARD VISÃO */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#222] p-8 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Visão</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Construir relações de confiança duradoura através da
                transparência. Buscamos constantemente novas tecnologias para
                oferecer o melhor custo-benefício e um suporte dedicado, do
                planejamento ao pós-venda.
              </p>
            </div>

            {/* CARD VALORES */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#222] p-8 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                <Leaf className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Valores</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Compromisso diário com a preservação do planeta. Utilizamos
                apenas equipamentos de alta performance e contamos com uma
                equipe técnica especializada para garantir a excelência em todas
                as instalações.
              </p>
            </div>
          </div>
        </section>

        {/* --- INFORMAÇÕES COMERCIAIS (PAGAMENTO E ENTREGA) --- */}
        <section className="container mx-auto px-6 pb-24">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#222] to-[#1a1a1a]">
            <div className="grid md:grid-cols-2">
              {/* Lado Esquerdo: Pagamento */}
              <div className="border-b border-white/10 p-8 md:border-r md:border-b-0 md:p-12">
                <div className="mb-6 flex items-center gap-3 text-emerald-500">
                  <ShieldCheck className="h-6 w-6" />
                  <span className="font-bold tracking-wide uppercase">
                    Financeiro
                  </span>
                </div>
                <h3 className="font-clash-display mb-4 text-2xl font-semibold text-white">
                  Facilidade no Pagamento
                </h3>
                <p className="mb-8 text-white/60">
                  Trabalhamos com as principais instituições financeiras para
                  oferecer as melhores condições de parcelamento para o seu
                  projeto solar.
                </p>

                <div className="flex flex-wrap gap-3">
                  {banks.map((bank) => (
                    <span
                      key={bank}
                      className="cursor-default rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-500"
                    >
                      {bank}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lado Direito: Entrega */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-6 flex items-center gap-3 text-emerald-500">
                  <Zap className="h-6 w-6" />
                  <span className="font-bold tracking-wide uppercase">
                    Logística
                  </span>
                </div>
                <h3 className="font-clash-display mb-4 text-2xl font-semibold text-white">
                  Prazo de Entrega
                </h3>
                <div className="flex items-start gap-4 rounded-xl bg-white/5 p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                  <div>
                    <p className="font-semibold text-white">
                      Status: A Combinar
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      O prazo é definido de acordo com a complexidade do projeto
                      e a localização da instalação, garantindo transparência e
                      cumprimento do cronograma.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PARCEIROS (Reutilizando seu componente) --- */}
        <PartnersSection2 />

        {/* --- CTA FINAL --- */}
        <section className="container mx-auto px-6 py-24 text-center">
          <h2 className="font-clash-display mb-6 text-3xl font-bold md:text-5xl">
            Pronto para gerar sua <br />
            <span className="text-emerald-500">própria energia?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-white/60">
            Junte-se à revolução solar e comece a economizar hoje mesmo com a
            qualidade e confiança da MS Brasil Energy.
          </p>
          <Link
            href="https://wa.link/lfkh22"
            className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-500 px-8 text-lg font-bold text-white shadow-lg shadow-emerald-500/20 duration-300 hover:scale-105 hover:bg-emerald-600 active:scale-95"
          >
            Fazer Orçamento Agora
          </Link>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
