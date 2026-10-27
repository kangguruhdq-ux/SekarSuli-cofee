"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    number: "01",
    tag: "BIJI KOPI PILIHAN",
    title: "Seduhan Presisi & Specialty",
    description:
      "Dari ekstraksi espresso intensitas tinggi, latte selembut sutra, hingga perpaduan Arenga gula aren organik yang diracik barista berdedikasi.",
  },
  {
    number: "02",
    tag: "WEDANGAN REMPAH JAWA",
    title: "Khasiat Tradisi Nusantara",
    description:
      "Racikan sereh wangi, jahe emprit, madu murni, dan jeruk nipis segar yang diseduh hangat menghangatkan obrolan senja di Joglo.",
  },
  {
    number: "03",
    tag: "KUDAPAN HANGAT DADAKAN",
    title: "Mendoan Gajah & Camilan",
    description:
      "Tempe mendoan porsi gajah yang digoreng dadakan saat dipesan, pisang goreng renyah, dan aneka kudapan gurih peneman secangkir kopi.",
  },
];

export function CraftPhilosophySection() {
  return (
    <section
      className="relative py-24 sm:py-32 bg-[#10211a] text-[#f6f4ee] border-y border-white/10 content-auto"
      aria-label="Filosofi Dapur dan Seduhan"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold tracking-wide-editorial uppercase text-[#c9a86a]">
                05 • DEDIKASI KRAF &amp; TRADISI
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-3xl sm:text-5xl font-normal text-white mt-2"
            >
              Filosofi Dapur &amp; Bar Seduhan
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-[#9ba79f] max-w-sm leading-relaxed"
          >
            Menjaga keaslian rasa bahan lokal, kejujuran proses pengolahan, dan
            kehangatan budaya berkumpul di Yogyakarta.
          </motion.p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PILLARS.map((p, idx) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="flex flex-col justify-between p-8 rounded-2xl bg-[#0a1510]/60 border border-white/10 hover:border-[#c9a86a]/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-4xl sm:text-5xl font-light text-[#c9a86a]/60 group-hover:text-[#c9a86a] transition-colors">
                    {p.number}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide-editorial uppercase text-[#738278]">
                    {p.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-normal text-white mb-3 group-hover:text-[#dfbf80] transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9ba79f] font-light leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#738278]">
                <span>Sekarsuli Coffee</span>
                <span className="text-[#c9a86a]">✦</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
