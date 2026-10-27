import Image from "next/image";
import { Camera, Music, Trees, Users } from "lucide-react";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
  aspect: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    src: "/images/sekarsuli-cafe-evening.jpg",
    title: "Suasana Senja & Panggung Akustik",
    caption: "Area kafe Sekarsuli di sore hari dengan alunan musik akustik bersahaja.",
    tag: "Ambiance",
    aspect: "aspect-[16/10]",
  },
  {
    id: "gal-2",
    src: "/images/sekarsuli-joglo-exterior.jpg",
    title: "Kemegahan Arsitektur Joglo",
    caption: "Bangunan tradisional Joglo Jawa dengan pilar kayu jati yang kokoh dan teduh.",
    tag: "Arsitektur",
    aspect: "aspect-[4/3]",
  },
  {
    id: "gal-3",
    src: "/images/sekarsuli-drinks-matcha.jpg",
    title: "Kreasi Minuman Pilihan",
    caption: "Sajian minuman segar racikan barista Sekarsuli penyejuk dahaga.",
    tag: "Minuman",
    aspect: "aspect-[3/4]",
  },
  {
    id: "gal-4",
    src: "/images/sekarsuli-food-table.jpg",
    title: "Kudapan & Santap Bersama",
    caption: "Momen berkumpul menikmati sajian hangat di meja kayu Ndalem Sekarsuli.",
    tag: "Kebersamaan",
    aspect: "aspect-square",
  },
  {
    id: "gal-5",
    src: "/images/sekarsuli-heritage-ambiance.jpg",
    title: "Kawasan Terbuka & Ramah Keluarga",
    caption: "Ruang terbuka beratap joglo dengan semilir angin segar kawasan Jl. Wonosari.",
    tag: "Kawasan",
    aspect: "aspect-[16/10]",
  },
  {
    id: "gal-6",
    src: "/images/sekarsuli-garden-walk.jpg",
    title: "Akses Lapang & Landmark Gajah",
    caption: "Halaman terbuka yang asri dengan ikon patung gajah ramah penyambut pengunjung.",
    tag: "Landmark",
    aspect: "aspect-[4/3]",
  },
];

export function AtmosphereGallery() {
  return (
    <section
      id="suasana"
      className="py-20 sm:py-28 bg-cream-50 relative"
      aria-label="Galeri Suasana Sekarsuli"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold-600 mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>RUANG & PENGALAMAN</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-coffee-950 leading-tight">
            Keteduhan Ndalem Sekarsuli
          </h2>
          <p className="mt-3 text-sm sm:text-base text-coffee-700 font-light">
            Setiap sudut menghadirkan perjumpaan antara kelapangan ruang joglo,
            udara sejuk, alunan musik sore, dan hangatnya obrolan bersama keluarga.
          </p>
        </div>

        {/* Feature Highlights Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 py-6 px-4 bg-cream-100 rounded-sm border border-cream-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center shrink-0">
              <Trees className="w-4 h-4 text-olive-700" />
            </div>
            <div>
              <p className="text-xs font-semibold text-coffee-950">Joglo Terbuka</p>
              <p className="text-[11px] text-coffee-600">Sirkulasi udara asri</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center shrink-0">
              <Music className="w-4 h-4 text-gold-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-coffee-950">Live Akustik</p>
              <p className="text-[11px] text-coffee-600">Sore hari santai</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-coffee-700" />
            </div>
            <div>
              <p className="text-xs font-semibold text-coffee-950">Ramah Rombongan</p>
              <p className="text-[11px] text-coffee-600">Area duduk lapang</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center shrink-0">
              <span className="text-sm font-serif font-bold text-coffee-900">P</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-coffee-950">Parkir Luas</p>
              <p className="text-[11px] text-coffee-600">Bus, mobil & motor</p>
            </div>
          </div>
        </div>

        {/* Responsive Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative bg-cream-100 rounded-sm overflow-hidden border border-cream-200 hover:border-cream-300 transition-all duration-300 flex flex-col shadow-sm"
            >
              {/* Image Container with Consistent Aspect */}
              <div className="relative aspect-[16/11] overflow-hidden bg-cream-200">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-coffee-950/70 backdrop-blur-sm text-[10px] font-medium tracking-wider uppercase text-cream-100">
                  {item.tag}
                </div>
              </div>

              {/* Caption Content */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-base font-semibold text-coffee-950 group-hover:text-coffee-800 transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-coffee-700 leading-relaxed font-light">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
