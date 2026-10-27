"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Compass } from "lucide-react";
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1B3D]/95 backdrop-blur-md border-b border-[#C5A059]/25 py-4 shadow-2xl"
            : "bg-gradient-to-b from-[#071229]/95 via-[#071229]/70 to-transparent py-5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-6 lg:gap-10">
            {/* Logo Brand */}
            <Link
              href="#hero"
              aria-label="Sekarsuli Coffee Beranda"
              className="group focus:outline-none"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-[#C5A059]/60 bg-[#0B1B3D] shadow-[0_0_15px_rgba(197,160,89,0.25)] ring-1 ring-[#C5A059]/30 p-1.5 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
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
                  <span className="font-cinzel font-semibold tracking-editorial uppercase leading-none text-sm sm:text-base text-[#FAF5ED]">
                    {siteConfig.brand}
                  </span>
                  <span className="tracking-wide-editorial uppercase font-sans mt-1 text-[10px] text-[#C5A059] font-medium">
                    COFFEE &amp; MASAKAN JAWA
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden lg:flex items-center gap-7 xl:gap-9"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] xl:text-xs font-medium tracking-editorial uppercase text-[#FAF5ED]/80 hover:text-[#C5A059] transition-colors duration-200 relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop Right Action Button */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <Link
                href="#location"
                className="hidden sm:inline-flex items-center gap-2 text-[11px] xl:text-xs font-semibold tracking-editorial uppercase px-5 py-2.5 rounded-full border border-[#C5A059]/60 text-[#FAF5ED] bg-[#0B1B3D] hover:bg-[#C5A059] hover:text-[#0B1B3D] hover:border-[#C5A059] transition-all duration-300 shadow-sm"
              >
                <span>PANDUAN KUNJUNGAN</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-full border border-[#C5A059]/40 bg-[#0B1B3D] text-[#FAF5ED] hover:text-[#C5A059] transition-colors focus:outline-none shadow-md"
                aria-label="Buka Menu Navigasi"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-5 h-5 stroke-[1.8]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dedicated Solid Full-Screen Mobile Drawer (100% Opaque, No Overlaps) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[#0B1B3D] text-[#FAF5ED] flex flex-col justify-between overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Menu Navigasi Mobile"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#C5A059]/25 bg-[#071229]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#C5A059]/50 bg-[#0B1B3D] p-1 flex items-center justify-center">
                <Image
                  src="/images/logo-elephant-transparent.png"
                  alt="Logo Sekarsuli"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-sm font-semibold tracking-editorial text-[#FAF5ED]">
                  SEKARSULI
                </span>
                <span className="text-[9px] tracking-wide-editorial uppercase text-[#C5A059]">
                  COFFEE &amp; MASAKAN JAWA
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full border border-[#C5A059]/40 bg-[#0B1B3D] text-[#FAF5ED] hover:text-[#C5A059] transition-colors focus:outline-none"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* Links List */}
          <nav className="flex flex-col px-6 py-6 divide-y divide-white/5 flex-grow">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-base font-cinzel font-medium tracking-editorial uppercase text-[#FAF5ED] hover:text-[#C5A059] transition-colors flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <span className="text-[#C5A059] opacity-70 group-hover:translate-x-1 transition-transform">
                  ❖
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom Actions inside Drawer */}
          <div className="p-6 border-t border-[#C5A059]/25 bg-[#071229] flex flex-col gap-3">
            <Link
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#C5A059] text-[#071229] text-xs font-semibold tracking-editorial uppercase shadow-lg hover:bg-[#DFBA75] transition-all"
            >
              <span>JELAJAHI BUKU MENU</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#C5A059]/40 text-[#FAF5ED] text-xs font-semibold tracking-editorial uppercase hover:bg-white/5 transition-all"
            >
              <Compass className="w-4 h-4 text-[#C5A059]" />
              <span>PETUNJUK LOKASI</span>
            </Link>

            <p className="text-center text-[10px] tracking-wide-editorial uppercase text-[#FAF5ED]/50 pt-2">
              Ndalem Sekarsuli — Jl. Wonosari KM 8, Banguntapan
            </p>
          </div>
        </div>
      )}
    </>
  );
}
