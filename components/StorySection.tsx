"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function StorySection() {
  const { story } = siteConfig;

  return (
    <section
      id="story"
      className="relative py-28 sm:py-36 md:py-44 bg-[#fbf9f4] text-[#0a1510] overflow-hidden content-auto scroll-mt-20 sm:scroll-mt-24"
      aria-label="Kisah dan Asal Usul"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-xs font-semibold tracking-wide-editorial uppercase text-[#738278]">
              03 • KISAH &amp; IDENTITAS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-[#0a1510]"
          >
            Tumbuh di Ndalem Sekarsuli,
            <br />
            <span className="italic font-light text-[#b85d3b]">
              Merawat Tradisi Rasa.
            </span>
          </motion.h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic Photography with Frame */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-[#e4ded5]"
            >
              <Image
                src="/images/sekarsuli-joglo-exterior.jpg"
                alt="Arsitektur Pendopo Joglo Ndalem Sekarsuli"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between text-white text-xs">
                <span className="font-semibold tracking-wide-editorial uppercase text-[10px] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  PENDOPO JOGLO UTAMA • NDALEM SEKARSULI
                </span>
                <span className="hidden sm:inline font-mono text-[10px] opacity-80">
                  JL. WONOSARI KM 8
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 text-sm sm:text-base text-[#3a4740] font-light leading-relaxed"
            >
              {story.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </motion.div>

            {/* Accent Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="p-6 rounded-2xl bg-white border border-[#0a1510]/10 shadow-sm space-y-2 mt-4"
            >
              <span className="text-[11px] font-semibold tracking-editorial uppercase text-[#b85d3b]">
                IKON GAJAH &amp; REST AREA ASYIK
              </span>
              <p className="text-xs sm:text-sm text-[#3a4740] leading-relaxed">
                Dihiasi landmark patung gajah ramah di pelataran depan, kawasan
                Ndalem Sekarsuli menjadi oase persinggahan favorit bagi pelancong
                arah Wonosari–Jogja, rombongan keluarga, maupun penikmat kopi senja.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
