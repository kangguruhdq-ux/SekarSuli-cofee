"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Compass,
} from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { siteConfig } from "@/lib/site-config";

export function VisitSection() {
  const [copied, setCopied] = useState(false);
  const { location, hours, social, contact } = siteConfig;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = location.fullAddress;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="lokasi"
      className="py-20 sm:py-28 bg-cream-100 border-t border-cream-200/80 relative"
      aria-label="Informasi Kunjungan dan Lokasi"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-2">
            PANDUAN KUNJUNGAN
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-coffee-950 leading-tight">
            Menuju Ndalem Sekarsuli
          </h2>
          <p className="mt-3 text-sm sm:text-base text-coffee-700 font-light">
            Berada di jalur utama Jogja – Wonosari KM 8, mudah dijangkau kendaraan
            pribadi maupun rombongan besar dengan area parkir yang sangat lapang.
          </p>
        </div>

        {/* 2-Column Layout: Details on Left, Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Location Cards & Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card with Copy Action */}
            <div className="p-6 bg-cream-50 rounded-sm border border-cream-200 shadow-sm">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center shrink-0 text-coffee-900 border border-cream-300">
                  <MapPin className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-coffee-950">
                    {location.venueName}
                  </h3>
                  <p className="text-xs text-gold-700 font-medium mt-0.5">
                    {location.landmark}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-coffee-800 leading-relaxed font-light mb-5 pl-0.5">
                {location.fullAddress}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-cream-200/80">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-coffee-900 bg-cream-100 hover:bg-cream-200 active:bg-cream-300 border border-cream-300 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  aria-label="Salin alamat lengkap"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Tersalin ke Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-coffee-600" />
                      <span>Salin Alamat</span>
                    </>
                  )}
                </button>

                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-cream-50 bg-coffee-900 hover:bg-coffee-800 active:bg-coffee-950 rounded-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <span>Buka Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 bg-cream-50 rounded-sm border border-cream-200 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center shrink-0 text-coffee-900 border border-cream-300">
                <Clock className="w-5 h-5 text-gold-600" />
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold text-coffee-950">
                  {hours.label}
                </h3>
                <p className="text-lg font-serif font-medium text-coffee-900 mt-1">
                  {hours.schedule}
                </p>
                <p className="text-xs text-coffee-600 mt-0.5">
                  {hours.detail}
                </p>
              </div>
            </div>

            {/* Social & Channel Connect */}
            <div className="p-6 bg-cream-50 rounded-sm border border-cream-200 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-coffee-950 mb-3">
                Kanal Resmi
              </h3>
              <p className="text-xs text-coffee-700 leading-relaxed mb-4 font-light">
                Ikuti pembaruan kegiatan harian, pertunjukan musik akustik, dan suasana terkini melalui akun Instagram kami.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-coffee-900 bg-cream-100 hover:bg-cream-200 border border-cream-300 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <InstagramIcon className="w-4 h-4 text-rose-700" />
                  <span>Instagram {social.instagramHandle}</span>
                  <ExternalLink className="w-3 h-3 text-coffee-500" />
                </a>

                {/* Conditional WhatsApp link: only rendered if verified */}
                {contact.whatsappNumber && (
                  <a
                    href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                      contact.whatsappMessage || ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream-50 bg-emerald-800 hover:bg-emerald-700 rounded-sm transition-colors shadow-sm"
                  >
                    <span>Hubungi WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Embed with Verified Landmark */}
          <div className="lg:col-span-7">
            <div className="relative rounded-sm overflow-hidden border border-cream-300 bg-cream-200 shadow-md">
              {/* Map Header Strip */}
              <div className="px-5 py-3.5 bg-coffee-950 text-cream-50 flex items-center justify-between border-b border-coffee-800">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-gold-400" />
                  <span className="text-xs font-serif font-medium tracking-wide">
                    Peta Lokasi Sekarsuli Coffee
                  </span>
                </div>
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Buka di Aplikasi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Iframe */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-cream-200">
                <iframe
                  title="Peta Lokasi Ndalem Sekarsuli Coffee Banguntapan Bantul"
                  src={location.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-105"
                />
              </div>

              {/* Map Footer Note */}
              <div className="p-4 bg-cream-50 text-[11px] text-coffee-600 border-t border-cream-200 flex items-center justify-between">
                <span>Rute: Sebelum Ring Road Timur dari arah Piyungan/Wonosari</span>
                <span className="text-coffee-500 font-mono text-[10px]">KM 8 Potorono / Baturetno</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
