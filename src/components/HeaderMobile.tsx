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
  Mail,
  Menu,
  PhoneCall,
  ShieldCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SubMenuItem {
  title: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  subMenu: SubMenuItem[];
  isAdminItem?: boolean;
}

export default function HeaderMobile() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user?.publicMetadata?.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsOpen(false);

    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");

      if (pathname === "/") {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 300);
      } else {
        router.push(`/${href}`);
      }
    }
  };

  const baseNavItems: NavItem[] = [
    { name: "Home", href: "/", subMenu: [] },
    { name: "Sobre Nós", href: "/sobre-nos", subMenu: [] },
    { name: "Projetos", href: "#projetos", subMenu: [] },
    { name: "Simulação", href: "#simulacao", subMenu: [] },
    { name: "Social", href: "#", subMenu: [] },
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

  const toggleSubMenu = (name: string) => {
    setActiveSubMenu(activeSubMenu === name ? null : name);
  };

  // --- CONTENT OF THE DRAWER ---
  const MobileMenuContent = (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* GAVETA LATERAL */}
      <div
        className={`fixed top-0 right-0 z-[9999] h-[100dvh] w-[85%] max-w-[400px] bg-[#0F2830] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Container interno com scroll VISÍVEL.
            Adicionei classes de scrollbar personalizadas.
            Se não estiver usando tailwind-scrollbar, adicione o CSS global abaixo.
        */}
        <div className="scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex h-full flex-col overflow-y-auto overscroll-contain pr-1">
          {/* Header do Menu */}
          <div className="flex min-h-[80px] shrink-0 items-center justify-between border-b border-white/10 px-6">
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
            {/* LOGIN NO MOBILE */}
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
                        onClick={(e) => handleNavigation(e, item.href)}
                        className={`flex items-center gap-2 text-lg transition-colors ${
                          item.isAdminItem
                            ? "font-bold text-emerald-400 hover:text-emerald-300"
                            : "font-medium text-white/90 hover:text-emerald-400"
                        }`}
                      >
                        {item.isAdminItem && (
                          <ShieldCheck className="h-5 w-5" />
                        )}
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

            <div className="mt-6 flex flex-col gap-6 pb-8">
              {/* Contato */}
              <Link
                className="duration-200 active:scale-95"
                href="https://wa.link/lfkh22"
              >
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-2 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                    <PhoneCall className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-xs tracking-wider text-white/50 uppercase">
                      Fale Conosco
                    </p>
                    <p className="text-[13px] font-semibold text-white">
                      +55 67 9912-5299
                    </p>
                  </div>
                </div>
              </Link>
              <button
                className="w-full duration-200 active:scale-95"
                onClick={handleCopyEmail}
              >
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-2 py-4">
                  <div className="flex h-10 w-13 items-center justify-center rounded-full bg-emerald-500/20">
                    <Mail className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="flex w-full flex-col items-start gap-1">
                    <p className="text-xs tracking-wider text-white/50 uppercase">
                      Mande email
                    </p>
                    <div className="flex w-full flex-row items-center justify-start gap-1">
                      <span className="relative h-3 w-3 shrink-0">
                        <Copy
                          className={`absolute inset-0 h-full w-full transition-all duration-300 ${
                            copied
                              ? "scale-0 opacity-0"
                              : "scale-100 opacity-100"
                          }`}
                        />
                        <Check
                          className={`absolute inset-0 h-full w-full text-emerald-400 transition-all duration-300 ${
                            copied
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0"
                          }`}
                        />
                      </span>
                      <span
                        className={`truncate text-[13px] transition-all duration-300 ${copied ? "text-emerald-400" : "text-white"}`}
                      >
                        msbrasilenergy@gmail.com
                      </span>
                    </div>
                  </div>
                </div>
              </button>
              <span
                className={`font-montserrat -mt-4 block w-full text-center text-sm text-neutral-400 transition-all duration-300 ${
                  copied
                    ? "h-auto scale-100 opacity-100"
                    : "h-0 scale-0 opacity-0"
                }`}
              >
                Email copiado!
              </span>
            </div>
          </nav>
        </div>
      </div>
    </>
  );

  return (
    <>
      <header className="relative z-50 w-full lg:hidden">
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6 backdrop-blur-md">
          <Link href="/" className="relative z-50 flex h-14 w-16">
            <Image
              src="/assets/page1/logo.svg"
              alt="Logo"
              fill
              className="object-contain"
            />
          </Link>

          <div className="z-50 flex items-center justify-center gap-4">
            <div>
              <ClerkLoading>
                <div className="flex items-center gap-2 text-white/50">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </ClerkLoading>

              <ClerkLoaded>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-bold text-white transition hover:bg-emerald-600">
                      Entrar
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-md font-medium">Ver Conta</span>
                  </div>
                </SignedIn>
              </ClerkLoaded>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="pointer-events-auto rounded-lg border border-white/10 bg-white/5 p-1.5 text-white active:scale-95"
              aria-label="Abrir menu"
            >
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </header>

      {mounted && createPortal(MobileMenuContent, document.body)}
    </>
  );
}
