"use client";

import { motion } from "framer-motion";

export function StatementSection() {
  return (
    <section
      id="statement"
      className="relative py-28 sm:py-36 md:py-44 bg-[#fbf9f4] text-[#0a1510] overflow-hidden content-auto scroll-mt-20 sm:scroll-mt-24"
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
            <span className="text-xs font-semibold tracking-wide-editorial uppercase text-[#738278]">
              01 • FILOSOFI &amp; NILAI
            </span>
            <span className="w-12 h-[1px] bg-[#738278]/40" />
          </motion.div>

          {/* Statement Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.12] tracking-tight text-[#0a1510]"
          >
            Bagi kami, secangkir kopi adalah undangan untuk{" "}
            <span className="italic font-light text-[#b85d3b]">
              melambatkan waktu
            </span>
            . Menyatu dengan semilir angin Ndalem Sekarsuli, keramahan Joglo, dan
            ketulusan rasa masakan Jawa.
          </motion.h2>

          {/* 3 Pillar Columns Grid */}
          <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 w-full pt-12 border-t border-[#0a1510]/12">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col space-y-3"
            >
              <span className="text-[11px] font-semibold tracking-editorial uppercase text-[#738278]">
                AKAR NDALEM SEKARSULI
              </span>
              <p className="text-sm sm:text-base leading-relaxed text-[#3a4740]">
                Berakar pada keanggunan arsitektur tradisional Jawa di kawasan Ndalem
                Sekarsuli, Jl. Wonosari KM 8, menghadirkan perjumpaan harmoni
                antara budaya ngopi dan kuliner Jawa.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col space-y-3"
            >
              <span className="text-[11px] font-semibold tracking-editorial uppercase text-[#738278]">
                RUANG GUYUB TERBUKA
              </span>
              <p className="text-sm sm:text-base leading-relaxed text-[#3a4740]">
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
              <span className="text-[11px] font-semibold tracking-editorial uppercase text-[#738278]">
                KEJUJURAN RASA NUSANTARA
              </span>
              <p className="text-sm sm:text-base leading-relaxed text-[#3a4740]">
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
