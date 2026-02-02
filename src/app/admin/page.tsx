import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminPricingTable } from "@/components/AdminPricingTable";
import { AdminProjectCard } from "@/components/AdminProjectCard";
import { db } from "@/db";
import { pricingConfig, type Project, projects } from "@/db/schema";

// Força a página a não fazer cache, garantindo dados frescos do banco
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const user = await currentUser();

  if (!user || user.publicMetadata?.role !== "admin") {
    redirect("/");
  }

  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt));

  // --- LÓGICA DE PREÇOS CORRIGIDA ---
  let pricingData = null;

  // 1. Tenta buscar
  const configResult = await db
    .select()
    .from(pricingConfig)
    .where(eq(pricingConfig.id, 1))
    .limit(1);

  if (configResult.length > 0) {
    pricingData = configResult[0];
  } else {
    // 2. SE NÃO EXISTIR, CRIA AGORA (Auto-seed)
    // Isso garante que o banco nunca fique vazio e a tabela funcione
    const newConfig = await db
      .insert(pricingConfig)
      .values({ id: 1 }) // Cria com valores default (zeros ou definidos no schema)
      .returning();

    pricingData = newConfig[0];
  }

  return (
    <main className="min-h-screen w-full bg-[#191919] p-6 text-white md:p-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center">
          <div>
            <Link href="/">
              <p className="text-xs text-white/60 duration-200 hover:text-white/80 hover:underline">
                ⟵ Voltar para o site
              </p>
            </Link>
            <h1 className="font-clash-display my-2 text-4xl font-semibold">
              Painel Administrativo
            </h1>
            <p className="text-white/60">
              Gerencie as instalações e a tabela de preços do simulador.
            </p>
          </div>

          <Link
            href="/admin/novo-projeto"
            className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95"
          >
            <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            Novo Projeto
          </Link>
        </div>

        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-emerald-500"></div>
            <h2 className="text-2xl font-bold">Projetos Recentes</h2>
          </div>

          {allProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10 bg-white/5 py-20">
              <div className="mb-4 rounded-full bg-white/10 p-4">
                <Plus className="h-8 w-8 text-white/40" />
              </div>
              <h3 className="text-xl font-semibold text-white/80">
                Nenhum projeto encontrado
              </h3>
              <p className="mt-2 max-w-xs text-center text-sm text-white/50">
                Comece cadastrando sua primeira instalação.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allProjects.map((project: Project) => (
                <AdminProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-emerald-500"></div>
            <h2 className="text-2xl font-bold">Configuração do Simulador</h2>
          </div>

          <AdminPricingTable initialData={pricingData} />
        </section>
      </div>
    </main>
  );
}
