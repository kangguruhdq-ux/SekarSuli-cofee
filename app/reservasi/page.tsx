"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  Plus,
  Minus,
  Trash2,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { MENU_ITEMS, formatRupiah } from "@/lib/menu-data";
import { siteConfig } from "@/lib/site-config";
import { SiteFooter } from "@/components/SiteFooter";

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

export default function ReservasiPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#071229] flex items-center justify-center text-[#C5A059] font-cinzel">
          Memuat Form Reservasi Sekarsuli...
        </div>
      }
    >
      <ReservasiContent />
    </Suspense>
  );
}

function ReservasiContent() {
  const searchParams = useSearchParams();
  const initialItemParam = searchParams.get("item");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("16:00");
  const [guests, setGuests] = useState("3 - 5 Orang");
  const [selectedArea] = useState(SEATING_AREAS[0].name);
  const [notes, setNotes] = useState("");

  // Cart: item name -> quantity
  const [cart, setCart] = useState<{ [itemName: string]: number }>({});
  const [menuFilter, setMenuFilter] = useState<MenuFilterCategory>("SEMUA");
  const [menuSearch, setMenuSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // If user arrived by clicking "Pesan di Reservasi" from a specific menu item link
  useEffect(() => {
    if (initialItemParam) {
      const match = MENU_ITEMS.find(
        (m) => m.name.toLowerCase() === initialItemParam.toLowerCase()
      );
      if (match) {
        setCart({ [match.name]: 1 });
      }
    }
  }, [initialItemParam]);

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
        : "- Pesan langsung di tempat saat tiba";

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

  const whatsappNumber = siteConfig.contact.whatsappNumber || "6287830228170";
  const whatsappDisplay = siteConfig.contact.whatsappDisplay || "+62 878-3022-8170";

  const handleSendWhatsApp = () => {
    const msg = encodeURIComponent(generateBookingMessage());
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Smooth scroll to confirmation review card
    if (typeof window !== "undefined") {
      const cardEl = document.getElementById("reservation-card");
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
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
    <div className="min-h-screen bg-[#071229] text-[#FAF5ED] flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#071229]">
      {/* Top Floating Mini Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-[#071229]/95 backdrop-blur-md border-b border-[#C5A059]/30 py-4 px-6 sticky top-0 z-50 shadow-md"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-[#C5A059] bg-[#FAF5ED] shadow-sm p-1.5 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/images/logo-elephant-transparent.png"
                alt="Logo Sekarsuli"
                width={32}
                height={32}
                className="object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel font-bold text-sm sm:text-base text-[#FAF5ED] uppercase tracking-wider group-hover:text-[#C5A059] transition-colors">
                SEKARSULI
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#C5A059] font-medium tracking-widest uppercase">
                COFFEE &amp; MASAKAN JAWA
              </span>
            </div>
          </Link>

          <Link
            href="/#hero"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-[#C5A059]/50 text-[#FAF5ED] hover:text-[#0B1B3D] hover:bg-[#C5A059] text-xs font-cinzel font-semibold tracking-wider uppercase transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>KEMBALI KE BERANDA</span>
          </Link>
        </div>
      </motion.header>

      {/* Main Reservation Section */}
      <main className="flex-1 py-10 sm:py-16 relative overflow-hidden">
        {/* Ambient Royal Gold Glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#C5A059]/10 rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Page Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#C5A059]" />
              <span className="text-xs font-cinzel font-semibold tracking-wide-editorial uppercase text-[#C5A059]">
                ❖ FORMULIR RESERVASI &amp; PRE-ORDER ❖
              </span>
              <span className="w-8 h-[1px] bg-[#C5A059]" />
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl font-normal text-[#FAF5ED] tracking-wide">
              Reservasi Meja &amp; Jamuan
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-[#FAF5ED]/70 font-light max-w-lg mx-auto">
              Rencanakan waktu kunjungan Anda dan pilih menu yang ingin disiapkan
              lebih awal di Sekarsuli Coffee, Jl. Wonosari KM 8.
            </p>
          </motion.div>

          {/* MAIN ROYAL PARCHMENT CARD */}
          <motion.div
            id="reservation-card"
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FAF5ED] text-[#1B2430] rounded-3xl p-6 sm:p-10 md:p-12 border-2 sm:border-4 border-[#C5A059] shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden scroll-mt-24"
          >
            <div className="absolute inset-3 border border-[#C5A059]/40 rounded-2xl pointer-events-none" />

            {/* IF SUBMITTED: SHOW CONFIRMATION REVIEW SCREEN BEFORE WHATSAPP DISPATCH */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="relative z-10 max-w-2xl mx-auto text-center py-4"
              >
                {/* Success Icon */}
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-xs font-cinzel font-semibold tracking-wide uppercase text-[#8C6D37]">
                  ❖ TINJAU RINCIAN RESERVASI ❖
                </span>

                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B1B3D] mt-1 mb-2">
                  Rincian Reservasi &amp; Pesanan Menu
                </h2>

                <p className="text-xs sm:text-sm text-[#605A55] max-w-md mx-auto mb-6 font-light">
                  Silakan periksa kembali rincian di bawah ini. Jika sudah yakin dan sesuai, klik tombol hijau di bawah untuk mengirim ke WhatsApp resmi Sekarsuli.
                </p>

                {/* Summary Box */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#C5A059]/40 shadow-xs text-left text-xs sm:text-sm space-y-3 mb-6">
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
                    <span className="text-[#605A55]">Pilihan Area:</span>
                    <span className="font-semibold text-[#0B1B3D] text-right">
                      {selectedArea}
                    </span>
                  </div>

                  {/* Menu Breakdown Table */}
                  <div className="pt-2">
                    <span className="text-[#605A55] block mb-2 font-cinzel font-bold text-xs uppercase text-[#0B1B3D]">
                      Rincian Pesanan Menu ({totalItemsCount} porsi):
                    </span>

                    {cartEntries.length > 0 ? (
                      <div className="bg-[#FAF5ED] rounded-xl border border-[#C5A059]/40 overflow-hidden divide-y divide-[#C5A059]/20 text-xs">
                        {cartEntries.map(([itemName, qty]) => {
                          const item = MENU_ITEMS.find((m) => m.name === itemName);
                          const unitPrice = item ? item.price : 0;
                          const subtotal = unitPrice * qty;
                          return (
                            <div
                              key={itemName}
                              className="p-3 flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-[#8C6D37] font-bold">❖</span>
                                <span className="font-medium text-[#0B1B3D] truncate">
                                  {itemName}
                                </span>
                                <span className="text-[#605A55] shrink-0">
                                  ({qty} × {formatRupiah(unitPrice)})
                                </span>
                              </div>
                              <span className="font-bold text-[#0B1B3D] shrink-0 font-cinzel">
                                {formatRupiah(subtotal)}
                              </span>
                            </div>
                          );
                        })}

                        {/* Grand Total Row */}
                        <div className="p-3 bg-[#EFE6D8] flex items-center justify-between font-bold text-sm text-[#0B1B3D]">
                          <span>TOTAL ESTIMASI HARGA:</span>
                          <span className="font-cinzel text-base text-[#8C6D37]">
                            {formatRupiah(totalPrice)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#FAF5ED] p-3 rounded-xl border border-[#C5A059]/40 text-xs text-[#605A55] italic">
                        Tidak ada pesanan awal. Pesan langsung di tempat saat kedatangan.
                      </div>
                    )}
                  </div>

                  {notes && (
                    <div className="flex justify-between pt-2 text-xs border-t border-gray-100">
                      <span className="text-[#605A55]">Catatan Khusus:</span>
                      <span className="font-light text-[#0B1B3D] italic text-right max-w-[220px]">
                        {notes}
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-cinzel font-bold text-xs tracking-editorial uppercase shadow-lg hover:shadow-xl transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>KIRIM RESERVASI KE WHATSAPP ({whatsappDisplay})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#0B1B3D]/30 text-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-[#FAF5ED] font-cinzel font-semibold text-xs tracking-editorial uppercase transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Format Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#8C6D37]" />
                        <span>Salin Format Teks</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-full border border-gray-300 text-gray-600 hover:text-[#0B1B3D] hover:border-gray-400 text-xs font-cinzel tracking-wider uppercase transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ubah Data</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* THE RESERVATION INPUT FORM */
              <form onSubmit={handleSubmit} className="relative z-10 space-y-8 sm:space-y-10">
                {/* STEP 1: IDENTITAS */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#C5A059]/30">
                    <span className="text-[#C5A059] text-base">❖</span>
                    <h2 className="font-cinzel text-sm sm:text-base font-bold tracking-wider uppercase text-[#0B1B3D]">
                      1. IDENTITAS PEMESAN
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="res-name"
                        className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                      >
                        Nama Lengkap *
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="res-name"
                          type="text"
                          required
                          placeholder="Contoh: Budi Santoso"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-4 pr-11 py-3 rounded-xl bg-white border border-[#C5A059]/50 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D] transition-all"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C6D37] pointer-events-none">
                          <User className="w-4 h-4 text-[#C5A059]" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="res-phone"
                        className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                      >
                        Nomor WhatsApp Pemesan *
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="res-phone"
                          type="tel"
                          required
                          placeholder="Contoh: 08123456789"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-4 pr-11 py-3 rounded-xl bg-white border border-[#C5A059]/50 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none focus:ring-1 focus:ring-[#0B1B3D] transition-all"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C6D37] pointer-events-none">
                          <Phone className="w-4 h-4 text-[#C5A059]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* STEP 2: JADWAL & AREA */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#C5A059]/30">
                    <span className="text-[#C5A059] text-base">❖</span>
                    <h2 className="font-cinzel text-sm sm:text-base font-bold tracking-wider uppercase text-[#0B1B3D]">
                      2. JADWAL KEDATANGAN &amp; AREA
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {/* TANGGAL KUNJUNGAN */}
                    <div>
                      <label
                        htmlFor="res-date"
                        className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                      >
                        Tanggal Kunjungan *
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="res-date"
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
                              "res-date"
                            ) as HTMLInputElement;
                            if (input) {
                              try {
                                input.showPicker?.();
                              } catch {
                                input.focus();
                              }
                            }
                          }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#FAF5ED] border border-[#C5A059]/60 flex items-center justify-center text-[#8C6D37] hover:bg-[#0B1B3D] hover:text-[#FAF5ED] hover:border-[#0B1B3D] transition-colors shadow-xs"
                          title="Klik untuk memilih tanggal"
                          aria-label="Pilih Tanggal"
                        >
                          <Calendar className="w-4 h-4 text-[#C5A059]" />
                        </button>
                      </div>
                    </div>

                    {/* JAM KEDATANGAN */}
                    <div>
                      <label
                        htmlFor="res-time"
                        className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                      >
                        Jam Kedatangan *
                      </label>
                      <div className="relative flex items-center">
                        <select
                          id="res-time"
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

                    {/* JUMLAH TAMU */}
                    <div>
                      <label
                        htmlFor="res-guests"
                        className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                      >
                        Perkiraan Jumlah Tamu *
                      </label>
                      <div className="relative flex items-center">
                        <select
                          id="res-guests"
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

                  {/* Seating Area Selection: HANYA 1 PILIHAN EKSKLUSIF */}
                  <div className="mt-5">
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
                            AREA UTAMA
                          </span>
                        </div>
                        <p className="text-xs text-[#FAF5ED]/80 font-light mt-1">
                          {SEATING_AREAS[0].desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* STEP 3: PILIH MENU & LIVE PRICE CALCULATION */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C5A059]/30">
                    <div className="flex items-center gap-2">
                      <span className="text-[#C5A059] text-base">❖</span>
                      <h2 className="font-cinzel text-sm sm:text-base font-bold tracking-wider uppercase text-[#0B1B3D]">
                        3. PILIHAN MENU PESANAN AWAL
                      </h2>
                    </div>
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

                  <p className="text-xs text-[#605A55] mb-4 font-light">
                    Pilih makanan dan minuman yang ingin disiapkan terlebih dahulu
                    saat Anda tiba di Sekarsuli Coffee. Rincian harga dan total estimasi akan dihitung otomatis.
                  </p>

                  {/* Search & Category Filter */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                    <div className="relative w-full sm:w-60 shrink-0">
                      <Search className="w-3.5 h-3.5 text-[#8C6D37] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Cari menu di sini..."
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

                  {/* Interactive Menu Items Grid with Photos, Descriptions & Prices */}
                  <div className="max-h-96 overflow-y-auto p-3 rounded-2xl bg-white border border-[#C5A059]/40 divide-y divide-gray-100 shadow-inner">
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

                  {/* Cart Summary List with Prices */}
                  {cartEntries.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 p-4 rounded-2xl bg-[#EFE6D8] border border-[#C5A059]/60 overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-cinzel font-bold text-[#0B1B3D] uppercase tracking-wider">
                          Daftar Menu yang Dipesan ({totalItemsCount} porsi):
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

                      {/* Total Estimasi Footer */}
                      <div className="mt-3 pt-3 border-t border-[#C5A059]/40 flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-cinzel font-bold text-[#0B1B3D]">
                          TOTAL ESTIMASI HARGA:
                        </span>
                        <span className="font-cinzel font-bold text-base text-[#8C6D37]">
                          {formatRupiah(totalPrice)}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* STEP 4: CATATAN KHUSUS & SUBMIT */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label
                    htmlFor="res-notes"
                    className="block text-xs font-cinzel font-semibold uppercase text-[#0B1B3D] mb-1.5"
                  >
                    Catatan Khusus / Keperluan Acara (Opsional)
                  </label>
                  <textarea
                    id="res-notes"
                    rows={2}
                    placeholder="Contoh: Meja dekat stopkontak, ada rombongan keluarga besar, request sajian tidak pedas..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#C5A059]/50 text-xs sm:text-sm text-[#0B1B3D] placeholder-[#605A55]/50 focus:border-[#0B1B3D] focus:outline-none transition-all shadow-xs"
                  />
                </motion.div>

                {/* SUBMIT BUTTON: DIRECTS TO CONFIRMATION REVIEW SCREEN FIRST */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="pt-4 border-t border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
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
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
