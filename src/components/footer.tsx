"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link"; // Importar Link do Next.js
import { usePathname, useRouter } from "next/navigation"; // Hooks de navegação
import React, { useLayoutEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".footer-item");

      gsap.fromTo(
        items,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // --- FUNÇÃO DE NAVEGAÇÃO INTELIGENTE (Mesma do Header) ---
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
        router.push(`/${href}`);
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-50 w-full overflow-hidden bg-[#f4f4f4] px-6 pt-16 pb-8 text-neutral-800 md:px-12 lg:px-20 lg:pt-24 lg:pb-12"
    >
      {/* --- Parte Superior: Chamada para Ação --- */}
      <div className="flex flex-col gap-12 border-b border-black/10 pb-12 lg:flex-row lg:items-start lg:justify-between lg:pb-20">
        <div className="max-w-3xl">
          <h2 className="footer-item font-clash-display text-4xl leading-[1.1] font-semibold md:text-6xl lg:text-7xl">
            Vamos construir um <br />
            <span className="text-emerald-500">futuro sustentável.</span>
          </h2>
        </div>

        {/* --- Navegação --- */}
        <div className="footer-item flex flex-col gap-10 sm:flex-row sm:gap-20 lg:gap-24">
          {/* Coluna 1 */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <h3 className="font-clash-display text-base font-semibold tracking-wide text-emerald-500 uppercase lg:text-lg">
              Menu
            </h3>
            <ul className="font-montserrat flex flex-col gap-3 text-base font-medium text-black/80 lg:gap-2 lg:text-lg">
              <li>
                <Link href="/" className="duration-300 hover:text-emerald-500">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-nos"
                  className="duration-300 hover:text-emerald-500"
                >
                  Sobre Nós
                </Link>
              </li>
              {/* Links Âncora com Navegação Inteligente */}
              <li>
                <a
                  href="#projetos"
                  onClick={(e) => handleNavigation(e, "#projetos")}
                  className="cursor-pointer duration-300 hover:text-emerald-500"
                >
                  Projetos
                </a>
              </li>
              <li>
                <a
                  href="#simulacao"
                  onClick={(e) => handleNavigation(e, "#simulacao")}
                  className="cursor-pointer duration-300 hover:text-emerald-500"
                >
                  Calculadora Solar
                </a>
              </li>
              <li>
                <Link
                  href="/tipos-de-sistemas"
                  className="duration-300 hover:text-emerald-500"
                >
                  Tipos de Sistemas
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2 */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <h3 className="font-clash-display text-base font-semibold tracking-wide text-emerald-500 uppercase lg:text-lg">
              Social
            </h3>
            <ul className="font-montserrat flex flex-col gap-3 text-base font-medium text-neutral-800 lg:gap-4 lg:text-lg">
              <li>
                <a
                  href="https://www.instagram.com/msbrasilenergy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 duration-300 hover:text-emerald-500"
                >
                  <Instagram className="h-5 w-5" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/msbrasilenergy?mibextid=LQQJ4d&rdid=DwFU6nuDDll8081n&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DRLxtYfL3%2F%3Fmibextid%3DLQQJ4d#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 duration-300 hover:text-emerald-500"
                >
                  <Facebook className="h-5 w-5" /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://wa.link/lfkh22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 duration-300 hover:text-emerald-500"
                >
                  {/* SVG Inline do WhatsApp - Isso permite mudar a cor! */}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current text-neutral-800 duration-300 group-hover:text-emerald-500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Parte Inferior: Copyright --- */}
      <div className="footer-item mt-8 flex flex-col items-start gap-4 text-xs text-neutral-600 md:mt-12 md:flex-row md:items-center md:justify-between md:text-sm">
        <p>
          &copy; {new Date().getFullYear()} MS Brasil Energy. Todos os direitos
          reservados.
        </p>

        <div className="flex flex-wrap gap-4 md:gap-8">
          <Link
            href="/politica-de-privacidade"
            className="transition-colors duration-200 hover:text-emerald-500 hover:underline"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/termos-de-uso"
            className="transition-colors duration-200 hover:text-emerald-500 hover:underline"
          >
            Termos de Uso
          </Link>
        </div>
      </div>

      {/* Texto Grande Decorativo no Fundo */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden opacity-[0.01] select-none">
        <h1 className="font-clash-display translate-y-[20%] text-center text-[16vw] leading-none font-bold text-black">
          MS BRASIL
        </h1>
      </div>
    </footer>
  );
}
