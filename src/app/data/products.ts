export interface Product {
  id: number;
  slug: string;
  name: { en: string; km: string };
  description: { en: string; km: string };
  price: number;
  discount: number;
  category: string;
  images: string;
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
  createdAt: string;
  telegramLink: string;

  // NEW (recommended for shoes)
  brand?: string;
  sizes?: string[];
  color?: string;
}

export interface Category {
  slug: string;
  name: { en: string; km: string };
  description: { en: string; km: string };
  cover: string;
  icon: string;
}

/* =======================
   SHOE CATEGORIES
======================= */
export const categories: Category[] = [
  {
    slug: 'sneakers',
    name: { en: 'Sneakers', km: 'ស្បែកជើង Sneaker' },
    description: {
      en: 'Trendy sneakers for everyday lifestyle',
      km: 'ស្បែកជើង Sneaker សម្រាប់ប្រើប្រាស់ប្រចាំថ្ងៃ',
    },
    cover:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=500&fit=crop',
    icon: '👟',
  },
  {
    slug: 'running',
    name: { en: 'Running Shoes', km: 'ស្បែកជើងរត់' },
    description: {
      en: 'High performance running shoes',
      km: 'ស្បែកជើងរត់មានសមត្ថភាពខ្ពស់',
    },
    cover:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&h=500&fit=crop',
    icon: '🏃',
  },
  {
    slug: 'casual',
    name: { en: 'Casual Shoes', km: 'ស្បែកជើងប្រចាំថ្ងៃ' },
    description: {
      en: 'Comfortable shoes for daily wear',
      km: 'ស្បែកជើងស្រួលសម្រាប់ប្រើប្រាស់ប្រចាំថ្ងៃ',
    },
    cover:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&h=500&fit=crop',
    icon: '👞',
  },
  {
    slug: 'sports',
    name: { en: 'Sports Shoes', km: 'ស្បែកជើងកីឡា' },
    description: {
      en: 'Shoes for training and sports',
      km: 'ស្បែកជើងសម្រាប់ហាត់ប្រាណ និងកីឡា',
    },
    cover:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=500&fit=crop',
    icon: '⚽',
  },
];

/* =======================
   TELEGRAM BOT
======================= */
export const TELEGRAM_BASE = 'https://t.me/yoeungyeng';

