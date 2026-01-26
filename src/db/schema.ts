import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import {
  date,
  json, // <--- IMPORTANTE: Adicionei 'json' aqui
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 256 }).notNull(),
  installationDate: date("installation_date"),
  systemType: varchar("system_type", { length: 256 }),

  // Mantemos estes para a "Capa" (thumbnail) do projeto
  imageUrl: text("image_url").notNull(),
  imageKey: text("image_key").notNull(),

  // NOVA COLUNA: Guarda o array com todas as fotos { url, key }
  gallery: json("gallery").$type<{ url: string; key: string }[]>().default([]),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;
