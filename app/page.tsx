import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { StatementSection } from "@/components/StatementSection";
import { MenuExplorer } from "@/components/MenuExplorer";
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
      <main className="relative min-h-screen bg-[#0a1510] text-[#f6f4ee] flex flex-col selection:bg-[#c9a86a] selection:text-[#0a1510]">
        <HeroSection />
        <StatementSection />
        <MenuExplorer />
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
