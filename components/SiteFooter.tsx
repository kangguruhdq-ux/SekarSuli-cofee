import Image from "next/image";
import Link from "next/link";
import { ArrowUp, MapPin, Clock } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#060e0a] text-[#9ba79f] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col space-y-5">
            <Link href="#hero" className="inline-block focus:outline-none">
              <div className="flex items-center gap-3.5">
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-[#c9a86a]/40 bg-transparent shadow-[0_0_15px_rgba(201,168,106,0.15)] ring-1 ring-[#c9a86a]/20 p-1 flex items-center justify-center">
                  <Image
                    src="/images/logo-elephant-transparent.png"
                    alt="Logo Sekarsuli"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-medium tracking-editorial uppercase leading-none text-base text-[#f6f4ee]">
                    {siteConfig.brand}
                  </span>
                  <span className="tracking-wide-editorial uppercase font-sans mt-1 text-[10px] text-[#c9a86a]">
                    COFFEE &amp; MASAKAN JAWA
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#9ba79f] font-light leading-relaxed max-w-sm">
              Oase kopi dan tradisi kuliner Jawa di kawasan Ndalem Sekarsuli.
              Menyatukan keteduhan arsitektur Joglo, aneka wedangan rempah, dan
              seduhan kopi kontemporer di Yogyakarta.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-[10px] font-semibold tracking-wide-editorial uppercase text-[#c9a86a]">
                BANGUNTAPAN • BANTUL • YOGYAKARTA
              </span>
            </div>

            <div className="pt-1 flex items-center gap-3">
              <a
                href={siteConfig.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:border-[#c9a86a] hover:text-[#c9a86a] transition-colors flex items-center justify-center text-white"
                aria-label="Instagram Sekarsuli"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Col */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <span className="text-xs font-semibold tracking-wide-editorial uppercase text-[#c9a86a]">
              EKSPLORASI
            </span>
            <ul className="space-y-2.5 text-xs tracking-editorial uppercase">
              <li>
                <Link
                  href="#hero"
                  className="hover:text-white transition-colors"
                >
                  BERANDA
                </Link>
              </li>
              <li>
                <Link
                  href="#statement"
                  className="hover:text-white transition-colors"
                >
                  FILOSOFI
                </Link>
              </li>
              <li>
                <Link
                  href="#menu"
                  className="hover:text-white transition-colors"
                >
                  KATALOG MENU
                </Link>
              </li>
              <li>
                <Link
                  href="#story"
                  className="hover:text-white transition-colors"
                >
                  KISAH SEKARSULI
                </Link>
              </li>
              <li>
                <Link
                  href="#atmosphere"
                  className="hover:text-white transition-colors"
                >
                  SUASANA JOGLO
                </Link>
              </li>
              <li>
                <Link
                  href="#location"
                  className="hover:text-white transition-colors"
                >
                  LOKASI &amp; KUNJUNGAN
                </Link>
              </li>
            </ul>
          </div>

          {/* Location Col */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <span className="text-xs font-semibold tracking-wide-editorial uppercase text-[#c9a86a]">
              DESTINASI
            </span>

            <div className="space-y-3 text-xs sm:text-sm text-[#9ba79f] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c9a86a] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {siteConfig.location.fullAddress}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#c9a86a] shrink-0 mt-0.5" />
                <span>
                  {siteConfig.hours.schedule} ({siteConfig.hours.detail})
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={siteConfig.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-editorial uppercase text-[#c9a86a] hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <span>Petunjuk Arah Google Maps →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#738278]">
          <p>
            © {currentYear} {siteConfig.name}. Merawat rasa, menjaga tradisi di
            Yogyakarta.
          </p>

          <Link
            href="#hero"
            className="inline-flex items-center gap-2 text-[11px] tracking-editorial uppercase hover:text-[#c9a86a] transition-colors"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
