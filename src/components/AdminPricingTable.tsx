"use client";

import { Edit, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Tipo exato do nosso novo schema
interface PricingConfig {
  id: number;
  price300: number;
  price400: number;
  price500: number;
  price600: number;
  price700: number;
  price800: number;
  price900: number;
  price1000: number;
  price1500: number;
  price2000: number;
  price2500: number;
  price3000: number;
  updatedAt: Date;
}

interface AdminPricingTableProps {
  initialData: PricingConfig | null;
}

// Mapeamento para exibir na tabela de forma legível
const TIERS_MAP = [
  { key: "price300", label: 300 },
  { key: "price400", label: 400 },
  { key: "price500", label: 500 },
  { key: "price600", label: 600 },
  { key: "price700", label: 700 },
  { key: "price800", label: 800 },
  { key: "price900", label: 900 },
  { key: "price1000", label: 1000 },
  { key: "price1500", label: 1500 },
  { key: "price2000", label: 2000 },
  { key: "price2500", label: 2500 },
  { key: "price3000", label: 3000 },
] as const;

// Objeto vazio para caso o banco falhe ou esteja 100% limpo
const EMPTY_CONFIG: PricingConfig = {
  id: 1,
  price300: 0,
  price400: 0,
  price500: 0,
  price600: 0,
  price700: 0,
  price800: 0,
  price900: 0,
  price1000: 0,
  price1500: 0,
  price2000: 0,
  price2500: 0,
  price3000: 0,
  updatedAt: new Date(),
};

export function AdminPricingTable({ initialData }: AdminPricingTableProps) {
  const router = useRouter();

  // Se initialData for null, usa o objeto vazio (zeros)
  const [config, setConfig] = useState<PricingConfig>(
    initialData || EMPTY_CONFIG,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editingKey, setEditingKey] = useState<keyof PricingConfig | null>(
    null,
  );
  const [editValue, setEditValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const formatCurrency = (val: number) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleEditClick = (key: keyof PricingConfig) => {
    setEditingKey(key);
    // Se o valor for 0, deixa o campo vazio para facilitar a digitação
    const currentValue = Number(config[key]);
    setEditValue(currentValue === 0 ? "" : String(currentValue));
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingKey) return;

    setIsSaving(true);
    // Se a string for vazia, salva como 0
    const newValue = editValue === "" ? 0 : parseFloat(editValue);

    try {
      const payload = { [editingKey]: newValue };

      const response = await fetch("/api/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Falha ao salvar");

      // 1. Atualiza o estado local imediatamente (para feedback visual)
      setConfig((prev) => ({ ...prev, [editingKey]: newValue }));

      toast.success("Valor atualizado com sucesso!");
      setIsEditing(false);

      // 2. Força o Next.js a revalidar os dados do servidor
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar no banco.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Tabela dos Valores
            </h2>
            <p className="text-sm text-white/60">
              Valores usados para o simulador calcular.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#121212]">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-white/5 text-xs font-bold tracking-wider text-white uppercase">
              <tr>
                <th className="px-6 py-4">Potência (kWh)</th>
                <th className="px-6 py-4">Preço Base Atual</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {TIERS_MAP.map((item) => {
                const price = Number(config[item.key as keyof PricingConfig]);

                return (
                  <tr
                    key={item.key}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      <span className="rounded bg-white/10 px-2 py-1 text-xs font-bold text-emerald-400">
                        {item.label} kWh
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-white/90">
                      {price === 0 ? (
                        <span className="text-xs text-yellow-500/50 italic">
                          Não definido
                        </span>
                      ) : (
                        formatCurrency(price)
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          handleEditClick(item.key as keyof PricingConfig)
                        }
                        className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-500 hover:text-black"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Editar</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE EDIÇÃO */}
      <AlertDialog open={isEditing} onOpenChange={setIsEditing}>
        <AlertDialogContent className="border-white/10 bg-[#191919] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Editar Valor</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Escreva o valor em R$ sem nenhum ponto ou vírgula (. ,).
              Defina o novo preço para esta faixa de potência.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <label className="mb-2 block text-xs font-medium text-white/50 uppercase">
              Novo Preço (R$)
            </label>
            <div className="relative">
              <span className="absolute top-1/2 left-3 -translate-y-1/2 font-bold text-white/40">
                R$
              </span>
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/5 p-3 pl-10 text-lg font-bold text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="0.00"
                autoFocus
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 bg-transparent text-white hover:bg-white/10">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleSave();
              }}
              disabled={isSaving}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Salvar Alteração
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
