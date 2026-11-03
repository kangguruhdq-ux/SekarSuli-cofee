"use client";

import { useState, useMemo, useCallback, memo } from "react";
import Image from "next/image";
import {
  Search,
  ChevronDown,
  Camera,
  CalendarPlus,
  MessageCircle,
} from "lucide-react";
import {
  MENU_ITEMS,
  MenuItem,
  TOTAL_MENU_COUNT,
  formatRupiah,
} from "@/lib/menu-data";
import { siteConfig } from "@/lib/site-config";

type BoardFilter =
  | "SEMUA"
  | "MENU KHAS & BAKMI"
  | "COFFEE & NON COFFEE"
  | "TEA & REFRESHING"
  | "WEDANGAN & MINUMAN"
  | "SNACK";

export function MenuExplorer() {
  const [boardFilter, setBoardFilter] = useState<BoardFilter>("SEMUA");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Group items by category
  const menuKhasItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Menu Khas"),
    []
  );
  const bakmiItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Bakmi"),
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
  const teaItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Tea"),
    []
  );
  const refreshingItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Refreshing"),
    []
  );
  const wedanganItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Wedangan"),
    []
  );
  const minumanLainItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Minuman Lain"),
    []
  );
  const snackItems = useMemo(
    () => MENU_ITEMS.filter((i) => i.category === "Snack"),
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

  const handleToggle = useCallback((id: string) => {
    setExpandedItemId((prev) => (prev === id ? null : id));
  }, []);

  const whatsappNumber = siteConfig.contact.whatsappNumber || "6287830228170";

  return (
    <section
      id="menu"
      className="relative py-24 sm:py-32 bg-[#0B1B3D] text-[#FAF5ED] overflow-hidden scroll-mt-20 sm:scroll-mt-24 border-t border-[#C5A059]/30"
      aria-label="Buku Menu Tradisional Sekarsuli"
    >
      {/* Subtle Royal Damask Glow */}
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
              BUKU MENU TRADISIONAL • SEKARSULI COFFEE
            </span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-normal text-[#FAF5ED] tracking-wide">
            Cita Rasa Masakan Jawa
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#FAF5ED]/70 font-light max-w-lg mx-auto">
            Disusun dalam format kartu menu pusaka khas Jawa, menyajikan seluruh
            racikan hidangan kopi pilihan, sajian khas Jawa, bakmi tradisional, wedangan rempah, dan kudapan istimewa.
            Klik salah satu menu untuk melihat foto dan rincian lengkapnya.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Board Views Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            {(
              [
                "SEMUA",
                "MENU KHAS & BAKMI",
                "COFFEE & NON COFFEE",
                "TEA & REFRESHING",
                "WEDANGAN & MINUMAN",
                "SNACK",
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
                  className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-cinzel tracking-editorial uppercase transition-all duration-200 border ${
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
            THE VINTAGE ROYAL JAVANESE MENU BOARD
           ========================================================================= */}
        <div className="relative rounded-3xl p-6 sm:p-10 md:p-14 bg-[#FAF5ED] text-[#1B2430] border-2 sm:border-4 border-[#C5A059] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Subtle Parchment Texture */}
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
                      onToggle={handleToggle}
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
            /* Multi-Section Classical Ledger Layout */
            <div className="relative z-10 space-y-14">
              {/* SECTION: MENU KHAS & BAKMI */}
              {(boardFilter === "SEMUA" || boardFilter === "MENU KHAS & BAKMI") && (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 relative">
                    <div className="hidden lg:flex absolute left-1/2 top-4 bottom-4 -translate-x-1/2 flex-col items-center justify-between pointer-events-none">
                      <div className="w-[1px] h-full bg-[#C5A059]/40 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FAF5ED] border border-[#C5A059] flex items-center justify-center text-[#8C6D37] text-xs">
                          ❖
                        </div>
                      </div>
                    </div>

                    {/* Column 1: MENU KHAS */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            MENU KHAS JAWA
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {menuKhasItems.map((item) => (
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={handleToggle}
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Column 2: BAKMI JAWA */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            BAKMI TRADISIONAL
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {bakmiItems.map((item) => (
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={handleToggle}
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: COFFEE & NON COFFEE */}
              {(boardFilter === "SEMUA" || boardFilter === "COFFEE & NON COFFEE") && (
                <div className={boardFilter === "SEMUA" ? "pt-10 border-t border-[#C5A059]/30" : ""}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 relative">
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
                            onToggle={handleToggle}
                            whatsappNumber={whatsappNumber}
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
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={handleToggle}
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: TEA & REFRESHING */}
              {(boardFilter === "SEMUA" || boardFilter === "TEA & REFRESHING") && (
                <div className={boardFilter === "SEMUA" ? "pt-10 border-t border-[#C5A059]/30" : ""}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 relative">
                    <div className="hidden lg:flex absolute left-1/2 top-4 bottom-4 -translate-x-1/2 flex-col items-center justify-between pointer-events-none">
                      <div className="w-[1px] h-full bg-[#C5A059]/40 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FAF5ED] border border-[#C5A059] flex items-center justify-center text-[#8C6D37] text-xs">
                          ❖
                        </div>
                      </div>
                    </div>

                    {/* Column 1: TEA */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            TEA / TEH KHAS
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {teaItems.map((item) => (
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={handleToggle}
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Column 2: REFRESHING */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            REFRESHING
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {refreshingItems.map((item) => (
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={handleToggle}
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: WEDANGAN & MINUMAN LAIN */}
              {(boardFilter === "SEMUA" || boardFilter === "WEDANGAN & MINUMAN") && (
                <div className={boardFilter === "SEMUA" ? "pt-10 border-t border-[#C5A059]/30" : ""}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 relative">
                    <div className="hidden lg:flex absolute left-1/2 top-4 bottom-4 -translate-x-1/2 flex-col items-center justify-between pointer-events-none">
                      <div className="w-[1px] h-full bg-[#C5A059]/40 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FAF5ED] border border-[#C5A059] flex items-center justify-center text-[#8C6D37] text-xs">
                          ❖
                        </div>
                      </div>
                    </div>

                    {/* Column 1: WEDANGAN REMPAH */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            WEDANGAN REMPAH
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {wedanganItems.map((item) => (
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={handleToggle}
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Column 2: MINUMAN LAIN */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            JUS &amp; LAINNYA
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {minumanLainItems.map((item) => (
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={handleToggle}
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: SNACK */}
              {(boardFilter === "SEMUA" || boardFilter === "SNACK") && (
                <div className={boardFilter === "SEMUA" ? "pt-10 border-t border-[#C5A059]/30" : ""}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 relative">
                    <div className="hidden lg:flex absolute left-1/2 top-4 bottom-4 -translate-x-1/2 flex-col items-center justify-between pointer-events-none">
                      <div className="w-[1px] h-full bg-[#C5A059]/40 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FAF5ED] border border-[#C5A059] flex items-center justify-center text-[#8C6D37] text-xs">
                          ❖
                        </div>
                      </div>
                    </div>

                    {/* Column 1: SNACK PART 1 */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            KUDAPAN TRADISIONAL
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {snackItems.slice(0, 7).map((item) => (
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={handleToggle}
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Column 2: SNACK PART 2 */}
                    <div className="flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="px-7 py-2 rounded-full bg-[#0B1B3D] border-2 border-[#C5A059] shadow-md flex items-center justify-center">
                          <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FAF5ED] uppercase">
                            CAMILAN &amp; ROTI PANGGANG
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {snackItems.slice(7).map((item) => (
                          <LedgerItemRow
                            key={item.id}
                            item={item}
                            isExpanded={expandedItemId === item.id}
                            onToggle={handleToggle}
                            whatsappNumber={whatsappNumber}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              AUTHENTIC JAVANESE CULTURAL HERITAGE SHOWCASE
              (Replaces feast brochure photo with pure Javanese art & philosophy)
             ========================================================================= */}
          <div className="relative z-10 mt-14 pt-8 border-t border-[#C5A059]/40">
            <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0B1B3D] via-[#071229] to-[#0B1B3D] border border-[#C5A059]/60 shadow-xl relative overflow-hidden text-center text-[#FAF5ED]">
              {/* Decorative Subtle Background Batik Rings */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#C5A059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Wayang Silhouettes Flanking Inside Showcase */}
              <div className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 w-16 h-36 opacity-30 pointer-events-none">
                <Image
                  src="/images/wayang-left.png"
                  alt="Wayang Kiri"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 w-16 h-36 opacity-30 pointer-events-none">
                <Image
                  src="/images/wayang-right.png"
                  alt="Wayang Kanan"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Gunungan Gold Diamond Ornament */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]" />
                <span className="text-[#DFBA75] text-lg font-cinzel tracking-widest">❖ ꦱꦼꦏꦂꦱꦸꦭꦶ ❖</span>
                <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]" />
              </div>

              {/* Javanese Philosophy Motto */}
              <h4 className="font-display italic text-2xl sm:text-3xl text-[#DFBA75] font-light max-w-2xl mx-auto leading-snug">
                &ldquo;Memayu Hayuning Bawana, Nguri-uri Kabudayan Jawi&rdquo;
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#FAF5ED]/80 font-cinzel tracking-editorial uppercase max-w-xl mx-auto">
                Menjaga Harmoni Semesta dan Melestarikan Warisan Resep Luhur Jawa
              </p>

              {/* 3 Javanese Cultural Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-[#C5A059]/25 text-left sm:text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-[#C5A059]/20">
                  <span className="text-xs font-cinzel font-bold text-[#C5A059] block">
                    ❖ RESEP OTENTIK
                  </span>
                  <p className="text-[11px] text-[#FAF5ED]/70 font-light mt-1">
                    Bumbu rempah murni Nusantara tanpa jalan pintas.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-[#C5A059]/20">
                  <span className="text-xs font-cinzel font-bold text-[#C5A059] block">
                    ❖ PENDOPO JOGLO
                  </span>
                  <p className="text-[11px] text-[#FAF5ED]/70 font-light mt-1">
                    Suasana teduh kayu jati asli dengan semilir angin alami.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-[#C5A059]/20">
                  <span className="text-xs font-cinzel font-bold text-[#C5A059] block">
                    ❖ TENTREMING MANAH
                  </span>
                  <p className="text-[11px] text-[#FAF5ED]/70 font-light mt-1">
                    Ruang perjumpaan hangat bagi keluarga &amp; sahabat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total verified items footer info */}
        <div className="mt-8 text-center text-xs text-[#FAF5ED]/60 font-light flex items-center justify-center gap-3 flex-wrap">
          <span>❖ Terdaftar {TOTAL_MENU_COUNT} menu resmi Sekarsuli Coffee &amp; Masakan Jawa</span>
          <span>•</span>
          <span>Klik salah satu menu untuk melihat foto &amp; memesan tepat di tempat</span>
        </div>
      </div>
    </section>
  );
}

interface LedgerItemRowProps {
  item: MenuItem;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  whatsappNumber: string;
}

// Ledger Item Component with GPU-Composited Zero-Lag Accordion
const LedgerItemRow = memo(function LedgerItemRow({
  item,
  isExpanded,
  onToggle,
  whatsappNumber,
}: LedgerItemRowProps) {
  const quickWaMessage = encodeURIComponent(
    `Halo Sekarsuli Coffee & Masakan Jawa, saya ingin bertanya dan memesan menu ${item.name} (${formatRupiah(item.price)}) untuk kunjungan saya di Sekarsuli Coffee.`
  );

  return (
    <div className="accordion-row-container flex flex-col">
      {/* Clickable Ledger Row */}
      <div
        onClick={() => onToggle(item.id)}
        className={`group flex items-center justify-between py-2 sm:py-2.5 px-2.5 rounded-xl transition-colors duration-150 cursor-pointer relative select-none touch-manipulation ${
          isExpanded
            ? "bg-[#EFE6D8] border border-[#C5A059]/80 shadow-xs"
            : "hover:bg-[#F5EFEB] border border-transparent active:bg-[#EFE6D8]/60"
        }`}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(item.id);
          }
        }}
      >
        {/* Left Item Name & Diamond */}
        <div className="flex items-center gap-2 shrink-0 z-10 pr-2">
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
            className={`font-cinzel text-xs sm:text-sm font-semibold transition-colors ${
              isExpanded
                ? "text-[#0B1B3D] font-bold"
                : "text-[#0B1B3D] group-hover:text-[#8C6D37]"
            }`}
          >
            {item.name}
          </span>
          {item.isGajahSignature && (
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-[#0B1B3D] text-[#C5A059] text-[8px] font-cinzel font-bold uppercase tracking-wider ml-0.5">
              KHAS
            </span>
          )}
          <span
            className="text-[10px] text-[#C5A059] flex items-center gap-0.5 ml-0.5 opacity-70 group-hover:opacity-100 transition-opacity"
            title="Klik untuk foto & rincian"
          >
            <Camera className="w-3 h-3 text-[#C5A059]" />
          </span>
        </div>

        {/* Dotted / Dashed Gold Hairline Leader Line */}
        <div className="flex-grow border-b border-dotted border-[#C5A059]/60 mx-1 min-w-[12px]" />

        {/* Right Price & Accordion Chevron */}
        <div className="shrink-0 z-10 pl-1.5 flex items-center gap-2">
          <span className="font-cinzel text-xs sm:text-[13px] font-bold text-[#8C6D37]">
            {formatRupiah(item.price)}
          </span>

          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-150 ${
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
          IN-PLACE EXPANDED CARD (Ultra-Lightweight GPU Accelerated)
         ========================================================================= */}
      <div
        className={`accordion-collapse ${isExpanded ? "open" : "pointer-events-none"}`}
        aria-hidden={!isExpanded}
      >
        <div className="pt-2 pb-1.5 w-full">
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#C5A059] shadow-sm mb-2 flex flex-col gap-3 text-left relative w-full overflow-hidden">
            {/* Close Button top-right */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(item.id);
              }}
              className="absolute top-3 right-3 z-20 w-6 h-6 rounded-full bg-[#FAF5ED] text-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-[#FAF5ED] flex items-center justify-center text-xs transition-colors border border-[#C5A059]/40 touch-manipulation"
              aria-label="Tutup"
            >
              ✕
            </button>

            {/* Top Row: Thumbnail + Name + Price & Badges */}
            <div className="flex items-start gap-3.5 pr-7">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#C5A059]/60 shadow-xs bg-[#0B1B3D] relative">
                <Image
                  src={item.image || "/images/products/espresso.jpg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#0B1B3D] border border-[#C5A059]/50 text-[#C5A059] text-[9px] font-cinzel font-bold tracking-wider uppercase">
                    {item.category}
                  </span>
                  {item.isGajahSignature && (
                    <span className="px-2 py-0.5 rounded-full bg-[#C5A059] text-[#0B1B3D] text-[9px] font-cinzel font-bold tracking-wider uppercase">
                      PILIHAN KHAS
                    </span>
                  )}
                </div>

                <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#0B1B3D] leading-snug">
                  {item.name}
                </h4>

                <p className="font-cinzel text-xs font-bold text-[#8C6D37] mt-0.5">
                  {formatRupiah(item.price)}
                </p>
              </div>
            </div>

            {/* Description Row */}
            <p className="text-xs text-[#605A55] font-light leading-relaxed">
              {item.description}
            </p>

            {/* Practical Direct Action Buttons */}
            <div className="pt-2.5 border-t border-[#C5A059]/25 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
              {/* Button 1: Dedicated Booking Page */}
              <a
                href={`/reservasi?item=${encodeURIComponent(item.name)}`}
                onClick={(e) => e.stopPropagation()}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-[#0B1B3D] text-[#FAF5ED] hover:bg-[#C5A059] hover:text-[#0B1B3D] text-[11px] font-cinzel font-bold tracking-wider uppercase transition-all shadow-xs text-center touch-manipulation"
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
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full border border-emerald-700/80 bg-emerald-800 text-white hover:bg-emerald-700 text-[11px] font-cinzel font-bold tracking-wider uppercase transition-all shadow-xs text-center touch-manipulation"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="truncate">TANYA VIA WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
