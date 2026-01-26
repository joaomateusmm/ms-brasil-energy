"use client";

import TechNatureDesktop from "@/components/TechNatureDesktop";
import TechNatureMobile from "@/components/TechNatureMobile";

export default function TechNatureSection() {
  return (
    <section className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-[#f4f4f4]">
      {/* Mobile: Visível até lg (1024px) */}
      <div className="block h-full w-full lg:hidden">
        <TechNatureMobile />
      </div>

      {/* Desktop: Visível a partir de lg */}
      <div className="hidden h-full w-full lg:block">
        <TechNatureDesktop />
      </div>
    </section>
  );
}
