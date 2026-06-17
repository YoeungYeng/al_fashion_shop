export type Gender = "men" | "women" | "both";

export interface Product {
  id: number;
  slug: string;

  name: { en: string; km: string };
  description: { en: string; km: string };

  price: number;
  discount: number;

  category: string;
  subcategory?: string;

  // fallback images (default)
  images: string[];

  // 🔥 NEW: color → images mapping (for variant switching)
  imagesByColor?: {
    [color: string]: string[];
  };

  inStock: boolean;
  isNew: boolean;
  isPopular: boolean;

  createdAt: string;

  telegramLink: string;

  brand?: string;

  sizes?: string[];

  // colors (hex or names)
  color?: string[];

  // 🔥 OPTIONAL (future upgrade)
  stockByColor?: {
    [color: string]: number;
  };

  priceByColor?: {
    [color: string]: number;
  };
}

export interface SubCategory {
  slug: string;
  name: { en: string; km: string };
  cover?: string; // optional, falls back to parent category's cover if omitted
}

export interface Category {
  slug: string;
  name: { en: string; km: string };
  description: { en: string; km: string };
  cover: string;
  icon: string;
  gender: Gender; // which menu(s) this category appears under
  banner: string;
  subcategories?: SubCategory[];
}

export interface Menu {
  slug: "men" | "women";
  name: { en: string; km: string };
  categories: Category[];
  products: Product[];
}

export const TELEGRAM_BASE = "https://t.me/yoeungyeng";

export const categories: Category[] = [
  {
    slug: "all",
    name: {
      en: "All",
      km: "ទាំងអស់",
    },
    description: {
      en: "All products",
      km: "ផលិតផលទាំងអស់",
    },
    cover: "https://i.ibb.co/cc7Q4wJY/all-removebg-preview-1.png",
    icon: "🛍️",
    gender: "both",
    banner: "https://i.ibb.co/cc7Q4wJY/all-removebg-preview-1.png",
  },

  {
    slug: "discount",
    name: {
      en: "Discount",
      km: "បញ្ចុះតម្លៃ",
    },
    description: {
      en: "Discount products",
      km: "ផលិតផលបញ្ចុះតម្លៃ",
    },
    cover: "https://i.ibb.co/Nd6dH0Qn/discount-removebg-preview.png",
    icon: "🔥",
    gender: "both",
    banner: "https://i.ibb.co/Nd6dH0Qn/discount-removebg-preview.png",
  },

  {
    slug: "shoes",
    name: {
      en: "Shoes",
      km: "ស្បែកជើង",
    },
    description: {
      en: "All shoes collection",
      km: "ប្រភេទស្បែកជើងទាំងអស់",
    },
    cover: "https://i.ibb.co/39CcpWXx/boots.png",
    icon: "👟",
    gender: "both",
    banner: "https://i.ibb.co/39CcpWXx/boots.png",
    subcategories: [
      {
        slug: "sneakers",
        name: {
          en: "Sneakers",
          km: "ស្បែកជើងប៉ាតា",
        },
        cover: "src/assets/sneaker (1).png",
      },
      {
        slug: "sports-shoes",
        name: {
          en: "Sports Shoes",
          km: "ស្បែកជើងកីឡា",
        },
        cover: "src/assets/sport (1).png",
      },
      {
        slug: "sandals",
        name: {
          en: "Sandals",
          km: "ស្បែកជើងស៊ក",
        },
        cover: "src/assets/sandal (1).png",
      },
      {
        slug: "flip-flops",
        name: {
          en: "Flip-Flops",
          km: "ស្បែកជើងផ្ទាត់",
        },
        cover: "src/assets/flip-flops (1).png",
      },
    ],
  },

  {
    slug: "belts",
    name: {
      en: "Belts",
      km: "ខ្សែក្រវ៉ាត់",
    },
    description: {
      en: "Belts collection",
      km: "ប្រភេទខ្សែក្រវ៉ាត់",
    },
    cover: "https://i.ibb.co/7xf81w9m/belt-removebg-preview.png",
    icon: "🧷",
    gender: "both",
    banner: "https://i.ibb.co/7xf81w9m/belt-removebg-preview.png",
  },

  {
    slug: "bags",
    name: {
      en: "Bags",
      km: "កាបូប",
    },
    description: {
      en: "Bags collection",
      km: "ប្រភេទកាបូប",
    },
    cover: "https://i.ibb.co/2YLFbD1b/badges-removebg-preview.png",
    icon: "👜",
    gender: "both",
    banner: "https://i.ibb.co/2YLFbD1b/badges-removebg-preview.png",
  },

  {
    slug: "clothing",
    name: {
      en: "Clothing",
      km: "សម្លៀកបំពាក់",
    },
    description: {
      en: "Fashion and clothing",
      km: "សម្លៀកបំពាក់",
    },
    cover: "https://i.ibb.co/8QPjgr8/t-shirt.png",
    icon: "👕",
    gender: "both",
    banner: "https://i.ibb.co/8QPjgr8/t-shirt.png",
  },

  {
    slug: "cosmetics",
    name: {
      en: "Cosmetics",
      km: "គ្រឿងសំអាង",
    },
    description: {
      en: "Beauty and cosmetics",
      km: "គ្រឿងសំអាង",
    },
    cover: "https://i.ibb.co/0VZ9rfVc/cosmetics.png",
    icon: "💄",
    gender: "both",
    banner: "https://i.ibb.co/0VZ9rfVc/cosmetics.png",
  },

  // {
  //   slug: "daily-necessities",
  //   name: {
  //     en: "Daily Necessities",
  //     km: "សម្ភារៈប្រើប្រាស់ប្រចាំថ្ងៃ",
  //   },
  //   description: {
  //     en: "Daily necessities products",
  //     km: "សម្ភារៈប្រើប្រាស់ប្រចាំថ្ងៃ",
  //   },
  //   cover: "src/assets/accessories.png",
  //   icon: "🧴",
  //   gender: "both",
  //   banner: "/images/banners/daily.jpg",
  // },
];

