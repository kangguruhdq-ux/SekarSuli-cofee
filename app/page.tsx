import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { FeaturedMenu } from "@/components/FeaturedMenu";
import { MenuExplorer } from "@/components/MenuExplorer";
import { AtmosphereGallery } from "@/components/AtmosphereGallery";
import { VisitSection } from "@/components/VisitSection";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-grow">
        <HeroSection />
        <StorySection />
        <FeaturedMenu />
        <MenuExplorer />
        <AtmosphereGallery />
        <VisitSection />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
