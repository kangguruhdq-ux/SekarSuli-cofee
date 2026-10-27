"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppButton() {
  const whatsappNumber = siteConfig.contact.whatsappNumber?.trim();

  // Hanya tampilkan jika nomor WhatsApp telah dikonfirmasi oleh pemilik
  if (!whatsappNumber) {
    return null;
  }

  const message = encodeURIComponent(
    siteConfig.contact.whatsappMessage || "Halo Sekarsuli Coffee, saya ingin bertanya tentang menu dan kunjungan."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2.5 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-cream-50 rounded-full shadow-lg border border-emerald-500/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 text-xs font-semibold uppercase tracking-wider"
      aria-label="Hubungi Sekarsuli Coffee melalui WhatsApp"
    >
      <MessageCircle className="w-4 h-4 text-emerald-200" />
      <span className="hidden sm:inline">Tanya via WhatsApp</span>
    </a>
  );
}
