"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { ChevronDown, Loader2, Mail, Menu, PhoneCall, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    { name: "Sobre Nós", href: "/sobre-nos", subMenu: [] },
    { name: "Projetos", href: "#projetos", subMenu: [] },
    { name: "Simulação", href: "#simulacao", subMenu: [] },
    { name: "Social :", href: "/", subMenu: [] },
  ];

  const toggleSubMenu = (name: string) => {
    setActiveSubMenu(activeSubMenu === name ? null : name);
  };

  return (
    <header className="absolute top-0 left-0 z-50 w-full lg:hidden">
      {/* BARRA SUPERIOR */}
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6 backdrop-blur-sm">
        <Link href="/" className="relative h-12 w-14">
          <Image
            src="/assets/page1/logo.svg"
            alt="Logo"
            fill
            className="object-contain"
          />
        </Link>

        {/* Botão Hambúrguer e User Button lado a lado */}
        <div className="flex items-center gap-4">
          {/* User Button visível na barra fechada se logado */}
          <ClerkLoaded>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </ClerkLoaded>

          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg p-2 text-white hover:bg-white/10 active:scale-95"
            aria-label="Abrir menu"
          >
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* GAVETA LATERAL */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-[400px] bg-[#0F2830] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Header do Menu */}
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <span className="text-xl font-bold tracking-wide text-white">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-white hover:bg-white/10 active:scale-95"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          {/* Navegação */}
          <nav className="flex-1 px-6 py-8">
            {/* LOGIN NO MOBILE (Topo da lista) */}
            <div className="mb-6 border-b border-white/10 pb-6">
              <ClerkLoading>
                <div className="flex items-center gap-2 text-white/50">
                  <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
                </div>
              </ClerkLoading>

              <ClerkLoaded>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full rounded-xl bg-emerald-500 py-3 font-bold text-white transition hover:bg-emerald-600">
                      Entrar na Conta
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3 text-white">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-sm font-medium">Minha Conta</span>
                  </div>
                </SignedIn>
              </ClerkLoaded>
            </div>

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

                  {/* Submenu */}
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

            <div className="mt-6 flex flex-col gap-6">
              {/* Contato */}
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <PhoneCall className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
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
                <div>
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
