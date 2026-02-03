"use client";

import { useEffect, useState } from "react";

import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        // Lógica de aparecer/desaparecer
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Se desceu mais de 100px e está indo pra baixo: Esconde
          setIsVisible(false);
        } else {
          // Se está subindo: Mostra
          setIsVisible(true);
        }

        // Lógica do Fundo (Transparente no topo, Cor Sólida ao descer)
        if (currentScrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar);

    // Limpeza do evento para evitar memory leaks
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-[#0F2830]/80 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="hidden lg:block">
        <div className="relative">
          <HeaderDesktop />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="relative">
          <HeaderMobile />
        </div>
      </div>
    </div>
  );
}
