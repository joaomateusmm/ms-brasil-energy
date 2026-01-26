"use client";

import gsap from "gsap";
// 1. IMPORTAÇÃO DA BIBLIOTECA CORRETA
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

export default function ResultModal({
  isOpen,
  onClose,
  monthlyBill,
}: ResultModalProps) {
  // --- ESTADOS ---
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

  // --- RESET ---
  useEffect(() => {
    if (isOpen) {
      setStep("results");
      gsap.set(".results-content", { opacity: 1, y: 0 });
    }
  }, [isOpen]);

  // --- ANIMAÇÕES GSAP ---
  useLayoutEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const ctx = gsap.context(() => {
      if (step === "results") {
        gsap.fromTo(
          ".result-card-item",
          // REMOVIDO opacity-0 do CSS, o GSAP cuida do estado inicial aqui:
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

  // --- FUNÇÃO DE PRINT BLINDADA ---
  const handlePrint = async () => {
    if (!printRef.current || isPrinting) return;
    setIsPrinting(true);

    try {
      // Pequeno delay para garantir que renderizações pendentes terminem
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(printRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff", // Garante fundo branco
        pixelRatio: 2, // Alta resolução
        style: {
          // Garante que a fonte base seja escura, caso o navegador tente aplicar modo escuro
          color: "#1f2937",
        },
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Orcamento-Solar-${monthlyBill}.png`;
      link.click();
    } catch (error) {
      console.error("Erro ao gerar print:", error);
      alert("Erro ao salvar imagem. Tente novamente.");
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

  // --- CÁLCULOS ---
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

  // --- HELPERS ---
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

  const handleContactChange = (method: string) => {
    setFormData((prev) => ({ ...prev, contato: method }));
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
    const mensagem = `Dados do cliente:
Nome - ${formData.nome}
Email - ${formData.email}
Telefone - ${formData.celular}

Olá, gostaria de dar continuidade no meu projeto da Solar Energy!`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    const whatsappUrl = `https://wa.me/${NUMERO_DO_DONO}?text=${mensagemCodificada}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  const formatCurrency = (val: number) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // --- COMPONENTE ResultCard CORRIGIDO ---
  // 1. Removemos 'opacity-0' da className (deixamos o GSAP controlar o início)
  // 2. Usamos HEX codes (#4b5563, #9ca3af) ao invés de 'text-gray-600' para evitar erro de OKLCH no print
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
    <div className="result-card-item flex flex-col items-center justify-center gap-2 p-4 text-center will-change-transform">
      <Icon className="mb-2 h-10 w-10 stroke-[1.5] text-[#374151]" />{" "}
      {/* text-gray-700 hex */}
      <h3 className="text-sm font-medium text-[#4b5563]">{label}</h3>{" "}
      {/* text-gray-600 hex */}
      <div className="text-xl font-bold text-[#00D68F]">{value}</div>
      {subValue && (
        <div className="text-xs text-[#9ca3af]">{subValue}</div>
      )}{" "}
      {/* text-gray-400 hex */}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md transition-all duration-300">
      <div
        ref={modalRef}
        className="animate-in fade-in zoom-in-95 relative flex max-h-[90vh] min-h-[650px] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl duration-300 lg:p-12"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 rounded-full bg-gray-100 p-2 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        {step === "form" && (
          <button
            onClick={handleBackToResults}
            className="absolute top-6 left-6 z-20 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-emerald-500"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar
          </button>
        )}

        {step === "results" && (
          <div className="results-content flex h-full flex-col justify-between">
            {/* WRAPPER DO PRINT - Adicionado text-[#1f2937] para garantir cor base escura */}
            <div
              ref={printRef}
              className="rounded-xl bg-white px-2 py-4 text-[#1f2937]"
            >
              <div className="mb-10 text-center">
                <h2 className="font-clash-display text-4xl font-light text-[#1f2937]">
                  Resultado
                </h2>
                <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-emerald-500"></div>
                <p className="mt-4 text-[#6b7280]">
                  {" "}
                  {/* text-gray-500 hex */}
                  Com base em sua conta de{" "}
                  <span className="font-bold text-[#374151]">
                    {formatCurrency(monthlyBill)}
                  </span>
                  /mês
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
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
                  label="Tempo aproximado de retorno do investimento*"
                  value={`Entre ${results.roiMin} e ${results.roiMax} anos`}
                />
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleSwitchToForm}
                  className="h-[52px] cursor-pointer rounded-md bg-emerald-500 px-8 text-lg font-bold text-white shadow-lg duration-300 hover:scale-[1.03] hover:bg-emerald-500 hover:shadow-xl active:scale-[0.98]"
                >
                  Quero esse projeto
                </button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handlePrint}
                      disabled={isPrinting}
                      className="flex h-[52px] cursor-pointer items-center justify-center rounded-md bg-gray-800 px-4 text-lg font-bold text-white shadow-lg duration-300 hover:scale-105 hover:bg-gray-900 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ImageDown />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="mb-2 bg-gray-800">
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
          <div className="form-content flex h-full w-full flex-col items-center justify-center py-40.5 pt-4 opacity-0">
            <h2 className="font-clash-display mb-2 text-4xl font-normal text-gray-800">
              Solicitar Orçamento
            </h2>
            <p className="mb-10 max-w-lg text-center text-gray-500">
              Preencha os dados abaixo para que um de nossos consultores entre
              em contato com você.
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
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
                    className={`w-full rounded-md border p-3 text-gray-700 transition-all outline-none ${isValidName(formData.nome) ? "border-[#00D68F] ring-1 ring-[#00D68F]" : "border-gray-300 focus:border-[#00D68F]"}`}
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
                    className={`w-full rounded-md border p-3 text-gray-700 transition-all outline-none ${isValidEmail(formData.email) ? "border-[#00D68F] ring-1 ring-[#00D68F]" : "border-gray-300 focus:border-[#00D68F]"}`}
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
                    className={`w-full rounded-md border p-3 text-gray-700 transition-all outline-none ${formData.celular.length >= 14 ? "border-[#00D68F] ring-1 ring-[#00D68F]" : "border-gray-300 focus:border-[#00D68F]"}`}
                  />
                  {formData.celular.length >= 14 && (
                    <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-[#00D68F]" />
                  )}
                </div>
              </div>
              <div className="pt-2">
                <p className="mb-3 text-xs text-gray-600">
                  *Ao clicar em &quot;Enviar Solicitação&quot;, você concorda
                  com os{" "}
                  <span className="cursor-pointer text-emerald-500 underline">
                    Termos de Privacidades{" "}
                  </span>{" "}
                  da MS Brasil Energy.
                </p>
              </div>
              <button
                type="submit"
                className="group mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-500 py-4 text-lg font-bold text-white shadow-lg duration-300 hover:bg-yellow-500 hover:shadow-xl active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5 duration-300 group-hover:-translate-x-1" />
                Enviar Solicitação
                <ChevronRight className="-ml-2 h-5 w-5 duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
