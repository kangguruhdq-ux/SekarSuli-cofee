"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#cerita", label: "Cerita" },
  { href: "#unggulan", label: "Pilihan" },
  { href: "#menu", label: "Menu" },
  { href: "#suasana", label: "Suasana" },
  { href: "#lokasi", label: "Lokasi" },
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

  // Prevent body scroll when mobile menu is open
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

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-cream-50/95 backdrop-blur-md border-b border-cream-200 shadow-sm py-3"
          : "bg-cream-50/80 backdrop-blur-sm border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="#beranda"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-coffee-900/5 p-1 flex items-center justify-center border border-coffee-800/10 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo-elephant-transparent.png"
                alt="Logo Sekarsuli Coffee"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-coffee-950 uppercase leading-none">
                {siteConfig.brand}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-coffee-600 uppercase mt-0.5">
                {siteConfig.subtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navigasi Utama">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-coffee-800 hover:text-coffee-950 transition-colors tracking-wide py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold-500 hover:after:w-full after:transition-all after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#menu"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-cream-50 bg-coffee-900 hover:bg-coffee-800 active:bg-coffee-950 rounded-sm transition-colors border border-coffee-800 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <span>Jelajahi Menu</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gold-400" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-coffee-900 hover:text-coffee-950 hover:bg-cream-200/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation"
        className={`md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-cream-50/98 backdrop-blur-lg border-t border-cream-200 p-6 flex flex-col justify-between transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="flex flex-col space-y-4 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif font-medium text-coffee-900 hover:text-gold-600 transition-colors py-2 border-b border-cream-200/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 pb-8 border-t border-cream-200/80 flex flex-col gap-3">
          <Link
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold tracking-wider uppercase text-cream-50 bg-coffee-900 hover:bg-coffee-800 rounded-sm shadow-sm"
          >
            <span>Jelajahi Menu Lengkap</span>
            <ArrowUpRight className="w-4 h-4 text-gold-400" />
          </Link>

          <Link
            href="#lokasi"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold tracking-wider uppercase text-coffee-900 bg-cream-100 hover:bg-cream-200 border border-cream-300 rounded-sm"
          >
            <span>Petunjuk Lokasi</span>
          </Link>

          <p className="text-center text-[11px] text-coffee-600 mt-2">
            Ndalem Sekarsuli — Jl. Wonosari KM 8, Banguntapan
          </p>
        </div>
      </div>
    </header>
  );
}
