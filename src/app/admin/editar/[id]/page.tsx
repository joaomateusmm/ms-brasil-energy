import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { projects } from "@/db/schema";

import { EditForm } from "./edit-form";

// MUDANÇA 1: 'params' agora é definido como uma Promise no Next.js 15
interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage(props: EditPageProps) {
  // MUDANÇA 2: Aguardamos a resolução dos params para pegar o ID
  const params = await props.params;
  const projectId = Number(params.id);

  // 1. Verificar Permissão
  const user = await currentUser();

  // Verifica se o usuário existe e se a role é admin
  if (!user || user.publicMetadata?.role !== "admin") {
    redirect("/");
  }

  // 2. Buscar o Projeto no Banco pelo ID
  const projectData = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1);

  const project = projectData[0];

  // Se não achar o projeto (ex: ID inválido), volta pro admin
  if (!project) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen w-full bg-[#191919] p-6 text-white md:p-12">
      <div className="mx-auto max-w-3xl">
        {/* Cabeçalho */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-clash-display text-3xl font-semibold">
              Editar Projeto
            </h1>
            <p className="text-white/60">
              Alterar informações de:{" "}
              <span className="text-emerald-500">{project.title}</span>
            </p>
          </div>
        </div>

        {/* Renderiza o Formulário (Client Component) passando os dados */}
        <EditForm initialData={project} />
      </div>
    </main>
  );
}
