"use client";

import { Loader2, Save, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { updateProjectAction } from "@/actions/update-project";
import type { Project } from "@/db/schema";
import { UploadButton } from "@/lib/uploadthing";

// Interface para as imagens
interface UploadedImage {
  url: string;
  key: string;
}

interface EditFormProps {
  initialData: Project;
}

export function EditForm({ initialData }: EditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Lógica de Inicialização:
  // Se o projeto já tem 'gallery' (novo formato), usa ele.
  // Se não tem (formato antigo), cria um array com a 'imageUrl' antiga.
  const initialGallery: UploadedImage[] =
    initialData.gallery &&
    Array.isArray(initialData.gallery) &&
    initialData.gallery.length > 0
      ? (initialData.gallery as UploadedImage[])
      : [{ url: initialData.imageUrl, key: initialData.imageKey }];

  const [images, setImages] = useState<UploadedImage[]>(initialGallery);

  // Guardamos o estado inicial para comparar o que foi deletado depois
  const [oldGallery] = useState<UploadedImage[]>(initialGallery);

  const toastStyles = {
    className: "bg-white text-zinc-950 border-gray-200 shadow-lg",
    descriptionClassName: "text-zinc-500",
  };

  function handleRemoveImage(keyToRemove: string) {
    setImages((prev) => prev.filter((img) => img.key !== keyToRemove));
    toast.info("Imagem marcada para remoção", { ...toastStyles });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    if (images.length === 0) {
      toast.error("Erro", {
        description: "O projeto precisa ter pelo menos uma imagem.",
        ...toastStyles,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(event.currentTarget);

      // Campos básicos
      formData.set("id", initialData.id.toString());

      // Envia a nova galeria como JSON
      formData.set("images", JSON.stringify(images));

      // Envia a galeria antiga para o backend calcular o que deletar
      formData.set("oldGallery", JSON.stringify(oldGallery));

      const result = await updateProjectAction(formData);

      if (result.success) {
        toast.success("Projeto Atualizado!", {
          description: "As alterações foram salvas com sucesso.",
          ...toastStyles,
        });
        router.push("/admin");
        router.refresh();
      } else {
        toast.error("Erro", {
          description: result.message,
          ...toastStyles,
        });
        setIsSubmitting(false);
      }
    } catch {
      toast.error("Erro crítico", {
        description: "Falha na comunicação.",
        ...toastStyles,
      });
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* SEÇÃO DA GALERIA */}
      <div className="rounded-3xl border border-white/10 bg-[#222] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Galeria do Projeto
          </h2>
          <span className="text-xs text-white/40">
            {images.length} imagem(ns)
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {/* AREA DE UPLOAD */}
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-black/20 p-8 transition-colors hover:border-emerald-500/30">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-emerald-500/10 p-3">
                <UploadCloud className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="text-center">
                <p className="text-white/80">Adicionar mais fotos</p>
                <p className="text-xs text-white/40">(Max 4MB/arquivo)</p>
              </div>

              <UploadButton
                endpoint="imageUploader"
                appearance={{
                  button:
                    "bg-emerald-500 text-white font-bold px-6 py-2 rounded-xl",
                  allowedContent: "hidden",
                }}
                onUploadBegin={() => setIsUploading(true)}
                onClientUploadComplete={(res) => {
                  setIsUploading(false);
                  const newImages = res.map((file) => ({
                    url: file.url,
                    key: file.key,
                  }));
                  setImages((prev) => [...prev, ...newImages]);
                  toast.success(`${newImages.length} foto(s) adicionada(s)!`, {
                    ...toastStyles,
                  });
                }}
                onUploadError={(err) => {
                  setIsUploading(false);
                  toast.error(`Erro: ${err.message}`, { ...toastStyles });
                }}
              />
            </div>
          </div>

          {/* GRID DE IMAGENS */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((img, index) => (
                <div
                  key={img.key}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/40"
                >
                  <Image
                    src={img.url}
                    alt={`Foto ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Botão Remover */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img.key)}
                    className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:bg-red-500"
                    title="Remover foto"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {/* Badge Capa */}
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 rounded bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      CAPA
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DADOS DE TEXTO (Com validação de caracteres) */}
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-[#222] p-6 text-white">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-white/70">
              Nome do Projeto <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              required
              maxLength={45} // Limite
              defaultValue={initialData.title}
              className="rounded-xl border border-white/10 bg-black/20 p-3 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-white/70">
              Localização <span className="text-red-500">*</span>
            </label>
            <input
              name="location"
              required
              maxLength={45} // Limite
              defaultValue={initialData.location}
              className="rounded-xl border border-white/10 bg-black/20 p-3 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-white/70">
              Tipo de Sistema
            </label>
            <input
              name="systemType"
              maxLength={45} // Limite
              defaultValue={initialData.systemType || ""}
              className="rounded-xl border border-white/10 bg-black/20 p-3 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-white/70">Data</label>
            <input
              type="date"
              name="installationDate"
              defaultValue={
                initialData.installationDate
                  ? String(initialData.installationDate)
                  : ""
              }
              className="rounded-xl border border-white/10 bg-black/20 p-3 [color-scheme:dark] focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-white/70">Descrição</label>
          <textarea
            name="description"
            rows={4}
            maxLength={155} // Limite
            defaultValue={initialData.description || ""}
            className="resize-none rounded-xl border border-white/10 bg-black/20 p-3 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* BOTÃO SALVAR */}
      <div className="flex justify-end pb-12">
        <button
          type="submit"
          disabled={isSubmitting || isUploading || images.length === 0}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:bg-emerald-600 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Atualizando...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" /> Salvar Alterações
            </>
          )}
        </button>
      </div>
    </form>
  );
}
