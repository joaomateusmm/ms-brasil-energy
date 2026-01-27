"use client";

import { Loader2, MapPin, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { deleteProjectAction } from "@/actions/delete-project";
// Importações do Shadcn UI (AlertDialog)
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Project } from "@/db/schema";

interface AdminProjectCardProps {
  project: Project;
}

export function AdminProjectCard({ project }: AdminProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  // A função agora é chamada apenas quando o usuário confirma no Modal
  async function executeDelete() {
    setIsDeleting(true);

    try {
      const result = await deleteProjectAction(project.id, project.imageKey);

      if (result.success) {
        toast.success("Projeto excluído!", {
          description: "O registro e a imagem foram removidos.",
        });
      } else {
        toast.error("Erro", { description: result.message });
        setIsDeleting(false); // Só para o loading se der erro (se der sucesso o card some)
      }
    } catch {
      toast.error("Erro crítico", {
        description: "Falha ao comunicar com servidor.",
      });
      setIsDeleting(false);
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#222] transition-colors duration-300 hover:border-emerald-500">
      {/* Imagem do Projeto */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge do Tipo de Sistema */}
        {project.systemType && (
          <div className="absolute top-3 right-3 flex items-center justify-center rounded-full border border-white/10 bg-black/70 backdrop-blur-md">
            <span className="px-3 py-1 text-xs font-bold tracking-wider text-emerald-500 uppercase">
              {project.systemType}
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-500 uppercase">
          <MapPin className="h-3 w-3" />
          {project.location}
        </div>

        <h2 className="font-clash-display mb-2 line-clamp-1 text-xl font-semibold">
          {project.title}
        </h2>

        {project.description && (
          <p className="mb-6 line-clamp-2 h-10 text-sm text-white/50">
            {project.description}
          </p>
        )}

        {/* Ações (Editar / Excluir) */}
        <div className="flex items-center gap-3 border-t border-white/5 pt-4">
          {/* BOTÃO EDITAR */}
          <Link
            href={`/admin/editar/${project.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/5 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-emerald-400"
          >
            <Pencil className="h-3 w-3" />
            Editar
          </Link>

          {/* BOTÃO EXCLUIR COM ALERT DIALOG */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                disabled={isDeleting}
                className="flex items-center justify-center rounded-lg bg-red-500/10 p-2 text-red-500 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                title="Excluir projeto"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </AlertDialogTrigger>

            {/* Conteúdo do Modal */}
            <AlertDialogContent className="border-white/10 bg-[#191919] text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                <AlertDialogDescription className="text-white/60">
                  Essa ação não pode ser desfeita. Isso excluirá permanentemente
                  o projeto <strong>{project.title}</strong> e removerá a imagem
                  dos nossos servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={executeDelete}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Confirmar Exclusão
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
