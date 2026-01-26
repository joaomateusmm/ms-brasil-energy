"use client";

import ModelSectionDesktop from "@/components/ModelSectionDesktop";
import ModelSectionMobile from "@/components/ModelSectionMobile";

export default function ModelSection() {
  return (
    <>
      {/* Mobile: Visível até lg (1024px) */}
      <div className="block lg:hidden">
        <ModelSectionMobile />
      </div>

      {/* Desktop: Visível a partir de lg */}
      <div className="hidden lg:block">
        <ModelSectionDesktop />
      </div>
    </>
  );
}
