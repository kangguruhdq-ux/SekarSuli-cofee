import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { StatementSection } from "@/components/StatementSection";
import { MenuExplorer } from "@/components/MenuExplorer";
import { ReservationSection } from "@/components/ReservationSection";
import { StorySection } from "@/components/StorySection";
import { AtmosphereGallery } from "@/components/AtmosphereGallery";
import { CraftPhilosophySection } from "@/components/CraftPhilosophySection";
import { VisitSection } from "@/components/VisitSection";
import { ClosingCTASection } from "@/components/ClosingCTASection";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative min-h-screen bg-[#071229] text-[#FAF5ED] flex flex-col selection:bg-[#C5A059] selection:text-[#0B1B3D]">
        <HeroSection />
        <StatementSection />
        <MenuExplorer />
        <ReservationSection />
        <StorySection />
        <AtmosphereGallery />
        <CraftPhilosophySection />
        <VisitSection />
        <ClosingCTASection />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
