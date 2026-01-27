import React from "react";

// Components
import Footer from "@/components/footer";
import HeroSection1 from "@/components/HeroSection1";
import HeroSection5 from "@/components/HeroSection5"; // Agora funciona (Server Component)
import ModelSection from "@/components/ModelSection";
import Simulator from "@/components/Simulator";
// Wrapper de Animação
import SmoothScroll from "@/components/SmoothScroll";
import SolarBenefitsSection from "@/components/SolarBenefitsSection";
import TechNatureSection from "@/components/TechNatureSection";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="w-full">
        <HeroSection1 />

        <section id="simulacao" className="bg-[#F4F4F4]">
          <Simulator />
        </section>

        <SolarBenefitsSection />

        <TechNatureSection />

        <VideoSection />

        <ModelSection />

        <HeroSection5 />

        {/* <PartnersSection /> */}

        <Footer />
      </main>
    </SmoothScroll>
  );
}
