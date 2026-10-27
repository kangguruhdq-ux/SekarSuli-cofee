"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";
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
      id="location"
      className="relative py-28 sm:py-36 bg-[#FAF5ED] text-[#1B2430] content-auto scroll-mt-20 sm:scroll-mt-24 border-t border-[#C5A059]/30"
      aria-label="Destinasi Tunggal dan Lokasi"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C5A059]/30">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#8C6D37]">
                06 • DESTINASI TUNGGAL &amp; LOKASI
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-normal text-[#0B1B3D]"
            >
              Ndalem Sekarsuli di Banguntapan, Bantul
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-[#605A55] max-w-sm leading-relaxed font-light"
          >
            Sekarsuli Coffee hadir di kawasan asri Ndalem Sekarsuli, Jl. Wonosari
            KM 8 — menghadirkan oase Joglo Jawa, live musik akustik, dan sajian
            kuliner pilihan dengan area parkir yang sangat luas.
          </motion.p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Details Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#C5A059]/30 shadow-md space-y-4"
            >
              <div className="flex items-center gap-3 text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#8C6D37]">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>ALAMAT LENGKAP</span>
              </div>

              <div>
                <h3 className="font-cinzel text-2xl font-bold text-[#0B1B3D]">
                  {location.venueName}
                </h3>
                <p className="text-xs text-[#8C6D37] mt-0.5">
                  {location.landmark}
                </p>
              </div>

              <p className="text-sm text-[#605A55] leading-relaxed font-light">
                {location.fullAddress}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#0B1B3D]/20 text-xs font-cinzel font-semibold tracking-editorial uppercase text-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-[#FAF5ED] transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Alamat Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8C6D37]" />
                      <span>Salin Alamat</span>
                    </>
                  )}
                </button>

                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B1B3D] text-[#FAF5ED] text-xs font-cinzel font-semibold tracking-editorial uppercase hover:bg-[#C5A059] hover:text-[#0B1B3D] transition-all shadow-md"
                >
                  <span>Buka Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
                </a>
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#C5A059]/30 shadow-md space-y-2"
            >
              <div className="flex items-center gap-3 text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#8C6D37]">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>JAM OPERASIONAL</span>
              </div>
              <p className="font-cinzel text-2xl font-bold text-[#0B1B3D]">
                {hours.schedule}
              </p>
              <p className="text-xs text-[#605A55] font-light">{hours.detail}</p>
            </motion.div>

            {/* Official Channel Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#C5A059]/30 shadow-md space-y-4"
            >
              <span className="text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#8C6D37]">
                MEDIA SOSIAL RESMI
              </span>
              <p className="text-xs text-[#605A55] leading-relaxed font-light">
                Dapatkan kabar pertunjukan musik akustik harian dan suasana terkini
                di akun resmi Instagram Sekarsuli.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0B1B3D]/20 text-xs font-cinzel font-semibold tracking-editorial uppercase text-[#0B1B3D] hover:border-[#C5A059] hover:text-[#8C6D37] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>{social.instagramHandle}</span>
                </a>

                {contact.whatsappNumber && (
                  <a
                    href={`https://wa.me/${contact.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800 text-white text-xs font-cinzel font-semibold tracking-editorial uppercase hover:bg-emerald-700 transition-colors"
                  >
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Google Maps Embed (PINPOINT ONLY, NO BLUE LINE ROUTE) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden border-2 border-[#C5A059]/40 bg-white shadow-xl"
            >
              {/* Header Bar */}
              <div className="px-6 py-4 bg-[#0B1B3D] text-[#FAF5ED] flex items-center justify-between border-b border-[#C5A059]/30">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-cinzel tracking-wide uppercase font-semibold">
                    Peta Posisi Sekarsuli Coffee
                  </span>
                </div>
                <span className="text-[10px] text-[#C5A059] font-mono">
                  KM 8 POTORONO / BATURETNO
                </span>
              </div>

              {/* Clean Pin-Only Embed */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-[#FAF5ED]">
                <iframe
                  title="Posisi Sekarsuli Coffee & Masakan Jawa di Ndalem Sekarsuli Bantul"
                  src={location.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Footer Bar */}
              <div className="px-6 py-3.5 bg-white border-t border-[#C5A059]/30 flex items-center justify-between text-xs text-[#605A55]">
                <span>Sebelum Ring Road Timur dari arah Wonosari / Piyungan</span>
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C6D37] hover:text-[#0B1B3D] font-cinzel font-semibold text-[11px] tracking-editorial uppercase inline-flex items-center gap-1"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#C5A059]" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
