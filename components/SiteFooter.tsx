import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowUp } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-coffee-950 text-cream-100 border-t border-coffee-800/80 relative overflow-hidden">
      {/* Subtle Background Javanese Dark Pattern */}
      <div className="absolute inset-0 batik-dark pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-coffee-900">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-coffee-900 p-1.5 flex items-center justify-center border border-gold-500/30">
                <Image
                  src="/images/logo-elephant-transparent.png"
                  alt="Ikon Sekarsuli"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-cream-50 uppercase leading-none">
                  {siteConfig.brand}
                </span>
                <span className="text-[11px] font-medium tracking-[0.2em] text-gold-400 uppercase mt-1">
                  {siteConfig.subtitle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-300 font-light leading-relaxed max-w-sm pt-2">
              {siteConfig.description}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-coffee-900 hover:bg-gold-500 hover:text-coffee-950 text-cream-200 transition-colors flex items-center justify-center border border-coffee-800"
                aria-label="Instagram Sekarsuli Coffee"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-gold-400 mb-3">
              NAVIGASI
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-cream-300">
              <li>
                <Link
                  href="#beranda"
                  className="hover:text-gold-400 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="#cerita"
                  className="hover:text-gold-400 transition-colors"
                >
                  Cerita & Nilai
                </Link>
              </li>
              <li>
                <Link
                  href="#unggulan"
                  className="hover:text-gold-400 transition-colors"
                >
                  Pilihan Sajian
                </Link>
              </li>
              <li>
                <Link
                  href="#menu"
                  className="hover:text-gold-400 transition-colors"
                >
                  Daftar Menu Lengkap
                </Link>
              </li>
              <li>
                <Link
                  href="#suasana"
                  className="hover:text-gold-400 transition-colors"
                >
                  Suasana Joglo
                </Link>
              </li>
              <li>
                <Link
                  href="#lokasi"
                  className="hover:text-gold-400 transition-colors"
                >
                  Lokasi & Kunjungan
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit Information Col */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-gold-400 mb-3">
              LOKASI & JAM
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-cream-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {siteConfig.location.fullAddress}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.hours.schedule} ({siteConfig.hours.detail})
                </span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={siteConfig.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-4"
              >
                <span>Petunjuk Arah Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400/80">
          <p>
            © {currentYear} {siteConfig.name}. Merawat rasa, menjaga tradisi di tanah Yogyakarta.
          </p>

          <Link
            href="#beranda"
            className="inline-flex items-center gap-1.5 text-cream-300 hover:text-gold-400 transition-colors text-xs py-1"
            aria-label="Kembali ke atas halaman"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
