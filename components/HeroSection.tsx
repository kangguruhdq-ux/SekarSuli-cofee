"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Clock, MapPin, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#0a1510]"
      aria-label="Pengantar Sekarsuli Coffee"
    >
      {/* Cinematic Background Image with Zoom Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/sekarsuli-joglo-panorama.jpg"
            alt="Panorama Senja Ndalem Sekarsuli Coffee & Masakan Jawa"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_55%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1510] via-[#0a1510]/40 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1510]/80 via-transparent to-black/30" />
        </motion.div>
      </div>

      {/* Top Spacer for Fixed Header */}
      <div className="relative z-10 pt-32 sm:pt-40" />

      {/* Main Center Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-10 md:py-16">
        <div className="max-w-3xl">
          {/* Eyebrow with Gold Accent Line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-[1px] bg-[#c9a86a]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide-editorial uppercase text-[#e4ded5]">
              NDALEM SEKARSULI • JOGLO &amp; MASAKAN JAWA
            </span>
          </motion.div>

          {/* Main Headline H1 with Italicized Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-normal leading-[1.06] tracking-tight text-[#f6f4ee]"
          >
            Merawat Rasa,
            <span className="italic font-light text-[#dfbf80] block sm:inline sm:ml-3">
              Menjaga Tradisi.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-sm sm:text-base md:text-lg text-[#ded8cd] max-w-2xl font-light leading-relaxed"
          >
            {siteConfig.heroDescription}
          </motion.p>

          {/* Dual Pill CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#menu"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#f6f4ee] text-[#0a1510] font-semibold text-xs tracking-editorial uppercase hover:bg-[#c9a86a] hover:text-[#0a1510] transition-all duration-300 shadow-lg"
            >
              <span>JELAJAHI MENU</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="#location"
              className="inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-white/20 text-[#f6f4ee] bg-black/30 backdrop-blur-sm text-xs font-semibold tracking-editorial uppercase hover:border-[#c9a86a] hover:text-[#c9a86a] hover:bg-black/50 transition-all duration-300"
            >
              <Compass className="w-4 h-4 text-[#c9a86a]" />
              <span>PANDUAN KUNJUNGAN</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Information Ticker Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 w-full border-t border-white/10 bg-[#0a1510]/80 backdrop-blur-md px-6 sm:px-8 lg:px-12 py-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#aba195]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span>Buka Setiap Hari: 10.00 – 22.00 WIB</span>
            </span>
            <span className="hidden md:inline-block text-white/20">•</span>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span>Jl. Wonosari KM 8, Banguntapan, Bantul</span>
            </span>
          </div>

          <Link
            href="#statement"
            className="flex items-center gap-2 text-[11px] tracking-editorial uppercase text-[#aba195] hover:text-[#c9a86a] transition-colors"
          >
            <span>GULIR KE BAWAH</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#c9a86a]" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
