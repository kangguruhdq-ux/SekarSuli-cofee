"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Sparkles, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CATEGORY_FILTERS,
  CategoryFilter,
  MENU_ITEMS,
  getCategoryCounts,
  TOTAL_MENU_COUNT,
} from "@/lib/menu-data";

export function MenuExplorer() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "Semua" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="menu"
      className="relative py-28 sm:py-36 bg-[#0a1510] text-[#f6f4ee] overflow-hidden content-auto scroll-mt-20 sm:scroll-mt-24 border-t border-white/10"
      aria-label="Katalog Menu Sekarsuli"
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
                02 • MENU UNGGULAN &amp; KUDAPAN
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-white"
            >
              Sajian Otentik Sekarsuli
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start md:items-end gap-3"
          >
            <p className="text-sm text-[#9ba79f] max-w-sm leading-relaxed">
              Dari seduhan espresso modern, racikan wedangan rempah tradisional,
              hingga renyahnya kudapan Mendoan Gajah khas Ndalem Sekarsuli.
            </p>
            <div className="text-xs font-mono text-[#c9a86a]">
              Total {TOTAL_MENU_COUNT} Pilihan Sajian
            </div>
          </motion.div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div
            role="tablist"
            aria-label="Kategori Menu"
            className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
          >
            {CATEGORY_FILTERS.map((cat) => {
              const isSelected = activeCategory === cat;
              const count = categoryCounts[cat];

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-medium tracking-editorial uppercase transition-all duration-300 border ${
                    isSelected
                      ? "bg-[#c9a86a] text-[#0a1510] border-[#c9a86a] shadow-[0_0_20px_rgba(201,168,106,0.3)] font-semibold"
                      : "border-white/15 text-[#aba195] hover:text-white hover:border-white/30 bg-black/20"
                  }`}
                >
                  <span>{cat}</span>
                  <span className="ml-1.5 opacity-70 font-mono text-[10px]">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="w-full lg:w-72 relative shrink-0">
            <Search className="w-4 h-4 text-[#738278] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari menu atau bahan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 text-xs bg-[#10211a]/80 border border-white/15 rounded-full text-[#f6f4ee] placeholder-[#738278] focus:border-[#c9a86a] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[11px] text-[#738278] hover:text-white absolute right-3.5 top-1/2 -translate-y-1/2"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="mt-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    className="group relative rounded-2xl bg-[#10211a]/70 border border-white/10 hover:border-[#c9a86a]/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_25px_rgba(0,0,0,0.4)] overflow-hidden"
                  >
                    <div>
                      {/* Product Photo if available */}
                      {item.image && (
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/5">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#10211a] via-transparent to-transparent opacity-60" />

                          {item.isGajahSignature && (
                            <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#0a1510]/85 backdrop-blur-md border border-[#c9a86a]/40 text-[#c9a86a] text-[10px] font-semibold tracking-editorial uppercase">
                              Ikon Gajah
                            </div>
                          )}
                        </div>
                      )}

                      {/* Header with Title and Badges */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display text-lg sm:text-xl font-normal text-[#f6f4ee] group-hover:text-[#dfbf80] transition-colors leading-snug">
                          {item.name}
                        </h3>

                        {!item.image && item.isGajahSignature && (
                          <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#c9a86a]/20 border border-[#c9a86a]/40 text-[#c9a86a] text-[9px] font-semibold tracking-editorial uppercase">
                            Gajah
                          </span>
                        )}

                        {!item.image && item.isFeatured && !item.isGajahSignature && (
                          <span className="shrink-0 inline-flex items-center gap-1 text-[9px] font-semibold tracking-editorial uppercase px-2 py-0.5 rounded-full bg-white/10 text-[#dfbf80]">
                            <Sparkles className="w-2.5 h-2.5" />
                            Pilihan
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {item.description ? (
                        <p className="text-xs text-[#9ba79f] font-light leading-relaxed">
                          {item.description}
                        </p>
                      ) : (
                        <p className="text-xs text-[#738278] italic font-light">
                          Kategori {item.category}
                        </p>
                      )}
                    </div>

                    {/* Bottom Metadata */}
                    <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] text-[#738278]">
                      <span className="text-[10px] font-semibold tracking-editorial uppercase text-[#c9a86a]">
                        {item.category}
                      </span>
                      {typeof item.price === "number" ? (
                        <span className="font-mono text-[#f6f4ee]">
                          Rp {item.price.toLocaleString("id-ID")}
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#738278]">
                          Sekarsuli
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-[#10211a]/40 rounded-2xl border border-white/10 p-8">
                <UtensilsCrossed className="w-8 h-8 text-[#738278] mx-auto mb-3" />
                <h3 className="font-display text-xl text-white mb-2">
                  Tidak Ada Menu yang Cocok
                </h3>
                <p className="text-xs text-[#9ba79f] max-w-sm mx-auto mb-5">
                  Coba kata kunci lain atau pilih tab &quot;Semua&quot; untuk
                  melihat seluruh 44 pilihan menu kami.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("Semua");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#c9a86a] text-[#0a1510] text-xs font-semibold tracking-editorial uppercase"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
