"use client";

import { ArrowLeft, Loader2, Save, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createProjectAction } from "@/actions/create-project";
import { UploadButton } from "@/lib/uploadthing";

// Definindo o tipo para as imagens
interface UploadedImage {
  url: string;
  key: string;
}

export default function NewProjectPage() {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AGORA É UM ARRAY DE IMAGENS
  const [images, setImages] = useState<UploadedImage[]>([]);

  const toastStyles = {
    className: "bg-white text-zinc-950 border-gray-200 shadow-lg",
    descriptionClassName: "text-zinc-500",
  };

  // Função para remover uma imagem específica da lista
  function handleRemoveImage(keyToRemove: string) {
    setImages((prev) => prev.filter((img) => img.key !== keyToRemove));
    toast.info("Imagem removida da lista", { ...toastStyles });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    // Validação: Pelo menos uma imagem
    if (images.length === 0) {
      toast.error("Nenhuma imagem", {
        description: "Adicione pelo menos uma foto ao projeto.",
        ...toastStyles,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(event.currentTarget);

      // Envia as imagens como JSON string para o backend processar
      // O Backend precisará fazer JSON.parse(formData.get("images"))
      formData.set("images", JSON.stringify(images));

      // Mantemos compatibilidade enviando a primeira imagem como "principal" se necessário
      formData.set("imageUrl", images[0].url);
      formData.set("imageKey", images[0].key);

      const result = await createProjectAction(formData);

      if (result.success) {
        toast.success("Projeto Criado!", {
          description: `Projeto salvo com ${images.length} imagens.`,
          ...toastStyles,
        });

        router.push("/admin");
        router.refresh();
      } else {
        toast.error("Erro ao salvar", {
          description: result.message || "Ocorreu um erro desconhecido.",
          ...toastStyles,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro Crítico", {
        description: "Falha na comunicação com o servidor.",
        ...toastStyles,
      });
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#191919] p-6 text-white md:p-12">
      <div className="mx-auto max-w-4xl">
        {" "}
        {/* Aumentei um pouco a largura para a galeria */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/admin"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-clash-display text-3xl font-semibold">
              Novo Projeto
            </h1>
            <p className="text-white/60">
              Adicione uma nova instalação ao portfólio.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* SEÇÃO DA GALERIA DE IMAGENS */}
          <div className="rounded-3xl border border-white/10 bg-[#222] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Galeria de Fotos</h2>
              <span className="text-xs text-white/40">
                {images.length} imagem(ns) selecionada(s)
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {/* ÁREA DE UPLOAD */}
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-black/20 p-8 transition-colors hover:border-emerald-500/30">
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-full bg-emerald-500/10 p-3">
                    <UploadCloud className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-white/80">Adicionar fotos</p>
                    <p className="text-xs text-white/40">
                      (Max 4MB por arquivo)
                    </p>
                  </div>

                  <UploadButton
                    endpoint="imageUploader"
                    appearance={{
                      button:
                        "bg-emerald-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-emerald-600 transition-all focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 focus-within:ring-offset-[#191919]",
                      allowedContent: "hidden",
                    }}
                    onUploadBegin={() => setIsUploading(true)}
                    onClientUploadComplete={(res) => {
                      setIsUploading(false);
                      // Adiciona as novas imagens ao array existente
                      const newImages = res.map((file) => ({
                        url: file.url,
                        key: file.key,
                      }));
                      setImages((prev) => [...prev, ...newImages]);

                      toast.success(
                        `${newImages.length} imagem(ns) adicionada(s)!`,
                        {
                          ...toastStyles,
                        },
                      );
                    }}
                    onUploadError={(error: Error) => {
                      setIsUploading(false);
                      toast.error("Erro no Upload", {
                        description: error.message,
                        ...toastStyles,
                      });
                    }}
                  />
                </div>
              </div>

              {/* GRID DE VISUALIZAÇÃO DAS IMAGENS */}
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

                      {/* Botão de Excluir Imagem Individual */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.key)}
                        className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 backdrop-blur-md transition-all group-hover:opacity-100 hover:bg-red-500"
                        title="Remover foto"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      {/* Badge da Imagem Principal */}
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

          <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-[#222] p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white/70">
                  Nome do Projeto <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  required
                  maxLength={45}
                  placeholder="Ex: Residência Família Silva"
                  className="rounded-xl border border-white/10 bg-black/20 p-3 text-white placeholder-white/30 transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white/70">
                  Localização <span className="text-red-500">*</span>
                </label>
                <input
                  name="location"
                  required
                  maxLength={45}
                  placeholder="Ex: Campinas, SP"
                  className="rounded-xl border border-white/10 bg-black/20 p-3 text-white placeholder-white/30 transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white/70">
                  Tipo de Sistema
                </label>
                <input
                  name="systemType"
                  maxLength={45}
                  placeholder="Ex: 8.8 kWp"
                  className="rounded-xl border border-white/10 bg-black/20 p-3 text-white placeholder-white/30 transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white/70">
                  Data de Instalação
                </label>
                <input
                  type="date"
                  name="installationDate"
                  className="rounded-xl border border-white/10 bg-black/20 p-3 text-white placeholder-white/30 [color-scheme:dark] transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white/70">
                Descrição Detalhada
              </label>
              <textarea
                name="description"
                rows={4}
                maxLength={155}
                placeholder="Detalhes sobre a instalação..."
                className="resize-none rounded-xl border border-white/10 bg-black/20 p-3 text-white placeholder-white/30 transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pb-12">
            <button
              type="submit"
              disabled={isSubmitting || images.length === 0 || isUploading}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:bg-emerald-600 active:scale-95 disabled:bg-gray-600 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Salvar Projeto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
