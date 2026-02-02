import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { pricingConfig } from "@/db/schema";

// GET: Busca a configuração atual
export async function GET() {
  try {
    const config = await db
      .select()
      .from(pricingConfig)
      .where(eq(pricingConfig.id, 1))
      .limit(1);

    // Se não existir, retorna null (o front lida com isso) ou cria um default
    if (config.length === 0) {
      return NextResponse.json({});
    }

    return NextResponse.json(config[0]);
  } catch (error) {
    console.error("Erro ao buscar preços:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// PUT: Atualiza ou Cria os preços
export async function PUT(req: Request) {
  try {
    const user = await currentUser();
    if (!user || user.publicMetadata?.role !== "admin") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();

    // 1. Verifica se já existe a configuração (ID 1)
    const existing = await db
      .select()
      .from(pricingConfig)
      .where(eq(pricingConfig.id, 1));

    if (existing.length === 0) {
      // 2. SE NÃO EXISTIR: Cria (INSERT) forçando o ID 1
      await db.insert(pricingConfig).values({
        id: 1,
        ...body,
      });
    } else {
      // 3. SE EXISTIR: Atualiza (UPDATE)
      await db
        .update(pricingConfig)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(pricingConfig.id, 1));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar preços:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
