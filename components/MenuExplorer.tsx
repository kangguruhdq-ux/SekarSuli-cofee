"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Sparkles, X, Eye, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MENU_ITEMS,
  MenuItem,
  TOTAL_MENU_COUNT,
} from "@/lib/menu-data";

type BoardFilter = "SEMUA" | "SNACK & MINUMAN" | "COFFEE & NON COFFEE" | "REFRESHING & TEA";

export function MenuExplorer() {
  const [boardFilter, setBoardFilter] = useState<BoardFilter>("SEMUA");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Group items exactly matching brochure layout
  const snackItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Snack"),
    []
  );
  const minumanItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Minuman"),
    []
  );
  const coffeeItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Coffee"),
    []
  );
  const nonCoffeeItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Non Coffee"),
    []
  );
  const refreshingTeaItems = useMemo(
    () =>
      MENU_ITEMS.filter(
        (i) =>
          i.category === "Refreshing" ||
          i.category === "Tea" ||
          i.category === "Other"
      ),
    []
  );

  // Filter items if searching
  const searchedItems = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return MENU_ITEMS.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.description && i.description.toLowerCase().includes(q)) ||
        i.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <section
      id="menu"
      className="relative py-24 sm:py-32 bg-[#0B1B3D] text-[#FAF5ED] overflow-hidden content-auto scroll-mt-20 sm:scroll-mt-24 border-t border-[#C5A059]/30"
      aria-label="Buku Menu Tradisional Sekarsuli"
    >
      {/* Subtle Royal Damask / Vintage Texture Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#C5A059]">
              BUKU MENU TRADISIONAL • NDALEM SEKARSULI
            </span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-normal text-[#FAF5ED] tracking-wide">
            Cita Rasa Keraton Jawa
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#FAF5ED]/70 font-light max-w-lg mx-auto">
            Disusun dalam format kartu menu pusaka khas Jawa, menyajikan seluruh
            44 racikan hidangan kopi, wedangan rempah, dan kudapan tradisional.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Board Views Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            {(
              [
                "SEMUA",
                "SNACK & MINUMAN",
                "COFFEE & NON COFFEE",
                "REFRESHING & TEA",
              ] as BoardFilter[]
            ).map((filter) => {
              const isSelected = boardFilter === filter && !searchQuery;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setBoardFilter(filter);
                    setSearchQuery("");
                  }}
                  className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-cinzel tracking-editorial uppercase transition-all duration-300 border ${
                    isSelected
                      ? "bg-[#C5A059] text-[#0B1B3D] border-[#C5A059] font-bold shadow-[0_0_15px_rgba(197,160,89,0.35)]"
                      : "border-[#C5A059]/30 text-[#FAF5ED]/80 hover:text-[#C5A059] hover:border-[#C5A059] bg-[#071229]/60"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-64 relative shrink-0">
            <Search className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari makanan / minuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-xs bg-[#071229] border border-[#C5A059]/40 rounded-full text-[#FAF5ED] placeholder-[#FAF5ED]/40 focus:border-[#C5A059] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[11px] text-[#C5A059] hover:text-white absolute right-3.5 top-1/2 -translate-y-1/2"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            THE VINTAGE ROYAL JAVANESE MENU BOARD (Replicating brochure accurately)
           ========================================================================= */}
        <div className="relative rounded-3xl p-6 sm:p-10 md:p-14 bg-[#FAF5ED] text-[#1B2430] border-2 sm:border-4 border-[#C5A059] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Subtle Parchment Texture & Batik Watermark */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1B2430_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Inner Golden Double Border */}
          <div className="absolute inset-3 sm:inset-4 border border-[#C5A059]/40 rounded-2xl pointer-events-none" />

          {/* Wayang Silhouette Flanks (Left & Right) */}
          <div className="hidden lg:block absolute left-2 top-1/3 -translate-y-1/2 w-12 h-64 pointer-events-none opacity-40 mix-blend-multiply">
            <Image
              src="/images/wayang-left.png"
              alt="Wayang Silhouette Left"
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden lg:block absolute right-2 top-1/3 -translate-y-1/2 w-12 h-64 pointer-events-none opacity-40 mix-blend-multiply">
            <Image
              src="/images/wayang-right.png"
              alt="Wayang Silhouette Right"
              fill
              className="object-contain"
            />
          </div>

          {/* Top Board Header */}
          <div className="relative z-10 flex flex-col items-center text-center pb-8 mb-8 border-b border-[#C5A059]/30">
            {/* Elephant Silhouette */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 relative flex items-center justify-center">
              <Image
                src="/images/logo-elephant-transparent.png"
                alt="Logo Sekarsuli Gajah"
                width={70}
                height={70}
                className="object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Brand Title */}
            <h3 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.2em] text-[#0B1B3D] uppercase leading-none">
              SEKARSULI
            </h3>

            {/* Subtitle with diamond spacers */}
            <div className="flex items-center gap-3 mt-2 text-xs sm:text-sm font-cinzel tracking-widest text-[#8C6D37] uppercase font-semibold">
              <span>❖</span>
              <span>COFFEE &amp; MASAKAN JAWA</span>
              <span>❖</span>
            </div>

            <p className="text-[11px] text-[#605A55] font-light mt-1 tracking-wider uppercase">
              Jl. Wonosari KM 8, Banguntapan, Bantul • Jam Buka: 10.00 – 22.00 WIB
            </p>
          </div>

          {/* Search Result View OR 2-Column Ledger Board */}
          {searchedItems ? (
            /* Searched Items Grid */
            <div className="relative z-10 py-4">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#C5A059]/30">
                <span className="font-cinzel text-xs font-semibold uppercase text-[#0B1B3D]">
                  HASIL PENCARIAN &quot;{searchQuery}&quot; ({searchedItems.length} ITEM)
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-[#8C6D37] hover:underline"
                >
                  Kembali ke Buku Menu
                </button>
              </div>

              {searchedItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchedItems.map((item) => (
                    <LedgerRow
                      key={item.id}
                      item={item}
                      onSelect={() => setSelectedItem(item)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center py-10 text-sm text-[#605A55]">
                  Tidak ada menu dengan nama atau bahan tersebut.
                </p>
              )}
            </div>
          ) : (
            /* 2-Column Classic Ledger Layout */
            <div className="relative z-10">
              {/* BOARD 1: SNACK & MINUMAN (Matches the brochure exactly!) */}
              {(boardFilter === "SEMUA" || boardFilter === "SNACK & MINUMAN") && (
                <div className="mb-14">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 relative">
                    {/* Center Ornate Vertical Divider on Desktop */}
                    <div className="hidden lg:flex absolute left-1/2 top-4 bottom-4 -translate-x-1/2 flex-col items-center justify-between pointer-events-none">
                      <div className="w-[1px] h-full bg-[#C5A059]/40 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FAF5ED] border border-[#C5A059] flex items-center justify-center text-[#8C6D37] text-xs">
                          ❖
                        </div>
                      </div>
                    </div>

                    {/* Column 1: SNACK */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            SNACK
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {snackItems.map((item) => (
                          <LedgerRow
                            key={item.id}
                            item={item}
                            onSelect={() => setSelectedItem(item)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Column 2: MINUMAN */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            MINUMAN
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {minumanItems.map((item) => (
                          <LedgerRow
                            key={item.id}
                            item={item}
                            onSelect={() => setSelectedItem(item)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BOARD 2: COFFEE & NON COFFEE */}
              {(boardFilter === "SEMUA" || boardFilter === "COFFEE & NON COFFEE") && (
                <div className="mb-14 pt-10 border-t-2 border-dashed border-[#C5A059]/40">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 relative">
                    {/* Center Divider */}
                    <div className="hidden lg:flex absolute left-1/2 top-4 bottom-4 -translate-x-1/2 flex-col items-center justify-between pointer-events-none">
                      <div className="w-[1px] h-full bg-[#C5A059]/40 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FAF5ED] border border-[#C5A059] flex items-center justify-center text-[#8C6D37] text-xs">
                          ❖
                        </div>
                      </div>
                    </div>

                    {/* Column 1: COFFEE */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            COFFEE
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {coffeeItems.map((item) => (
                          <LedgerRow
                            key={item.id}
                            item={item}
                            onSelect={() => setSelectedItem(item)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Column 2: NON COFFEE */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            NON COFFEE
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {nonCoffeeItems.map((item) => (
                          <LedgerRow
                            key={item.id}
                            item={item}
                            onSelect={() => setSelectedItem(item)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BOARD 3: REFRESHING, TEA & OTHER */}
              {(boardFilter === "SEMUA" || boardFilter === "REFRESHING & TEA") && (
                <div className="pt-10 border-t-2 border-dashed border-[#C5A059]/40">
                  <div className="max-w-2xl mx-auto flex flex-col">
                    <div className="flex justify-center mb-6">
                      <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                        <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                          REFRESHING &amp; TEA
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {refreshingTeaItems.map((item) => (
                        <LedgerRow
                          key={item.id}
                          item={item}
                          onSelect={() => setSelectedItem(item)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Feast Spread Showcase (From authentic Sekarsuli brochure) */}
          <div className="relative z-10 mt-14 pt-8 border-t border-[#C5A059]/40">
            <div className="text-center mb-4">
              <span className="text-[10px] font-cinzel font-semibold tracking-wide-editorial uppercase text-[#8C6D37]">
                ❖ SAJIAN KUDAPAN &amp; MINUMAN SEGAR SEKAR SULI ❖
              </span>
            </div>

            <div className="relative w-full aspect-[452/215] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-[#C5A059]/40 bg-[#FAF5ED]">
              <Image
                src="/images/sekarsuli-brochure-feast.png"
                alt="Hidangan Tradisional Mendoan Gajah, Roti Bakar, Wedangan dan Jus Segar Sekarsuli"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover object-bottom"
              />
            </div>
          </div>
        </div>

        {/* Total verified items footer info */}
        <div className="mt-8 text-center text-xs text-[#FAF5ED]/60 font-light flex items-center justify-center gap-3">
          <span>❖ Terdaftar {TOTAL_MENU_COUNT} menu resmi Sekarsuli Coffee &amp; Masakan Jawa</span>
          <span>•</span>
          <span>Klik salah satu menu untuk melihat foto &amp; rincian</span>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE PHOTO MODAL (Opens on item click)
         ========================================================================= */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`Rincian Menu ${selectedItem.name}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#FAF5ED] text-[#1B2430] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C5A059]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0B1B3D] text-[#FAF5ED] hover:bg-[#C5A059] hover:text-[#0B1B3D] flex items-center justify-center transition-colors shadow-md"
                aria-label="Tutup pratinjau"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>

              {/* Photo */}
              <div className="relative aspect-[16/10] w-full bg-[#0B1B3D]">
                <Image
                  src={
                    selectedItem.image ||
                    "/images/sekarsuli-heritage-ambiance.jpg"
                  }
                  alt={selectedItem.name}
                  fill
                  sizes="500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#0B1B3D] border border-[#C5A059] text-[#C5A059] text-[10px] font-cinzel font-semibold tracking-editorial uppercase shadow-sm">
                    {selectedItem.category}
                  </span>
                </div>
              </div>

              {/* Info Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-cinzel text-2xl font-bold text-[#0B1B3D]">
                    {selectedItem.name}
                  </h4>
                  {selectedItem.isGajahSignature && (
                    <span className="px-2.5 py-1 rounded-full bg-[#C5A059] text-[#0B1B3D] text-[10px] font-bold tracking-editorial uppercase">
                      IKON GAJAH
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#605A55] leading-relaxed mt-2 font-light">
                  {selectedItem.description ||
                    `Sajian istimewa dari dapur Sekarsuli Coffee & Masakan Jawa di Ndalem Sekarsuli, diracik dengan ketulusan cita rasa nusantara.`}
                </p>

                <div className="mt-6 pt-4 border-t border-[#C5A059]/30 flex items-center justify-between text-xs text-[#8C6D37]">
                  <span className="font-cinzel font-semibold uppercase tracking-wider">
                    Sekarsuli • Jl. Wonosari KM 8
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 rounded-full bg-[#0B1B3D] text-[#FAF5ED] hover:bg-[#C5A059] hover:text-[#0B1B3D] text-xs font-cinzel font-semibold tracking-editorial uppercase transition-all"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Ledger Row Component replicating the exact brochure entry
function LedgerRow({
  item,
  onSelect,
}: {
  item: MenuItem;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className="group flex items-center justify-between py-2 sm:py-2.5 px-2 rounded-lg hover:bg-[#F5EFEB] transition-all cursor-pointer relative"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect();
        }
      }}
    >
      {/* Left Item Name & Diamond */}
      <div className="flex items-center gap-2.5 shrink-0 z-10 bg-[#FAF5ED] group-hover:bg-[#F5EFEB] pr-2 transition-colors">
        <span className="text-[#C5A059] text-xs group-hover:scale-125 transition-transform">
          ❖
        </span>
        <span className="font-cinzel text-sm sm:text-base font-semibold text-[#0B1B3D] group-hover:text-[#8C6D37] transition-colors">
          {item.name}
        </span>
        {item.image && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-[#C5A059] flex items-center gap-0.5 ml-1">
            <Eye className="w-3 h-3" />
          </span>
        )}
      </div>

      {/* Dotted / Dashed Gold Hairline Leader Line */}
      <div className="flex-grow border-b border-dotted border-[#C5A059]/60 mx-1" />

      {/* Right Diamond End Marker */}
      <div className="shrink-0 z-10 bg-[#FAF5ED] group-hover:bg-[#F5EFEB] pl-2 transition-colors flex items-center gap-1.5">
        {item.description ? (
          <span className="hidden sm:inline text-[11px] text-[#605A55] font-light italic max-w-[140px] truncate">
            {item.description}
          </span>
        ) : null}
        <span className="text-[#C5A059] text-xs group-hover:scale-125 transition-transform">
          ❖
        </span>
      </div>
    </div>
  );
}
