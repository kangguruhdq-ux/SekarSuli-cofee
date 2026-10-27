const fs = require('fs');

const content = fs.readFileSync('lib/menu-data.ts', 'utf8');
const idMatches = content.match(/id:\s*"[^"]+"/g);
console.log('Total items found by id:', idMatches ? idMatches.length : 0);

const requiredItems = [
  // COFFEE
  "Espresso", "Americano", "Cappuccino", "Coffee Latte", "Magic", "Arenga", "Butterscotch Latte", "Sea Salt Vanilla",
  // NON COFFEE
  "Chocolate", "Matcha Latte", "Matcha Strawberry", "Salted Red Velvet",
  // REFRESHING
  "Honey Lemon", "Tropical Berry", "Americano Lemonade",
  // TEA
  "Iced Lychee Tea", "Iced Lemon Tea",
  // SNACK
  "Mendoan Gajah", "Singkong Goreng", "Kentang Goreng", "Pisang Goreng", "Roti Bakar Cokelat", "Roti Bakar Keju",
  "Spicy Tofu", "Cireng", "Kacang Rebus", "Jasuke", "Onion Ring", "Jamur Crispy", "Bakwan", "Tahu Walik", "Jamur Enoki",
  // MINUMAN
  "Teh Gajah Mini (Panas/Es)", "Teh Gajah Jumbo (Panas/Es)", "Wedang Sereh", "Wedang Susu Jahe", "Wedang Jasem",
  "Wedang Seruni", "Wedang Seroja", "Es Kuwut", "Jus Alpukat", "Jus Mangga", "Wedang Tomat",
  // OTHER
  "Mineral Water"
];

console.log('Required items target count:', requiredItems.length);
let missing = [];
for (const item of requiredItems) {
  if (!content.includes(`name: "${item}"`)) {
    missing.push(item);
  }
}
if (missing.length === 0) {
  console.log('ALL 44 MENU ITEMS PERFECTLY PRESENT!');
} else {
  console.error('Missing items:', missing);
}

const featuredTarget = [
  "Arenga", "Magic", "Butterscotch Latte", "Matcha Strawberry",
  "Honey Lemon", "Mendoan Gajah", "Pisang Goreng", "Wedang Sereh"
];
console.log('Featured target count:', featuredTarget.length);
