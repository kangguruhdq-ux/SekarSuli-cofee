"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ZONES = [
  {
    id: "zone-1",
    tag: "SENJA & AKUSTIK",
    title: "Suasana Kafe & Panggung Musik",
    subtitle: "Alunan Melodi Sore",
    description:
      "Area santai berlampu hangat dengan live acoustic sore hari peneman nikmatnya kopi.",
    image: "/images/sekarsuli-cafe-evening.jpg",
    span: "lg:col-span-7",
  },
  {
    id: "zone-2",
    tag: "ARSITEKTUR TRADISIONAL",
    title: "Keteduhan Pendopo Joglo",
    subtitle: "Atap Kayu Jati Megah",
    description:
      "Sirkulasi udara terbuka yang sejuk dan lapang, menghadirkan nuansa pedesaan Jawa.",
    image: "/images/sekarsuli-heritage-ambiance.jpg",
    span: "lg:col-span-5",
  },
  {
    id: "zone-3",
    tag: "KEBERSAMAAN",
    title: "Jamuan Meja Kayu & Kudapan",
    subtitle: "Hangatnya Santap Guyub",
    description:
      "Momen berkumpul bersama keluarga mencicipi Mendoan Gajah dan aneka wedangan.",
    image: "/images/sekarsuli-food-table.jpg",
    span: "lg:col-span-5",
  },
  {
    id: "zone-4",
    tag: "LANDMARK IKONIK",
    title: "Pelataran Patung Gajah",
    subtitle: "Ruang Terbuka Ramah Anak",
    description:
      "Halaman luas dengan landmark patung gajah ikonis, area foto dan parkir bus yang lega.",
    image: "/images/sekarsuli-garden-walk.jpg",
    span: "lg:col-span-7",
  },
];

export function AtmosphereGallery() {
  return (
    <section
      id="atmosphere"
      className="relative py-28 sm:py-36 bg-[#0a1510] text-[#f6f4ee] overflow-hidden content-auto scroll-mt-20 sm:scroll-mt-24 border-t border-white/10"
      aria-label="Zona dan Suasana"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="text-xs font-semibold tracking-wide-editorial uppercase text-[#c9a86a]">
                04 • ZONA &amp; SUASANA
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-white"
            >
              Keteduhan di Ndalem Sekarsuli
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-[#9ba79f] max-w-sm leading-relaxed"
          >
            Arsitektur semi-outdoor yang lapang memungkinkan semilir angin sejuk
            berhembus bebas ke seluruh sudut pendopo Joglo dan pelataran.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {ZONES.map((zone, idx) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className={`${zone.span} group relative rounded-2xl overflow-hidden bg-[#10211a] border border-white/10 hover:border-[#c9a86a]/40 transition-all duration-300 min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-8 shadow-xl`}
            >
              <Image
                src={zone.image}
                alt={zone.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1510] via-[#0a1510]/50 to-transparent" />

              <div className="relative z-10 flex flex-col items-start space-y-2">
                <span className="text-[10px] font-semibold tracking-wide-editorial uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#c9a86a]">
                  {zone.tag}
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-normal text-white group-hover:text-[#dfbf80] transition-colors leading-tight">
                  {zone.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#ded8cd] font-light max-w-md leading-relaxed">
                  {zone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
