import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { ProductCard } from "../components/ProductCard";
import { useLang } from "../context/LanguageContext";
import { products, categories } from "../data/products";
import { useSearch } from "../context/SearchContext";
import { X } from "lucide-react";

type SortKey = "date" | "name" | "price_asc" | "price_desc";

export function ProductsPage() {
  const { lang, t } = useLang();
  const { query } = useSearch();
  const [searchParams] = useSearchParams();

  const kh = lang === "km";

  const categoryFromUrl = searchParams.get("category") || "";

  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedSize, setSelectedSize] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const maxPriceInData = Math.max(...products.map((p) => p.price));

  const filtered = useMemo(() => {
    let list = [...products];

    if (categoryFromUrl) {
      list = list.filter((p) => p.category === categoryFromUrl);
    }

    const q = query.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.km.includes(q) ||
          p.description.en?.toLowerCase().includes(q),
      );
    }

    list = list.filter((p) => p.price <= maxPrice);

    if (selectedSize) {
      list = list.filter((p) => p.sizes?.includes(selectedSize));
    }

    return list.sort((a, b) => {
      switch (sortKey) {
        case "name":      return a.name.en.localeCompare(b.name.en);
        case "price_asc": return a.price - b.price;
        case "price_desc":return b.price - a.price;
        default:          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [categoryFromUrl, query, sortKey, maxPrice, selectedSize]);

  const currentCategory = categories.find((c) => c.slug === categoryFromUrl);

  const clearAll = () => {
    setSortKey("date");
    setMaxPrice(maxPriceInData);
    setSelectedSize("");
  };

  const hasActiveFilters = selectedSize || maxPrice !== maxPriceInData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF6EF] to-white">

      {/* HERO BANNER */}
      <div className="relative h-[300px] md:h-[420px] overflow-hidden">
        <img
          src={currentCategory?.banner || "/banners/default.jpg"}
          alt={currentCategory?.name[lang as "en" | "km"] || "Products"}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">
          <h1 className="text-white text-xl md:text-3xl font-bold tracking-wide">
            {currentCategory
              ? currentCategory.name[lang as "en" | "km"]
              : t("product.allProducts")}
          </h1>
          <p className="text-white/80 text-base md:text-lg mt-3 max-w-xl">
            {currentCategory
              ? "Discover premium shoes crafted for comfort and style."
              : "Explore our newest collections and best-selling footwear."}
          </p>
          <div className="w-20 h-1 bg-[#9B1C1C] rounded-full mt-5" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10">

        {/* BREADCRUMB */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Home / Products
            {currentCategory && ` / ${currentCategory.name[lang as "en" | "km"]}`}
          </p>
        </div>

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C1917]">Collection</h2>
            <p className="text-gray-500 mt-1">{filtered.length} Products Available</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="relative px-5 py-2.5 rounded-xl border bg-white text-gray-700 hover:border-[#9B1C1C] transition-all"
            >
              Filters
              {hasActiveFilters && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#9B1C1C] text-white text-[10px] rounded-full flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1C1C]/20"
            >
              <option value="date">Newest</option>
              <option value="name">Name A-Z</option>
              <option value="price_asc">Price Low → High</option>
              <option value="price_desc">Price High → Low</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try changing your filters or search keywords.</p>
            <button
              onClick={clearAll}
              className="mt-6 px-6 py-3 bg-[#9B1C1C] text-white rounded-xl hover:opacity-90"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* FILTER MODAL */}
      {showFilters && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowFilters(false)}
        >
          <div
            className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 md:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1C1917]">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* PRICE */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">Max Price</h4>
                <span className="text-sm font-medium text-[#9B1C1C]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={0}
                max={maxPriceInData}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#9B1C1C]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$0</span>
                <span>${maxPriceInData}</span>
              </div>
            </div>

            {/* SIZE */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-800 mb-3">Shoe Size</h4>
              <div className="flex flex-wrap gap-2">
                {["38", "39", "40", "41", "42", "43", "44"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-all
                      ${selectedSize === size
                        ? "bg-[#9B1C1C] text-white border-[#9B1C1C]"
                        : "bg-white hover:border-[#9B1C1C]"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button
                onClick={() => { clearAll(); setShowFilters(false); }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-gray-300 text-sm font-medium transition"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#9B1C1C] text-white text-sm font-medium hover:opacity-90 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}