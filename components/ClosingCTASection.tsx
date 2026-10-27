"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function ClosingCTASection() {
  return (
    <section
      className="relative py-28 sm:py-36 md:py-44 bg-[#0a1510] text-[#f6f4ee] overflow-hidden content-auto border-t border-white/10"
      aria-label="Undangan Berkunjung"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="/images/sekarsuli-joglo-panorama.jpg"
          alt="Sekarsuli Sunset"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1510] via-[#0a1510]/85 to-[#0a1510]" />
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
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-[#c9a86a]/40 bg-[#10211a]/80 shadow-[0_0_25px_rgba(201,168,106,0.25)] ring-1 ring-[#c9a86a]/30 p-2.5 flex items-center justify-center mx-auto">
            <Image
              src="/images/logo-elephant-transparent.png"
              alt="Logo Sekarsuli"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-semibold tracking-wide-editorial uppercase text-[#c9a86a] mb-4"
        >
          KERAMAHAN NDALEM SEKARSULI
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-white max-w-3xl leading-[1.08]"
        >
          Sampai Jumpa di Sudut{" "}
          <span className="italic font-light text-[#dfbf80]">
            Joglo Sekarsuli.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-[#ded8cd] max-w-xl font-light leading-relaxed"
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
            href="#location"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#f6f4ee] text-[#0a1510] text-xs font-semibold tracking-editorial uppercase hover:bg-[#c9a86a] transition-all shadow-lg"
          >
            <span>PETUNJUK KUNJUNGAN</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="#menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-[#f6f4ee] bg-black/30 backdrop-blur-sm text-xs font-semibold tracking-editorial uppercase hover:border-[#c9a86a] hover:text-[#c9a86a] transition-all"
          >
            <span>KATALOG MENU LENGKAP</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
