import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

// Conecta usando a variável de ambiente do .env.local
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
