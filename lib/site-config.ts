export interface SiteConfig {
  name: string;
  brand: string;
  subtitle: string;
  eyebrow: string;
  tagline: string;
  description: string;
  heroHeadline: string;
  heroDescription: string;
  story: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    pillars: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  location: {
    title: string;
    venueName: string;
    address: string;
    fullAddress: string;
    landmark: string;
    mapsSearchQuery: string;
    mapsUrl: string;
    embedUrl: string;
  };
  hours: {
    label: string;
    schedule: string;
    detail: string;
  };
  social: {
    instagramUrl: string;
    instagramHandle: string;
  };
  contact: {
    whatsappNumber: string;
    whatsappDisplay?: string;
    whatsappMessage?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Sekarsuli Coffee & Masakan Jawa",
  brand: "SEKARSULI",
  subtitle: "COFFEE & MASAKAN JAWA",
  eyebrow: "SEKARSULI COFFEE & MASAKAN JAWA",
  tagline: "Merawat Rasa, Menjaga Tradisi.",
  description:
    "Dari secangkir kopi hingga sajian masakan Jawa, temukan ruang untuk menikmati rasa dan kebersamaan di Sekarsuli.",
  heroHeadline: "Merawat Rasa, Menjaga Tradisi.",
  heroDescription:
    "Dari secangkir kopi hingga sajian masakan Jawa, temukan ruang untuk menikmati rasa dan kebersamaan di Sekarsuli Coffee, Banguntapan, Bantul.",
  story: {
    eyebrow: "PENGALAMAN & NILAI",
    headline: "Perjumpaan Rasa Nusantara dan Teduhnya Joglo Jawa",
    paragraphs: [
      "Di tengah ritme kehidupan Yogyakarta yang terus bergerak, Sekarsuli hadir sebagai tempat bernaung yang teduh. Mengakar pada keelokan arsitektur Joglo di Sekarsuli Coffee, kami menyajikan kehangatan masakan Jawa rumahan berdampingan dengan seduhan kopi masa kini.",
      "Setiap sudut dirancang untuk merayakan kelambatan: menikmati seduhan kopi beraroma mantap, mencicipi wedangan hangat, serta berkumpul bersama keluarga dan sahabat di bawah atap kayu jati yang sarat ketenangan.",
    ],
    pillars: [
      {
        number: "01",
        title: "Kopi Kontemporer & Signature",
        description:
          "Pilihan espresso-based, racikan kopi susu gula aren Arenga, hingga paduan segar mocktail buah yang diracik presisi.",
      },
      {
        number: "02",
        title: "Wedangan & Cita Rasa Jawa",
        description:
          "Sajian rempah tradisional khas Jawa—dari Wedang Sereh, Susu Jahe, hingga Teh Gajah istimewa peneman kebersamaan.",
      },
      {
        number: "03",
        title: "Kawasan Nyaman & Teduh",
        description:
          "Suasana Joglo terbuka nan asri dengan semilir angin, area lapang, serta keramahan bersahaja di Jl. Wonosari KM 8.",
      },
    ],
  },
  location: {
    title: "Kunjungi Kami",
    venueName: "Sekarsuli Coffee",
    address: "Jl. Wonosari KM 8, Baturetno, Banguntapan, Bantul, DI Yogyakarta",
    fullAddress:
      "Sekarsuli Coffee, Jl. Wonosari KM 8, Baturetno, Banguntapan, Bantul, Daerah Istimewa Yogyakarta 55197",
    landmark: "Sekarsuli Coffee, tepi jalur utama Jogja – Wonosari KM 8",
    mapsSearchQuery: "Sekarsuli Coffee & Masakan Jawa",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sekarsuli+Coffee+%26+Masakan+Jawa+Banguntapan+Bantul",
    embedUrl:
      "https://maps.google.com/maps?q=Sekarsuli+Coffee+%26+Masakan+Jawa%2C+Jl.+Wonosari+KM+8%2C+Baturetno%2C+Banguntapan%2C+Bantul&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  hours: {
    label: "Jam Operasional",
    schedule: "10.00 – 22.00 WIB",
    detail: "Buka setiap hari (Senin – Minggu)",
  },
  social: {
    instagramUrl: "https://www.instagram.com/sekarsulicoffee/",
    instagramHandle: "@sekarsulicoffee",
  },
  contact: {
    // Nomor WhatsApp resmi Sekarsuli Coffee (format internasional tanpa tanda plus)
    whatsappNumber: "6287830228170",
    whatsappDisplay: "0878-3022-8170",
    whatsappMessage:
      "Halo Sekarsuli Coffee & Masakan Jawa, saya ingin bertanya tentang menu dan reservasi kunjungan.",
  },
};
