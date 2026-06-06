import { useState } from "react";
import { Send, ChevronUp, ChevronDown, Minus, Plus } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

const DEMO_PRODUCT = products[0];

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
}

export const categories: Category[] = [
  {
    slug: "sneakers",
    name: { en: "Sneakers", km: "ស្បែកជើង Sneaker" },
    description: {
      en: "Trendy sneakers for everyday lifestyle",
      km: "ស្បែកជើង Sneaker សម្រាប់ប្រើប្រាស់ប្រចាំថ្ងៃ",
    },
    cover:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=500&fit=crop",
    icon: "👟",
  },
  {
    slug: "running",
    name: { en: "Running Shoes", km: "ស្បែកជើងរត់" },
    description: {
      en: "High performance running shoes",
      km: "ស្បែកជើងរត់មានសមត្ថភាពខ្ពស់",
    },
    cover:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&h=500&fit=crop",
    icon: "🏃",
  },
  {
    slug: "casual",
    name: { en: "Casual Shoes", km: "ស្បែកជើងប្រចាំថ្ងៃ" },
    description: {
      en: "Comfortable shoes for daily wear",
      km: "ស្បែកជើងស្រួលសម្រាប់ប្រើប្រាស់ប្រចាំថ្ងៃ",
    },
    cover:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&h=500&fit=crop",
    icon: "👞",
  },
  {
    slug: "sports",
    name: { en: "Sports Shoes", km: "ស្បែកជើងកីឡា" },
    description: {
      en: "Shoes for training and sports",
      km: "ស្បែកជើងសម្រាប់ហាត់ប្រាណ និងកីឡា",
    },
    cover:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=500&fit=crop",
    icon: "⚽",
  },
];

