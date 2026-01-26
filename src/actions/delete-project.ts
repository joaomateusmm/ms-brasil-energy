"use server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

import { db } from "@/db";
import { projects } from "@/db/schema";

// Inicializa a API do UploadThing para deletar arquivos
const utapi = new UTApi();

export async function deleteProjectAction(id: number, imageKey: string) {
  try {
    // 1. Segurança
    const user = await currentUser();
    if (!user || user.publicMetadata?.role !== "admin") {
      return { success: false, message: "Não autorizado." };
    }

    // 2. Deletar a imagem do UploadThing
    if (imageKey) {
      await utapi.deleteFiles(imageKey);
    }

    // 3. Deletar do Banco de Dados
    await db.delete(projects).where(eq(projects.id, id));

    // 4. Atualizar a tela
    revalidatePath("/admin");
    return { success: true, message: "Projeto excluído com sucesso." };
  } catch (error) {
    console.error("Erro ao excluir:", error);
    return { success: false, message: "Erro ao excluir projeto." };
  }
}
