"use client";

import { ChevronDown, Mail, Menu, PhoneCall, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// TIPO PARA OS ITENS DO MENU (Corrige o erro do TypeScript)
interface SubMenuItem {
  title: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  subMenu: SubMenuItem[];
}

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // Fecha o menu se a tela for redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Bloqueia o scroll da página quando o menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems: NavItem[] = [
    { name: "Home", href: "/", subMenu: [] },
    {
      name: "Sobre Nós",
      href: "/sobre-nos",
      subMenu: [],
    },
    {
      name: "Projetos",
      href: "#projetos",
      subMenu: [],
    },
    {
      name: "Simulação",
      href: "#simulacao",
      subMenu: [],
    },
    {
      name: "Social :",
      href: "/",
      subMenu: [],
    },
  ];

  const toggleSubMenu = (name: string) => {
    setActiveSubMenu(activeSubMenu === name ? null : name);
  };

  return (
    <header className="absolute top-0 left-0 z-50 w-full lg:hidden">
      {/* BARRA SUPERIOR (Visível sempre) */}
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6 backdrop-blur-sm">
        <Link href="/" className="relative h-12 w-14">
          <Image
            src="/assets/page1/logo.svg"
            alt="Logo"
            fill
            className="object-contain"
          />
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 text-white hover:bg-white/10 active:scale-95"
          aria-label="Abrir menu"
        >
          <Menu className="h-8 w-8" />
        </button>
      </div>

      {/* === OVERLAY ESCURO (Fundo) === */}
      {/* Usamos classes condicionais para animação de fade in/out */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* === GAVETA LATERAL (Menu) === */}
      {/* Sempre renderizado, mas deslocado para fora da tela quando fechado */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-[400px] bg-[#0F2830] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Cabeçalho do Menu */}
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <span className="text-xl font-bold tracking-wide text-white">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-white hover:bg-white/10 active:scale-95"
              aria-label="Fechar menu"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          {/* Lista de Navegação */}
          <nav className="flex-1 px-6 py-8">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className="border-b border-white/5 last:border-0"
                >
                  <div className="py-3">
                    {item.subMenu.length === 0 ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg font-medium text-white/90 transition-colors hover:text-emerald-400"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        onClick={() => toggleSubMenu(item.name)}
                        className="flex w-full items-center justify-between text-lg font-medium text-white/90 transition-colors hover:text-emerald-400"
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

                  {/* Submenu com Animação de Altura */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeSubMenu === item.name
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="mb-4 flex flex-col gap-3 rounded-lg bg-black/20 p-4">
                      {item.subMenu.map((subItem, index) => (
                        <li key={index}>
                          <Link
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm text-white/70 transition-all hover:translate-x-1 hover:text-emerald-400"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Ações Extras (Botão e Contato) */}
            <div className="mt-3 flex flex-col gap-6">
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <PhoneCall className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs tracking-wider text-white/50 uppercase">
                    Fale Conosco
                  </p>
                  <p className="text-sm font-semibold text-white">
                    +55 67 9912-5299
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <Mail className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs tracking-wider text-white/50 uppercase">
                    Mande email
                  </p>
                  <p className="text-sm font-semibold text-white">
                    msbrasilenergy@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
