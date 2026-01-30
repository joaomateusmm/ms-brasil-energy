import { desc } from "drizzle-orm"; // Para ordenar
import React from "react";

import { db } from "@/db"; // Importe sua conexão
import { type Project, projects } from "@/db/schema"; // Importe seu schema e tipo

import { ProjectActionButtons } from "./project-buttons";
// Importe o Card Interativo que acabamos de criar
import { ProjectCard } from "./ProjectCard";

export default async function HeroSection5() {
  // BUSCA NO BANCO DE DADOS
  const dbProjects = await db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt))
    .limit(6);

  return (
    <section className="relative z-50 w-full bg-[#191919] px-6 py-20 text-white md:px-20">
      {/* --- CABEÇALHO --- */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h2 className="font-clash-display mb-4 text-4xl font-semibold md:text-5xl">
          Nossas Instalações
        </h2>
        <p className="text-lg text-white/60 md:text-xl">
          Confira os projetos realizados pela MS Brasil Energy. Qualidade e economia
          que transformam a vida dos nossos clientes.
        </p>
      </div>

      {/* --- GRID DE PROJETOS --- */}
      {dbProjects.length > 0 ? (
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-3">
          {dbProjects.map((project: Project) => (
            // Passamos o objeto inteiro do projeto para o componente cliente
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center text-white/40">
          <p>Nenhum projeto cadastrado ainda.</p>
        </div>
      )}

      {/* --- RODAPÉ COM CHAMADA PARA AÇÃO --- */}
      <div className="mx-auto mt-24 flex w-full max-w-[600px] flex-col items-center justify-center gap-6 text-center">
        <h1 className="font-clash-display w-full max-w-[400px] text-3xl font-semibold md:text-4xl">
          Quer fazer parte desse futuro?
        </h1>
        <p className="max-w-[400px] text-emerald-500">
          Junte-se a centenas de clientes satisfeitos e comece a economizar hoje
          mesmo.
        </p>

        <ProjectActionButtons />
      </div>
    </section>
  );
}
