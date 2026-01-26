"use client";

import { Image as ImageIcon, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/db/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [selectedImage, setSelectedImage] = useState(project.imageUrl);

  const gallery =
    project.gallery &&
    Array.isArray(project.gallery) &&
    project.gallery.length > 0
      ? (project.gallery as { url: string; key: string }[])
      : [{ url: project.imageUrl, key: "cover" }];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group flex cursor-pointer flex-col gap-4">
          {/* CARD DA MINIATURA (HOME) */}
          <div className="relative h-[300px] w-full overflow-hidden rounded-3xl border-2 border-white/10 bg-[#222] shadow-lg transition-all duration-300 group-hover:border-emerald-500 md:h-[400px]">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

            {/* Badges */}
            {project.systemType && (
              <div className="absolute top-4 right-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-bold text-emerald-500 backdrop-blur-sm">
                {project.systemType}
              </div>
            )}

            {gallery.length > 1 && (
              <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                <ImageIcon className="h-3 w-3" />+{gallery.length - 1}
              </div>
            )}
          </div>

          {/* TEXTO ABAIXO DA MINIATURA */}
          <div className="flex flex-col px-2">
            <div className="mb-2 flex items-center gap-2 text-white/60">
              <MapPin className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-medium tracking-wider uppercase">
                {project.location}
              </span>
            </div>
            <h3 className="font-clash-display line-clamp-1 text-2xl font-semibold text-white transition-colors group-hover:text-emerald-500">
              {project.title}
            </h3>
            {project.description && (
              <p className="mt-2 line-clamp-2 text-sm text-white/40">
                {project.description}
              </p>
            )}
          </div>
        </div>
      </DialogTrigger>

      {/* --- MODAL DE DETALHES CORRIGIDO --- */}
      <DialogContent className="z-[9999] flex max-h-[90vh] !w-[95vw] !max-w-[95vw] flex-col gap-0 overflow-hidden rounded-3xl border border-white/10 bg-[#191919] p-0 text-white shadow-2xl sm:!max-w-5xl md:flex-row">
        {/* LADO ESQUERDO: GALERIA */}
        <div className="relative h-[40vh] w-full shrink-0 bg-black md:h-[600px] md:w-3/5">
          {/* Imagem Principal */}
          <div className="relative h-full w-full">
            <Image
              src={selectedImage}
              alt="Zoom"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Gradiente para Thumbnails */}
          <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/90 to-transparent" />

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-0 w-full px-4">
            <div
              className="flex w-full gap-3 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedImage === img.url
                      ? "border-emerald-500 opacity-100"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`Thumb ${idx}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LADO DIREITO: INFORMAÇÕES */}
        <div className="flex w-full flex-col overflow-y-auto bg-[#191919] p-6 md:w-2/5 md:p-8">
          <DialogHeader className="mb-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-500">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-bold tracking-widest uppercase">
                {project.location}
              </span>
            </div>
            <DialogTitle className="font-clash-display text-2xl leading-tight font-semibold text-white md:text-3xl">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-6">
            {/* Tags / Badges */}
            <div className="flex flex-wrap gap-2">
              {project.systemType && (
                <div className="inline-flex items-center rounded-lg border border-neutral-500/20 bg-neutral-500/10 px-3 py-1.5 text-xs font-bold tracking-wide text-neutral-400">
                  Sistema: {project.systemType}
                </div>
              )}
              {project.installationDate && (
                <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold tracking-wide text-white/60">
                  Data:{" "}
                  {new Date(project.installationDate).toLocaleDateString(
                    "pt-BR",
                  )}
                </div>
              )}
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Descrição */}
            <div className="prose prose-invert text-sm leading-relaxed text-white/80">
              {project.description ? (
                <p className="whitespace-pre-line">{project.description}</p>
              ) : (
                <p className="text-white/40 italic">
                  Sem descrição detalhada disponível.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
