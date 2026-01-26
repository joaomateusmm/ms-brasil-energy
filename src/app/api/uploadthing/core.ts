import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Alterado: maxFileCount: 10 (Para permitir galeria)
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async () => {
      // SEGURANÇA: Só deixa subir quem for admin
      const user = await currentUser();
      if (!user || user.publicMetadata?.role !== "admin")
        throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload feito por:", metadata.userId);
      console.log("URL do arquivo:", file.ufsUrl);
      // Retorna dados para o cliente
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
