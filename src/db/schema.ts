import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import {
  date,
  doublePrecision,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// --- SUA TABELA DE PROJETOS JÁ EXISTENTE (MANTIDA) ---
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 256 }).notNull(),
  installationDate: date("installation_date"),
  systemType: varchar("system_type", { length: 256 }),
  imageUrl: text("image_url").notNull(),
  imageKey: text("image_key").notNull(),
  gallery: json("gallery").$type<{ url: string; key: string }[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- NOVA TABELA: CONFIGURAÇÃO DE PREÇOS (Colunas Fixas) ---
export const pricingConfig = pgTable("pricing_config", {
  id: serial("id").primaryKey(), // Sempre será ID 1

  // Colunas específicas para cada potência (Preço em Reais)
  price300: doublePrecision("price_300").notNull().default(6890),
  price400: doublePrecision("price_400").notNull().default(9990),
  price500: doublePrecision("price_500").notNull().default(10790),
  price600: doublePrecision("price_600").notNull().default(11990),
  price700: doublePrecision("price_700").notNull().default(13490),
  price800: doublePrecision("price_800").notNull().default(15690),
  price900: doublePrecision("price_900").notNull().default(17490),
  price1000: doublePrecision("price_1000").notNull().default(18390),
  price1500: doublePrecision("price_1500").notNull().default(23990),
  price2000: doublePrecision("price_2000").notNull().default(35890),
  price2500: doublePrecision("price_2500").notNull().default(41977),
  price3000: doublePrecision("price_3000").notNull().default(49982),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- TYPES ---
export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;

export type PricingConfig = InferSelectModel<typeof pricingConfig>;
export type NewPricingConfig = InferInsertModel<typeof pricingConfig>;
