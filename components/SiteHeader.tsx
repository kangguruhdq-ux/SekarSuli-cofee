"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowUpRight,
  Home,
  Sparkles,
  UtensilsCrossed,
  CalendarCheck,
  BookOpen,
  Camera,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

interface NavItem {
  href: string;
  label: string;
  subtitle: string;
  icon: typeof Home;
  isHighlight?: boolean;
}

const NAV_LINKS: NavItem[] = [
  {
    href: "#hero",
    label: "BERANDA",
    subtitle: "Halaman Utama & Nilai Pusaka",
    icon: Home,
  },
  {
    href: "#statement",
    label: "FILOSOFI",
    subtitle: "Merawat Rasa & Menjaga Tradisi",
    icon: Sparkles,
  },
  {
    href: "#menu",
    label: "BUKU MENU",
    subtitle: "44 Kudapan, Kopi & Wedangan Khas",
    icon: UtensilsCrossed,
  },
  {
    href: "#reservasi",
    label: "RESERVASI",
    subtitle: "Booking Meja & Pre-Order Menu",
    icon: CalendarCheck,
    isHighlight: true,
  },
  {
    href: "#story",
    label: "KISAH",
    subtitle: "Identitas Ndalem Sekarsuli",
    icon: BookOpen,
  },
  {
    href: "#atmosphere",
    label: "SUASANA JOGLO",
    subtitle: "Pesona Pendopo & Panggung Akustik",
    icon: Camera,
  },
  {
    href: "#location",
    label: "LOKASI",
    subtitle: "Jl. Wonosari KM 8, Banguntapan",
    icon: MapPin,
  },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock both html and body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const whatsappDisplay =
    siteConfig.contact.whatsappDisplay || "0878-3022-8170";
  const whatsappNumber = siteConfig.contact.whatsappNumber || "6287830228170";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1B3D]/95 backdrop-blur-md border-b border-[#C5A059]/25 py-3.5 sm:py-4 shadow-2xl"
            : "bg-gradient-to-b from-[#071229]/95 via-[#071229]/75 to-transparent py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo Brand with Ivory Royal Medallion for 100% Contrast */}
            <Link
              href="#hero"
              aria-label="Sekarsuli Coffee Beranda"
              className="group focus:outline-none"
            >
              <div className="flex items-center gap-3">
                {/* Ivory background medallion ensures the navy elephant silhouette & golden flower pop with high contrast */}
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border-2 border-[#C5A059] bg-[#FAF5ED] shadow-[0_0_15px_rgba(197,160,89,0.35)] ring-1 ring-[#C5A059]/40 p-1.5 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                  <Image
                    src="/images/logo-elephant-transparent.png"
                    alt="Logo Sekarsuli Coffee"
                    width={34}
                    height={34}
                    className="object-contain filter drop-shadow-sm"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-cinzel font-bold tracking-editorial uppercase leading-none text-sm sm:text-base text-[#FAF5ED] group-hover:text-[#C5A059] transition-colors">
                    {siteConfig.brand}
                  </span>
                  <span className="tracking-wide-editorial uppercase font-sans mt-1 text-[9px] sm:text-[10px] text-[#C5A059] font-medium">
                    COFFEE &amp; MASAKAN JAWA
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden lg:flex items-center gap-6 xl:gap-8"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[11px] xl:text-xs font-cinzel font-medium tracking-editorial uppercase transition-all duration-200 relative group py-2 ${
                    link.isHighlight
                      ? "text-[#C5A059] font-bold"
                      : "text-[#FAF5ED]/80 hover:text-[#C5A059]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.isHighlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                    )}
                    {link.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 ${
                      link.isHighlight ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop Right CTA Action Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Quick WhatsApp Booking CTA */}
              <Link
                href="#reservasi"
                className="hidden sm:inline-flex items-center gap-2 text-[11px] xl:text-xs font-cinzel font-bold tracking-editorial uppercase px-4 sm:px-5 py-2.5 rounded-full border border-[#C5A059] text-[#0B1B3D] bg-[#C5A059] hover:bg-[#DFBA75] hover:border-[#DFBA75] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#0B1B3D]" />
                <span>BOOKING MEJA</span>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-full border border-[#C5A059]/60 bg-[#0B1B3D] text-[#FAF5ED] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors focus:outline-none shadow-md"
                aria-label="Buka Menu Navigasi"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          ELEGANT FULL-SCREEN MOBILE DRAWER WITH FRAMER MOTION ANIMATION & RICH ICONS
         ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu Navigasi Mobile"
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Slide-Down Drawer Container */}
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full bg-[#071229] text-[#FAF5ED] flex flex-col justify-between overflow-y-auto"
            >
              {/* Subtle Royal Damask Glow in background */}
              <div
                className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-[90px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Drawer Top Bar */}
              <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-[#C5A059]/30 bg-[#0B1B3D]">
                <div className="flex items-center gap-3">
                  {/* Ivory Medallion inside drawer */}
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C5A059] bg-[#FAF5ED] p-1.5 flex items-center justify-center shadow-md">
                    <Image
                      src="/images/logo-elephant-transparent.png"
                      alt="Logo Sekarsuli"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-cinzel text-sm font-bold tracking-editorial text-[#FAF5ED]">
                      SEKARSULI
                    </span>
                    <span className="text-[9px] tracking-wide-editorial uppercase text-[#C5A059] font-semibold">
                      COFFEE &amp; MASAKAN JAWA
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full border border-[#C5A059]/40 bg-[#071229] text-[#FAF5ED] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors focus:outline-none"
                  aria-label="Tutup Menu"
                >
                  <X className="w-5 h-5 stroke-[2]" />
                </button>
              </div>

              {/* Navigation Links with Rich Icons & Editorial Subtitles */}
              <nav className="relative z-10 flex flex-col px-4 py-5 space-y-2 flex-grow overflow-y-auto">
                <div className="px-2 mb-2">
                  <span className="text-[10px] font-cinzel font-semibold tracking-wide-editorial uppercase text-[#C5A059]">
                    ❖ PANDUAN HALAMAN
                  </span>
                </div>

                {NAV_LINKS.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 ${
                          link.isHighlight
                            ? "bg-[#0B1B3D] border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.2)]"
                            : "bg-[#0B1B3D]/60 border-[#C5A059]/20 hover:border-[#C5A059]/60 hover:bg-[#0B1B3D]"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              link.isHighlight
                                ? "bg-[#C5A059] text-[#0B1B3D]"
                                : "bg-[#071229] border border-[#C5A059]/30 text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#0B1B3D]"
                            }`}
                          >
                            <Icon className="w-4 h-4 stroke-[2]" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span
                              className={`font-cinzel text-xs font-bold tracking-editorial uppercase transition-colors ${
                                link.isHighlight
                                  ? "text-[#C5A059]"
                                  : "text-[#FAF5ED] group-hover:text-[#C5A059]"
                              }`}
                            >
                              {link.label}
                            </span>
                            <span className="text-[10px] text-[#FAF5ED]/60 font-light mt-0.5">
                              {link.subtitle}
                            </span>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-[#C5A059]/70 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom Quick Contact & Actions Bar inside Drawer */}
              <div className="relative z-10 p-5 border-t border-[#C5A059]/30 bg-[#0B1B3D] flex flex-col gap-3">
                {/* Primary CTA: Reservasi Meja & Menu */}
                <Link
                  href="#reservasi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#C5A059] text-[#0B1B3D] text-xs font-cinzel font-bold tracking-editorial uppercase shadow-lg hover:bg-[#DFBA75] transition-all"
                >
                  <CalendarCheck className="w-4 h-4 text-[#0B1B3D]" />
                  <span>BOOKING MEJA &amp; PILIH MENU</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                {/* Direct WhatsApp Callout */}
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#C5A059]/40 bg-[#071229] text-[#FAF5ED] text-xs font-cinzel tracking-wider uppercase hover:bg-white/5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>WhatsApp: {whatsappDisplay}</span>
                </a>

                {/* Hours & Address metadata */}
                <div className="flex items-center justify-between text-[10px] text-[#FAF5ED]/50 pt-1 font-light">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C5A059]" />
                    10.00 – 22.00 WIB
                  </span>
                  <span>Jl. Wonosari KM 8, Banguntapan</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}