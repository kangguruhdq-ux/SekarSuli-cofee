import Image from "next/image";
import Link from "next/link";
import { ArrowUp, MapPin, Clock } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#071229] text-[#FAF5ED]/70 border-t border-[#C5A059]/30 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col space-y-5">
            <Link href="#hero" className="inline-block focus:outline-none">
              <div className="flex items-center gap-3.5">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#C5A059] bg-[#FAF5ED] shadow-[0_0_15px_rgba(197,160,89,0.35)] ring-1 ring-[#C5A059]/40 p-1.5 flex items-center justify-center">
                  <Image
                    src="/images/logo-elephant-transparent.png"
                    alt="Logo Sekarsuli"
                    width={36}
                    height={36}
                    className="object-contain filter drop-shadow-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-cinzel font-bold tracking-editorial uppercase leading-none text-base text-[#FAF5ED]">
                    {siteConfig.brand}
                  </span>
                  <span className="tracking-wide-editorial uppercase font-sans mt-1 text-[10px] text-[#C5A059]">
                    COFFEE &amp; MASAKAN JAWA
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#FAF5ED]/70 font-light leading-relaxed max-w-sm">
              Oase kopi dan tradisi kuliner Jawa di Sekarsuli Coffee.
              Menyatukan keteduhan arsitektur Joglo, aneka wedangan rempah, dan
              seduhan kopi kontemporer di Yogyakarta.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-[10px] font-cinzel font-semibold tracking-wide-editorial uppercase text-[#C5A059]">
                BANGUNTAPAN • BANTUL • YOGYAKARTA
              </span>
            </div>

            <div className="pt-1 flex items-center gap-3">
              <a
                href={siteConfig.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#0B1B3D] hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B1B3D] transition-all text-xs font-sans text-[#FAF5ED]"
                aria-label="Instagram Sekarsuli Coffee"
              >
                <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
                <span className="font-medium text-[#DFBA75]">@sekarsulicoffee</span>
              </a>
            </div>
          </div>

          {/* Nav Col */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <span className="text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#C5A059]">
              EKSPLORASI
            </span>
            <ul className="space-y-2.5 text-xs font-cinzel tracking-editorial uppercase">
              <li>
                <Link
                  href="#hero"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  BERANDA
                </Link>
              </li>
              <li>
                <Link
                  href="#statement"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  FILOSOFI
                </Link>
              </li>
              <li>
                <Link
                  href="#menu"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  BUKU MENU
                </Link>
              </li>
              <li>
                <Link
                  href="#reservasi"
                  className="text-[#C5A059] font-bold hover:text-[#DFBA75] transition-colors"
                >
                  RESERVASI &amp; BOOKING
                </Link>
              </li>
              <li>
                <Link
                  href="#story"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  KISAH SEKARSULI
                </Link>
              </li>
              <li>
                <Link
                  href="#atmosphere"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  SUASANA JOGLO
                </Link>
              </li>
              <li>
                <Link
                  href="#location"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  LOKASI &amp; KUNJUNGAN
                </Link>
              </li>
            </ul>
          </div>

          {/* Location Col */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <span className="text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#C5A059]">
              DESTINASI
            </span>

            <div className="space-y-3 text-xs sm:text-sm text-[#FAF5ED]/70 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {siteConfig.location.fullAddress}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  {siteConfig.hours.schedule} ({siteConfig.hours.detail})
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-[#C5A059] text-sm shrink-0">❖</span>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  WhatsApp: {siteConfig.contact.whatsappDisplay || "0878-3022-8170"}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={siteConfig.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-cinzel font-semibold tracking-editorial uppercase text-[#C5A059] hover:text-[#DFBA75] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Petunjuk Arah Google Maps →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF5ED]/50">
          <p>
            © {currentYear} {siteConfig.name}. Merawat rasa, menjaga tradisi di
            Yogyakarta.
          </p>

          <Link
            href="#hero"
            className="inline-flex items-center gap-2 text-[11px] font-cinzel tracking-editorial uppercase hover:text-[#C5A059] transition-colors"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C5A059]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
