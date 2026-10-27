export type MenuCategory =
  | "Coffee"
  | "Non Coffee"
  | "Refreshing"
  | "Tea"
  | "Snack"
  | "Minuman"
  | "Other";

export type CategoryFilter = "Semua" | MenuCategory;

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description?: string;
  price?: number; // Opsional: dapat diisi kemudian oleh pemilik saat konfirmasi harga resmi
  isFeatured?: boolean;
  isGajahSignature?: boolean;
  image?: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  "Coffee",
  "Non Coffee",
  "Refreshing",
  "Tea",
  "Snack",
  "Minuman",
  "Other",
];

export const CATEGORY_FILTERS: CategoryFilter[] = [
  "Semua",
  "Coffee",
  "Non Coffee",
  "Refreshing",
  "Tea",
  "Snack",
  "Minuman",
  "Other",
];

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE (8 items)
  {
    id: "coffee-espresso",
    name: "Espresso",
    category: "Coffee",
    description: "Intisari kopi ± 40 ml.",
    image: "/images/products/espresso.jpg",
  },
  {
    id: "coffee-americano",
    name: "Americano",
    category: "Coffee",
    description: "Single shot espresso dengan mineral water.",
  },
  {
    id: "coffee-cappuccino",
    name: "Cappuccino",
    category: "Coffee",
    description: "⅔ double shot espresso dengan fresh milk.",
    image: "/images/products/cappuccino.jpg",
  },
  {
    id: "coffee-latte",
    name: "Coffee Latte",
    category: "Coffee",
    description: "Single shot espresso dengan fresh milk.",
  },
  {
    id: "coffee-magic",
    name: "Magic",
    category: "Coffee",
    description: "Double shot espresso dengan fresh milk.",
    isFeatured: true,
    image: "/images/products/magic.jpg",
  },
  {
    id: "coffee-arenga",
    name: "Arenga",
    category: "Coffee",
    description: "Kopi susu dengan gula aren organik.",
    isFeatured: true,
    image: "/images/products/arenga.jpg",
  },
  {
    id: "coffee-butterscotch-latte",
    name: "Butterscotch Latte",
    category: "Coffee",
    description: "Kopi susu rasa butterscotch.",
    isFeatured: true,
    image: "/images/products/butterscotch-latte.jpg",
  },
  {
    id: "coffee-sea-salt-vanilla",
    name: "Sea Salt Vanilla",
    category: "Coffee",
    description: "Kopi susu rasa vanilla & sea salt.",
  },

  // NON COFFEE (4 items)
  {
    id: "non-coffee-chocolate",
    name: "Chocolate",
    category: "Non Coffee",
    description: "Powder coklat & susu.",
    image: "/images/products/chocolate.jpg",
  },
  {
    id: "non-coffee-matcha-latte",
    name: "Matcha Latte",
    category: "Non Coffee",
    description: "Powder teh matcha & susu.",
  },
  {
    id: "non-coffee-matcha-strawberry",
    name: "Matcha Strawberry",
    category: "Non Coffee",
    description: "Powder teh matcha, susu & saus strawberry.",
    isFeatured: true,
    image: "/images/products/matcha-strawberry.jpg",
  },
  {
    id: "non-coffee-salted-red-velvet",
    name: "Salted Red Velvet",
    category: "Non Coffee",
    description: "Powder Red Velvet, Sea Salt & susu.",
  },

  // REFRESHING (3 items)
  {
    id: "refreshing-honey-lemon",
    name: "Honey Lemon",
    category: "Refreshing",
    description: "Madu & Lemon.",
    isFeatured: true,
    image: "/images/products/honey-lemon.jpg",
  },
  {
    id: "refreshing-tropical-berry",
    name: "Tropical Berry",
    category: "Refreshing",
    description: "Strawberry, Lychee, Lemon.",
    image: "/images/products/es-kuwut.jpg",
  },
  {
    id: "refreshing-americano-lemonade",
    name: "Americano Lemonade",
    category: "Refreshing",
    description: "Americano, gula & lemon.",
  },

  // TEA (2 items)
  {
    id: "tea-iced-lychee-tea",
    name: "Iced Lychee Tea",
    category: "Tea",
  },
  {
    id: "tea-iced-lemon-tea",
    name: "Iced Lemon Tea",
    category: "Tea",
  },

  // SNACK (15 items)
  {
    id: "snack-mendoan-gajah",
    name: "Mendoan Gajah",
    category: "Snack",
    isFeatured: true,
    isGajahSignature: true,
    image: "/images/products/mendoan-gajah.jpg",
  },
  {
    id: "snack-singkong-goreng",
    name: "Singkong Goreng",
    category: "Snack",
    image: "/images/products/singkong-goreng.jpg",
  },
  {
    id: "snack-kentang-goreng",
    name: "Kentang Goreng",
    category: "Snack",
    image: "/images/products/kentang-goreng.jpg",
  },
  {
    id: "snack-pisang-goreng",
    name: "Pisang Goreng",
    category: "Snack",
    isFeatured: true,
    image: "/images/products/pisang-goreng.jpg",
  },
  {
    id: "snack-roti-bakar-cokelat",
    name: "Roti Bakar Cokelat",
    category: "Snack",
    image: "/images/products/roti-bakar.jpg",
  },
  {
    id: "snack-roti-bakar-keju",
    name: "Roti Bakar Keju",
    category: "Snack",
  },
  {
    id: "snack-spicy-tofu",
    name: "Spicy Tofu",
    category: "Snack",
    image: "/images/products/spicy-tofu.jpg",
  },
  {
    id: "snack-cireng",
    name: "Cireng",
    category: "Snack",
    image: "/images/products/cireng.jpg",
  },
  {
    id: "snack-kacang-rebus",
    name: "Kacang Rebus",
    category: "Snack",
  },
  {
    id: "snack-jasuke",
    name: "Jasuke",
    category: "Snack",
  },
  {
    id: "snack-onion-ring",
    name: "Onion Ring",
    category: "Snack",
  },
  {
    id: "snack-jamur-crispy",
    name: "Jamur Crispy",
    category: "Snack",
  },
  {
    id: "snack-bakwan",
    name: "Bakwan",
    category: "Snack",
  },
  {
    id: "snack-tahu-walik",
    name: "Tahu Walik",
    category: "Snack",
  },
  {
    id: "snack-jamur-enoki",
    name: "Jamur Enoki",
    category: "Snack",
  },

  // MINUMAN (11 items)
  {
    id: "minuman-teh-gajah-mini",
    name: "Teh Gajah Mini (Panas/Es)",
    category: "Minuman",
    isGajahSignature: true,
    image: "/images/products/teh-gajah.jpg",
  },
  {
    id: "minuman-teh-gajah-jumbo",
    name: "Teh Gajah Jumbo (Panas/Es)",
    category: "Minuman",
    isGajahSignature: true,
    image: "/images/products/teh-gajah.jpg",
  },
  {
    id: "minuman-wedang-sereh",
    name: "Wedang Sereh",
    category: "Minuman",
    isFeatured: true,
    image: "/images/products/wedang-sereh.jpg",
  },
  {
    id: "minuman-wedang-susu-jahe",
    name: "Wedang Susu Jahe",
    category: "Minuman",
    image: "/images/products/wedang-susu-jahe.jpg",
  },
  {
    id: "minuman-wedang-jasem",
    name: "Wedang Jasem",
    category: "Minuman",
  },
  {
    id: "minuman-wedang-seruni",
    name: "Wedang Seruni",
    category: "Minuman",
  },
  {
    id: "minuman-wedang-seroja",
    name: "Wedang Seroja",
    category: "Minuman",
  },
  {
    id: "minuman-es-kuwut",
    name: "Es Kuwut",
    category: "Minuman",
    image: "/images/products/es-kuwut.jpg",
  },
  {
    id: "minuman-jus-alpukat",
    name: "Jus Alpukat",
    category: "Minuman",
  },
  {
    id: "minuman-jus-mangga",
    name: "Jus Mangga",
    category: "Minuman",
  },
  {
    id: "minuman-wedang-tomat",
    name: "Wedang Tomat",
    category: "Minuman",
  },

  // OTHER (1 item)
  {
    id: "other-mineral-water",
    name: "Mineral Water",
    category: "Other",
  },
];

export const TOTAL_MENU_COUNT = MENU_ITEMS.length;

if (TOTAL_MENU_COUNT !== 44) {
  console.warn(
    `[MENU VERIFICATION WARNING] Expected 44 menu items, found ${TOTAL_MENU_COUNT}`
  );
}

export const FEATURED_ITEMS = MENU_ITEMS.filter((item) => item.isFeatured);

export function getMenuItemsByCategory(category: CategoryFilter): MenuItem[] {
  if (category === "Semua") {
    return MENU_ITEMS;
  }
  return MENU_ITEMS.filter((item) => item.category === category);
}

export function getCategoryCounts(): Record<CategoryFilter, number> {
  const counts: Record<string, number> = {
    Semua: MENU_ITEMS.length,
  };

  MENU_CATEGORIES.forEach((cat) => {
    counts[cat] = MENU_ITEMS.filter((item) => item.category === cat).length;
  });

  return counts as Record<CategoryFilter, number>;
}
