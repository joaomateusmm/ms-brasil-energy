"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { projects } from "@/db/schema";

// Tipo auxiliar para tipar o JSON
interface UploadedImage {
  url: string;
  key: string;
}

export async function createProjectAction(formData: FormData) {
  try {
    // 1. Segurança
    const user = await currentUser();
    if (!user || user.publicMetadata?.role !== "admin") {
      return { success: false, message: "Usuário não autorizado." };
    }

    // 2. Pegar dados do Form
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const systemType = formData.get("systemType") as string;

    // Tratamento da Data
    const rawDate = formData.get("installationDate") as string;
    const installationDate = rawDate ? rawDate : null;

    // --- NOVA LÓGICA DE GALERIA ---
    const imagesJson = formData.get("images") as string;
    let gallery: UploadedImage[] = [];

    if (imagesJson) {
      try {
        gallery = JSON.parse(imagesJson);
      } catch (e) {
        console.error("Erro ao fazer parse da galeria", e);
        return { success: false, message: "Erro nos dados das imagens." };
      }
    }

    // Se a galeria estiver vazia, tenta pegar os campos antigos (fallback)
    if (gallery.length === 0) {
      const singleUrl = formData.get("imageUrl") as string;
      const singleKey = formData.get("imageKey") as string;
      if (singleUrl && singleKey) {
        gallery = [{ url: singleUrl, key: singleKey }];
      }
    }

    // Validação: Precisa de pelo menos 1 imagem
    if (gallery.length === 0) {
      return { success: false, message: "A imagem do projeto é obrigatória." };
    }

    // A Imagem Principal (Capa) será sempre a primeira da galeria
    const mainImage = gallery[0];

    // 3. Validação Fina
    if (!title) return { success: false, message: "O título é obrigatório." };
    if (!location)
      return { success: false, message: "A localização é obrigatória." };

    // 4. Salvar no Banco
    await db.insert(projects).values({
      title,
      description,
      location,
      systemType,
      installationDate,
      // Salva a capa para compatibilidade
      imageUrl: mainImage.url,
      imageKey: mainImage.key,
      // Salva o array completo (IMPORTANTE!)
      gallery: gallery,
    });

    // 5. Sucesso
    revalidatePath("/admin");
    return { success: true, message: "Projeto criado com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return {
      success: false,
      message: "Erro interno no servidor. Tente novamente.",
    };
  }
}
