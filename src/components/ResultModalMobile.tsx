"use client";

import gsap from "gsap";
import { toPng } from "html-to-image";
import {
  Banknote,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ImageDown,
  LucideIcon,
  Maximize,
  MessageCircle,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyBill: number;
}

export default function ResultModalMobile({
  isOpen,
  onClose,
  monthlyBill,
}: ResultModalProps) {
  const [step, setStep] = useState<"results" | "form">("results");
  const modalRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    celular: "",
    contato: "whatsapp",
  });

  const [results, setResults] = useState({
    power: 0,
    area: 0,
    costMin: 0,
    costMax: 0,
    monthlyProduction: 0,
    annualSavings: 0,
    roiMin: 0,
    roiMax: 0,
  });

  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep("results");
      gsap.set(".results-content", { opacity: 1, y: 0 });
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const ctx = gsap.context(() => {
      if (step === "results") {
        gsap.fromTo(
          ".result-card-item",
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8, // Mais rápido no mobile
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.1,
          },
        );
        gsap.to(".results-content", { opacity: 1, duration: 0 });
      }

      if (step === "form") {
        gsap.fromTo(
          ".form-content",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        );
      }
    }, modalRef);

    return () => ctx.revert();
  }, [isOpen, step]);

  const handlePrint = async () => {
    if (!printRef.current || isPrinting) return;
    setIsPrinting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const dataUrl = await toPng(printRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
        style: { color: "#1f2937" },
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Orcamento-Solar-${monthlyBill}.png`;
      link.click();
    } catch (error) {
      console.error("Erro ao gerar print:", error);
      alert("Erro ao salvar imagem.");
    } finally {
      setIsPrinting(false);
    }
  };

  const handleSwitchToForm = () => {
    gsap.to(".results-content", {
      opacity: 0,
      y: -20,
      duration: 0.2,
      onComplete: () => setStep("form"),
    });
  };

  const handleBackToResults = () => {
    gsap.to(".form-content", {
      opacity: 0,
      x: 20,
      duration: 0.2,
      onComplete: () => setStep("results"),
    });
  };

  useEffect(() => {
    if (monthlyBill > 0) {
      const kwhPrice = 1.05;
      const monthlyConsumptionKwh = monthlyBill / kwhPrice;
      const irradiation = 4.8;
      const systemPowerKwp = monthlyConsumptionKwh / (irradiation * 30 * 0.8);
      const area = systemPowerKwp * 7;
      const production = systemPowerKwp * irradiation * 30;
      const economy = Math.max(0, (monthlyBill - 50) * 12);
      const costMin = systemPowerKwp * 3800;
      const costMax = systemPowerKwp * 4800;
      let roiMinCalc = 0;
      let roiMaxCalc = 0;
      if (economy > 0) {
        roiMinCalc = costMin / economy;
        roiMaxCalc = costMax / economy;
      }
      setResults({
        power: parseFloat(systemPowerKwp.toFixed(2)),
        area: Math.ceil(area),
        costMin: costMin,
        costMax: costMax,
        monthlyProduction: parseFloat(production.toFixed(2)),
        annualSavings: economy,
        roiMin: parseFloat(roiMinCalc.toFixed(1)),
        roiMax: parseFloat(roiMaxCalc.toFixed(1)),
      });
    }
  }, [monthlyBill]);

  if (!isOpen) return null;

  const formatPhone = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    const truncatedValue = cleanValue.substring(0, 11);
    return truncatedValue
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidName = (name: string) => name.trim().length > 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "celular") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !isValidName(formData.nome) ||
      !isValidEmail(formData.email) ||
      formData.celular.length < 14
    ) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }
    const NUMERO_DO_DONO = "5585996506991";
    const mensagem = `Dados do cliente:\nNome - ${formData.nome}\nEmail - ${formData.email}\nTelefone - ${formData.celular}\n\nOlá, gostaria de dar continuidade no meu projeto da Solar Energy!`;
    const whatsappUrl = `https://wa.me/${NUMERO_DO_DONO}?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  const formatCurrency = (val: number) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // CARD MOBILE COMPACTO
  const ResultCard = ({
    icon: Icon,
    label,
    value,
    subValue,
  }: {
    icon: LucideIcon;
    label: string;
    value: React.ReactNode;
    subValue?: string;
  }) => (
    <div className="result-card-item flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 bg-gray-50/80 p-3 text-center shadow-sm">
      <Icon className="mb-1 h-5 w-5 text-gray-600" />
      <h3 className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
        {label}
      </h3>
      <div className="text-sm font-bold text-emerald-600">{value}</div>
      {subValue && <div className="text-[9px] text-gray-400">{subValue}</div>}
    </div>
  );

  return (
    // FULLSCREEN NO MOBILE COM Z-INDEX ALTO
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-2 backdrop-blur-sm sm:items-center">
      <div
        ref={modalRef}
        // H-[95vh] para ocupar quase toda a tela, com bordas arredondadas no topo
        className="relative flex h-[98vh] w-full flex-col overflow-hidden rounded-md bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:w-[90vw] sm:rounded-2xl"
      >
        {/* HEADER FIXO */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          {step === "form" ? (
            <button
              onClick={handleBackToResults}
              className="flex items-center text-sm font-medium text-gray-500"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Voltar
            </button>
          ) : (
            <div className="text-sm font-bold text-gray-800">
              Resultado da Simulação
            </div>
          )}
          <button
            onClick={onClose}
            className="rounded-full bg-gray-100 p-1.5 text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* CONTEÚDO COM SCROLL */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {step === "results" && (
            <div className="results-content flex flex-col gap-6">
              {/* ÁREA DE PRINT */}
              <div ref={printRef} className="rounded-xl bg-white">
                <div className="mb-6 text-center">
                  <div className="font-clash-display text-3xl font-light text-gray-800">
                    {formatCurrency(monthlyBill)}
                    <span className="font-sans text-sm text-gray-400">
                      /mês
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Baseado na sua conta de luz
                  </p>
                  <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-emerald-500"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ResultCard
                    icon={Zap}
                    label="Potência"
                    value={`${results.power} kWp`}
                  />
                  <ResultCard
                    icon={Maximize}
                    label="Área Mínima"
                    value={<span>{results.area} m²</span>}
                  />
                  <ResultCard
                    icon={CircleDollarSign}
                    label="Investimento"
                    value={
                      <div className="flex flex-col text-xs">
                        <span>{formatCurrency(results.costMin)}</span>
                        <span>a {formatCurrency(results.costMax)}</span>
                      </div>
                    }
                  />
                  <ResultCard
                    icon={Banknote}
                    label="Produção"
                    value={`${results.monthlyProduction} kWh`}
                  />
                  <ResultCard
                    icon={Banknote}
                    label="Economia Anual"
                    value={formatCurrency(results.annualSavings)}
                  />
                  <ResultCard
                    icon={CalendarCheck}
                    label="Payback"
                    value={`${results.roiMin} - ${results.roiMax} anos`}
                  />
                </div>
              </div>

              {/* BOTÕES DE AÇÃO - FIXOS NO FINAL DO SCROLL */}
              <div className="pb-safe-area mt-2 flex flex-col gap-3">
                <button
                  onClick={handleSwitchToForm}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 text-base font-bold text-white shadow-lg active:scale-[0.98]"
                >
                  Quero esse projeto <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-100 text-sm font-semibold text-gray-700 active:scale-[0.98] disabled:opacity-50"
                >
                  <ImageDown className="h-4 w-4" /> Baixar Resultado
                </button>

                <p className="px-4 text-center text-[10px] text-gray-400">
                  *Valores estimados. Necessária análise técnica detalhada.
                </p>
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="form-content flex flex-col gap-6 pt-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Solicitar Orçamento
                </h2>
                <p className="mt-2 text-xs text-gray-500">
                  Preencha seus dados para receber o contato de um especialista.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="ml-1 text-xs font-medium text-gray-500">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-1">
                  <label className="ml-1 text-xs font-medium text-gray-500">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="ml-1 text-xs font-medium text-gray-500">
                    Celular / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    required
                    value={formData.celular}
                    onChange={handleInputChange}
                    maxLength={15}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="mt-2">
                  <p className="text-center text-[10px] text-gray-500">
                    Ao enviar, você concorda com nossos{" "}
                    <Link
                      href="/politica-de-privacidade"
                      className="text-emerald-600 underline"
                    >
                      Termos de Privacidade
                    </Link>
                    .
                  </p>
                </div>

                <button
                  type="submit"
                  className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 text-base font-bold text-white shadow-lg active:scale-[0.98]"
                >
                  <MessageCircle className="h-5 w-5" /> Enviar Solicitação
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
