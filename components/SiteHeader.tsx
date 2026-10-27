"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "#hero", label: "BERANDA" },
  { href: "#statement", label: "FILOSOFI" },
  { href: "#menu", label: "MENU & KUDAPAN" },
  { href: "#story", label: "KISAH" },
  { href: "#atmosphere", label: "SUASANA JOGLO" },
  { href: "#location", label: "LOKASI" },
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1510]/95 backdrop-blur-md border-b border-white/10 py-4 shadow-xl"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-6 lg:gap-10">
          {/* Logo brand with circular emblem */}
          <Link
            href="#hero"
            aria-label="Sekarsuli Coffee Beranda"
            className="group focus:outline-none"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-[#c9a86a]/40 bg-[#10211a]/80 shadow-[0_0_15px_rgba(201,168,106,0.15)] ring-1 ring-[#c9a86a]/20 p-1.5 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                <Image
                  src="/images/logo-elephant-transparent.png"
                  alt="Logo Sekarsuli Coffee"
                  width={36}
                  height={36}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-medium tracking-editorial uppercase leading-none text-sm sm:text-base text-[#f6f4ee]">
                  {siteConfig.brand}
                </span>
                <span className="tracking-wide-editorial uppercase font-sans mt-1 text-[10px] text-[#c9a86a]">
                  COFFEE & MASAKAN JAWA
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden lg:flex items-center gap-7 xl:gap-9"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] xl:text-xs font-medium tracking-editorial uppercase text-[#e4ded5] hover:text-[#c9a86a] transition-colors duration-200 relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c9a86a] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link
              href="#location"
              className="hidden sm:inline-flex items-center gap-2 text-[11px] xl:text-xs font-semibold tracking-editorial uppercase px-5 py-2.5 rounded-full border border-[#c9a86a]/40 text-[#f6f4ee] bg-[#10211a]/60 hover:bg-[#c9a86a] hover:text-[#0a1510] hover:border-[#c9a86a] transition-all duration-300 shadow-sm"
            >
              <span>PANDUAN KUNJUNGAN</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-white/15 bg-black/40 text-[#f6f4ee] hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka Menu Navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-[#0a1510]/98 backdrop-blur-xl border-t border-white/10 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
      >
        <nav className="flex flex-col space-y-4 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-display tracking-editorial uppercase text-[#f6f4ee] hover:text-[#c9a86a] transition-colors py-3 border-b border-white/5 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-[#c9a86a] text-xs">→</span>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
          <Link
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#f6f4ee] text-[#0a1510] text-xs font-semibold tracking-editorial uppercase hover:bg-[#c9a86a]"
          >
            <span>JELAJAHI MENU</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-white/20 text-[#f6f4ee] text-xs font-semibold tracking-editorial uppercase hover:border-[#c9a86a]"
          >
            <span>PANDUAN LOKASI</span>
          </Link>

          <p className="text-center text-[10px] tracking-editorial uppercase text-[#9ba79f] mt-2">
            Jl. Wonosari KM 8, Banguntapan, Bantul
          </p>
        </div>
      </div>
    </header>
  );
}
