"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function ClosingCTASection() {
  return (
    <section
      className="relative py-28 sm:py-36 md:py-44 bg-[#0B1B3D] text-[#FAF5ED] overflow-hidden content-auto border-t border-[#C5A059]/30"
      aria-label="Undangan Berkunjung"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/sekarsuli-joglo-panorama.jpg"
          alt="Sekarsuli Sunset"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/90 to-[#0B1B3D]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Circular Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#C5A059] bg-[#FAF5ED] shadow-[0_0_25px_rgba(197,160,89,0.45)] ring-2 ring-[#C5A059]/40 p-2.5 flex items-center justify-center mx-auto">
            <Image
              src="/images/logo-elephant-transparent.png"
              alt="Logo Sekarsuli"
              width={64}
              height={64}
              className="object-contain filter drop-shadow-sm"
            />
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#C5A059] mb-4"
        >
          KERAMAHAN NDALEM SEKARSULI
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold text-[#FAF5ED] max-w-3xl leading-[1.08]"
        >
          Sampai Jumpa di Sudut{" "}
          <span className="font-display italic font-light text-[#C5A059]">
            Joglo Sekarsuli.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-[#FAF5ED]/80 max-w-xl font-light leading-relaxed"
        >
          Duduk santai di pendopo Joglo, nikmati hangatnya seduhan kopi dan
          masakan Jawa, serta jadikan setiap momen kebersamaan lebih bermakna di
          tanah Yogyakarta.
        </motion.p>

        {/* Dual Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#reservasi"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C5A059] text-[#071229] text-xs font-cinzel font-bold tracking-editorial uppercase hover:bg-[#DFBA75] transition-all shadow-xl"
          >
            <span>RESERVASI &amp; BOOKING MEJA</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="#menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#C5A059]/50 text-[#FAF5ED] bg-[#071229]/60 backdrop-blur-sm text-xs font-cinzel font-semibold tracking-editorial uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
          >
            <span>KATALOG BUKU MENU</span>
          </Link>

          <Link
            href="#location"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 text-[#FAF5ED]/80 hover:text-white hover:border-white/50 text-xs font-cinzel tracking-editorial uppercase transition-all"
          >
            <span>PANDUAN LOKASI</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
