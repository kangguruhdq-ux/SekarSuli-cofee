import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin, Compass } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-cream-50"
      aria-label="Pengantar Sekarsuli Coffee"
    >
      {/* Subtle Javanese geometric background pattern */}
      <div className="absolute inset-0 batik-subtle pointer-events-none" aria-hidden="true" />

      {/* Decorative Warm Ambient Glow */}
      <div
        className="absolute top-1/4 right-5 sm:right-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gold-400/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Editorial Text Column */}
          <div className="lg:col-span-6 z-10 flex flex-col items-start pr-0 lg:pr-6">
            {/* Eyebrow with Javanese Golden Mark */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-200/70 border border-cream-300 text-coffee-800 text-[11px] font-semibold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <span>{siteConfig.eyebrow}</span>
            </div>

            {/* Single Main H1 for SEO */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-coffee-950 leading-[1.15] mb-6">
              Merawat Rasa, <br className="hidden sm:inline" />
              <span className="italic font-medium text-coffee-800">Menjaga Tradisi.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-coffee-700 leading-relaxed max-w-xl mb-8 font-light">
              {siteConfig.heroDescription}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-cream-50 bg-coffee-900 hover:bg-coffee-800 active:bg-coffee-950 rounded-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <span>Jelajahi Menu</span>
                <ArrowDown className="w-4 h-4 text-gold-400" />
              </Link>

              <Link
                href="#lokasi"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-coffee-900 bg-cream-100/90 hover:bg-cream-200/90 active:bg-cream-300 border border-cream-300 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <MapPin className="w-4 h-4 text-coffee-700" />
                <span>Temukan Lokasi</span>
              </Link>
            </div>

            {/* Bottom Meta Pill */}
            <div className="mt-10 pt-6 border-t border-cream-200/90 w-full flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-coffee-600">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Ndalem Sekarsuli — Banguntapan, Bantul</span>
              </div>
              <span className="hidden sm:inline text-cream-300">•</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                <span>Buka Setiap Hari 10.00 – 22.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Editorial Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative Frame Line */}
              <div
                className="absolute -inset-3 sm:-inset-4 border border-coffee-800/10 rounded-sm pointer-events-none -rotate-1 hidden sm:block"
                aria-hidden="true"
              />

              {/* Main Joglo Panorama Image (LCP) */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-sm overflow-hidden shadow-lg border border-cream-200 bg-cream-200">
                <Image
                  src="/images/sekarsuli-joglo-panorama.jpg"
                  alt="Kawasan Joglo Ndalem Sekarsuli Coffee & Masakan Jawa"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/60 via-transparent to-transparent opacity-80" />

                {/* Caption Card on Image */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-4 rounded-sm bg-cream-50/95 backdrop-blur-md border border-cream-200/80 text-coffee-950 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-sm sm:text-base font-semibold text-coffee-900">
                        Ndalem Sekarsuli
                      </p>
                      <p className="text-[11px] sm:text-xs text-coffee-600">
                        Jl. Wonosari KM 8 — Teduh, Ramah & Berkarakter
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-coffee-900 flex items-center justify-center shrink-0 ml-3">
                      <Image
                        src="/images/logo-elephant-transparent.png"
                        alt="Ikon Gajah Sekarsuli"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