/* ============================================================
   PRODUCTS
============================================================ */

export const products: Product[] = [
  {
    id: 1,
    slug: "strata-sneakers",
    name: {
      en: "Strata Sneakers",
      km: "Strata Sneakers",
    },
    description: {
      en: "Classic waterproof leather boots.",
      km: "Boots ស្បែកពិត ការពារទឹក",
    },
    price: 180,
    discount: 10,
    category: "shoes",
    subcategory: "sneakers",

    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L6-PM1-76210252-06-2_1800x1800.jpg",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L6-PM1-76210252-06-2_1800x1800.jpg"
    ],

    // 🔥 NEW: color → images mapping
    imagesByColor: {
      "#F5DEB3": [
        "https://pedroshoes.com.kh/cdn/shop/files/2024-L6-PM1-76210252-06-2_1800x1800.jpg",
        "https://pedroshoes.com.kh/cdn/shop/files/2024-L6-PM1-76210252-06-3_1800x1800.jpg",
      ],
      "#000000": [
        "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM1-46600223-52-2_1800x1800.jpg?v=1781068000",
        "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM1-46600223-52-3_1800x1800.jpg?v=1781068001",
      ],
    },

    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-01-10",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_1`,
    brand: "Timberland",
    sizes: ["39", "40", "41", "42", "43", "44"],
    color: ["#F5DEB3", "#000000"],
  },

  {
    id: 2,
    slug: "cyclone-sneakers",
    name: { en: "Cyclone Sneakers Sneakers", km: "ស្បែកជើង Cyclone Sneakers" },
    description: {
      en: "Lightweight everyday sneakers with breathable mesh upper.",
      km: "ស្បែកជើងស្រាល ប្រើប្រាស់ប្រចាំថ្ងៃ មានភ្លុកខ្យល់",
    },
    price: 65,
    discount: 0,
    category: "shoes",
    subcategory: "sneakers",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-2_fc87e24e-3e80-447e-acb5-e741b9130962_1800x1800.jpg?v=1755094575",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-1_949ee568-1356-406d-b329-871822233214_1800x1800.jpg?v=1755094575",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-3_64facb22-4f68-4290-80f2-169810fa9713_1800x1800.jpg?v=1755094575",
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L6-PM1-76210272-03-5_ac359f11-b8da-4a10-9e37-69c460f427df_1800x1800.jpg?v=1755094576",
    ],
    inStock: true,
    isNew: true,
    isPopular: false,
    createdAt: "2026-02-01",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_2`,
    sizes: ["38", "39", "40", "41", "42"],
    color: ["#FFFFFF"], // White
  },

  {
    id: 3,
    slug: "apex-sport-trainers",
    name: { en: "Apex Sport Trainers", km: "ស្បែកជើងកីឡា Apex" },
    description: {
      en: "Cushioned trainers built for daily workouts and running.",
      km: "ស្បែកជើងកីឡា សម្រាប់ហាត់ប្រាណ និងរត់ប្រចាំថ្ងៃ",
    },
    price: 75,
    discount: 15,
    category: "shoes",
    subcategory: "sports-shoes",
    images: [
      "https://zandokh.com/image/catalog/products/2026-05/5162511001/AV8A9644a.jpg",
      "https://zandokh.com/image/catalog/products/2026-05/5162511001/AV8A9648a.jpg",
      "https://zandokh.com/image/catalog/products/2026-05/5162511001/AV8A9647.jpg",
      "https://zandokh.com/image/catalog/products/2026-05/5162511001/AV8A9646.jpg",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2026-01-15",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_3`,
    sizes: ["39", "40", "41", "42", "43"],
    color: ["#000000"], // Black
  },

  {
    id: 4,
    slug: "coastal-sandals",
    name: { en: "Coastal Sandals", km: "ស្បែកជើងសង្រ្គោះ Coastal" },
    description: {
      en: "Durable strap sandals for warm-weather wear.",
      km: "ស្បែកជើងសង្រ្គោះ រឹងមាំ សម្រាប់ពាក់ពេលក្ដៅ",
    },
    price: 28,
    discount: 0,
    category: "shoes",
    subcategory: "sandals",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L6-PM1-85110456-01-2_c2d97e82-7214-453b-8757-dcc4618915fd_1800x1800.jpg?v=1721226539",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L6-PM1-85110456-01-1_51cbc983-a75f-4060-9b13-394e5ecd4311_1800x1800.jpg?v=1721226539",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L6-PM1-85110456-01-3_14a4c662-8a10-40c4-96db-e72079b1f346_1800x1800.jpg?v=1721226539",
      "https://pedroshoes.com.kh/cdn/shop/files/2024-L6-PM1-85110456-01-4_8db02c37-d169-419f-bf30-be3b27858117_1800x1800.jpg?v=1721226539",
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    createdAt: "2025-11-20",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_4`,
    sizes: ["38", "39", "40", "41", "42", "43"],
    color: ["#8B4513"], // Brown
  },

  {
    id: 5,
    slug: "breeze-flip-flops",
    name: { en: "Breeze Flip-Flops", km: "ស្បែកជើងផ្ទាត់ Breeze" },
    description: {
      en: "Soft sole flip-flops, easy to slip on and go.",
      km: "ស្បែកជើងផ្ទាត់ ខ្នើយទន់ ស្រួលពាក់",
    },
    price: 12,
    discount: 5,
    category: "shoes",
    subcategory: "flip-flops",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM1-86380211-01-1_1800x1800.jpg?v=1779762157",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM1-86380211-01-2_1800x1800.jpg?v=1779762154",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM1-86380211-01-3_1800x1800.jpg?v=1779762154",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM1-86380211-01-4_1800x1800.jpg?v=1779762153",
    ],
    inStock: true,
    isNew: true,
    isPopular: false,
    createdAt: "2026-03-05",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_5`,
    sizes: ["38", "39", "40", "41", "42", "43"],
    color: ["#000080"], // Navy
  },

  {
    id: 6,
    slug: "oxford-classic-shoes",
    name: { en: "Jonah Backstrap Sandals", km: "ស្បែកជើងស៊ក Jonah Backstrap" },
    description: {
      en: "Polished leather oxfords for formal occasions.",
      km: "ស្បែកជើងស្បែកពិត សម្រាប់ឱកាសផ្លូវការ",
    },
    price: 95,
    discount: 0,
    category: "shoes",
    subcategory: "shoes",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM1-85110485-01-2_6e3ace73-6ab6-4c47-9efc-28bd86a9e34a_1800x1800.jpg?v=1770214247",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM1-85110485-01-1_e07fcbb8-23c8-4f17-995a-5896a3c4e3bf_1800x1800.jpg?v=1770214247",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-09-12",
    telegramLink: `${TELEGRAM_BASE}?start=shoe_6`,
    sizes: ["39", "40", "41", "42", "43", "44"],
    color: ["#000000"], // Black
  },

  {
    id: 7,
    slug: "heritage-leather-belt",
    name: {
      en: "Grid Leather Reversible Tang Belt",
      km: "ខ្សែក្រវ៉ាត់ស្បែក Grid Leather Reversible Tang",
    },
    description: {
      en: "Full-grain leather belt with brushed metal buckle.",
      km: "ខ្សែក្រវ៉ាត់ស្បែកពិត ក្បាលដែកប្រណិត",
    },
    price: 35,
    discount: 20,
    category: "belts",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L7-PM3-15940314-01-1_3ae93d54-f1c4-40b3-928d-69d37f2ca66f_1800x1800.jpg?v=1764215742",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-10-02",
    telegramLink: `${TELEGRAM_BASE}?start=belt_1`,
    sizes: ["S", "M", "L", "XL"],
    color: ["#8B4513"],
  },

  {
    id: 8,
    slug: "urban-canvas-belt",
    name: {
      en: "Leather Automatic Belt",
      km: "ខ្សែក្រវ៉ាត់ Leather Automatic",
    },
    description: {
      en: "Casual canvas belt with adjustable fit.",
      km: "ខ្សែក្រវ៉ាត់ Canvas សម្រាប់ពាក់ប្រចាំថ្ងៃ",
    },
    price: 15,
    discount: 0,
    category: "belts",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM3-15940331-Z4-2_1800x1800.jpg?v=1779857917",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM3-15940331-Z4-3_1800x1800.jpg?v=1779857918",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L3-PM3-15940331-Z4-4_1800x1800.jpg?v=1779857918",
    ],
    inStock: true,
    isNew: true,
    isPopular: false,
    createdAt: "2026-02-18",
    telegramLink: `${TELEGRAM_BASE}?start=belt_2`,
    sizes: ["105", "115", "125"],
    color: ["#000000"], // Olive
  },

  {
    id: 9,
    slug: "voyager-backpack",
    name: { en: "Travis Crossbody", km: "កាបូបស្ពាយ Travis Crossbody" },
    description: {
      en: "Spacious daily backpack with padded laptop sleeve.",
      km: "កាបូបស្ពាយធំ មានស្រោមកុំព្យូទ័រ",
    },
    price: 42,
    discount: 10,
    category: "bags",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM2-25210269-01-1_86e6074a-3e8a-469c-9b96-ad4eb9473ac8_1800x1800.jpg?v=1767191045",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM2-25210269-01-3_b93db752-927f-4906-b64c-08ecdf798f3f_1800x1800.jpg?v=1767191045",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM2-25210269-01-5_10194595-3b71-4300-93a3-e07e3bbd7de6_1800x1800.jpg?v=1767191044",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-12-08",
    telegramLink: `${TELEGRAM_BASE}?start=bag_1`,
    sizes: ["Small"],
    color: ["#36454F"], // Charcoal
  },

  {
    id: 10,
    slug: "mini-crossbody-bag",
    name: { en: "Noah Crossbody Bag", km: "កាបូប Noah Crossbody" },
    description: {
      en: "Compact crossbody bag for essentials on the go.",
      km: "កាបូបតូច ស្ពាយឆ្លង សម្រាប់របស់ចាំបាច់",
    },
    price: 22,
    discount: 0,
    category: "bags",
    images: [
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM2-26320271-01-2_67f9824f-7f0f-48d2-a1ea-d060ce54158c_1800x1800.jpg?v=1768402936",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM2-26320271-01-6_88ba6f07-913b-488e-93f9-d968c8b78408_1800x1800.jpg?v=1768402936",
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PM2-26320271-01-4_83a44102-033f-4228-984e-561bcd809e2f_1800x1800.jpg?v=1768402936",
    ],
    inStock: true,
    isNew: true,
    isPopular: false,
    createdAt: "2026-04-01",
    telegramLink: `${TELEGRAM_BASE}?start=bag_2`,
    color: ["#000000"], // Red
    sizes: ["Small"],
  },

  {
    id: 11,
    slug: "essential-cotton-tee",
    name: { en: "Essential Cotton Tee", km: "អាវយឺត Cotton" },
    description: {
      en: "Soft 100% cotton tee for everyday wear.",
      km: "អាវយឺត Cotton ១០០% ស្រួលពាក់ប្រចាំថ្ងៃ",
    },
    price: 9,
    discount: 0,
    category: "clothing",
    images: [
      "https://zandokh.com/image/catalog/products/2026-06/4122601570/10S26KNI007_Beige-(4).jpg",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-08-22",
    telegramLink: `${TELEGRAM_BASE}?start=cloth_1`,
    sizes: ["S", "M", "L", "XL"],
    color: ["#FCFCAE"], // Gray
  },

  {
    id: 12,
    slug: "denim-jacket",
    name: { en: "Regular Fitted Polo Shirt", km: "Regular Fitted Polo Shirt" },
    description: {
      en: "Classic washed denim jacket with button front.",
      km: "អាវខូបវ Jean ផ្តិលលាប សាបទងមុខ",
    },
    price: 38,
    discount: 25,
    category: "clothing",
    images: [
      "https://zandokh.com/image/catalog/products/2026-06/4122603539/10S26POL029_Dark-Sapphire-(1).jpg",
      "https://zandokh.com/image/catalog/products/2026-06/4122603539/10S26POL029_Dark-Sapphire-(2).jpg",
      "https://zandokh.com/image/catalog/products/2026-06/4122603539/10S26POL029_Dark-Sapphire-(6).jpg",
    ],
    inStock: true,
    isNew: false,
    isPopular: true,
    createdAt: "2025-11-30",
    telegramLink: `${TELEGRAM_BASE}?start=cloth_2`,
    sizes: ["S", "M", "L", "XL"],
    color: ["#000000"], // Light Blue
  },

  {
    id: 13,
    slug: "matte-lip-tint",
    name: { en: "Perfume", km: "ទឹកអប់" },
    description: {
      en: "Long-lasting matte lip tint, lightweight on lips.",
      km: "ស្តិកមាត់ Matte ស្រួលប្រើ ស្រួលជាប់",
    },
    price: 6,
    discount: 0,
    category: "cosmetics",
    images: [
      "https://zandokh.com/image/catalog/products/2026-17/7512510038/image_2026-05-14_15-31-54.jpg",
      "https://zandokh.com/image/catalog/products/2026-17/7512510038/image_2026-05-14_15-31-54.jpg",
    ],
    inStock: true,
    isNew: true,
    isPopular: false,
    createdAt: "2026-03-20",
    telegramLink: `${TELEGRAM_BASE}?start=cos_1`,
    color: ["#FF4040"], // Coral Red
  },

  {
    id: 14,
    slug: "travel-toiletry-kit",
    name: { en: "Body Scrubber", km: "ឧបករណ៍ដុសខ្លួន" },
    description: {
      en: "Compact toiletry kit with travel-sized essentials.",
      km: "សំភារៈចំបាច់ទំហំតូចសម្រាប់ដំណើរកម្សាន្ត",
    },
    price: 14,
    discount: 10,
    category: "daily-necessities",
    images: [
      "https://zandokh.com/image/catalog/products/11512603049/image_2026-05-23_12-40-02.jpg",
      "https://zandokh.com/image/catalog/products/11512603049/image_2026-05-23_12-40-08.jpg",
    ],
    inStock: true,
    isNew: false,
    isPopular: false,
    createdAt: "2025-10-15",
    telegramLink: `${TELEGRAM_BASE}?start=daily_1`,
    color: ["#000000"],
  },
];

/* ============================================================
   MENU BUILDER
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
============================================================ */

/**
 * Extracts products for a clicked category (and optional subcategory).
 *
 * - "all"      -> every product, no filtering at all
 * - "discount" -> every product with discount > 0, regardless of category
 * - anything else -> products whose `category` matches, optionally
 *   narrowed further by `subcategorySlug` (e.g. "shoes" + "sneakers")
 */
export function getProductsByCategory(
  categorySlug: string,
  subcategorySlug?: string,
): Product[] {
  if (categorySlug === "all") {
    return products;
  }

  if (categorySlug === "discount") {
    return products.filter((p) => p.discount > 0);
  }

  return products.filter((p) => {
    const matchesCategory = p.category === categorySlug;
    const matchesSubcategory = subcategorySlug
      ? p.subcategory === subcategorySlug
      : true;
    return matchesCategory && matchesSubcategory;
  });
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => p.discount > 0);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
