"use client";

import { ChevronDown, Menu, PhoneCall, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // === MESMA CONFIGURAÇÃO DO DESKTOP ===
  const navItems = [
    {
      name: "Home",
      href: "/",
      subMenu: [],
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

  // Função para abrir/fechar os submenus
  const toggleSubMenu = (name: string) => {
    if (activeSubMenu === name) {
      setActiveSubMenu(null); // Fecha se já estiver aberto
    } else {
      setActiveSubMenu(name); // Abre o novo
    }
  };

  return (
    // Só aparece em telas menores que 'lg' (Large)
    <header className="absolute top-0 left-0 z-50 w-full lg:hidden">
      <div className="flex h-20 items-center justify-between border-b border-white/20 px-6 backdrop-blur-sm">
        {/* LOGO */}
        <Link href="/" className="relative h-12 w-14">
          <Image
            src="/assets/page1/logo.svg"
            alt="Logo"
            fill
            className="object-cover"
          />
        </Link>

        {/* BOTÃO DE ABRIR MENU (Hambúrguer) */}
        <button
          onClick={() => setIsOpen(true)}
          className="rounded p-2 text-white hover:bg-white/10"
        >
          <Menu className="h-8 w-8" />
        </button>
      </div>

      {/* === O MENU OVERLAY (Tela Cheia) === */}
      {/* Se isOpen for true, mostramos este bloco */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#0F2830] text-white">
          {/* Cabeçalho do Menu Aberto */}
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <span className="text-xl font-bold tracking-wide text-white">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-2 text-white hover:bg-white/10"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          {/* Lista de Links */}
          <nav className="flex-1 px-6 py-8">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className="border-b border-white/5 pb-4 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    {/* Se não tiver submenu, é um link direto. Se tiver, é um botão que abre o acordeão */}
                    {item.subMenu.length === 0 ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                        className="block text-lg font-medium text-white/90"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        onClick={() => toggleSubMenu(item.name)}
                        className="flex w-full items-center justify-between text-lg font-medium text-white/90"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            activeSubMenu === item.name
                              ? "rotate-180 text-emerald-400"
                              : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Submenu (Acordeão) */}
                  {item.subMenu.length > 0 && activeSubMenu === item.name && (
                    <ul className="animate-in slide-in-from-top-2 fade-in mt-4 flex flex-col gap-3 rounded-lg bg-black/20 p-4 duration-200">
                      {item.subMenu.map((subItem, index) => (
                        <li key={index}>
                          <Link
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-base text-white/70 hover:text-emerald-400"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Ações Extras no Mobile */}
            <div className="mt-8 flex flex-col gap-6">
              <Link
                href="#simulacao"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-4xl bg-emerald-500 py-3 text-center font-bold text-white shadow-lg active:scale-95"
              >
                Fazer Simulação
              </Link>

              <div className="flex items-center gap-3 text-white/80">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <PhoneCall className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Nosso Contato</p>
                  <p className="font-semibold text-white">+55 67 9912-5299</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
