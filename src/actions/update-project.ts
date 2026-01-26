"use server";

import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

import { db } from "@/db";
import { projects } from "@/db/schema";

const utapi = new UTApi();

interface UploadedImage {
  url: string;
  key: string;
}

export async function updateProjectAction(formData: FormData) {
  try {
    // 1. Segurança
    const user = await currentUser();
    if (!user || user.publicMetadata?.role !== "admin") {
      return { success: false, message: "Não autorizado." };
    }

    // 2. Pegar dados básicos
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const systemType = formData.get("systemType") as string;
    const rawDate = formData.get("installationDate") as string;
    const installationDate = rawDate ? rawDate : null;

    // 3. Processar Imagens (Galeria)
    const imagesJson = formData.get("images") as string;
    const newImages: UploadedImage[] = imagesJson ? JSON.parse(imagesJson) : [];

    // Pegamos a "galeria antiga" para saber o que foi deletado
    const oldImagesJson = formData.get("oldGallery") as string;
    const oldImages: UploadedImage[] = oldImagesJson
      ? JSON.parse(oldImagesJson)
      : [];

    if (!id || !title || !location || newImages.length === 0) {
      return { success: false, message: "Dados inválidos ou sem imagem." };
    }

    // 4. Lógica de Limpeza do UploadThing
    // Encontrar imagens que estavam na lista antiga mas NÃO estão na nova (foram deletadas)
    const imagesToDelete = oldImages.filter(
      (oldImg) => !newImages.some((newImg) => newImg.key === oldImg.key),
    );

    if (imagesToDelete.length > 0) {
      const keysToDelete = imagesToDelete.map((img) => img.key);
      await utapi.deleteFiles(keysToDelete);
    }

    // 5. Atualizar no Banco
    await db
      .update(projects)
      .set({
        title,
        description,
        location,
        systemType,
        installationDate,
        // Define a primeira imagem como Capa
        imageUrl: newImages[0].url,
        imageKey: newImages[0].key,
        // Salva o array completo
        gallery: newImages,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id));

    revalidatePath("/admin");
    return { success: true, message: "Projeto atualizado!" };
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    return { success: false, message: "Erro interno ao atualizar." };
  }
}
