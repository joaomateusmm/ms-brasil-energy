// src/components/HeaderDesktop.tsx
"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {
  ChevronDown,
  Loader2,
  PhoneCall,
  ShieldCheck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// 1. Definindo a Interface para tipagem correta
interface NavItem {
  name: string;
  href: string;
  subMenu: { title: string; href: string }[];
  isAdminItem?: boolean; // Propriedade opcional
}

export default function HeaderDesktop() {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificação segura de tipo para role
    const role = user?.publicMetadata?.role;
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  // 2. Tipando a lista base
  const baseNavItems: NavItem[] = [
    {
      name: "Home",
      href: "/",
      subMenu: [],
    },
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
      name: "Social",
      href: "/",
      subMenu: [
        { title: "WhatsApp", href: "https://wa.link/lfkh22" },
        { title: "Email", href: "/" },
      ],
    },
  ];

  // 3. Construindo a lista final
  const navItems: NavItem[] = isAdmin
    ? [
        ...baseNavItems,
        {
          name: "Admin",
          href: "/admin",
          subMenu: [],
          isAdminItem: true,
        },
      ]
    : baseNavItems;

  return (
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

        {/* === 2. CENTRO: NAVEGAÇÃO === */}
        <nav className="-mr-8 hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name} className="group relative py-6">
                <Link
                  href={item.href}
                  // 4. Acesso direto à propriedade sem 'as any'
                  className={`flex items-center gap-1 transition-colors ${
                    item.isAdminItem
                      ? "-ml-2 font-bold text-emerald-400 hover:text-emerald-300"
                      : "text-white/80 hover:text-emerald-400"
                  }`}
                >
                  {item.name}

                  {item.subMenu.length > 0 && (
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {item.subMenu.length > 0 && (
                  <div className="invisible absolute top-full left-0 mt-0 w-48 translate-y-2 rounded-lg border border-white/10 bg-[#0c1f26] p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="flex flex-col gap-1">
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

          <div className="hidden h-8 w-px bg-white/10 lg:block"></div>

          <div className="flex items-center gap-3">
            <Link
              href="#simulacao"
              className="hidden rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-500/40 active:scale-95 lg:block"
            >
              Fazer Simulação
            </Link>

            <div className="flex items-center">
              <ClerkLoading>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                  <Loader2 className="h-4 w-4 animate-spin text-white/50" />
                </div>
              </ClerkLoading>

              <ClerkLoaded>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      className="group hover:border-bg-white/15 ml-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-95"
                      title="Entrar na sua conta"
                    >
                      <User className="h-5 w-5 text-white transition-colors group-hover:text-white" />
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <div className="ml-2 flex h-10 w-10 items-center justify-center">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox:
                            "h-10 w-10 scale-130 ring-2 ring-white/10 hover:ring-emerald-500 transition-all",
                        },
                      }}
                    />
                  </div>
                </SignedIn>
              </ClerkLoaded>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
