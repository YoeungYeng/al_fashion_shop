/* ============================================================
   TYPES
============================================================ */

export type Gender = "men" | "women" | "both";

export interface Product {
  id: number;
  slug: string;
  name: { en: string; km: string };
  description: { en: string; km: string };
  price: number;
  discount: number;
  category: string;
  images: string[];
  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;
  createdAt: string;
  telegramLink: string;
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
  gender: Gender; // which menu(s) this category appears under
  banner: string;
}

export interface Menu {
  slug: "men" | "women";
  name: { en: string; km: string };
  categories: Category[];
  products: Product[];
}

/* ============================================================
   TELEGRAM BOT
============================================================ */

export const TELEGRAM_BASE = "https://t.me/yoeungyeng";

/* ============================================================
   CATEGORIES
============================================================ */

export const categories: Category[] = [
  {
    slug: "classic-boots",
    name: { en: "Shoes", km: "ស្បែកជើង" },
    description: { en: "Premium leather boots", km: "ប៊ូតស្បែកគុណភាពខ្ពស់" },
    cover:
      "https://cdn.shopify.com/s/files/1/0288/1404/9355/files/c5e7fe43-e3a7-436b-b1b2-6d59f9a8e45e.png?v=1734601972",
    icon: "🥾",
    gender: "men",
    banner:
      "https://cdn.shopify.com/s/files/1/0288/1404/9355/files/c5e7fe43-e3a7-436b-b1b2-6d59f9a8e45e.png?v=1734601972",
  },
  {
    slug: "loafers",
    name: { en: "Loafers", km: "ស្បែកជើងកវែង" },
    description: {
      en: "Comfortable everyday loafers",
      km: "ស្បែកជើងស្រួលពាក់",
    },
    cover:
      "https://cdn.shopify.com/s/files/1/0288/1404/9355/files/c5e7fe43-e3a7-436b-b1b2-6d59f9a8e45e.png?v=1734601972",
    icon: "🥿",
    gender: "both",
    banner:
      "https://cdn.shopify.com/s/files/1/0288/1404/9355/files/c5e7fe43-e3a7-436b-b1b2-6d59f9a8e45e.png?v=1734601972",
  },
  // ==================== NEW SALE CATEGORY ====================
  {
    slug: "sale",
    name: { en: "Sale", km: "លក់" },
    description: {
      en: "All products on discount",
      km: "ផលិតផលទាំងអស់មានបញ្ចុះតម្លៃ",
    },
    cover:
      "https://cdn.shopify.com/s/files/1/0288/1404/9355/files/c5e7fe43-e3a7-436b-b1b2-6d59f9a8e45e.png?v=1734601972",
    icon: "🔥",
    gender: "both", // Show in both menus
    banner:
      "https://cdn.shopify.com/s/files/1/0288/1404/9355/files/c5e7fe43-e3a7-436b-b1b2-6d59f9a8e45e.png?v=1734601972",
  },
];

/* ============================================================
   PRODUCTS
============================================================ */

