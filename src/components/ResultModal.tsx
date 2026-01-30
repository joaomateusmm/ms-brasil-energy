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

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyBill: number;
  locationType?: string;
  address?: string;
}

export default function ResultModal({
  isOpen,
  onClose,
  monthlyBill,
  locationType = "Não informado",
  address = "Não informado",
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

  // --- FUNÇÕES DE VALIDAÇÃO ---
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidName = (name: string) => name.trim().length > 3;

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
            duration: 1.5,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3,
          },
        );
        gsap.to(".results-content", { opacity: 1, duration: 0 });
      }

      if (step === "form") {
        gsap.fromTo(
          ".form-content",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
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
      console.error(error);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleSwitchToForm = () => {
    if (!modalRef.current) return;
    gsap.to(".results-content", {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setStep("form"),
    });
  };

  const handleBackToResults = () => {
    gsap.to(".form-content", {
      opacity: 0,
      x: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setStep("results"),
    });
  };

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
        if (kwh >= 3000) return 49982 + (kwh - 3000) * 16;
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
      const costMin = basePrice * 1.02;
      const costMax = basePrice * 1.1;
      const economy = Math.max(0, (monthlyBill - 50) * 12);

      setResults({
        power: parseFloat(systemPowerKwp.toFixed(2)),
        area: Math.ceil(systemPowerKwp * 7),
        costMin: costMin,
        costMax: costMax,
        monthlyProduction: parseFloat(
          (systemPowerKwp * irradiation * 30).toFixed(2),
        ),
        annualSavings: economy,
        roiMin: parseFloat((costMin / economy).toFixed(1)),
        roiMax: parseFloat((costMax / economy).toFixed(1)),
      });
    }
  }, [monthlyBill]);

  const formatCurrency = (val: number) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatPhone = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    const truncatedValue = cleanValue.substring(0, 11);
    return truncatedValue
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

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
📱 *Telefone:* ${formData.celular}

🏠 *Tipo de Local:* ${locationType}
📍 *Endereço:* ${address}

⚡ *Potência:* ${results.power} kWp
💰 *Estimativa:* ${formatCurrency(results.costMin)} a ${formatCurrency(results.costMax)}
📈 *Economia Anual:* ${formatCurrency(results.annualSavings)}

