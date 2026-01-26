import { currentUser } from "@clerk/nextjs/server"; // <--- MUDEI AQUI
import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminProjectCard } from "@/components/AdminProjectCard"; // <--- Importe o novo componente
import { db } from "@/db";
import { type Project, projects } from "@/db/schema";

export default async function AdminDashboard() {
  // 1. SEGURANÇA (Agora usando currentUser para garantir acesso aos metadados)
  const user = await currentUser();

  // Verifica se o usuário existe e se a role é admin
  // Nota: No currentUser, o campo se chama 'publicMetadata'
  if (!user || user.publicMetadata?.role !== "admin") {
    redirect("/"); // Chuta para fora se não for admin
  }

  // 2. BUSCAR DADOS DO BANCO
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt));

  return (
    <main className="min-h-screen w-full bg-[#191919] p-6 text-white md:p-12">
      <div className="mx-auto max-w-7xl">
        {/* --- CABEÇALHO --- */}
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
              Gerencie as instalações e projetos do portfólio.
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

        {/* --- GRID --- */}
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
            {/* Agora usamos o componente Client Side para cada projeto */}
            {allProjects.map((project: Project) => (
              <AdminProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
