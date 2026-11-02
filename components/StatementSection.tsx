"use client";

import { motion } from "framer-motion";

export function StatementSection() {
  return (
    <section
      id="statement"
      className="relative py-28 sm:py-36 md:py-44 bg-[#FAF5ED] text-[#1B2430] overflow-hidden content-auto scroll-mt-20 sm:scroll-mt-24 border-b border-[#C5A059]/30"
      aria-label="Filosofi dan Nilai"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#8C6D37]">
              01 • FILOSOFI &amp; NILAI
            </span>
            <span className="w-12 h-[1px] bg-[#C5A059]/60" />
          </motion.div>

          {/* Statement Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.12] tracking-tight text-[#0B1B3D]"
          >
            Bagi kami, secangkir kopi adalah undangan untuk{" "}
            <span className="italic font-light text-[#8C6D37]">
              melambatkan waktu
            </span>
            . Menyatu dengan semilir angin Sekarsuli Coffee, keramahan Joglo, dan
            ketulusan rasa masakan Jawa.
          </motion.h2>

          {/* 3 Pillar Columns Grid */}
          <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 w-full pt-12 border-t border-[#C5A059]/30">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col space-y-3"
            >
              <span className="text-[11px] font-cinzel font-bold tracking-editorial uppercase text-[#8C6D37]">
                AKAR SEKARSULI COFFEE
              </span>
              <p className="text-sm sm:text-base leading-relaxed text-[#605A55] font-light">
                Berakar pada keanggunan arsitektur tradisional Jawa di Sekarsuli
                Coffee, Jl. Wonosari KM 8, menghadirkan perjumpaan harmoni
                antara budaya ngopi kontemporer dan kuliner Jawa.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col space-y-3"
            >
              <span className="text-[11px] font-cinzel font-bold tracking-editorial uppercase text-[#8C6D37]">
                RUANG GUYUB TERBUKA
              </span>
              <p className="text-sm sm:text-base leading-relaxed text-[#605A55] font-light">
                Pendopo Joglo kayu jati nan megah bersanding dengan pelataran terbuka
                yang berangin sejuk. Tempat keluarga berkumpul, teman bernostalgia,
                dan komunitas menggelar pertemuan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col space-y-3"
            >
              <span className="text-[11px] font-cinzel font-bold tracking-editorial uppercase text-[#8C6D37]">
                KEJUJURAN RASA MASAKAN JAWA
              </span>
              <p className="text-sm sm:text-base leading-relaxed text-[#605A55] font-light">
                Dari racikan espresso modern, paduan Arenga gula aren organik, hingga
                wedangan sereh hangat dan renyahnya Mendoan Gajah khas Sekarsuli.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
