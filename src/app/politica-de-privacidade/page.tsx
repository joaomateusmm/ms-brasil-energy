import {
  ArrowLeft,
  Database,
  Eye,
  FileCheck,
  Lock,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import Footer from "@/components/footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function PrivacyPolicyPage() {
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
            Política de <span className="text-emerald-500">Privacidade</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-white/60">
            Na MS Brasil Energy, a transparência é um de nossos pilares. Saiba
            como protegemos e utilizamos seus dados para levar energia limpa até
            você.
          </p>
        </section>

        {/* --- CONTEÚDO PRINCIPAL --- */}
        <section className="container mx-auto max-w-5xl px-6 pb-24">
          <div className="flex flex-col gap-8">
            {/* Introdução */}
            <div className="rounded-3xl border border-white/10 bg-[#222] p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3 text-emerald-500">
                <ShieldAlert className="h-6 w-6" />
                <h2 className="text-xl font-bold tracking-wider uppercase">
                  Compromisso Geral
                </h2>
              </div>
              <p className="leading-relaxed text-white/80">
                A <strong>MS Brasil Energy</strong>, sediada em Mato Grosso do
                Sul, está comprometida em resguardar a sua privacidade. O
                intuito deste documento é esclarecer quais informações são
                coletadas dos usuários em nosso site e respectivos serviços de
                simulação de energia solar, e de que forma esses dados são
                manipulados e utilizados, em conformidade com a Lei Geral de
                Proteção de Dados (LGPD).
              </p>
            </div>

            {/* Coleta de Dados */}
            <div className="rounded-3xl border border-white/10 bg-[#222] p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3 text-emerald-500">
                <Database className="h-6 w-6" />
                <h2 className="text-xl font-bold tracking-wider uppercase">
                  Quais dados coletamos?
                </h2>
              </div>
              <p className="mb-4 text-white/80">
                Para oferecer nossos serviços de dimensionamento de projetos e
                propostas comerciais, podemos coletar:
              </p>
              <ul className="list-inside list-disc space-y-2 text-white/70">
                <li>
                  <strong>Dados Pessoais:</strong> Nome completo, e-mail e
                  número de telefone (WhatsApp) para contato.
                </li>
                <li>
                  <strong>Dados Energéticos:</strong> Localização do imóvel
                  (Cidade/Estado), média de consumo (kWh ou valor em R$) e tipo
                  de conexão (monofásico, bifásico, etc).
                </li>
                <li>
                  <strong>Dados de Navegação:</strong> Endereço IP, tipo de
                  navegador e páginas acessadas, coletados via cookies para
                  melhorar a experiência do usuário.
                </li>
              </ul>
            </div>

            {/* Uso dos Dados */}
            <div className="rounded-3xl border border-white/10 bg-[#222] p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3 text-emerald-500">
                <FileCheck className="h-6 w-6" />
                <h2 className="text-xl font-bold tracking-wider uppercase">
                  Para que usamos seus dados?
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Orçamentos Personalizados
                  </h3>
                  <p className="text-sm text-white/60">
                    Utilizamos seus dados de consumo para calcular a economia
                    exata e dimensionar o sistema fotovoltaico ideal para sua
                    necessidade.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Análise de Financiamento
                  </h3>
                  <p className="text-sm text-white/60">
                    Caso opte pelo parcelamento, dados podem ser usados para
                    pré-análise junto aos nossos parceiros financeiros
                    (Bradesco, CAIXA, Itaú, Santander, Sicredi).
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">Atendimento</h3>
                  <p className="text-sm text-white/60">
                    Para entrar em contato via WhatsApp ou E-mail para
                    apresentar a proposta e tirar dúvidas.
                  </p>
                </div>
              </div>
            </div>

            {/* Compartilhamento */}
            <div className="rounded-3xl border border-white/10 bg-[#222] p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3 text-emerald-500">
                <Eye className="h-6 w-6" />
                <h2 className="text-xl font-bold tracking-wider uppercase">
                  Compartilhamento de Dados
                </h2>
              </div>
              <p className="leading-relaxed text-white/80">
                A MS Brasil Energy <strong>não vende</strong> suas informações.
                Seus dados podem ser compartilhados apenas nas seguintes
                situações estritamente necessárias:
              </p>
              <ul className="mt-4 list-inside list-disc space-y-2 text-white/70">
                <li>
                  Com <strong>instituições financeiras parceiras</strong>{" "}
                  (Bradesco, CAIXA, Itaú, Santander, Sicredi) exclusivamente
                  para fins de análise de crédito e financiamento do sistema
                  solar, mediante sua solicitação.
                </li>
                <li>
                  Com equipes de instalação e engenharia para a execução do
                  projeto no local.
                </li>
                <li>Para cumprimento de obrigações legais ou judiciais.</li>
              </ul>
            </div>

            {/* Segurança e Direitos */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#222] p-8">
                <div className="mb-4 flex items-center gap-3 text-emerald-500">
                  <Lock className="h-6 w-6" />
                  <h2 className="text-lg font-bold uppercase">Segurança</h2>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Adotamos práticas de segurança adequadas, incluindo
                  criptografia e servidores seguros, para proteger seus dados
                  contra acesso não autorizado, alteração ou divulgação.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#222] p-8">
                <div className="mb-4 flex items-center gap-3 text-emerald-500">
                  <UserCheck className="h-6 w-6" />
                  <h2 className="text-lg font-bold uppercase">Seus Direitos</h2>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Você tem o direito de solicitar, a qualquer momento, o acesso,
                  a correção ou a exclusão dos seus dados pessoais de nossa
                  base, entrando em contato através dos nossos canais oficiais.
                </p>
              </div>
            </div>

            {/* Contato */}
            <div className="mt-8 text-center">
              <p className="text-white/60">
                Dúvidas sobre nossa política? Entre em contato:
                <br />
                <span className="font-semibold text-emerald-500">
                  msbrasilenergy@gmail.com
                </span>
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
