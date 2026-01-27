"use client";

import TechNatureDesktop from "@/components/TechNatureDesktop";

export default function TechNatureSection() {
  return (
    <section className="sticky top-0 z-0 hidden h-full w-full overflow-hidden bg-[#f4f4f4] lg:block">
      {/* Desktop: Visível a partir de lg */}
      <div>
        <TechNatureDesktop />
      </div>
    </section>
  );
}
