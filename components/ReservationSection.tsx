"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Plus,
  Minus,
  Trash2,
  Search,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS, formatRupiah } from "@/lib/menu-data";
import { siteConfig } from "@/lib/site-config";

const TIME_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

// Pilihan Area Sekarsuli Coffee: HANYA 1 PILIHAN SESUAI INSTRUKSI RESMI
const SEATING_AREAS = [
  {
    id: "joglo",
    name: "Pendopo Joglo Utama",
    desc: "Suasana sakral joglo kayu jati, teduh dan berangin sejuk.",
  },
];

type MenuFilterCategory =
  | "SEMUA"
  | "MENU KHAS & BAKMI"
  | "COFFEE"
  | "NON COFFEE"
  | "TEA & REFRESHING"
  | "WEDANGAN & MINUMAN"
  | "SNACK";

export function ReservationSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("16:00");
  const [guests, setGuests] = useState("3 - 5 Orang");
  const [selectedArea] = useState(SEATING_AREAS[0].name);
  const [notes, setNotes] = useState("");

  // Menu pre-order cart: { [itemName: string]: quantity }
  const [cart, setCart] = useState<{ [itemName: string]: number }>({});

  const [menuFilter, setMenuFilter] = useState<MenuFilterCategory>("SEMUA");
  const [menuSearch, setMenuSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Listen to custom event from MenuExplorer "PESAN DI FORM RESERVASI"
  useEffect(() => {
    const handleAddReservationItem = (e: CustomEvent<string>) => {
      const itemName = e.detail;
      if (!itemName) return;
      setCart((prev) => ({
        ...prev,
        [itemName]: (prev[itemName] || 0) + 1,
      }));
    };

    window.addEventListener(
      "addReservationItem" as any,
      handleAddReservationItem as any
    );
    return () => {
      window.removeEventListener(
        "addReservationItem" as any,
        handleAddReservationItem as any
      );
    };
  }, []);

  const addItemToCart = (itemName: string) => {
    setCart((prev) => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1,
    }));
  };

  const decrementItemInCart = (itemName: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[itemName] > 1) {
        next[itemName] -= 1;
      } else {
        delete next[itemName];
      }
      return next;
    });
  };

  const removeItemFromCart = (itemName: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[itemName];
      return next;
    });
  };

  // Filtered menu items for all 98 items
  const visibleMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      let matchesCat = true;
      if (menuFilter === "MENU KHAS & BAKMI") {
        matchesCat = item.category === "Menu Khas" || item.category === "Bakmi";
      } else if (menuFilter === "COFFEE") {
        matchesCat = item.category === "Coffee";
      } else if (menuFilter === "NON COFFEE") {
        matchesCat = item.category === "Non Coffee";
      } else if (menuFilter === "TEA & REFRESHING") {
        matchesCat = item.category === "Tea" || item.category === "Refreshing";
      } else if (menuFilter === "WEDANGAN & MINUMAN") {
        matchesCat =
          item.category === "Wedangan" || item.category === "Minuman Lain";
      } else if (menuFilter === "SNACK") {
        matchesCat = item.category === "Snack";
      }

      if (!matchesCat) return false;

      if (menuSearch.trim()) {
        const q = menuSearch.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [menuFilter, menuSearch]);

  const cartEntries = Object.entries(cart);
  const totalItemsCount = cartEntries.reduce((acc, [, qty]) => acc + qty, 0);

  // Real-time calculation of total price
  const totalPrice = useMemo(() => {
    return cartEntries.reduce((total, [itemName, qty]) => {
      const menuItem = MENU_ITEMS.find((m) => m.name === itemName);
      return total + (menuItem ? menuItem.price * qty : 0);
    }, 0);
  }, [cartEntries]);

  // Clean WhatsApp Message Formatting
  const generateBookingMessage = () => {
    const formattedMenuLines =
      cartEntries.length > 0
        ? cartEntries
            .map(([itemName, qty]) => {
              const item = MENU_ITEMS.find((m) => m.name === itemName);
              const priceText = item
                ? ` (${formatRupiah(item.price)}/porsi = ${formatRupiah(item.price * qty)})`
                : "";
              return `- ${qty}x ${itemName}${priceText}`;
            })
            .join("\n")
        : "- Pesan langsung di tempat saat kedatangan";

    const totalText =
      totalPrice > 0 ? `\nEstimasi Total Harga: ${formatRupiah(totalPrice)}\n` : "";

    return (
      `FORM RESERVASI MEJA & PESANAN — SEKARSULI COFFEE\n\n` +
      `Nama Pemesan: ${name.trim() || "-"}\n` +
      `No. WhatsApp: ${phone.trim() || "-"}\n` +
      `Tanggal Kunjungan: ${date || "Hari Ini / Segera"}\n` +
      `Waktu Kedatangan: ${time} WIB\n` +
      `Jumlah Tamu: ${guests}\n` +
      `Pilihan Area: ${selectedArea}\n\n` +
      `Pesanan Menu Awal:\n${formattedMenuLines}\n` +
      totalText +
      (notes.trim() ? `\nCatatan Khusus: ${notes.trim()}\n` : "") +
      `\nMohon konfirmasi ketersediaan meja dan sajian kami di Sekarsuli Coffee, Jl. Wonosari KM 8, Banguntapan, Bantul. Matur nuwun!`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappNumber = siteConfig.contact.whatsappNumber || "6287830228170";
  const whatsappDisplay = siteConfig.contact.whatsappDisplay || "+62 878-3022-8170";

  const handleSendWhatsApp = () => {
    const msg = encodeURIComponent(generateBookingMessage());
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(generateBookingMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="reservasi"
      className="relative py-24 sm:py-32 bg-[#071229] text-[#FAF5ED] overflow-hidden content-auto scroll-mt-20 sm:scroll-mt-24 border-t border-[#C5A059]/30"
      aria-label="Reservasi Meja dan Pesan Menu"
    >
      {/* Background Royal Golden Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#C5A059]/10 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#C5A059]">
              ❖ PENGALAMAN ISTIMEWA SEKARSULI ❖
            </span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-normal text-[#FAF5ED] tracking-wide">
            Reservasi Meja &amp; Jamuan
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#FAF5ED]/70 font-light max-w-lg mx-auto">
            Pastikan ketersediaan meja terbaik di bawah naungan sakral kayu jati
            Sekarsuli Coffee dan tentukan hidangan awal sebelum Anda tiba.
          </p>
        </div>

        {/* Main Royal Parchment Reservation Card */}
        <div className="rounded-3xl p-6 sm:p-10 md:p-12 bg-[#FAF5ED] text-[#1B2430] border-2 sm:border-4 border-[#C5A059] shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute inset-3 border border-[#C5A059]/40 rounded-2xl pointer-events-none" />

          {/* Form Header */}
          <div className="text-center pb-6 mb-8 border-b border-[#C5A059]/30 relative z-10">
            <span className="text-[11px] font-cinzel font-semibold tracking-wide-editorial uppercase text-[#8C6D37]">
              SEKARSULI COFFEE &amp; MASAKAN JAWA
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B1B3D] mt-1">
              Buku Reservasi &amp; Pre-Order Menu
            </h3>
            <p className="text-xs text-[#605A55] font-light mt-1">
              Jl. Wonosari KM 8, Banguntapan, Bantul • Jam Buka: 10.00 – 22.00 WIB
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            {/* Row 1: Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  htmlFor="home-res-name"
                  className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                >
                  Nama Lengkap Pemesan *
                </label>
                <input
                  id="home-res-name"
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A059]/50 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none transition-all shadow-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="home-res-phone"
                  className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                >
                  Nomor WhatsApp Pemesan *
                </label>
                <input
                  id="home-res-phone"
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A059]/50 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Row 2: Date, Time, and Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Date */}
              <div>
                <label
                  htmlFor="home-res-date"
                  className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                >
                  Tanggal Kunjungan *
                </label>
                <div className="relative flex items-center">
                  <input
                    id="home-res-date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onClick={(e) => {
                      try {
                        (e.target as HTMLInputElement).showPicker?.();
                      } catch {}
                    }}
                    className="w-full pl-4 pr-11 py-3 rounded-xl bg-white border border-[#C5A059]/60 text-xs sm:text-sm text-[#0B1B3D] focus:border-[#0B1B3D] focus:outline-none transition-all shadow-xs cursor-pointer [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-0 [&::-webkit-calendar-picker-indicator]:pointer-events-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById(
                        "home-res-date"
                      ) as HTMLInputElement;
                      if (input) {
                        try {
                          input.showPicker?.();
                        } catch {
                          input.focus();
                        }
                      }
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#FAF5ED] border border-[#C5A059]/60 flex items-center justify-center text-[#8C6D37] hover:bg-[#0B1B3D] hover:text-[#FAF5ED] transition-colors shadow-xs"
                    aria-label="Pilih Tanggal"
                  >
                    <Calendar className="w-4 h-4 text-[#C5A059]" />
                  </button>
                </div>
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="home-res-time"
                  className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                >
                  Jam Kedatangan *
                </label>
                <div className="relative flex items-center">
                  <select
                    id="home-res-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-4 pr-11 py-3 rounded-xl bg-white border border-[#C5A059]/60 text-xs sm:text-sm text-[#0B1B3D] focus:border-[#0B1B3D] focus:outline-none transition-all shadow-xs appearance-none cursor-pointer"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t} WIB
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C6D37] pointer-events-none">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label
                  htmlFor="home-res-guests"
                  className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                >
                  Perkiraan Jumlah Tamu *
                </label>
                <div className="relative flex items-center">
                  <select
                    id="home-res-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-4 pr-11 py-3 rounded-xl bg-white border border-[#C5A059]/60 text-xs sm:text-sm text-[#0B1B3D] focus:border-[#0B1B3D] focus:outline-none transition-all shadow-xs appearance-none cursor-pointer"
                  >
                    <option value="1 - 2 Orang">1 - 2 Orang (Santai / Pasangan)</option>
                    <option value="3 - 5 Orang">3 - 5 Orang (Keluarga Kecil)</option>
                    <option value="6 - 10 Orang">6 - 10 Orang (Keluarga Besar)</option>
                    <option value="11 - 20 Orang">11 - 20 Orang (Rombongan / Kantor)</option>
                    <option value="21 - 50 Orang">21 - 50 Orang (Acara Komunitas)</option>
                    <option value="50+ Orang">50+ Orang (Hajatan / Gathering)</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C6D37] pointer-events-none">
                    <Users className="w-4 h-4 text-[#C5A059]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Seating Area (HANYA 1 AREA SESUAI INSTRUKSI) */}
            <div>
              <label className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-2.5">
                Pilihan Area Sekarsuli Coffee
              </label>
              <div className="p-4 rounded-2xl bg-[#0B1B3D] text-[#FAF5ED] border-2 border-[#C5A059] shadow-sm flex items-start gap-3">
                <span className="text-[#C5A059] text-base mt-0.5">❖</span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel font-bold text-sm text-[#FAF5ED]">
                      {SEATING_AREAS[0].name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#C5A059] text-[#0B1B3D] text-[9px] font-cinzel font-bold uppercase">
                      AREA UTAMA EKSKLUSIF
                    </span>
                  </div>
                  <p className="text-xs text-[#FAF5ED]/80 font-light mt-1">
                    {SEATING_AREAS[0].desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Row 4: Interactive Menu Pre-Order with Full Photo Preview, Descriptions & Price Calculation */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D]">
                  Pilihan Menu Pesanan Awal (Daftar Lengkap 98 Menu)
                </label>
                <div className="text-right">
                  <span className="text-xs font-cinzel font-bold text-[#8C6D37] block">
                    {totalItemsCount} Porsi Terpilih
                  </span>
                  {totalPrice > 0 && (
                    <span className="text-xs font-bold text-[#0B1B3D] font-cinzel">
                      {formatRupiah(totalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-[#605A55] font-light mb-4">
                Pilih sajian yang ingin dipersiapkan terlebih dahulu saat tiba di Sekarsuli. Harga dihitung otomatis secara real-time.
              </p>

              {/* Filter Tabs and Search */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                <div className="relative w-full sm:w-60 shrink-0">
                  <Search className="w-3.5 h-3.5 text-[#8C6D37] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari makanan / minuman..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#C5A059]/50 text-xs text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none shadow-xs"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none text-[11px]">
                  {(
                    [
                      "SEMUA",
                      "MENU KHAS & BAKMI",
                      "COFFEE",
                      "NON COFFEE",
                      "TEA & REFRESHING",
                      "WEDANGAN & MINUMAN",
                      "SNACK",
                    ] as MenuFilterCategory[]
                  ).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setMenuFilter(cat)}
                      className={`shrink-0 px-3 py-1.5 rounded-full font-cinzel uppercase tracking-wider transition-all border ${
                        menuFilter === cat
                          ? "bg-[#0B1B3D] text-[#FAF5ED] border-[#0B1B3D] font-bold"
                          : "bg-white text-[#605A55] border-[#C5A059]/40 hover:border-[#0B1B3D]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Menu List */}
              <div className="max-h-80 overflow-y-auto p-3 rounded-2xl bg-white border border-[#C5A059]/40 divide-y divide-gray-100 shadow-inner">
                {visibleMenuItems.map((item) => {
                  const qty = cart[item.name] || 0;
                  const isSelected = qty > 0;
                  return (
                    <div
                      key={item.id}
                      className={`p-3 transition-colors flex items-center justify-between gap-3 ${
                        isSelected ? "bg-[#FAF5ED]/80" : "hover:bg-gray-50/60"
                      }`}
                    >
                      {/* Left: Thumbnail & Info */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-[#C5A059]/50 bg-[#0B1B3D] relative">
                          <Image
                            src={item.image || "/images/products/espresso.jpg"}
                            alt={item.name}
                            width={56}
                            height={56}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-cinzel text-xs sm:text-sm font-bold text-[#0B1B3D] truncate">
                              {item.name}
                            </span>
                            <span className="px-1.5 py-0.2 rounded-full bg-[#0B1B3D] text-[#C5A059] text-[8px] font-cinzel font-semibold uppercase">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#605A55] line-clamp-1 font-light mt-0.5">
                            {item.description}
                          </p>
                          <p className="font-cinzel text-xs font-bold text-[#8C6D37] mt-0.5">
                            {formatRupiah(item.price)}
                          </p>
                        </div>
                      </div>

                      {/* Right: Quantity Counter */}
                      <div className="shrink-0 flex items-center gap-1.5">
                        {isSelected ? (
                          <div className="flex items-center gap-1.5 bg-[#EFE6D8] p-1 rounded-full border border-[#C5A059]/60">
                            <button
                              type="button"
                              onClick={() => decrementItemInCart(item.name)}
                              className="w-6 h-6 rounded-full bg-white text-[#0B1B3D] flex items-center justify-center hover:bg-[#0B1B3D] hover:text-[#FAF5ED] transition-colors shadow-xs"
                              aria-label="Kurangi porsi"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center font-cinzel font-bold text-xs text-[#0B1B3D]">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => addItemToCart(item.name)}
                              className="w-6 h-6 rounded-full bg-[#0B1B3D] text-[#FAF5ED] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#0B1B3D] transition-colors shadow-xs"
                              aria-label="Tambah porsi"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addItemToCart(item.name)}
                            className="px-3 py-1.5 rounded-full border border-[#C5A059]/70 bg-white text-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-[#FAF5ED] text-xs font-cinzel font-bold transition-all shadow-xs"
                          >
                            + Tambah
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Summary Breakdown */}
              {cartEntries.length > 0 && (
                <div className="mt-4 p-4 rounded-2xl bg-[#EFE6D8] border border-[#C5A059]/60">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-cinzel font-bold text-[#0B1B3D] uppercase tracking-wider">
                      Pesanan Dipilih ({totalItemsCount} porsi):
                    </span>
                    <button
                      type="button"
                      onClick={() => setCart({})}
                      className="text-[11px] text-red-700 hover:underline font-medium"
                    >
                      Reset Pilihan
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {cartEntries.map(([itemName, quantity]) => {
                      const item = MENU_ITEMS.find((m) => m.name === itemName);
                      const subtotal = item ? item.price * quantity : 0;
                      return (
                        <div
                          key={itemName}
                          className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-[#C5A059]/40 shadow-xs"
                        >
                          <div className="min-w-0 pr-2">
                            <p className="font-semibold text-[#0B1B3D] truncate max-w-[140px]">
                              {itemName}
                            </p>
                            <p className="text-[10px] text-[#8C6D37] font-cinzel font-bold">
                              {formatRupiah(subtotal)}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => decrementItemInCart(itemName)}
                              className="w-5 h-5 rounded-full bg-[#FAF5ED] border border-[#C5A059]/60 text-[#0B1B3D] flex items-center justify-center hover:bg-[#0B1B3D] hover:text-[#FAF5ED] transition-colors"
                              aria-label="Kurang satu"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="font-bold text-[#0B1B3D] w-4 text-center">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => addItemToCart(itemName)}
                              className="w-5 h-5 rounded-full bg-[#FAF5ED] border border-[#C5A059]/60 text-[#0B1B3D] flex items-center justify-center hover:bg-[#0B1B3D] hover:text-[#FAF5ED] transition-colors"
                              aria-label="Tambah satu"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItemFromCart(itemName)}
                              className="text-red-600 hover:text-red-800 ml-1 p-0.5"
                              aria-label="Hapus"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#C5A059]/40 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-cinzel font-bold text-[#0B1B3D]">
                      TOTAL ESTIMASI HARGA:
                    </span>
                    <span className="font-cinzel font-bold text-base text-[#8C6D37]">
                      {formatRupiah(totalPrice)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Row 5: Notes */}
            <div>
              <label
                htmlFor="home-res-notes"
                className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
              >
                Catatan Khusus / Keperluan Acara (Opsional)
              </label>
              <textarea
                id="home-res-notes"
                rows={2}
                placeholder="Contoh: Meja dekat stopkontak, rombongan keluarga besar, request sajian tidak pedas..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A059]/50 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none transition-all shadow-xs"
              />
            </div>

            {/* Submit Button: DIRECTS TO CONFIRMATION REVIEW MODAL FIRST */}
            <div className="pt-4 border-t border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#605A55]">
                {totalItemsCount > 0 ? (
                  <span>
                    {totalItemsCount} porsi menu • Estimasi:{" "}
                    <strong className="text-[#0B1B3D]">{formatRupiah(totalPrice)}</strong>
                  </span>
                ) : (
                  <span>Belum ada pesanan awal dipilih (opsional).</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0B1B3D] hover:bg-[#C5A059] text-[#FAF5ED] hover:text-[#0B1B3D] font-cinzel font-bold text-xs tracking-editorial uppercase transition-all duration-300 shadow-xl hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>LANJUT KE TINJAUAN RESERVASI</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CONFIRMATION REVIEW MODAL DIALOG (Before sending to WhatsApp) */}
      <AnimatePresence>
        {submitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#FAF5ED] text-[#1B2430] w-full max-w-xl rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059] shadow-2xl relative my-8"
            >
              {/* Success Badge */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-cinzel font-bold tracking-widest uppercase text-[#8C6D37]">
                  ❖ TINJAU RINCIAN RESERVASI ❖
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0B1B3D] mt-1">
                  Konfirmasi Reservasi &amp; Pesanan
                </h3>
                <p className="text-xs text-[#605A55] font-light mt-1">
                  Periksa kembali data reservasi Anda sebelum dikirimkan ke WhatsApp resmi Sekarsuli Coffee.
                </p>
              </div>

              {/* Review Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#C5A059]/40 text-xs sm:text-sm space-y-2.5 mb-6 shadow-xs">
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-[#605A55]">Nama Pemesan:</span>
                  <span className="font-bold text-[#0B1B3D]">{name}</span>
                </div>

                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-[#605A55]">No. WhatsApp:</span>
                  <span className="font-semibold text-[#0B1B3D]">{phone}</span>
                </div>

                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-[#605A55]">Jadwal Kunjungan:</span>
                  <span className="font-semibold text-[#0B1B3D]">
                    {date || "Hari Ini / Segera"}, pk {time} WIB
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-[#605A55]">Jumlah Tamu:</span>
                  <span className="font-semibold text-[#0B1B3D]">{guests}</span>
                </div>

                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-[#605A55]">Area Pilihan:</span>
                  <span className="font-semibold text-[#0B1B3D] text-right">
                    {selectedArea}
                  </span>
                </div>

                {/* Ordered Items Breakdown */}
                <div className="pt-2">
                  <span className="text-[#605A55] block mb-1.5 font-cinzel font-bold text-xs uppercase text-[#0B1B3D]">
                    Rincian Pesanan Menu ({totalItemsCount} porsi):
                  </span>

                  {cartEntries.length > 0 ? (
                    <div className="bg-[#FAF5ED] rounded-xl border border-[#C5A059]/40 divide-y divide-[#C5A059]/20 text-xs overflow-hidden">
                      {cartEntries.map(([itemName, qty]) => {
                        const item = MENU_ITEMS.find((m) => m.name === itemName);
                        const unitPrice = item ? item.price : 0;
                        const subtotal = unitPrice * qty;
                        return (
                          <div
                            key={itemName}
                            className="p-2.5 flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-[#8C6D37]">❖</span>
                              <span className="font-medium text-[#0B1B3D] truncate">
                                {itemName}
                              </span>
                              <span className="text-[#605A55] shrink-0 text-[11px]">
                                ({qty} × {formatRupiah(unitPrice)})
                              </span>
                            </div>
                            <span className="font-bold text-[#0B1B3D] shrink-0 font-cinzel">
                              {formatRupiah(subtotal)}
                            </span>
                          </div>
                        );
                      })}

                      {/* Total Estimasi Row */}
                      <div className="p-2.5 bg-[#EFE6D8] flex items-center justify-between font-bold text-xs sm:text-sm text-[#0B1B3D]">
                        <span>TOTAL ESTIMASI HARGA:</span>
                        <span className="font-cinzel text-base text-[#8C6D37]">
                          {formatRupiah(totalPrice)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#FAF5ED] p-2.5 rounded-xl border border-[#C5A059]/40 text-xs text-[#605A55] italic">
                      Tidak ada pesanan awal. Pesan langsung di tempat saat kedatangan.
                    </div>
                  )}
                </div>

                {notes && (
                  <div className="flex justify-between pt-2 text-xs border-t border-gray-100">
                    <span className="text-[#605A55]">Catatan Khusus:</span>
                    <span className="font-light text-[#0B1B3D] italic text-right max-w-[200px]">
                      {notes}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-cinzel font-bold text-xs tracking-editorial uppercase shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>KIRIM PESANAN KE WHATSAPP ({whatsappDisplay})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full border border-[#0B1B3D]/30 text-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-[#FAF5ED] text-xs font-cinzel font-semibold tracking-wider uppercase transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Format Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8C6D37]" />
                        <span>Salin Format Teks</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full border border-gray-300 text-gray-600 hover:text-[#0B1B3D] text-xs font-cinzel tracking-wider uppercase transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ubah Data</span>
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