export function ProductDetailPage() {
  const { lang, t } = useLang();
  const kh = lang === "km";

  const product: Product = DEMO_PRODUCT;
  const images = product.images;

  const [mainIndex, setMainIndex] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const VISIBLE_THUMBS = 4;
  const canScrollUp = thumbOffset > 0;
  const canScrollDown = thumbOffset + VISIBLE_THUMBS < images.length;

  const scrollUp = () => setThumbOffset((o) => Math.max(o - 1, 0));
  const scrollDown = () =>
    setThumbOffset((o) => Math.min(o + 1, images.length - VISIBLE_THUMBS));

  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  const handleOrder = () => {
    const allImages = images
      .map((img) => {
        const fileName = img.split("/").pop()?.split("?")[0] || "image";
        return `${fileName}\n${img}`;
      })
      .join("\n\n");

    const message = `
NEW SHOE ORDER
-------------------
Name: ${product.name[lang]}
Price: $${product.price}
Qty: ${qty}
Size: ${selectedSize ?? "Not selected"}
Total: $${(discountedPrice * qty).toFixed(2)}
Category: ${product.category}
Discount: ${product.discount}%
Stock: ${product.inStock ? "In Stock" : "Out of Stock"}

-------------------
Images:
${allImages}
    `;
    window.open(
      `https://t.me/small_team_bot?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  // related products — same category, fallback to popular
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  const displayProducts =
    related.length > 0
      ? related
      : products.filter((p) => p.isPopular && p.id !== product.id);

  return (
    <div
      className={`min-h-screen bg-[#FAF6EF] ${kh ? "font-khmer" : "font-body-en"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Main product card ── */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT: thumbnail strip + main image */}
            <div className="flex gap-3 flex-1">
              {/* Vertical thumbnail strip */}
              <div className="flex flex-col items-center gap-2 w-[72px] shrink-0">
                <button
                  onClick={scrollUp}
                  disabled={!canScrollUp}
                  className={`p-1 rounded-full border transition-all ${
                    canScrollUp
                      ? "border-gray-300 hover:border-primary text-gray-600 hover:text-primary"
                      : "border-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>

                <div className="flex flex-col gap-2 overflow-hidden">
                  {images
                    .slice(thumbOffset, thumbOffset + VISIBLE_THUMBS)
                    .map((img, i) => {
                      const realIndex = thumbOffset + i;
                      return (
                        <button
                          key={realIndex}
                          onClick={() => setMainIndex(realIndex)}
                          className={`w-[68px] h-[68px] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                            mainIndex === realIndex
                              ? "border-primary shadow-md"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`thumb-${realIndex}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                </div>

                <button
                  onClick={scrollDown}
                  disabled={!canScrollDown}
                  className={`p-1 rounded-full border transition-all ${
                    canScrollDown
                      ? "border-gray-300 hover:border-primary text-gray-600 hover:text-primary"
                      : "border-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Main image */}
              <div className="flex-1 rounded-2xl overflow-hidden bg-[#FAF6EF] aspect-square max-h-[480px]">
                <img
                  src={images[mainIndex]}
                  alt={product.name[lang as Lang]}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
            </div>

            {/* RIGHT: product info */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Badges */}
              {/* <div className="flex gap-2 flex-wrap">
                {product.isNew && (
                  <span className="px-2.5 py-0.5 bg-primary text-white text-xs font-semibold rounded-full uppercase">
                    {t("home.new")}
                  </span>
                )}
                {product.isPopular && (
                  <span className="px-2.5 py-0.5 bg-[#C9A84C] text-white text-xs font-semibold rounded-full uppercase">
                    {t("home.popular")}
                  </span>
                )}
                {!product.inStock && (
                  <span className="px-2.5 py-0.5 bg-gray-200 text-gray-500 text-xs font-semibold rounded-full uppercase">
                    {t("product.outOfStock")}
                  </span>
                )}
              </div> */}

              {/* Name */}
              <h1
                className={`text-2xl font-semibold text-[#1C1917] leading-snug ${kh ? "font-khmer font-bold text-xl" : "font-header-en font-semibold text-2xl"}`}
              >
                {product.name[lang as Lang]}
              </h1>

              {/* Description */}
              <p
                className={`text-gray-500 text-sm leading-relaxed ${kh ? "font-khmer font-medium" : ""}`}
              >
                {product.description[lang as Lang]}
              </p>

              <div className="h-px bg-gray-100" />

              {/* Brand */}
              {/* <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{kh ? "ម៉ាក:" : "Brand:"}</span>
                <span className="font-semibold text-[#1C1917]">{product.brand}</span>
                <span className="text-gray-300">|</span>
                <span>{kh ? "ប្រភេទ:" : "Category:"}</span>
                <span className="font-semibold text-[#1C1917] capitalize">{product.category}</span>
              </div> */}

              {/* Price rows */}
              <div className="flex flex-col gap-1">
                {product.discount > 0 && (
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm text-gray-400 w-32 ${kh ? "font-khmer font-semibold" : ""}`}
                    >
                      {kh ? "តម្លៃដើម:" : "Price:"}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      ${product.price.toFixed(2)} /PC
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm text-gray-500 w-32 ${kh ? "font-khmer font-semibold" : ""}`}
                  >
                    {product.discount > 0
                      ? kh
                        ? "តម្លៃបញ្ចុះ:"
                        : "Discount Price:"
                      : kh
                        ? "តម្លៃ:"
                        : "Price:"}
                  </span>
                  <span className="text-2xl font-bold text-[#9B1C1C]">
                    ${discountedPrice.toFixed(2)}
                    <span className="text-sm font-normal text-gray-400 ml-1">
                      /PC
                    </span>
                  </span>
                  {product.discount > 0 && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex items-start gap-3">
                  <span
                    className={`text-sm text-gray-500 w-32 pt-1 ${kh ? "font-khmer font-semibold" : ""}`}
                  >
                    {kh ? "ទំហំ:" : "Sizes:"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${
                          selectedSize === size
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm text-gray-500 w-32 ${kh ? "font-khmer font-semibold" : ""}`}
                >
                  {kh ? "ពណ៌:" : "Color:"}
                </span>
                <span className="text-sm font-medium text-[#1C1917]">
                  {product.color}
                </span>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Quantity */}
              {/* <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-32">
                  {kh ? "បរិមាណ:" : "Quantity:"}
                </span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-[#1C1917] min-w-[40px] text-center border-x border-gray-200">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div> */}

              {/* Total */}
              {/* <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-32">
                  {kh ? "សរុប:" : "Total Price:"}
                </span>
                <span className="text-xl font-bold text-[#9B1C1C]">
                  ${(discountedPrice * qty).toFixed(2)}
                </span>
              </div> */}

              <div className="h-px bg-gray-100" />

              {/* Order button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleOrder}
                  disabled={!product.inStock}
                  className={`flex items-center hover:cursor-pointer justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95
                    ${
                      product.inStock
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-md"
                        : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                    } ${kh ? "font-khmer" : ""}`}
                >
                  <Send className="w-4 h-4" />
                  {t("product.orderTelegram")}
                </button>
              </div>

              {!product.inStock && (
                <p className="text-xs text-red-400 font-medium">
                  {t("product.outOfStock")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── You May Also Like ── */}
        <div className="mt-12">
          <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mb-10" />

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="w-8 h-[3px] bg-[#C9A84C] mb-2 rounded-full" />
              <h2
                className={`text-[#1C1917] ${kh ? "font-khmer text-xl" : "font-display text-2xl font-semibold"}`}
              >
                {kh ? "ផលិតផលស្រដៀងគ្នា" : "You May Also Like"}
              </h2>
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
              {product.category}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
            {displayProducts.slice(0, 10).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
