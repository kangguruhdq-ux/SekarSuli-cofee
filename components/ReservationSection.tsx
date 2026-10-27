"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  UtensilsCrossed,
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
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS, MenuItem } from "@/lib/menu-data";
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

const SEATING_AREAS = [
  {
    id: "joglo",
    name: "Pendopo Joglo Utama",
    desc: "Suasana sakral joglo kayu jati, teduh dan berangin",
  },
  {
    id: "gazebo",
    name: "Pelataran Gazebo Asri",
    desc: "Area taman terbuka dengan pemandangan hijau asri",
  },
  {
    id: "akustik",
    name: "Area Dekat Panggung Akustik",
    desc: "Cocok untuk menikmati alunan musik & santai sore",
  },
  {
    id: "rombongan",
    name: "Area Meja Panjang Rombongan",
    desc: "Keluarga besar, arisan, reuni, atau pertemuan kantor",
  },
];

type MenuFilterCategory =
  | "SEMUA"
  | "COFFEE"
  | "NON COFFEE"
  | "SNACK"
  | "MINUMAN"
  | "REFRESHING & TEA";

export function ReservationSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("16:00");
  const [guests, setGuests] = useState("3 - 5 Orang");
  const [selectedArea, setSelectedArea] = useState(SEATING_AREAS[0].name);
  const [notes, setNotes] = useState("");

  // Menu pre-order cart: { [itemName: string]: quantity }
  const [cart, setCart] = useState<{ [itemName: string]: number }>({
    "Mendoan Gajah": 1,
    Arenga: 1,
  });

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
      "add-reservation-item",
      handleAddReservationItem as EventListener
    );
    return () => {
      window.removeEventListener(
        "add-reservation-item",
        handleAddReservationItem as EventListener
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

  // Filtered menu list for picker
  const visibleMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      let matchesCat = true;
      if (menuFilter === "COFFEE") matchesCat = item.category === "Coffee";
      else if (menuFilter === "NON COFFEE")
        matchesCat = item.category === "Non Coffee";
      else if (menuFilter === "SNACK") matchesCat = item.category === "Snack";
      else if (menuFilter === "MINUMAN")
        matchesCat = item.category === "Minuman";
      else if (menuFilter === "REFRESHING & TEA")
        matchesCat =
          item.category === "Refreshing" ||
          item.category === "Tea" ||
          item.category === "Other";

      if (!matchesCat) return false;

      // Search filter
      if (menuSearch.trim()) {
        const q = menuSearch.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [menuFilter, menuSearch]);

  const cartEntries = Object.entries(cart);
  const totalItemsCount = cartEntries.reduce((acc, [, qty]) => acc + qty, 0);

  const formattedMenuOrderText =
    cartEntries.length > 0
      ? cartEntries.map(([item, qty]) => `${qty}x ${item}`).join(", ")
      : "Pesan langsung di tempat saat tiba";

  const generateBookingMessage = () => {
    const formattedMenuLines =
      cartEntries.length > 0
        ? cartEntries.map(([item, qty]) => `• ${qty}x ${item}`).join("\n")
        : "• Pesan langsung di tempat saat tiba";

    return (
      `*FORM RESERVASI MEJA & MENU — SEKARSULI COFFEE*\n\n` +
      `👤 *Nama Pemesan:* ${name || "-"}\n` +
      `📱 *No. WhatsApp:* ${phone || "-"}\n` +
      `📅 *Tanggal Kunjungan:* ${date || "Hari Ini / Segera"}\n` +
      `⏰ *Waktu Kedatangan:* ${time} WIB\n` +
      `👥 *Jumlah Tamu:* ${guests}\n` +
      `🏛️ *Pilihan Area:* ${selectedArea}\n\n` +
      `🍽️ *Pesanan Menu Awal:*\n${formattedMenuLines}\n\n` +
      (notes ? `📝 *Catatan Khusus:* ${notes}\n\n` : "") +
      `Mohon konfirmasi ketersediaan meja dan sajian kami di Ndalem Sekarsuli, Jl. Wonosari KM 8, Banguntapan, Bantul. Matur nuwun!`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappNumber = siteConfig.contact.whatsappNumber || "6287830228170";
  const whatsappDisplay =
    siteConfig.contact.whatsappDisplay || "0878-3022-8170";

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
              ❖ LAYANAN RESERVASI MEJA &amp; MENU ❖
            </span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-normal text-[#FAF5ED] tracking-wide">
            Reservasi &amp; Jamuan
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#FAF5ED]/70 font-light max-w-lg mx-auto">
            Rencanakan kunjungan Anda bersama keluarga atau kolega di Ndalem
            Sekarsuli. Isi form reservasi dan pilih menu favorit Anda di bawah
            ini.
          </p>
        </div>

        {/* Main Royal Parchment Booking Form Card */}
        <div className="bg-[#FAF5ED] text-[#1B2430] rounded-3xl p-6 sm:p-10 md:p-12 border-2 sm:border-4 border-[#C5A059] shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Subtle Inner Accent Border */}
          <div className="absolute inset-3 border border-[#C5A059]/40 rounded-2xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-8 sm:space-y-10">
            {/* =========================================================================
                STEP 1: IDENTITAS PEMESAN
               ========================================================================= */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#C5A059]/30">
                <span className="text-[#C5A059] text-base">❖</span>
                <h3 className="font-cinzel text-sm sm:text-base font-bold tracking-wider uppercase text-[#0B1B3D]">
                  1. IDENTITAS PEMESAN
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="res-name"
                    className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                  >
                    Nama Lengkap *
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A059]/40 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="res-phone"
                    className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                  >
                    Nomor WhatsApp Pemesan *
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    placeholder="Contoh: 08123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A059]/40 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* =========================================================================
                STEP 2: JADWAL & AREA DUDUK
               ========================================================================= */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#C5A059]/30">
                <span className="text-[#C5A059] text-base">❖</span>
                <h3 className="font-cinzel text-sm sm:text-base font-bold tracking-wider uppercase text-[#0B1B3D]">
                  2. JADWAL KEDATANGAN &amp; JUMLAH TAMU
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="res-date"
                    className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                  >
                    Tanggal Kunjungan *
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A059]/40 text-xs sm:text-sm text-[#0B1B3D] focus:border-[#0B1B3D] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="res-time"
                    className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                  >
                    Jam Kedatangan *
                  </label>
                  <select
                    id="res-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A059]/40 text-xs sm:text-sm text-[#0B1B3D] focus:border-[#0B1B3D] focus:outline-none transition-all"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t} WIB
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="res-guests"
                    className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                  >
                    Perkiraan Jumlah Tamu *
                  </label>
                  <select
                    id="res-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A059]/40 text-xs sm:text-sm text-[#0B1B3D] focus:border-[#0B1B3D] focus:outline-none transition-all"
                  >
                    <option value="1 - 2 Orang">1 - 2 Orang (Santai / Pasangan)</option>
                    <option value="3 - 5 Orang">3 - 5 Orang (Keluarga Kecil)</option>
                    <option value="6 - 10 Orang">6 - 10 Orang (Keluarga Besar)</option>
                    <option value="11 - 20 Orang">11 - 20 Orang (Rombongan / Kantor)</option>
                    <option value="21 - 50 Orang">21 - 50 Orang (Acara Komunitas)</option>
                    <option value="50+ Orang">50+ Orang (Hajatan / Gathering)</option>
                  </select>
                </div>
              </div>

              {/* Seating Area Selection */}
              <div className="mt-5">
                <label className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-2.5">
                  Pilihan Area Ndalem Sekarsuli
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SEATING_AREAS.map((a) => {
                    const isSelected = selectedArea === a.name;
                    return (
                      <div
                        key={a.id}
                        onClick={() => setSelectedArea(a.name)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? "bg-[#0B1B3D] text-[#FAF5ED] border-[#0B1B3D] shadow-sm"
                            : "bg-white border-[#C5A059]/40 text-[#1B2430] hover:border-[#0B1B3D]"
                        }`}
                      >
                        <span
                          className={`mt-0.5 text-sm ${
                            isSelected ? "text-[#C5A059]" : "text-[#8C6D37]"
                          }`}
                        >
                          ❖
                        </span>
                        <div className="flex flex-col">
                          <span
                            className={`font-cinzel font-bold text-xs ${
                              isSelected ? "text-[#FAF5ED]" : "text-[#0B1B3D]"
                            }`}
                          >
                            {a.name}
                          </span>
                          <span
                            className={`text-[11px] font-light mt-0.5 ${
                              isSelected ? "text-[#FAF5ED]/70" : "text-[#605A55]"
                            }`}
                          >
                            {a.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* =========================================================================
                STEP 3: PILIH MENU MAKANAN & MINUMAN (FULL 44-MENU PICKER)
               ========================================================================= */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C5A059]/30">
                <div className="flex items-center gap-2">
                  <span className="text-[#C5A059] text-base">❖</span>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold tracking-wider uppercase text-[#0B1B3D]">
                    3. PILIHAN MENU PESANAN AWAL
                  </h3>
                </div>
                <span className="text-xs font-cinzel font-bold text-[#8C6D37]">
                  {totalItemsCount} Porsi Terpilih
                </span>
              </div>

              <p className="text-xs text-[#605A55] mb-4 font-light">
                Pilih makanan dan minuman yang ingin disiapkan terlebih dahulu
                saat Anda tiba di Ndalem Sekarsuli:
              </p>

              {/* Search & Category Filter for 44 items */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                {/* Search */}
                <div className="relative w-full sm:w-60 shrink-0">
                  <Search className="w-3.5 h-3.5 text-[#8C6D37] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari menu di sini..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#C5A059]/40 text-xs text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none"
                  />
                </div>

                {/* Categories */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none text-[11px]">
                  {(
                    [
                      "SEMUA",
                      "SNACK",
                      "MINUMAN",
                      "COFFEE",
                      "NON COFFEE",
                      "REFRESHING & TEA",
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

              {/* Menu items selection chips grid */}
              <div className="max-h-60 overflow-y-auto p-3 rounded-2xl bg-white border border-[#C5A059]/30 flex flex-wrap gap-2">
                {visibleMenuItems.map((item) => {
                  const qty = cart[item.name] || 0;
                  const isSelected = qty > 0;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => addItemToCart(item.name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? "bg-[#0B1B3D] text-[#FAF5ED] border-[#0B1B3D] shadow-sm font-semibold"
                          : "bg-[#FAF5ED] text-[#1B2430] border-[#C5A059]/40 hover:border-[#0B1B3D]"
                      }`}
                    >
                      <span className="text-[#C5A059] font-bold">
                        {isSelected ? `${qty}x` : "+"}
                      </span>
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Cart Summary List (If items are chosen) */}
              {cartEntries.length > 0 && (
                <div className="mt-4 p-4 rounded-2xl bg-[#EFE6D8] border border-[#C5A059]/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-cinzel font-bold text-[#0B1B3D] uppercase tracking-wider">
                      Daftar Menu yang Dipesan ({totalItemsCount} porsi):
                    </span>
                    <button
                      type="button"
                      onClick={() => setCart({})}
                      className="text-[11px] text-red-700 hover:underline"
                    >
                      Reset Pilihan
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {cartEntries.map(([itemName, quantity]) => (
                      <div
                        key={itemName}
                        className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-[#C5A059]/30 shadow-xs"
                      >
                        <span className="font-medium text-[#0B1B3D] truncate max-w-[160px]">
                          {itemName}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decrementItemInCart(itemName)}
                            className="w-6 h-6 rounded-full bg-[#FAF5ED] border border-[#C5A059]/60 text-[#0B1B3D] flex items-center justify-center hover:bg-[#0B1B3D] hover:text-[#FAF5ED] transition-colors"
                            aria-label="Kurang satu"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-[#0B1B3D] w-4 text-center">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => addItemToCart(itemName)}
                            className="w-6 h-6 rounded-full bg-[#FAF5ED] border border-[#C5A059]/60 text-[#0B1B3D] flex items-center justify-center hover:bg-[#0B1B3D] hover:text-[#FAF5ED] transition-colors"
                            aria-label="Tambah satu"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItemFromCart(itemName)}
                            className="text-red-600 hover:text-red-800 ml-1 p-1"
                            aria-label="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* =========================================================================
                STEP 4: CATATAN KHUSUS
               ========================================================================= */}
            <div>
              <label
                htmlFor="res-notes"
                className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
              >
                Catatan Khusus / Keperluan Acara (Opsional)
              </label>
              <textarea
                id="res-notes"
                rows={2}
                placeholder="Contoh: Meja dekat stopkontak, ada rombongan lansia, request dekorasi ultah sederhana..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A059]/40 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none transition-all"
              />
            </div>

            {/* =========================================================================
                SUBMIT BUTTON & WHATSAPP NOTICE
               ========================================================================= */}
            <div className="pt-4 border-t border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-[#605A55] text-center sm:text-left">
                <span>Konfirmasi langsung terhubung dengan WhatsApp resmi kami di </span>
                <span className="font-bold text-[#0B1B3D]">{whatsappDisplay}</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0B1B3D] hover:bg-[#C5A059] text-[#FAF5ED] hover:text-[#0B1B3D] font-cinzel font-bold text-xs tracking-editorial uppercase transition-all duration-300 shadow-xl"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>KONFIRMASI RESERVASI &amp; MENU</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* =========================================================================
          CONFIRMATION TICKET / SUMMARY MODAL
         ========================================================================= */}
      <AnimatePresence>
        {submitted && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Ringkasan Reservasi Meja"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#FAF5ED] text-[#1B2430] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#0B1B3D] text-[#FAF5ED] hover:bg-[#C5A059] hover:text-[#0B1B3D] flex items-center justify-center transition-colors"
                aria-label="Tutup ringkasan"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 border border-emerald-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-[#0B1B3D]">
                  Ringkasan Reservasi
                </h3>
                <p className="text-xs text-[#8C6D37] font-cinzel uppercase tracking-wider mt-1">
                  SEKARSULI COFFEE &amp; MASAKAN JAWA
                </p>
              </div>

              {/* Summary Details Table */}
              <div className="space-y-2.5 text-xs sm:text-sm text-[#1B2430] bg-white p-4 rounded-2xl border border-[#C5A059]/40 mb-6 font-light">
                <div className="flex justify-between pb-1.5 border-b border-gray-100">
                  <span className="text-[#605A55]">Nama Pemesan:</span>
                  <span className="font-semibold text-[#0B1B3D]">{name}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-gray-100">
                  <span className="text-[#605A55]">No. WhatsApp:</span>
                  <span className="font-semibold text-[#0B1B3D]">{phone}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-gray-100">
                  <span className="text-[#605A55]">Jadwal Kunjungan:</span>
                  <span className="font-semibold text-[#0B1B3D]">
                    {date || "Hari Ini"}, {time} WIB
                  </span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-gray-100">
                  <span className="text-[#605A55]">Jumlah Tamu:</span>
                  <span className="font-semibold text-[#0B1B3D]">{guests}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-gray-100">
                  <span className="text-[#605A55]">Area Pilihan:</span>
                  <span className="font-semibold text-[#0B1B3D] text-right max-w-[200px]">
                    {selectedArea}
                  </span>
                </div>

                <div className="flex flex-col pt-1">
                  <span className="text-[#605A55] mb-1">Menu yang Dipesan:</span>
                  <div className="bg-[#FAF5ED] p-2.5 rounded-xl border border-[#C5A059]/30 text-xs text-[#0B1B3D] font-medium leading-relaxed">
                    {formattedMenuOrderText}
                  </div>
                </div>

                {notes && (
                  <div className="flex justify-between pt-1 text-xs">
                    <span className="text-[#605A55]">Catatan:</span>
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
                  className="w-full py-3.5 px-6 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-cinzel font-bold text-xs tracking-editorial uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>KIRIM PESANAN KE WHATSAPP ({whatsappDisplay})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full py-2.5 px-6 rounded-full border border-[#0B1B3D]/30 text-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-[#FAF5ED] font-cinzel font-semibold text-xs tracking-editorial uppercase flex items-center justify-center gap-2 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Rincian Tersalin ke Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#8C6D37]" />
                      <span>Salin Format Reservasi</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
