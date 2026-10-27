import Image from "next/image";
import { Coffee, Flame, Home } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function StorySection() {
  const { story } = siteConfig;

  return (
    <section
      id="cerita"
      className="py-20 sm:py-28 bg-cream-100 border-y border-cream-200/80 relative overflow-hidden"
      aria-label="Cerita Sekarsuli"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <p className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-3">
            {story.eyebrow}
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-4xl font-normal text-coffee-950 leading-tight">
            {story.headline}
          </h2>
        </div>

        {/* Editorial Layout: Text & Image Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Subtle Frame */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-md border border-cream-200 bg-cream-200">
                <Image
                  src="/images/sekarsuli-joglo-exterior.jpg"
                  alt="Arsitektur Etnik Joglo Ndalem Sekarsuli"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-center"
                />
              </div>

              {/* Small Editorial Accent Stamp */}
              <div className="absolute -bottom-5 -right-5 hidden sm:block bg-coffee-900 text-cream-50 p-4 rounded-sm shadow-lg max-w-[200px] border border-gold-500/30">
                <p className="text-[10px] tracking-widest uppercase text-gold-400 font-semibold mb-1">
                  Ndalem Sekarsuli
                </p>
                <p className="font-serif text-xs leading-snug">
                  Ruang ramah bersahaja di timur Yogyakarta
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & 3 Pillars */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col space-y-6">
            <div className="space-y-4 text-coffee-800 text-base sm:text-lg leading-relaxed font-light">
              {story.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* 3 Pillars Grid */}
            <div className="pt-8 border-t border-cream-300/80 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2">
                <div className="w-9 h-9 rounded-full bg-cream-200 flex items-center justify-center text-coffee-800 mb-1 border border-cream-300">
                  <Coffee className="w-4 h-4 text-gold-600" />
                </div>
                <h3 className="font-serif text-base font-semibold text-coffee-950">
                  {story.pillars[0].title}
                </h3>
                <p className="text-xs text-coffee-700 leading-normal">
                  {story.pillars[0].description}
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="w-9 h-9 rounded-full bg-cream-200 flex items-center justify-center text-coffee-800 mb-1 border border-cream-300">
                  <Flame className="w-4 h-4 text-gold-600" />
                </div>
                <h3 className="font-serif text-base font-semibold text-coffee-950">
                  {story.pillars[1].title}
                </h3>
                <p className="text-xs text-coffee-700 leading-normal">
                  {story.pillars[1].description}
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="w-9 h-9 rounded-full bg-cream-200 flex items-center justify-center text-coffee-800 mb-1 border border-cream-300">
                  <Home className="w-4 h-4 text-gold-600" />
                </div>
                <h3 className="font-serif text-base font-semibold text-coffee-950">
                  {story.pillars[2].title}
                </h3>
                <p className="text-xs text-coffee-700 leading-normal">
                  {story.pillars[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
