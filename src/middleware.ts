import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define que qualquer rota começando com /admin é protegida
const isProtectedPage = createRouteMatcher(["/admin(.*)"]);

// 1. Adicione 'async' aqui antes dos parâmetros
export default clerkMiddleware(async (auth, req) => {
  // Se tentar acessar /admin e não estiver logado, manda pro login
  if (isProtectedPage(req)) {
    // 2. Use 'await auth.protect()' (sem os parênteses no auth)
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Padrão do Clerk para não bloquear arquivos estáticos
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
