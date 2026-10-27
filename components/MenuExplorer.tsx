"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  CalendarPlus,
  X,
  ExternalLink,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MENU_ITEMS,
  MenuItem,
  TOTAL_MENU_COUNT,
} from "@/lib/menu-data";
import { siteConfig } from "@/lib/site-config";

type BoardFilter =
  | "SEMUA"
  | "SNACK & MINUMAN"
  | "COFFEE & NON COFFEE"
  | "REFRESHING & TEA";

export function MenuExplorer() {
  const [boardFilter, setBoardFilter] = useState<BoardFilter>("SEMUA");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

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

  const toggleExpand = (id: string) => {
    setExpandedItemId((prev) => (prev === id ? null : id));
  };

  const handleAddToReservation = (itemName: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/reservasi?item=${encodeURIComponent(itemName)}`;
    }
  };

  const whatsappNumber = siteConfig.contact.whatsappNumber || "6287830228170";

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
            Klik salah satu menu untuk melihat foto dan memesan langsung.
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
            {/* Elephant Silhouette in Ivory Medallion */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 rounded-full bg-[#FAF5ED] border-2 border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.3)] ring-1 ring-[#C5A059]/40 p-2 relative flex items-center justify-center">
              <Image
                src="/images/logo-elephant-transparent.png"
                alt="Logo Sekarsuli Gajah"
                width={60}
                height={60}
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
                    <LedgerItemRow
                      key={item.id}
                      item={item}
                      isExpanded={expandedItemId === item.id}
                      onToggle={() => toggleExpand(item.id)}
                      onAddToReservation={() => handleAddToReservation(item.name)}
                      whatsappNumber={whatsappNumber}
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
              {/* BOARD 1: SNACK & MINUMAN (Matches brochure) */}
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
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={() => toggleExpand(item.id)}
                            onAddToReservation={() =>
                              handleAddToReservation(item.name)
                            }
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Column 2: MINUMAN & TRADITIONAL */}
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
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={() => toggleExpand(item.id)}
                            onAddToReservation={() =>
                              handleAddToReservation(item.name)
                            }
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BOARD 2: COFFEE, NON COFFEE & REFRESHING */}
              {(boardFilter === "SEMUA" ||
                boardFilter === "COFFEE & NON COFFEE" ||
                boardFilter === "REFRESHING & TEA") && (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 relative">
                    {/* Center Ornate Vertical Divider on Desktop */}
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
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={() => toggleExpand(item.id)}
                            onAddToReservation={() =>
                              handleAddToReservation(item.name)
                            }
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Column 2: NON COFFEE & REFRESHING TEA */}
                    <div className="flex flex-col space-y-8">
                      {/* NON COFFEE Sub-section */}
                      <div>
                        <div className="flex justify-center mb-6">
                          <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                            <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                              NON COFFEE
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          {nonCoffeeItems.map((item) => (
                            <LedgerItemRow
                              key={item.id}
                              item={item}
                              isExpanded={expandedItemId === item.id}
                              onToggle={() => toggleExpand(item.id)}
                              onAddToReservation={() =>
                                handleAddToReservation(item.name)
                              }
                              whatsappNumber={whatsappNumber}
                            />
                          ))}
                        </div>
                      </div>

                      {/* REFRESHING, TEA & OTHER Sub-section */}
                      <div className="pt-4 border-t border-[#C5A059]/30">
                        <div className="flex justify-center mb-6">
                          <div className="px-6 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                            <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-[#FAF5ED] uppercase">
                              REFRESHING, TEA &amp; OTHER
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          {refreshingTeaItems.map((item) => (
                            <LedgerItemRow
                              key={item.id}
                              item={item}
                              isExpanded={expandedItemId === item.id}
                              onToggle={() => toggleExpand(item.id)}
                              onAddToReservation={() =>
                                handleAddToReservation(item.name)
                              }
                              whatsappNumber={whatsappNumber}
                            />
                          ))}
                        </div>
                      </div>
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
          <span>Klik salah satu menu untuk melihat foto &amp; memesan tepat di tempat</span>
        </div>
      </div>
    </section>
  );
}

// Ledger Item Component with IN-PLACE EXPANSION right where clicked
function LedgerItemRow({
  item,
  isExpanded,
  onToggle,
  onAddToReservation,
  whatsappNumber,
}: {
  item: MenuItem;
  isExpanded: boolean;
  onToggle: () => void;
  onAddToReservation: () => void;
  whatsappNumber: string;
}) {
  const quickWaMessage = encodeURIComponent(
    `Halo Sekarsuli Coffee & Masakan Jawa, saya ingin bertanya dan memesan menu ${item.name} (${item.category}) untuk kunjungan saya di Ndalem Sekarsuli.`
  );

  return (
    <div className="flex flex-col">
      {/* Clickable Ledger Row */}
      <div
        onClick={onToggle}
        className={`group flex items-center justify-between py-2 sm:py-2.5 px-2.5 rounded-xl transition-colors duration-150 cursor-pointer relative select-none ${
          isExpanded
            ? "bg-[#EFE6D8] border border-[#C5A059]/80 shadow-xs"
            : "hover:bg-[#F5EFEB] border border-transparent"
        }`}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        {/* Left Item Name & Diamond */}
        <div className="flex items-center gap-2.5 shrink-0 z-10 pr-2">
          <span
            className={`text-xs transition-transform duration-150 ${
              isExpanded
                ? "text-[#0B1B3D] scale-125"
                : "text-[#C5A059] group-hover:scale-125"
            }`}
          >
            ❖
          </span>
          <span
            className={`font-cinzel text-sm sm:text-base font-semibold transition-colors ${
              isExpanded
                ? "text-[#0B1B3D] font-bold"
                : "text-[#0B1B3D] group-hover:text-[#8C6D37]"
            }`}
          >
            {item.name}
          </span>
          {item.isGajahSignature && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#0B1B3D] text-[#C5A059] text-[9px] font-cinzel font-bold uppercase tracking-wider ml-1">
              GAJAH
            </span>
          )}
          <span
            className="text-[10px] text-[#C5A059] flex items-center gap-0.5 ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
            title="Klik untuk foto & pesan"
          >
            <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
          </span>
        </div>

        {/* Dotted / Dashed Gold Hairline Leader Line */}
        <div className="flex-grow border-b border-dotted border-[#C5A059]/60 mx-1" />

        {/* Right Details & Accordion Indicator */}
        <div className="shrink-0 z-10 pl-2 flex items-center gap-2">
          {item.description ? (
            <span className="hidden sm:inline text-[11px] text-[#605A55] font-light italic max-w-[130px] truncate">
              {item.description}
            </span>
          ) : null}

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-150 ${
              isExpanded
                ? "bg-[#0B1B3D] text-[#FAF5ED]"
                : "bg-transparent text-[#8C6D37] group-hover:bg-[#FAF5ED]"
            }`}
          >
            <ChevronDown
              className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 ease-out ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          IN-PLACE EXPANDED CARD (Directly below the clicked item, NO SCROLLING UP)
         ========================================================================= */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.15, ease: "easeOut" },
            }}
            style={{ willChange: "height, opacity" }}
            className="overflow-hidden w-full pt-1.5"
          >
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#C5A059] shadow-md mb-2 flex flex-col gap-3 text-left relative w-full overflow-hidden">
              {/* Close Button top-right */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="absolute top-3 right-3 z-20 w-6 h-6 rounded-full bg-[#FAF5ED] text-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-[#FAF5ED] flex items-center justify-center text-xs transition-colors border border-[#C5A059]/40"
                aria-label="Tutup"
              >
                ✕
              </button>

              {/* Top Row: Thumbnail + Name + Category Badges */}
              <div className="flex items-start gap-3.5 pr-7">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#C5A059]/60 shadow-xs bg-[#0B1B3D]">
                  <Image
                    src={item.image || "/images/sekarsuli-heritage-ambiance.jpg"}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#0B1B3D] border border-[#C5A059]/50 text-[#C5A059] text-[9px] font-cinzel font-bold tracking-wider uppercase">
                      {item.category}
                    </span>
                    {item.isGajahSignature && (
                      <span className="px-2 py-0.5 rounded-full bg-[#C5A059] text-[#0B1B3D] text-[9px] font-cinzel font-bold tracking-wider uppercase">
                        SIGNATURE
                      </span>
                    )}
                  </div>

                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#0B1B3D] leading-snug">
                    {item.name}
                  </h4>
                </div>
              </div>

              {/* Description Row */}
              <p className="text-xs text-[#605A55] font-light leading-relaxed">
                {item.description ||
                  "Racikan istimewa khas Sekarsuli Coffee & Masakan Jawa. Menggunakan rempah alami dan bahan berkualitas di Ndalem Sekarsuli, Banguntapan, Bantul."}
              </p>

              {/* Practical Direct Action Buttons — Grid to avoid any clipping */}
              <div className="pt-2.5 border-t border-[#C5A059]/25 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                {/* Button 1: Dedicated Booking Page */}
                <a
                  href={`/reservasi?item=${encodeURIComponent(item.name)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-[#0B1B3D] text-[#FAF5ED] hover:bg-[#C5A059] hover:text-[#0B1B3D] text-[11px] font-cinzel font-bold tracking-wider uppercase transition-all shadow-xs text-center"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span className="truncate">PESAN DI RESERVASI</span>
                </a>

                {/* Button 2: Quick WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${quickWaMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-cinzel font-bold tracking-wider uppercase transition-all shadow-xs text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                  <span className="truncate">PESAN VIA WHATSAPP</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
