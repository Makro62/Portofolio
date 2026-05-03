/* ===========================================
   DATA MODULE
   Menyimpan data produk dan kategori
   =========================================== */

export const fruits = [
  {
    id: 1,
    name: 'Organic Strawberries',
    price: 4.99,
    originalPrice: 6.99,
    image: 'https://placehold.co/300x300/ff6b81/ffffff?text=Strawberries',
    category: 'berries',
    rating: 4.8,
    reviews: 124,
    description: 'Fresh, juicy organic strawberries.',
    inStock: true
  },
  {
    id: 2,
    name: 'Premium Avocados',
    price: 3.49,
    originalPrice: 4.29,
    image: 'https://placehold.co/300x300/4ecdc4/ffffff?text=Avocados',
    category: 'tropical',
    rating: 4.6,
    reviews: 89,
    description: 'Ripe, creamy avocados.',
    inStock: true
  },
  {
    id: 3,
    name: 'Sweet Mangoes',
    price: 2.99,
    originalPrice: 3.99,
    image: 'https://placehold.co/300x300/ffa630/ffffff?text=Mangoes',
    category: 'tropical',
    rating: 4.9,
    reviews: 203,
    description: 'Sweet, fragrant mangoes.',
    inStock: true
  },
  {
    id: 4,
    name: 'Crisp Apples',
    price: 1.29,
    originalPrice: 1.79,
    image: 'https://placehold.co/300x300/ff9a8b/ffffff?text=Apples',
    category: 'classic',
    rating: 4.7,
    reviews: 156,
    description: 'Fresh, crisp apples.',
    inStock: true
  },
  {
    id: 5,
    name: 'Juicy Oranges',
    price: 1.49,
    originalPrice: 1.99,
    image: 'https://placehold.co/300x300/ff9f1c/ffffff?text=Oranges',
    category: 'citrus',
    rating: 4.5,
    reviews: 98,
    description: 'Bright, juicy oranges.',
    inStock: true
  },
  {
    id: 6,
    name: 'Fresh Blueberries',
    price: 5.99,
    originalPrice: 7.49,
    image: 'https://placehold.co/300x300/5e60ce/ffffff?text=Blueberries',
    category: 'berries',
    rating: 4.8,
    reviews: 167,
    description: 'Antioxidant-rich blueberries.',
    inStock: true
  },
  {
    id: 7,
    name: 'Ripe Bananas',
    price: 0.89,
    originalPrice: 1.19,
    image: 'https://placehold.co/300x300/ffd166/ffffff?text=Bananas',
    category: 'classic',
    rating: 4.4,
    reviews: 221,
    description: 'Perfectly ripened bananas.',
    inStock: true
  },
  {
    id: 8,
    name: 'Dragon Fruit',
    price: 6.99,
    originalPrice: 8.49,
    image: 'https://placehold.co/300x300/e63946/ffffff?text=Dragon+fruit',
    category: 'exotic',
    rating: 4.7,
    reviews: 76,
    description: 'Exotic dragon fruit.',
    inStock: true
  },
  {
    id: 9,
    name: 'Fresh Raspberries',
    price: 6.49,
    originalPrice: 7.99,
    image: 'https://placehold.co/300x300/c71f37/ffffff?text=Raspberries',
    category: 'berries',
    rating: 4.9,
    reviews: 142,
    description: 'Sweet and tangy raspberries.',
    inStock: true
  },
  {
    id: 10,
    name: 'Juicy Watermelon',
    price: 3.99,
    originalPrice: 5.49,
    image: 'https://placehold.co/300x300/ff6b6b/ffffff?text=Watermelon',
    category: 'tropical',
    rating: 4.6,
    reviews: 188,
    description: 'Refreshing watermelon slices.',
    inStock: true
  },
  {
    id: 11,
    name: 'Fresh Lemons',
    price: 1.99,
    originalPrice: 2.49,
    image: 'https://placehold.co/300x300/fff44f/333333?text=Lemons',
    category: 'citrus',
    rating: 4.5,
    reviews: 95,
    description: 'Zesty fresh lemons.',
    inStock: true
  },
  {
    id: 12,
    name: 'Sweet Pears',
    price: 2.49,
    originalPrice: 3.29,
    image: 'https://placehold.co/300x300/b8e994/ffffff?text=Pears',
    category: 'classic',
    rating: 4.4,
    reviews: 112,
    description: 'Juicy sweet pears.',
    inStock: true
  },
  {
    id: 13,
    name: 'Passion Fruit',
    price: 4.99,
    originalPrice: 6.49,
    image: 'https://placehold.co/300x300/9b59b6/ffffff?text=Passion+Fruit',
    category: 'exotic',
    rating: 4.8,
    reviews: 85,
    description: 'Tropical passion fruit.',
    inStock: true
  },
  {
    id: 14,
    name: 'Fresh Grapes',
    price: 3.49,
    originalPrice: 4.49,
    image: 'https://placehold.co/300x300/8e44ad/ffffff?text=Grapes',
    category: 'berries',
    rating: 4.7,
    reviews: 156,
    description: 'Sweet seedless grapes.',
    inStock: true
  },
  {
    id: 15,
    name: 'Ripe Papaya',
    price: 2.99,
    originalPrice: 4.29,
    image: 'https://placehold.co/300x300/ff9a76/ffffff?text=Papaya',
    category: 'tropical',
    rating: 4.5,
    reviews: 98,
    description: 'Sweet ripe papaya.',
    inStock: true
  },
  {
    id: 16,
    name: 'Fresh Grapefruit',
    price: 2.49,
    originalPrice: 3.49,
    image: 'https://placehold.co/300x300/ff6b9d/ffffff?text=Grapefruit',
    category: 'citrus',
    rating: 4.3,
    reviews: 78,
    description: 'Tangy pink grapefruit.',
    inStock: true
  },
  {
    id: 17,
    name: 'Fresh Cherries',
    price: 7.99,
    originalPrice: 9.99,
    image: 'https://placehold.co/300x300/d63031/ffffff?text=Cherries',
    category: 'berries',
    rating: 4.9,
    reviews: 204,
    description: 'Sweet fresh cherries.',
    inStock: true
  },
  {
    id: 18,
    name: 'Kiwi Fruit',
    price: 3.99,
    originalPrice: 4.99,
    image: 'https://placehold.co/300x300/6ab04c/ffffff?text=Kiwi',
    category: 'tropical',
    rating: 4.6,
    reviews: 134,
    description: 'Tangy green kiwi.',
    inStock: true
  },
  {
    id: 19,
    name: 'Fresh Peaches',
    price: 3.49,
    originalPrice: 4.49,
    image: 'https://placehold.co/300x300/ffbe76/ffffff?text=Peaches',
    category: 'classic',
    rating: 4.7,
    reviews: 167,
    description: 'Juicy ripe peaches.',
    inStock: true
  },
  {
    id: 20,
    name: 'Star Fruit',
    price: 5.49,
    originalPrice: 6.99,
    image: 'https://placehold.co/300x300/f9ca24/333333?text=Star+Fruit',
    category: 'exotic',
    rating: 4.5,
    reviews: 62,
    description: 'Unique star-shaped fruit.',
    inStock: true
  }
];

export const categories = [
  { id: 'all', name: 'All Fruits' },
  { id: 'berries', name: 'Berries' },
  { id: 'tropical', name: 'Tropical' },
  { id: 'citrus', name: 'Citrus' },
  { id: 'classic', name: 'Classic' },
  { id: 'exotic', name: 'Exotic' }
];