/* =======================
   PRODUCTS (SHOES)
======================= */
export const products: Product[] = [
  {
    id: 1,
    slug: 'nike-air-force-1',
    name: { en: 'Nike Air Force 1', km: 'Nike Air Force 1' },
    description: {
      en: 'Classic white sneaker with premium comfort and street style.',
      km: 'ស្បែកជើង Sneaker ពណ៌ស classic ផាសុកភាពខ្ពស់',
    },
    price: 95,
    discount: 10,
    category: 'sneakers',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: '2025-01-10',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_1`,
    brand: 'Nike',
    sizes: ['39', '40', '41', '42', '43'],
    color: 'White',
  },
  {
    id: 2,
    slug: 'adidas-ultraboost',
    name: { en: 'Adidas Ultraboost', km: 'Adidas Ultraboost' },
    description: {
      en: 'High performance running shoes with ultra comfort cushioning.',
      km: 'ស្បែកជើងរត់ cushioning ផាសុកភាពខ្ពស់',
    },
    price: 120,
    discount: 5,
    category: 'running',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    createdAt: '2025-02-01',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_2`,
    brand: 'Adidas',
    sizes: ['39', '40', '41', '42', '43', '44'],
    color: 'Black',
  },
  {
    id: 3,
    slug: 'puma-casual-sneaker',
    name: { en: 'Puma Casual Sneaker', km: 'Puma Casual Sneaker' },
    description: {
      en: 'Lightweight casual sneaker for everyday wear.',
      km: 'ស្បែកជើងស្រាលប្រើប្រចាំថ្ងៃ',
    },
    price: 70,
    discount: 0,
    category: 'casual',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: true,
    isPopular: false,
    createdAt: '2025-03-01',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_3`,
    brand: 'Puma',
    sizes: ['39', '40', '41', '42'],
    color: 'Gray',
  },
  {
    id: 4,
    slug: 'new-balance-574-blue',
    name: { en: 'New Balance 574 Blue', km: 'New Balance 574 ពណ៌ខៀវ' },
    description: {
      en: 'Retro style sneaker with modern comfort.',
      km: 'ស្បែកជើង retro ផាសុកភាពទំនើប',
    },
    price: 85,
    discount: 15,
    category: 'sneakers',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528701800489-20be3c1ea6c5?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: '2025-03-20',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_4`,
    brand: 'New Balance',
    sizes: ['39', '40', '41', '42', '43'],
    color: 'Blue',
  },
  {
    id: 5,
    slug: 'nike-dunk-low',
    name: { en: 'Nike Dunk Low', km: 'Nike Dunk Low' },
    description: { en: 'Basketball-inspired street sneaker.', km: 'ស្បែកជើង street basketball' },
    price: 110,
    discount: 0,
    category: 'sneakers',
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    createdAt: '2025-04-01',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_5`,
    brand: 'Nike',
    sizes: ['39', '40', '41', '42', '43', '44'],
    color: 'Black/White',
  },
  {
    id: 6,
    slug: 'adidas-nmd-r1',
    name: { en: 'Adidas NMD R1', km: 'Adidas NMD R1' },
    description: { en: 'Modern lifestyle sneaker.', km: 'ស្បែកជើង lifestyle' },
    price: 105,
    discount: 0,
    category: 'sneakers',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: '2025-04-05',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_6`,
    brand: 'Adidas',
    sizes: ['39', '40', '41', '42'],
    color: 'Grey',
  },
  {
    id: 7,
    slug: 'puma-rs-x',
    name: { en: 'Puma RS-X', km: 'Puma RS-X' },
    description: { en: 'Bold street sneaker.', km: 'ស្បែកជើង street bold' },
    price: 85,
    discount: 5,
    category: 'sneakers',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528701800489-20be3c1ea6c5?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: true,
    isPopular: false,
    createdAt: '2025-04-10',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_7`,
    brand: 'Puma',
    sizes: ['39', '40', '41', '42', '43'],
    color: 'White/Blue',
  },
  {
    id: 8,
    slug: 'vans-old-skool',
    name: { en: 'Vans Old Skool', km: 'Vans Old Skool' },
    description: { en: 'Classic skate sneaker.', km: 'ស្បែកជើង skate classic' },
    price: 80,
    discount: 0,
    category: 'casual',
    images: [
      'https://images.unsplash.com/photo-1528701800489-20be3c1ea6c5?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: '2025-04-15',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_8`,
    brand: 'Vans',
    sizes: ['39', '40', '41', '42'],
    color: 'Black/White',
  },
  {
    id: 9,
    slug: 'nike-zoomx',
    name: { en: 'Nike ZoomX', km: 'Nike ZoomX' },
    description: { en: 'Ultra-light running shoes.', km: 'ស្បែកជើងរត់ស្រាល' },
    price: 130,
    discount: 10,
    category: 'running',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    createdAt: '2025-05-01',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_9`,
    brand: 'Nike',
    sizes: ['39', '40', '41', '42', '43', '44'],
    color: 'Red',
  },
  {
    id: 10,
    slug: 'adidas-superstar',
    name: { en: 'Adidas Superstar', km: 'Adidas Superstar' },
    description: { en: 'Iconic shell toe sneaker.', km: 'ស្បែកជើង shell toe' },
    price: 90,
    discount: 0,
    category: 'sneakers',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: '2025-05-05',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_10`,
    brand: 'Adidas',
    sizes: ['39', '40', '41', '42', '43'],
    color: 'White',
  },
  {
    id: 11,
    slug: 'puma-speedcat',
    name: { en: 'Puma Speedcat', km: 'Puma Speedcat' },
    description: { en: 'Motorsport inspired shoes.', km: 'racing style' },
    price: 88,
    discount: 0,
    category: 'casual',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    createdAt: '2025-05-10',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_11`,
    brand: 'Puma',
    sizes: ['39', '40', '41', '42'],
    color: 'Black',
  },
  {
    id: 12,
    slug: 'new-balance-990',
    name: { en: 'New Balance 990', km: 'New Balance 990' },
    description: { en: 'Premium comfort sneaker.', km: 'premium comfort' },
    price: 150,
    discount: 20,
    category: 'sneakers',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528701800489-20be3c1ea6c5?w=600&h=600&fit=crop',
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    createdAt: '2025-05-15',
    telegramLink: `${TELEGRAM_BASE}?start=shoe_12`,
    brand: 'New Balance',
    sizes: ['39', '40', '41', '42', '43', '44'],
    color: 'Grey',
  },
];