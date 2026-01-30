"use client";

import gsap from "gsap";
import { toPng } from "html-to-image";
import {
  AlertTriangle,
  Banknote,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronsRight,
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

interface ResultModalMobileProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyBill: number;
  locationType: string;
  address: string;
}

export default function ResultModalMobile({
  isOpen,
  onClose,
  monthlyBill,
  locationType,
  address,
}: ResultModalMobileProps) {
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
            duration: 0.8,
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
      link.download = `Estimativa-Solar-Mobile.png`;
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

  // --- LÓGICA DE CÁLCULO ATUALIZADA (MESMA DO DESKTOP) ---
  useEffect(() => {
    if (monthlyBill > 0) {
      const kwhPrice = 1.05;
      const irradiation = 4.8;
      const monthlyConsumptionKwh = monthlyBill / kwhPrice;

      const pricingTable = [
        { kwh: 300, price: 6890 },
        { kwh: 400, price: 9990 },
        { kwh: 500, price: 10790 },
        { kwh: 600, price: 11990 },
        { kwh: 700, price: 13490 },
        { kwh: 800, price: 15690 },
        { kwh: 900, price: 17490 },
        { kwh: 1000, price: 18390 },
        { kwh: 1500, price: 23990 },
        { kwh: 2000, price: 35890 },
        { kwh: 2500, price: 41977 },
        { kwh: 3000, price: 49982 },
      ];

      const calculateInterpolatedPrice = (kwh: number) => {
        if (kwh <= 300) return 6890;
        if (kwh >= 3000) {
          const last = pricingTable[pricingTable.length - 1];
          const secondLast = pricingTable[pricingTable.length - 2];
          const slope =
            (last.price - secondLast.price) / (last.kwh - secondLast.kwh);
          return last.price + (kwh - last.kwh) * slope;
        }
        for (let i = 0; i < pricingTable.length - 1; i++) {
          const lower = pricingTable[i];
          const upper = pricingTable[i + 1];
          if (kwh >= lower.kwh && kwh <= upper.kwh) {
            const ratio = (kwh - lower.kwh) / (upper.kwh - lower.kwh);
            return lower.price + ratio * (upper.price - lower.price);
          }
        }
        return 6890;
      };

      const basePrice = calculateInterpolatedPrice(monthlyConsumptionKwh);
      const systemPowerKwp = monthlyConsumptionKwh / (irradiation * 30 * 0.8);
      const area = systemPowerKwp * 7;
      const production = systemPowerKwp * irradiation * 30;
      const economy = Math.max(0, (monthlyBill - 50) * 12);

      const costMin = basePrice * 1.02;
      const costMax = basePrice * 1.1;

      const roiMinCalc = economy > 0 ? costMin / economy : 0;
      const roiMaxCalc = economy > 0 ? costMax / economy : 0;

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
    const NUMERO_DO_DONO = "556799125299";
    const mensagem = `*Nova Solicitação - MS Brasil Energy*

👤 *Cliente:* ${formData.nome}
📧 *Email:* ${formData.email}
📱 *Telefone:* ${formData.celular}

🏠 *Tipo de Local:* ${locationType}
📍 *Endereço:* ${address}

*Dados Estimados:*
💰 *Conta Mensal:* ${formatCurrency(monthlyBill)}
⚡ *Potência:* ${results.power} kWp
💵 *Estimativa:* ${formatCurrency(results.costMin)} a ${formatCurrency(results.costMax)}

Olá! Acabei de realizar uma simulação e gostaria de um orçamento oficial!`;

    window.open(
      `https://wa.me/${NUMERO_DO_DONO}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
    );
    onClose();
  };

  const formatCurrency = (val: number) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const ResultCard = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: LucideIcon;
    label: string;
    value: React.ReactNode;
  }) => (
    <div className="result-card-item flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 bg-gray-50/80 p-3 text-center shadow-sm">
      <Icon className="mb-1 h-5 w-5 text-gray-600" />
      <h3 className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
        {label}
      </h3>
      <div className="text-sm font-bold text-emerald-600">{value}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-2 backdrop-blur-sm sm:items-center">
      <div
        ref={modalRef}
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
              <div ref={printRef} className="rounded-xl bg-white">
                <div className="mb-6 text-center">
                  <div className="font-clash-display text-3xl font-light text-gray-800">
                    {formatCurrency(monthlyBill)}
                    <span className="font-sans text-sm text-gray-400">
                      /mês
                    </span>
                  </div>

                  {/* AVISO DE ESTIMATIVA MOBILE */}
                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50 p-3 text-left">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                    <p className="text-[10px] leading-tight text-amber-900">
                      <span className="font-bold">IMPORTANTE:</span> Valores
                      baseados em médias. O valor real pode variar de 2% a 10%
                      após análise técnica da localização, tipo de telhado, etc.
                      Consulte um especialista da MS Brasil Energy para ter o
                      seu orçamento real.
                    </p>
                  </div>

                  <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-emerald-500"></div>
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
                      <div className="flex flex-col text-[11px] leading-tight">
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
                    value={`${results.roiMin}-${results.roiMax} anos`}
                  />
                </div>
              </div>

              <div className="pb-safe-area mt-2 flex flex-col gap-3">
                <button
                  onClick={handleSwitchToForm}
                  className="group flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-500 px-8 text-lg font-bold text-white shadow-lg duration-300 hover:scale-[1.03] hover:bg-emerald-500 hover:shadow-xl active:scale-[0.98] md:w-auto"
                >
                  Falar com um especialista{" "}
                  <ChevronsRight className="h-5 w-5 duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-100 text-sm font-semibold text-gray-700 active:scale-[0.98] disabled:opacity-50"
                >
                  <ImageDown className="h-4 w-4" /> Baixar Resultado
                </button>

                <p className="px-4 text-center text-[9px] text-gray-400">
                  *Cálculos estimados pela MS Brasil Energy. Proposta oficial
                  depende de visita técnica.
                </p>
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="form-content flex h-full w-full flex-col items-center justify-center pb-18 opacity-0">
              <div className="w-full max-w-xl px-2">
                <div className="mb-6 text-center">
                  <h2 className="font-clash-display mb-2 text-2xl font-normal text-gray-800">
                    Solicitar Orçamento Final
                  </h2>
                  <p className="mb-4 text-xs text-gray-500">
                    Preencha os dados abaixo para receber o contato de um
                    especialista.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* NOME COMPLETO */}
                  <div className="flex flex-col gap-1">
                    <label className="ml-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Nome completo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="nome"
                        required
                        placeholder="Seu nome completo"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className={`w-full rounded-xl border p-4 text-sm text-gray-700 shadow-sm transition-all outline-none ${
                          isValidName(formData.nome)
                            ? "border-[#00D68F] ring-1 ring-[#00D68F]/30"
                            : "border-gray-200 focus:border-[#00D68F]"
                        }`}
                      />
                      {isValidName(formData.nome) && (
                        <Check className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[#00D68F]" />
                      )}
                    </div>
                  </div>

                  {/* E-MAIL */}
                  <div className="flex flex-col gap-1">
                    <label className="ml-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      E-mail
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full rounded-xl border p-4 text-sm text-gray-700 shadow-sm transition-all outline-none ${
                          isValidEmail(formData.email)
                            ? "border-[#00D68F] ring-1 ring-[#00D68F]/30"
                            : "border-gray-200 focus:border-[#00D68F]"
                        }`}
                      />
                      {isValidEmail(formData.email) && (
                        <Check className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[#00D68F]" />
                      )}
                    </div>
                  </div>

                  {/* WHATSAPP */}
                  <div className="flex flex-col gap-1">
                    <label className="ml-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      WhatsApp
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="celular"
                        required
                        placeholder="(00) 00000-0000"
                        value={formData.celular}
                        onChange={handleInputChange}
                        maxLength={15}
                        className={`w-full rounded-xl border p-4 text-sm text-gray-700 shadow-sm transition-all outline-none ${
                          formData.celular.length >= 14
                            ? "border-[#00D68F] ring-1 ring-[#00D68F]/30"
                            : "border-gray-200 focus:border-[#00D68F]"
                        }`}
                      />
                      {formData.celular.length >= 14 && (
                        <Check className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[#00D68F]" />
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-center text-[10px] leading-relaxed text-gray-400">
                      Ao clicar em enviar, você aceita nossa <br />
                      <Link
                        href="/politica-de-privacidade"
                        className="text-emerald-600 underline"
                      >
                        Política de Privacidade
                      </Link>
                      .
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition-transform active:scale-[0.98]"
                  >
                    <MessageCircle size={20} /> Enviar para Consultor
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