export const products: Product[] = [
  {
    id: 1,
    slug: "timberland-6inch-premium",
    name: {
      en: "Timberland 6-Inch Premium Boots",
      km: "Timberland Boots Premium",
    },
    description: {
      en: "Classic waterproof leather boots.",
      km: "Boots ស្បែកពិត ការពារទឹក",
    },
    price: 180,
    discount: 10,
    category: "classic-boots",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L7-PM1-96380016-01-1_1800x1800.webp?v=1734662031",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L7-PM1-96380016-01-2_1800x1800.webp?v=1734661809",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L7-PM1-96380016-01-3_1800x1800.jpg?v=1734661809",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L7-PM1-96380016-01-4_1800x1800.jpg?v=1734661809",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L7-PM1-96380016-01-6_1800x1800.webp?v=1734661809",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-01-10",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_1`,
    brand: "Timberland",
    sizes: ["39", "40", "41", "42", "43", "44"],
    color: "Wheat",
  },
  {
    id: 2,
    slug: "chelsea-black-leather-boots",
    name: { en: "Chelsea Black Leather Boots", km: "Chelsea ស្បែកខ្មៅ" },
    description: { en: "Elegant slip-on boots.", km: "Boots ស្អាតពាក់ងាយ" },
    price: 120,
    discount: 5,
    category: "chelsea-boots",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-96380017-01-1_bb832d48-d11f-48b8-bc2f-cafa83d6270b_1800x1800.jpg?v=1756908981",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-96380017-01-3_ff35feb6-ae75-416b-a73f-23ea41a70681_1800x1800.jpg?v=1756908980",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-96380017-01-4_e8de534b-94af-4b2e-b4f3-3b87c198c6a8_1800x1800.jpg?v=1756908981",
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    createdAt: "2025-01-12",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_2`,
    brand: "Classic",
    sizes: ["39", "40", "41", "42", "43"],
    color: "Black",
  },
  {
    id: 3,
    slug: "burnished-leather-work-boots",
    name: { en: "Burnished Leather Work Boots", km: "Boots ការងារ ស្បែកពិត" },
    description: { en: "Heavy duty durable boots.", km: "Boots ធន់ការងារ" },
    price: 140,
    discount: 0,
    category: "work-boots",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-46380088-01-2_9d1b553f-8d71-453f-b965-95b3b57e63ab_1800x1800.jpg?v=1735742199",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-46380088-01-3_e28333c1-4e0a-459e-ad0d-4ba1726924b0_1800x1800.jpg?v=1735742199",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-46380088-01-4_6dc4915c-261c-455a-94ff-761a943cb237_1800x1800.jpg?v=1735742199",
    ],
    inStock: true,
    isNew: true,
    isPopular: false,
    createdAt: "2025-01-15",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_3`,
    brand: "Worker Pro",
    sizes: ["40", "41", "42", "43", "44"],
    color: "Brown",
  },
  {
    id: 4,
    slug: "oxford-brown",
    name: { en: "Leather Oxford Shoes", km: "Oxford ស្បែកត្នោត" },
    description: {
      en: "Formal classic oxford shoes.",
      km: "ស្បែកជើង formal classic",
    },
    price: 95,
    discount: 0,
    category: "oxford",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L3-PM1-46380091-29-2_e0c8f614-60bc-49be-bac2-1dd4bc381d79_1800x1800.jpg?v=1749086562",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L3-PM1-46380091-29-1_5d5dfd05-5f67-456a-aaa6-4efed133fd0c_1800x1800.jpg?v=1749086562",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-01-18",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_4`,
    brand: "Oxford Classic",
    sizes: ["39", "40", "41", "42", "43"],
    color: "Brown",
  },
  {
    id: 5,
    slug: "oxford-black",
    name: { en: "Oxford Black Formal Shoes", km: "Oxford ខ្មៅ Formal" },
    description: { en: "Perfect for office wear.", km: "សម្រាប់ការិយាល័យ" },
    price: 100,
    discount: 5,
    category: "oxford",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM1-46600216-02-2_0a542ef0-1461-4b30-9518-d1e1096c6eb6_1800x1800.jpg?v=1767191028",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM1-46600216-02-1_a9a3b07f-1108-4775-b51b-9147221046ae_1800x1800.jpg?v=1767191028",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM1-46600216-02-4_90befed9-1b7c-4f4d-8172-d46580265ecc_1800x1800.jpg?v=1767191028",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-01-20",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_5`,
    brand: "Oxford",
    sizes: ["39", "40", "41", "42", "43", "44"],
    color: "Black",
  },
  {
    id: 6,
    slug: "kendall-leather-loafers",
    name: { en: "Kendall Leather Loafers", km: "Loafers ស្បែកត្នោត" },
    description: {
      en: "Comfortable slip-on loafers.",
      km: "ពាក់ងាយ និងផាសុកភាព",
    },
    price: 85,
    discount: 0,
    category: "loafers",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PW1-66210006-41-2_1800x1800.jpg?v=1780462048",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PW1-66210006-41-1_1800x1800.jpg?v=1780462048",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PW1-66210006-41-4_1800x1800.jpg?v=1780462047",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PW1-66210006-41-5_1800x1800.jpg?v=1780462049",
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    createdAt: "2025-01-22",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_6`,
    brand: "Loafer Co",
    sizes: ["39", "40", "41", "42"],
    color: "Brown",
  },
  {
    id: 7,
    slug: "cross-strap-sandals",
    name: { en: "Cross Strap Sandals", km: "ស្បែកជើងខ្សែ Cross" },
    description: {
      en: "Casual cross strap sandals.",
      km: "ស្បែកជើង Sandals ស្រួល",
    },
    price: 110,
    discount: 10,
    category: "sandals",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM1-86380191-2-IB-1_1800x1800.jpg?v=1778050939",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM1-86380191-2-IB-2_1800x1800.jpg?v=1778050939",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM1-86380191-2-IB-4_1800x1800.jpg?v=1778050938",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-01-25",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_7`,
    brand: "Luxury Step",
    sizes: ["39", "40", "41", "42", "43"],
    color: "Black",
  },
  {
    id: 8,
    slug: "wyatt-leather-loafers",
    name: { en: "Wyatt Leather Loafers", km: "Loafers Wyatt ស្បែក" },
    description: {
      en: "Classic loafer shoes.",
      km: "ស្បែកជើង Loafers classic",
    },
    price: 90,
    discount: 0,
    category: "loafers",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM1-56600018-29-2_dda55213-5909-4b39-a012-9c08448a2360_1800x1800.jpg?v=1767840139",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM1-56600018-29-3_e62e030e-2d77-4652-9ca7-fc5255d69d25_1800x1800.jpg?v=1767840139",
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    createdAt: "2025-02-01",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_8`,
    brand: "Derby Style",
    sizes: ["39", "40", "41", "42", "43"],
    color: "Brown",
  },
  {
    id: 9,
    slug: "roam-leather-loafers",
    name: { en: "Roam Leather Loafers", km: "Loafers Roam ស្បែក" },
    description: {
      en: "Comfortable roam leather loafers.",
      km: "Loafers ស្បែក ផាសុក",
    },
    price: 92,
    discount: 5,
    category: "loafers",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-2_81497677-ebd4-47c0-9731-09f54154f361_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-1_b9ee1a17-6a99-4e95-964b-119d95475cf0_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-3_9e0f03e2-77e5-4894-874a-187d48c7390f_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-4_4fe02bc9-4392-4f02-ae95-ce00b5bf7b5e_1800x1800.jpg?v=1763776338",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-02-05",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_9`,
    brand: "Derby Pro",
    sizes: ["39", "40", "41", "42", "43", "44"],
    color: "Black",
  },
  {
    id: 10,
    slug: "geto-classic-leather-boots",
    name: { en: "Geto Classic Leather Boots", km: "Geto Boots ស្បែក Classic" },
    description: {
      en: "Premium Geto classic boots with durable leather.",
      km: "Geto Boots ស្បែកពិត រចនាបែប classic",
    },
    price: 165,
    discount: 12,
    category: "classic-boots",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-2_81497677-ebd4-47c0-9731-09f54154f361_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-1_b9ee1a17-6a99-4e95-964b-119d95475cf0_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-3_9e0f03e2-77e5-4894-874a-187d48c7390f_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-4_4fe02bc9-4392-4f02-ae95-ce00b5bf7b5e_1800x1800.jpg?v=1763776338",
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    createdAt: "2025-06-01",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_10`,
    brand: "Geto",
    sizes: ["39", "40", "41", "42", "43", "44"],
    color: "Tan",
  },
  {
    id: 11,
    slug: "geto-ankle-chukka-boots",
    name: { en: "Geto Chukka Ankle Boots", km: "Geto Chukka Boots" },
    description: {
      en: "Stylish suede chukka boots.",
      km: "Boots Chukka រចនាបែបស្អាត",
    },
    price: 135,
    discount: 8,
    category: "classic-boots",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-2_81497677-ebd4-47c0-9731-09f54154f361_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-1_b9ee1a17-6a99-4e95-964b-119d95475cf0_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-3_9e0f03e2-77e5-4894-874a-187d48c7390f_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-4_4fe02bc9-4392-4f02-ae95-ce00b5bf7b5e_1800x1800.jpg?v=1763776338",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-06-03",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_11`,
    brand: "Geto",
    sizes: ["40", "41", "42", "43"],
    color: "Brown Suede",
  },
  {
    id: 12,
    slug: "geto-desert-boots",
    name: { en: "Geto Desert Boots", km: "Geto Desert Boots" },
    description: {
      en: "Iconic lightweight desert boots.",
      km: "Desert Boots ស្រាល និងប្រើប្រាស់បានយូរ",
    },
    price: 125,
    discount: 5,
    category: "classic-boots",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-2_81497677-ebd4-47c0-9731-09f54154f361_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-1_b9ee1a17-6a99-4e95-964b-119d95475cf0_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-3_9e0f03e2-77e5-4894-874a-187d48c7390f_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-4_4fe02bc9-4392-4f02-ae95-ce00b5bf7b5e_1800x1800.jpg?v=1763776338",
    ],
    inStock: true,
    isNew: true,
    isPopular: false,
    createdAt: "2025-06-05",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_12`,
    brand: "Geto",
    sizes: ["39", "40", "41", "42", "43"],
    color: "Beige",
  },
  {
    id: 13,
    slug: "classic-brogue-brown",
    name: { en: "Classic Brown Brogue Shoes", km: "Brogue ត្នោត Classic" },
    description: {
      en: "Handcrafted wingtip brogues.",
      km: "ស្បែកជើង Brogue ស្បែកពិត",
    },
    price: 115,
    discount: 0,
    category: "brogue",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-2_81497677-ebd4-47c0-9731-09f54154f361_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-1_b9ee1a17-6a99-4e95-964b-119d95475cf0_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-3_9e0f03e2-77e5-4894-874a-187d48c7390f_1800x1800.jpg?v=1763776338",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM1-66210004-01-4_4fe02bc9-4392-4f02-ae95-ce00b5bf7b5e_1800x1800.jpg?v=1763776338",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-06-07",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_13`,
    brand: "Heritage",
    sizes: ["39", "40", "41", "42", "43", "44"],
    color: "Brown",
  },
  {
    id: 14,
    slug: "geto-double-monk-strap",
    name: { en: "Geto Double Monk Strap", km: "Geto Monk Strap ខ្មៅ" },
    description: {
      en: "Elegant double monk strap shoes.",
      km: "ស្បែកជើង Monk Strap ប្រណិត",
    },
    price: 130,
    discount: 10,
    category: "monk-strap",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L3-PM1-56600014-01-2_7d01e2a4-e45b-4ac1-bab4-d710ea5a4e69_1800x1800.jpg",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L3-PM1-56600014-64-2_db418fa4-321d-4c4e-b792-88f9439b8e6a_1800x1800.jpg",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L3-PM1-56600014-64-3_93b8871b-f915-453a-984c-9ed7f471927e_1800x1800.jpg",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L3-PM1-56600014-64-4_631b4630-c9a0-4e7d-a7cd-d3080c2813f5_1800x1800.jpg",
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    createdAt: "2025-06-08",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_14`,
    brand: "Geto",
    sizes: ["39", "40", "41", "42", "43"],
    color: "Black",
  },
  {
    id: 15,
    slug: "geto-jodhpur-boots",
    name: { en: "Geto Jodhpur Boots", km: "Geto Jodhpur Boots" },
    description: {
      en: "Premium leather Jodhpur boots.",
      km: "Jodhpur Boots ស្បែកពិត",
    },
    price: 155,
    discount: 15,
    category: "classic-boots",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-2_fc87e24e-3e80-447e-acb5-e741b9130962_1800x1800.jpg?v=1755094575",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-3_64facb22-4f68-4290-80f2-169810fa9713_1800x1800.jpg?v=1755094575",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-5_ac359f11-b8da-4a10-9e37-69c460f427df_1800x1800.jpg?v=1755094576",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-1_949ee568-1356-406d-b329-871822233214_1800x1800.jpg?v=1755094575",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-06-09",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_15`,
    brand: "Geto",
    sizes: ["40", "41", "42", "43", "44"],
    color: "Chestnut",
  },
  {
    id: 16,
    slug: "suede-penny-loafers",
    name: { en: "Suede Penny Loafers", km: "Penny Loafers Suede" },
    description: {
      en: "Soft suede penny loafers.",
      km: "Loafers Suede ផាសុកភាព",
    },
    price: 98,
    discount: 0,
    category: "loafers",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-2_fc87e24e-3e80-447e-acb5-e741b9130962_1800x1800.jpg?v=1755094575",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-3_64facb22-4f68-4290-80f2-169810fa9713_1800x1800.jpg?v=1755094575",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-5_ac359f11-b8da-4a10-9e37-69c460f427df_1800x1800.jpg?v=1755094576",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-1_949ee568-1356-406d-b329-871822233214_1800x1800.jpg?v=1755094575",
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    createdAt: "2025-06-10",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_16`,
    brand: "Geto",
    sizes: ["39", "40", "41", "42"],
    color: "Navy Suede",
  },
  {
    id: 17,
    slug: "geto-cap-toe-boots",
    name: { en: "Geto Cap Toe Derby Boots", km: "Geto Cap Toe Boots" },
    description: {
      en: "Rugged cap toe derby boots.",
      km: "Boots Cap Toe ធន់ខ្លាំង",
    },
    price: 145,
    discount: 7,
    category: "classic-boots",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-2_fc87e24e-3e80-447e-acb5-e741b9130962_1800x1800.jpg?v=1755094575",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-3_64facb22-4f68-4290-80f2-169810fa9713_1800x1800.jpg?v=1755094575",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-5_ac359f11-b8da-4a10-9e37-69c460f427df_1800x1800.jpg?v=1755094576",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-1_949ee568-1356-406d-b329-871822233214_1800x1800.jpg?v=1755094575",
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    createdAt: "2025-06-11",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_17`,
    brand: "Geto",
    sizes: ["39", "40", "41", "42", "43", "44"],
    color: "Dark Brown",
  },
  {
    id: 18,
    slug: "novo-cyclone-sneakers",
    name: { en: "Novo Cyclone Sneakers", km: "Novo Cyclone Sneakers" },
    description: {
      en: "Lightweight cyclone sneakers.",
      km: "Sneakers ស្រាល Cyclone",
    },
    price: 160,
    discount: 20,
    category: "sneakers",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-76210263-07-2_43f8c4f0-885c-411e-b560-63b674e63b20_1800x1800.jpg?v=1738804651",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-76210263-07-1_7d965029-06ed-4248-9194-c52d30c4a370_1800x1800.jpg?v=1738804651",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-76210263-07-3_3f78f4a8-1f5b-495d-a8fc-e2d6899c7664_1800x1800.jpg?v=1738804651",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-76210263-07-4_1b41385f-c451-4789-a51a-29ebbdb1e021_1800x1800.jpg?v=1738804651",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-06-12",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_18`,
    brand: "Geto",
    sizes: ["39", "40", "41", "42", "43"],
    color: "Black",
  },
  {
    id: 19,
    slug: "lewis-suede-sneakers",
    name: { en: "Lewis Suede Sneakers", km: "Lewis Suede Sneakers" },
    description: { en: "Casual suede sneakers.", km: "Sneakers Suede ស្រួល" },
    price: 138,
    discount: 0,
    category: "sneakers",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-76210261-10-2_bc102800-9a8a-4c06-9aff-eb6f4cdf4c80_1800x1800.jpg?v=1735137092",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-76210261-10-3_3520c88e-0196-498b-8d4e-afcb08aa5e94_1800x1800.jpg?v=1735137092",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-76210261-10-4_bf5fecaf-df95-45d0-8aa4-93a8a3a9fe97_1800x1800.jpg?v=1735137092",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L2-PM1-76210261-10-5_9ed8166e-f9da-4394-8602-8b33e38ec145_1800x1800.jpg?v=1735137092",
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    createdAt: "2025-06-13",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_19`,
    brand: "Sneakers",
    sizes: ["40", "41", "42", "43", "44"],
    color: "Olive",
  },
  {
    id: 20,
    slug: "stream-suede-sneakers",
    name: { en: "Men's Stream Suede Sneakers", km: "Stream Suede Sneakers" },
    description: {
      en: "Sophisticated stream suede sneakers.",
      km: "Sneakers Suede Stream ប្រណិត",
    },
    price: 108,
    discount: 8,
    category: "sneakers",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L7-PM1-76210237-1-05-2_3030536d-e128-4bc0-82e6-ccf18cbf68c3_1800x1800.jpg?v=1733324510",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L7-PM1-76210237-1-05-3_e305aa22-dcf4-4224-879c-2de14c6d29bc_1800x1800.jpg?v=1733324510",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L7-PM1-76210237-1-05-4_7d3a82dc-03ac-4370-861c-b4d0d7b1af01_1800x1800.jpg?v=1733324510",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L7-PM1-76210237-1-05-5_cecf14c4-6194-4400-aa9b-fd0c3aa1f58e_1800x1800.jpg?v=1733324510",
    ],
    inStock: true,
    isNew: true,
    isPopular: true,
    createdAt: "2025-06-14",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_20`,
    brand: "Geto",
    sizes: ["39", "40", "41", "42", "43"],
    color: "Burgundy",
  },
];

/* ============================================================
   MENU BUILDER
   Derives Men / Women menus from categories + products.
   No data duplication — gender lives on Category only.
============================================================ */

function buildMenu(gender: "men" | "women"): Menu {
  const menuCategories = categories.filter(
    (c) => c.gender === gender || c.gender === "both",
  );
  const categorySlugs = new Set(menuCategories.map((c) => c.slug));

  return {
    slug: gender,
    name: {
      en: gender === "men" ? "Men" : "Women",
      km: gender === "men" ? "បុរស" : "ស្ត្រី",
    },
    categories: menuCategories,
    products: products.filter((p) => categorySlugs.has(p.category)),
  };
}

export const menus: Menu[] = [buildMenu("men"), buildMenu("women")];

/* ============================================================
   HELPERS
   Convenience functions for components.
============================================================ */
export function getSaleProducts(): Product[] {
  return products.filter((p) => p.discount > 0);
}




// Update getCategoryBySlug to support sale
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}


