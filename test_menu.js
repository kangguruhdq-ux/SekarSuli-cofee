const fs = require('fs');

const content = fs.readFileSync('lib/menu-data.ts', 'utf8');
const idMatches = content.match(/id:\s*"[^"]+"/g);
console.log('Total items found by id in lib/menu-data.ts:', idMatches ? idMatches.length : 0);

const requiredItems = [
  // COFFEE (21)
  "Espresso Hot", "Americano Ice", "Americano Hot", "Cappuccino Ice", "Cappuccino Hot",
  "Coffee Latte Ice", "Coffee Latte Hot", "Magic Hot", "Arenga Ice", "Arenga Hot",
  "Butterscotch Ice", "Sea Salt Vanilla Ice", "Sea Salt Vanilla Hot", "Hazelnut Coffee Latte",
  "Caramel Latte Iced", "Caramel Latte Hot", "Salted Caramel Machiato Ice", "Spanish Latte Ice",
  "Honey Long Black Ice", "Berry Blossom Ice", "Sekarsuli Blanc Ice",

  // NON COFFEE (16)
  "Chocolate Ice", "Chocolate Hot", "Chocolate Hazelnute Ice", "Chocolate Vanilla Ice",
  "Chocolate Caramel Ice", "Chocolate Caramel Hot", "Matcha Oreo Latte Iced", "Matcha Latte Ice",
  "Matcha Latte Hot", "Matcha Strawberry Ice", "Salted Red Velvet Ice", "Salted Red Velvet Hot",
  "Taro Latte Iced", "Taro Latte Hot", "Oreo Coffee Latte Iced", "Butter Fly Pea Lychee Ice",

  // REFRESHING (5)
  "Honey Lemon Ice", "Honey Lemon Hot", "Honey Late Ice", "Tropical Berry Ice", "Americano Lemonade Ice",

  // TEA (10)
  "Lychee Tea Ice", "Lemon Tea Ice", "Hot Lemon Tea", "Es The Tarik", "The Tarik Hot",
  "Teh Gajah Mini Es", "Teh Gajah Mini Hot", "Teh Gajah Jumbo Es", "Teh Gajah Jumbo Hot", "Teh Poci Gula Batu",

  // WEDANGAN (4)
  "Wedang Sereh", "Wedang Susu Jahe", "Wedang Seruni", "Wedang Seroja",

  // MINUMAN LAIN (5)
  "Es Kuwut", "Jus Alpukat", "Jus Mangga", "Es Jeruk", "Air Mineral 600 ml",

  // SNACK (14)
  "Mendoan", "Singkong Goreng", "Kentang Goreng", "Pisang Goreng Biasa", "Pisang Goreng Coklat",
  "Pisang Goreng Keju", "Roti Bakar Coklat", "Roti Bakar Keju", "Kacang Rebus", "Jamur Krispi",
  "Jamur Enoki", "Bakwan", "Tahu Walik", "Mix Platter",

  // MENU KHAS (11)
  "Mi Nyemek - Telur Ayam", "Mi Nyemek - Telur Bebek", "Sego Godhog - Telur Ayam", "Sego Godhog - Telur Bebek",
  "Nasi Goreng Mawut - Telur Ayam", "Nasi Goreng Mawut - Telur Bebek", "Sego Tempong", "Sego Wiwit",
  "Ayam Geprek", "Ayam Goreng Kremes", "Nasi Goreng Biasa",

  // BAKMI (12)
  "Bakmi Kuning Godog - Telur Ayam", "Bakmi Kuning Godog - Telur Bebek",
  "Bakmi Kuning Goreng - Telur Ayam", "Bakmi Kuning Goreng - Telur Bebek",
  "Bakmi Campur Godog - Telur Ayam", "Bakmi Campur Godog - Telur Bebek",
  "Bakmi Campur Goreng - Telur Ayam", "Bakmi Campur Goreng - Telur Bebek",
  "Bihun Godog - Telur Ayam", "Bihun Godog - Telur Bebek",
  "Bihun Goreng - Telur Ayam", "Bihun Goreng - Telur Bebek",
];

console.log('Target required items count:', requiredItems.length);
let missing = [];
for (const item of requiredItems) {
  if (!content.includes(`name: "${item}"`)) {
    missing.push(item);
  }
}

if (missing.length === 0) {
  console.log(`ALL ${requiredItems.length} MENU ITEMS PERFECTLY PRESENT!`);
} else {
  console.error('Missing items:', missing);
  process.exit(1);
}
