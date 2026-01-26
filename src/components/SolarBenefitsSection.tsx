"use client";

import SolarBenefitsDesktop from "@/components/SolarBenefitsDesktop";
import SolarBenefitsMobile from "@/components/SolarBenefitsMobile";

export default function SolarBenefitsSection() {
  return (
    <>
      {/* Mobile: Aparece até lg (1024px) */}
      <div className="block lg:hidden">
        <SolarBenefitsMobile />
      </div>

      {/* Desktop: Aparece a partir de lg */}
      <div className="hidden lg:block">
        <SolarBenefitsDesktop />
      </div>
    </>
  );
}
