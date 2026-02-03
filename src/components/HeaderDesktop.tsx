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
  Check,
  ChevronDown,
  Copy,
  Loader2,
  PhoneCall,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Adicione useSearchParams (opcional, mas bom pra garantir re-render)
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  href: string;
  subMenu: { title: string; href: string }[];
  isAdminItem?: boolean;
}

export default function HeaderDesktop() {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [copied, setCopied] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // --- CORREÇÃO DO SCROLL ---
  // Esse efeito roda sempre que a rota muda. Se tiver hash na URL (ex: /#projetos), ele faz o scroll.
  useEffect(() => {
    // Verifica se a URL tem hash
    const hash = window.location.hash;
    if (hash && pathname === "/") {
      // Pequeno timeout para garantir que o DOM carregou
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500); // 500ms é um tempo seguro para carregamento de assets iniciais
    }
  }, [pathname]); // Roda quando a rota muda

  useEffect(() => {
    const role = user?.publicMetadata?.role;
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("msbrasilenergy@gmail.com");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Falha ao copiar!", err);
    }
  };

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");

      if (pathname === "/") {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        router.push(`/${href}`); // O useEffect lá em cima vai pegar isso depois que carregar
      }
    }
  };

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
      name: "Calculadora Solar",
      href: "#simulacao",
      subMenu: [],
    },
    {
      name: "Tipos de Sistemas",
      href: "/tipos-de-sistemas",
      subMenu: [],
    },
  ];

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
    <header className="relative w-full border-b border-white/20 text-white backdrop-blur-xs">
      <div className="mx-auto flex h-21 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-18">
            <Image
              src="/assets/page1/logo.svg"
              alt="Logo"
              fill
              priority
              className="object-cover duration-300 hover:scale-105"
            />
          </div>
        </Link>

        <nav className="-mr-8 hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name} className="group relative py-6">
                <Link
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className={`flex items-center gap-1 transition-colors ${
                    item.isAdminItem
                      ? "font-bold text-emerald-400 hover:text-emerald-300"
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

        <div className="flex items-center gap-6">
          <div className="hidden flex-col items-end xl:flex">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/60">
              <PhoneCall className="h-3 w-3" /> Nosso Contato:
            </div>

            <div className="my-1 flex flex-col items-end gap-1">
              <Link
                className="cursor-pointer text-[13px] font-bold text-white duration-300 hover:text-emerald-400 hover:underline"
                href="https://wa.link/lfkh22"
              >
                +55 67 9912-5299
              </Link>

              <button
                onClick={handleCopyEmail}
                className="group flex items-center gap-1.5 text-[13px] font-bold text-white transition-all duration-300 hover:text-emerald-400"
                title="Clique para copiar"
              >
                <span className="relative h-3.5 w-3.5">
                  <Copy
                    className={`absolute inset-0 h-full w-full transition-all duration-300 ${
                      copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    }`}
                  />
                  <Check
                    className={`absolute inset-0 h-full w-full text-emerald-400 transition-all duration-300 ${
                      copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                </span>
                <span
                  className={`cursor-pointer transition-all duration-300 ${copied ? "text-emerald-400" : ""}`}
                >
                  msbrasilenergy@gmail.com
                </span>
              </button>
            </div>
          </div>

          <div className="hidden h-8 w-px bg-white/10 lg:block"></div>

          <div className="flex items-center gap-3">
            <Link
              href="#simulacao"
              onClick={(e) => handleNavigation(e, "#simulacao")}
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