Olá! Vi minha estimativa no site e quero um orçamento oficial!`;

    window.open(
      `https://wa.me/${NUMERO_DO_DONO}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
    );
    onClose();
  };

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
    <div className="result-card-item flex flex-col items-center justify-center gap-2 p-2 text-center will-change-transform md:p-4">
      <Icon className="mb-2 h-8 w-8 stroke-[1.5] text-[#374151] md:h-10 md:w-10" />
      <h3 className="text-xs font-medium text-[#4b5563] md:text-sm">{label}</h3>
      <div className="text-lg font-bold text-[#00D68F] md:text-xl">{value}</div>
      {subValue && (
        <div className="text-[10px] text-[#9ca3af] md:text-xs">{subValue}</div>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md transition-all duration-300">
      <div
        ref={modalRef}
        className="animate-in fade-in zoom-in-95 relative flex max-h-[95vh] min-h-0 w-full max-w-5xl flex-col overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl duration-300 md:p-8 lg:max-h-[90vh] lg:min-h-[650px] lg:p-12"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full bg-gray-100 p-2 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 md:top-6 md:right-6"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {step === "results" && (
          <div className="results-content flex h-full flex-col justify-between">
            <div
              ref={printRef}
              className="rounded-xl bg-white px-2 py-4 text-[#1f2937]"
            >
              <div className="mb-6 text-center md:mb-10">
                <h2 className="font-clash-display text-2xl font-light text-[#1f2937] md:text-4xl">
                  Resultado
                </h2>
                <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-emerald-500"></div>

                <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-left md:items-center">
                  <AlertTriangle className="h-6 w-6 flex-shrink-0 text-amber-600" />
                  <p className="text-xs leading-relaxed text-amber-900 md:text-sm">
                    <span className="font-bold">IMPORTANTE:</span> Valores
                    baseados em médias. O valor real pode variar de 2% a 10%
                    após análise técnica da localização, tipo de telhado, etc.
                    Consulte um especialista da MS Brasil Energy para ter o seu
                    orçamento real.
                  </p>
                </div>

                <p className="mt-4 text-sm text-[#6b7280] md:text-base">
                  Com base em sua conta de{" "}
                  <span className="font-bold text-[#374151]">
                    {formatCurrency(monthlyBill)}
                  </span>
                  /mês
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
                <ResultCard
                  icon={Zap}
                  label="Potência instalada*"
                  value={`${results.power} kWp`}
                />
                <ResultCard
                  icon={Maximize}
                  label="Área mínima necessária*"
                  value={
                    <span>
                      {results.area} m<sup className="text-sm">2</sup>
                    </span>
                  }
                />
                <ResultCard
                  icon={CircleDollarSign}
                  label="Valor aproximado do sistema com instalação*"
                  value={
                    <div className="flex flex-col text-lg leading-tight">
                      <span>Entre {formatCurrency(results.costMin)}</span>
                      <span className="text-sm font-medium text-[#00D68F]/80">
                        e {formatCurrency(results.costMax)}
                      </span>
                    </div>
                  }
                />
                <ResultCard
                  icon={Banknote}
                  label="Produção mensal*"
                  value={`${results.monthlyProduction} kWh/mês`}
                />
                <ResultCard
                  icon={Banknote}
                  label="Economia anual aproximada*"
                  value={formatCurrency(results.annualSavings)}
                />
                <ResultCard
                  icon={CalendarCheck}
                  label="Retorno do investimento*"
                  value={`Entre ${results.roiMin} e ${results.roiMax} anos`}
                />
              </div>
            </div>

            <div className="mt-8 text-center md:mt-12">
              <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
                <button
                  onClick={handleSwitchToForm}
                  className="group flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-500 px-8 text-lg font-bold text-white shadow-lg duration-300 hover:scale-[1.03] hover:bg-emerald-500 hover:shadow-xl active:scale-[0.98] md:w-auto"
                >
                  Falar com um especialista{" "}
                  <ChevronsRight className="h-5 w-5 duration-300 group-hover:translate-x-1" />
                </button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handlePrint}
                      disabled={isPrinting}
                      className="flex h-[52px] w-full cursor-pointer items-center justify-center rounded-md bg-gray-800 px-4 text-lg font-bold text-white shadow-lg duration-300 hover:scale-105 hover:bg-gray-900 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                    >
                      <ImageDown className="mr-2 md:mr-0" />
                      <span className="md:hidden">Baixar Resultado</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="mb-2 bg-gray-800 text-white">
                    <p>Baixar Projeto</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="mt-6 text-xs text-gray-400">
                *Os valores apresentados são estimativas. Uma análise técnica
                detalhada é necessária.
              </p>
            </div>
          </div>
        )}

        {step === "form" && (
          <div className="form-content flex h-full w-full flex-col items-center justify-center pt-25 pb-25 opacity-0">
            <button
              onClick={handleBackToResults}
              className="absolute top-4 left-4 z-20 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-emerald-500 md:top-6 md:left-6"
            >
              <ChevronLeft className="h-4 w-4" /> Voltar
            </button>
            <h2 className="font-clash-display mb-2 text-2xl font-normal text-gray-800 md:text-4xl">
              Solicitar Orçamento Final
            </h2>
            <p className="mb-6 max-w-lg text-center text-sm text-gray-500 md:mb-10 md:text-base">
              Preencha os dados abaixo para que um de nossos consultores entre
              em contato com você.
            </p>
            <p className="mb-8 text-center text-sm text-gray-500">
              Dados para a unidade em: <strong>{address}</strong>
            </p>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl space-y-4 md:space-y-6"
            >
              <div className="flex flex-col gap-1">
                <label className="ml-1 text-xs font-medium text-gray-500">
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
                    className={`w-full rounded-md border p-3 text-gray-700 transition-all outline-none ${
                      isValidName(formData.nome)
                        ? "border-[#00D68F] ring-1 ring-[#00D68F]"
                        : "border-gray-300 focus:border-[#00D68F]"
                    }`}
                  />
                  {isValidName(formData.nome) && (
                    <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-[#00D68F]" />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="ml-1 text-xs font-medium text-gray-500">
                  Digite seu e-mail
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border p-3 text-gray-700 transition-all outline-none ${
                      isValidEmail(formData.email)
                        ? "border-[#00D68F] ring-1 ring-[#00D68F]"
                        : "border-gray-300 focus:border-[#00D68F]"
                    }`}
                  />
                  {isValidEmail(formData.email) && (
                    <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-[#00D68F]" />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="ml-1 text-xs font-medium text-gray-500">
                  Celular
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
                    className={`w-full rounded-md border p-3 text-gray-700 transition-all outline-none ${
                      formData.celular.length >= 14
                        ? "border-[#00D68F] ring-1 ring-[#00D68F]"
                        : "border-gray-300 focus:border-[#00D68F]"
                    }`}
                  />
                  {formData.celular.length >= 14 && (
                    <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-[#00D68F]" />
                  )}
                </div>
              </div>

              <div className="pt-2">
                <p className="mb-3 text-xs text-gray-600">
                  *Ao clicar em &quot;Enviar via WhatsApp&quot;, você concorda
                  com os{" "}
                  <span className="cursor-pointer text-emerald-500 underline">
                    <Link href="/politica-de-privacidade">
                      Termos de Privacidades
                    </Link>
                  </span>{" "}
                  da MS Brasil Energy.
                </p>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 py-4 font-bold text-white shadow-lg duration-300 hover:bg-emerald-600 active:scale-[0.98]"
              >
                <MessageCircle size={20} /> Enviar via WhatsApp
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
