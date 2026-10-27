import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";
import { FEATURED_ITEMS, TOTAL_MENU_COUNT } from "@/lib/menu-data";

export function FeaturedMenu() {
  return (
    <section
      id="unggulan"
      className="py-20 sm:py-28 bg-cream-50 relative"
      aria-label="Pilihan Menu Editorial"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold-600 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KURASI EDITORIAL</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-coffee-950 leading-tight">
              Pilihan Sajian Khas & Peneman Suasana
            </h2>
            <p className="mt-3 text-sm sm:text-base text-coffee-700 font-light max-w-xl">
              Cuplikan sajian favorit pengunjung dari racikan specialty coffee,
              minuman rempah Nusantara, hingga camilan hangat pengiring obrolan.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="#menu"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-coffee-900 hover:text-gold-600 transition-colors py-1 border-b border-coffee-900 hover:border-gold-600"
            >
              <span>Lihat Semua ({TOTAL_MENU_COUNT} Menu)</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Featured Items Grid: Asymmetric Editorial List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="group relative p-6 bg-cream-100/70 hover:bg-cream-100 rounded-sm border border-cream-200 transition-all duration-300 hover:shadow-sm hover:border-cream-300 flex flex-col justify-between"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-coffee-600">
                    {item.category}
                  </span>
                  {item.isGajahSignature ? (
                    <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-coffee-900 text-cream-100">
                      Ikon Sekarsuli
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-coffee-400">
                      0{idx + 1}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-serif text-lg sm:text-xl font-medium text-coffee-950 group-hover:text-coffee-800 transition-colors mb-2">
                  {item.name}
                </h3>

                {/* Description if present */}
                {item.description ? (
                  <p className="text-xs sm:text-sm text-coffee-700 leading-relaxed font-light">
                    {item.description}
                  </p>
                ) : (
                  <p className="text-xs text-coffee-500 italic font-light">
                    Sajian pilihan khas dapur Sekarsuli
                  </p>
                )}
              </div>

              {/* Bottom Subtle Accent */}
              <div className="mt-6 pt-4 border-t border-cream-200/60 flex items-center justify-between text-[11px] text-coffee-500">
                <span>Sekarsuli Coffee</span>
                <span className="text-gold-600">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
