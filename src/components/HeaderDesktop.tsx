// src/components/HeaderDesktop.tsx
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ChevronDown, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderDesktop() {
  // === CONFIGURAÇÃO CENTRAL DOS MENUS ===
  // Aqui é onde personalizas tudo.
  // Se 'subMenu' estiver vazio [], o dropdown não aparece.
  // Se tiver itens, eles aparecem na lista.
  const navItems = [
    {
      name: "Home",
      href: "/",
      subMenu: [], // Sem dropdown
    },
    {
      name: "Sobre Nós",
      href: "/sobre",
      subMenu: [
        { title: "Nossa História", href: "/historia" },
        { title: "Equipe", href: "/equipe" },
        { title: "Certificações", href: "/certificacoes" },
      ],
    },
    {
      name: "Serviços",
      href: "/servicos",
      subMenu: [
        { title: "Energia Solar Residencial", href: "/residencial" },
        { title: "Energia Comercial", href: "/comercial" },
        { title: "Manutenção", href: "/manutencao" },
        { title: "Instalação", href: "/instalacao" },
      ],
    },
    {
      name: "Projetos",
      href: "/projetos",
      subMenu: [
        { title: "Casos de Sucesso", href: "/casos" },
        { title: "Galeria de Fotos", href: "/galeria" },
      ],
    },
    {
      name: "Notícias",
      href: "/blog",
      subMenu: [
        { title: "Artigos Recentes", href: "/blog/recentes" },
        { title: "Tendências de Mercado", href: "/blog/mercado" },
      ],
    },
  ];

  return (
    // Header principal
    <header className="absolute top-0 left-0 z-50 w-full border-b border-white/20 text-white backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* === 1. ESQUERDA: LOGO === */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-18">
            <Image
              src="/assets/page1/logo.svg"
              alt="Logo"
              fill
              className="object-cover duration-300 hover:scale-105"
            />
          </div>
        </Link>

        {/* === 2. CENTRO: NAVEGAÇÃO (DINÂMICA) === */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name} className="group relative py-6">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-white/80 transition-colors hover:text-emerald-400"
                >
                  {item.name}
                  {/* Verifica se a lista subMenu tem itens para mostrar a setinha */}
                  {item.subMenu.length > 0 && (
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Renderiza o Dropdown APENAS se houver itens no subMenu */}
                {item.subMenu.length > 0 && (
                  <div className="invisible absolute top-full left-0 mt-0 w-48 translate-y-2 rounded-lg border border-white/10 bg-[#0c1f26] p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="flex flex-col gap-1">
                      {/* Aqui fazemos um segundo loop para os itens internos */}
                      {item.subMenu.map((subItem, index) => (
                        <li key={index}>
                          <Link
                            href={subItem.href}
                            className="block rounded px-4 py-2 text-white/70 hover:bg-white/5 hover:text-white"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* === 3. DIREITA: AÇÕES === */}
        <div className="flex items-center gap-6">
          {/* Telefone */}
          <div className="hidden flex-col items-end xl:flex">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/60">
              <PhoneCall className="h-3 w-3" /> Nosso Contato:
            </div>
            <div className="cursor-pointer text-sm font-bold text-white duration-300 hover:text-emerald-400 hover:underline">
              <Link href="https://wa.link/lfkh22">+55 67 9912-5299</Link>
            </div>
          </div>

          {/* Divisória vertical */}
          <div className="hidden h-8 w-px bg-white/10 lg:block"></div>

          {/* Ícones e Botão */}
          <div className="flex items-center gap-4">
            <Link
              href="#simulacao"
              className="hidden rounded-4xl bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:active:scale-95 lg:block"
            >
              Fazer Simulação
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* Mostra APENAS se o usuário NÃO estiver logado */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-xl bg-emerald-500 px-6 py-2 font-bold text-white transition hover:bg-emerald-600">
                  Entrar
                </button>
              </SignInButton>
            </SignedOut>

            {/* Mostra APENAS se o usuário JÁ estiver logado */}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
