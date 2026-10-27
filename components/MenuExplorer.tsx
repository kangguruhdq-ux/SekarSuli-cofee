"use client";

import { useState, useMemo } from "react";
import { Search, UtensilsCrossed } from "lucide-react";
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
      className="py-20 sm:py-28 bg-cream-100 border-t border-cream-200/80 relative"
      aria-label="Katalog Menu Lengkap"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-2">
            DAFTAR MENU LENGKAP
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-coffee-950 leading-tight">
            Katalog Rasa Sekarsuli
          </h2>
          <p className="mt-3 text-sm sm:text-base text-coffee-700 font-light">
            Dari racikan kopi berkarakter, wedangan rempah tradisional, hingga
            aneka kudapan gurih peneman waktu luang di Ndalem Sekarsuli.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs (Accessible) */}
          <div
            role="tablist"
            aria-label="Kategori Menu"
            className="w-full md:w-auto flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none"
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
                  className={`shrink-0 px-3.5 py-2 text-xs font-medium tracking-wide rounded-sm transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                    isSelected
                      ? "bg-coffee-900 text-cream-50 shadow-sm"
                      : "bg-cream-200/70 text-coffee-800 hover:bg-cream-200 hover:text-coffee-950"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected
                        ? "bg-coffee-800 text-gold-400"
                        : "bg-cream-300/80 text-coffee-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-64 relative">
            <label htmlFor="menu-search" className="sr-only">
              Cari Menu
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-coffee-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="menu-search"
                type="text"
                placeholder="Cari menu atau bahan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-sm text-coffee-950 placeholder-coffee-500 focus:bg-white focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-[11px] text-coffee-500 hover:text-coffee-900 absolute right-2.5 top-1/2 -translate-y-1/2"
                  aria-label="Hapus pencarian"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Counter & Status */}
        <div className="flex items-center justify-between text-xs text-coffee-600 mb-6 pb-3 border-b border-cream-200">
          <div>
            Menampilkan{" "}
            <span className="font-semibold text-coffee-900">
              {filteredItems.length}
            </span>{" "}
            dari total{" "}
            <span className="font-semibold text-coffee-900">
              {TOTAL_MENU_COUNT}
            </span>{" "}
            menu
            {activeCategory !== "Semua" && (
              <span> dalam kategori <strong>{activeCategory}</strong></span>
            )}
            {searchQuery && (
              <span> dengan kata kunci &quot;<strong>{searchQuery}</strong>&quot;</span>
            )}
          </div>
          <span className="text-[11px] text-coffee-500 hidden sm:inline">
            *Daftar menu resmi Sekarsuli Coffee
          </span>
        </div>

        {/* Menu Items Grid: Clean, Accessible, No Truncation */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-cream-50 rounded-sm border border-cream-200/90 hover:border-cream-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="font-serif text-base sm:text-lg font-medium text-coffee-950 group-hover:text-coffee-800 transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.isGajahSignature && (
                        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-coffee-900 text-gold-400">
                          Gajah
                        </span>
                      )}
                      {item.isFeatured && !item.isGajahSignature && (
                        <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full bg-cream-200 text-coffee-800 border border-cream-300">
                          Unggulan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description: full display without accidental cut-off */}
                  {item.description ? (
                    <p className="text-xs sm:text-sm text-coffee-700 leading-relaxed font-light mt-1">
                      {item.description}
                    </p>
                  ) : (
                    <p className="text-xs text-coffee-500 italic font-light mt-1">
                      Kategori {item.category}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-cream-200/60 flex items-center justify-between text-[11px] text-coffee-500">
                  <span className="uppercase tracking-wider text-[10px] font-medium text-coffee-600">
                    {item.category}
                  </span>
                  {typeof item.price === "number" ? (
                    <span className="font-mono font-medium text-coffee-900">
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                  ) : (
                    <span className="text-coffee-400 italic text-[10px]">
                      Konfirmasi saat berkunjung
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-cream-50 rounded-sm border border-cream-200 p-8">
            <UtensilsCrossed className="w-8 h-8 text-coffee-400 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-medium text-coffee-900 mb-1">
              Tidak ada menu yang cocok
            </h3>
            <p className="text-xs text-coffee-600 max-w-md mx-auto mb-4">
              Coba gunakan kata kunci lain atau pilih tab &quot;Semua&quot; untuk melihat seluruh koleksi menu.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("Semua");
                setSearchQuery("");
              }}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-coffee-900 text-cream-50 rounded-sm hover:bg-coffee-800"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
