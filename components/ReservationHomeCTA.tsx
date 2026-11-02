"use client";

import Link from "next/link";
import { CalendarCheck, ArrowUpRight } from "lucide-react";

export function ReservationHomeCTA() {
  return (
    <section
      id="reservasi"
      className="relative py-24 sm:py-32 bg-[#071229] text-[#FAF5ED] overflow-hidden content-auto scroll-mt-20 sm:scroll-mt-24 border-t border-[#C5A059]/30"
      aria-label="Reservasi Meja dan Jamuan"
    >
      {/* Background Royal Golden Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 text-center">
        {/* Section Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-[#C5A059]" />
          <span className="text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#C5A059]">
            ❖ LAYANAN RESERVASI &amp; JAMUAN ❖
          </span>
          <span className="w-8 h-[1px] bg-[#C5A059]" />
        </div>

        {/* Headline */}
        <h2 className="font-cinzel text-3xl sm:text-5xl font-normal text-[#FAF5ED] tracking-wide">
          Reservasi &amp; Jamuan
        </h2>

        {/* Description as requested */}
        <p className="mt-4 text-sm sm:text-base text-[#FAF5ED]/80 font-light max-w-xl mx-auto leading-relaxed">
          Rencanakan kunjungan Anda bersama keluarga atau kolega di Sekarsuli
          Coffee. Nikmati keteduhan arsitektur Joglo, aneka wedangan rempah,
          dan sajian kuliner khas Jawa untuk momen istimewa Anda.
        </p>

        {/* Feature Highlights Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#C5A059] font-cinzel uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span>❖</span> Pendopo Joglo &amp; Gazebo Asri
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span>❖</span> Pre-Order 44 Racikan Menu
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span>❖</span> Konfirmasi Cepat WhatsApp
          </span>
        </div>

        {/* ONLY Button for Booking directing to the dedicated reservation page */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/reservasi"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-[#C5A059] text-[#0B1B3D] hover:bg-[#DFBA75] font-cinzel font-bold text-xs sm:text-sm tracking-editorial uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <CalendarCheck className="w-4 h-4 text-[#0B1B3D]" />
            <span>BOOKING RESERVASI MEJA &amp; MENU</span>
            <ArrowUpRight className="w-4 h-4 text-[#0B1B3D]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
