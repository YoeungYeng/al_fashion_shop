import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { ProductCard } from "../components/ProductCard";
import { useLang } from "../context/LanguageContext";
import { products, categories, menus } from "../data/products";
import { useSearch } from "../context/SearchContext";
import { X } from "lucide-react";

type SortKey = "date" | "name" | "price_asc" | "price_desc";

const maxPriceInData = Math.max(...products.map((p) => p.price));

export function ProductsPage() {
  const { lang } = useLang();
  const { committedQuery, clearQuery } = useSearch();
  const [searchParams] = useSearchParams();

  const kh = lang === "km";
  const l = lang as "en" | "km";

  // Reusable font helpers
  const headerFont = kh ? "font-header-kh" : "font-header-en";
  const bodyFont = kh ? "font-body-kh" : "font-body-en";

  // Read both ?gender= and ?category= from URL
  const genderFromUrl = searchParams.get("gender") as "men" | "women" | null;
  const categoryFromUrl = searchParams.get("category") || "";

  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [maxPrice, setMaxPrice] = useState(maxPriceInData);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [showFilters, setShowFilters] = useState(false);

  // Sync category when URL changes (navbar clicks)
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Which categories to show in the filter panel:
  // If a gender is active from URL, only show that gender's categories
  const visibleCategories = useMemo(() => {
    if (!genderFromUrl) return categories;
    const menu = menus.find((m) => m.slug === genderFromUrl);
    return menu ? menu.categories : categories;
  }, [genderFromUrl]);

  const filtered = useMemo(() => {
    let list = [...products];

    // 1. Filter by gender
    if (genderFromUrl) {
      const menu = menus.find((m) => m.slug === genderFromUrl);
      if (menu) {
        const slugs = new Set(menu.categories.map((c) => c.slug));
        list = list.filter((p) => slugs.has(p.category));
      }
    }

    // 2. Filter by specific category slug
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 3. Search query
    const q = committedQuery.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.km.includes(q) ||
          p.description.en?.toLowerCase().includes(q),
      );
    }

    // 4. Max price
    list = list.filter((p) => p.price <= maxPrice);

    // 5. Size
    if (selectedSize) {
      list = list.filter((p) => p.sizes?.includes(selectedSize));
    }

    // 6. Sort
    return list.sort((a, b) => {
      switch (sortKey) {
        case "name":
          return a.name.en.localeCompare(b.name.en);
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });
  }, [
    genderFromUrl,
    selectedCategory,
    committedQuery,
    sortKey,
    maxPrice,
    selectedSize,
  ]);

  const currentCategory = categories.find((c) => c.slug === selectedCategory);
  const currentMenu = menus.find((m) => m.slug === genderFromUrl);

  const clearAll = () => {
    setSortKey("date");
    setMaxPrice(maxPriceInData);
    setSelectedSize("");
    setSelectedCategory(categoryFromUrl);
    clearQuery();
  };

  const hasActiveFilters =
    !!selectedSize ||
    maxPrice !== maxPriceInData ||
    !!(selectedCategory && selectedCategory !== categoryFromUrl) ||
    !!committedQuery.trim();

  // Page title: category > gender > all
  const pageTitle = currentCategory
    ? currentCategory.name[l]
    : currentMenu
      ? currentMenu.name[l]
      : kh
        ? "ផលិតផលទាំងអស់"
        : "All Products";

  const bannerSrc =
    "https://pedroshoes.com.kh/cdn/shop/collections/plp-slotbanner-desktop_d01b3633-5724-4fa4-a8c6-f22141def307_2400x.jpg";

  return (
    <div className="min-h-screen">
      {/* HERO BANNER */}
      <div className="relative h-[200px] md:h-[320px] overflow-hidden">
        <img
          src={bannerSrc}
          alt={pageTitle}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-16">
          <h1
            className={`${headerFont} text-black text-xl md:text-3xl font-bold tracking-wide`}
          >
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 bg-transparent">
        {/* CATEGORY FILTER STRIP */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 ">
            {visibleCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.slug ? "" : cat.slug,
                  )
                }
                className="group flex flex-col items-center hover:cursor-pointer"
              >
                <div
                  className={`
                    w-24 h-24 md:w-32 md:h-32
                    flex items-center justify-center
                    transition-all duration-300
                    ${
                      selectedCategory === cat.slug
                        ? "scale-110"
                        : "group-hover:scale-105"
                    }
                  `}
                >
                  <img
                    src={cat.cover}
                    alt={cat.name[l]}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <span
                  className={`
                    ${bodyFont} mt-3 text-sm md:text-lg font-medium
                    ${selectedCategory === cat.slug ? "text-[#000000]" : "text-black"}
                  `}
                >
                  {cat.name[l]}
                </span>

                <div
                  className={`
                    mt-1 h-[2px] transition-all duration-300 
                    ${selectedCategory === cat.slug ? "w-14 bg-[#000000]" : "w-0"}
                  `}
                />
              </button>
            ))}
          </div>
        </div>

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className={`${bodyFont} relative px-5 py-2.5  border text-gray-700 transition-all`}
            >
              {kh ? "តម្រង" : "Filters"}
              {hasActiveFilters && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-white text-[10px]  bg-[#f70505] flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className={`${bodyFont} px-4 py-2.5 border text-sm focus:outline-none focus:ring-2 focus:ring-[#000000]/20`}
            >
              <option value="date">{kh ? "ថ្មីបំផុត" : "Newest"}</option>
              <option value="name">{kh ? "ឈ្មោះ A-Z" : "Name A-Z"}</option>
              <option value="price_asc">
                {kh ? "តម្លៃទាប → ខ្ពស់" : "Price Low → High"}
              </option>
              <option value="price_desc">
                {kh ? "តម្លៃខ្ពស់ → ទាប" : "Price High → Low"}
              </option>
            </select>

            {/* {hasActiveFilters && (
              <button
                onClick={clearAll}
                className={`${bodyFont} text-black hover:text-black/60 text-sm font-medium`}
              >
                {kh ? "លុបតម្រង" : "Clear Filters"}
              </button>
            )} */}
          </div>
          <div>
            <p className={`${bodyFont} font-bold mt-1 font-xl `}>
              {filtered.length} {kh ? "ផលិតផល" : "All Products"}
            </p>
          </div>
        </div>

        {/* ACTIVE FILTER CHIPS */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory && selectedCategory !== categoryFromUrl && (
              <span
                className={`${bodyFont} flex items-center gap-1.5 px-3 py-1 bg-[#9B1C1C]/10 text-black text-sm`}
              >
                {categories.find((c) => c.slug === selectedCategory)?.name[l]}
                <button onClick={() => setSelectedCategory(categoryFromUrl)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
          </div>
        )}

        {/* SEARCH RESULTS INDICATOR */}
        {committedQuery.trim() && (
          <div className="mb-6 p-4  bg-black/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`${bodyFont} text-sm text-gray-500`}>
                {kh ? "ស្វែងរក:" : "Search:"}
              </span>
              <span
                className={`${bodyFont} text-sm font-semibold text-[#1C1917]`}
              >
                "{committedQuery}"
              </span>
              <span
                className={`${bodyFont} text-sm font-medium px-2 py-0.5  ${
                  filtered.length > 0
                    ? "bg-green-100 text-green-700"
                    : " text-black"
                }`}
              >
                {filtered.length > 0
                  ? `${filtered.length} ${kh ? "ផលិតផល" : "found"}`
                  : kh
                    ? "រកមិនឃើញ"
                    : "No results"}
              </span>
            </div>
            <button
              onClick={clearQuery}
              className={`${bodyFont} flex items-center gap-1 text-sm text-gray-500 hover:black transition shrink-0`}
            >
              <X className="w-3.5 h-3.5" />
              {kh ? "លុប" : "Clear"}
            </button>
          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <h3
              className={`${headerFont} text-2xl font-semibold text-gray-700 mb-2`}
            >
              {kh ? "រកមិនឃើញផលិតផល" : "No products found"}
            </h3>
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
            className="bg-white w-full sm:max-w-md  p-6 md:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h3 className={`${headerFont} text-lg font-bold text-[#1C1917]`}>
                {kh ? "តម្រង" : "Filters"}
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 flex items-center justify-center  hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* CATEGORY */}
            <div className="mb-6">
              <h4 className={`${headerFont} font-semibold text-gray-800 mb-3`}>
                {kh ? "ប្រភេទ" : "Category"}
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`${bodyFont} px-4 py-2  border text-sm transition-all
                    ${
                      selectedCategory === ""
                        ? "bg-[#000000] text-white border-[#000000]"
                        : "bg-white hover:border-[#000000]"
                    }`}
                >
                  {kh ? "ទាំងអស់" : "All"}
                </button>
                {visibleCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`${bodyFont} px-4 py-2  border text-sm transition-all
                      ${
                        selectedCategory === cat.slug
                          ? "bg-[#000000] text-white border-[#000000]"
                          : "bg-white hover:border-[#000000]"
                      }`}
                  >
                    {cat.name[l]}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className={`${headerFont} font-semibold text-gray-800`}>
                  {kh ? "តម្លៃអតិបរមា" : "Max Price"}
                </h4>
                <span
                  className={`${bodyFont} text-sm font-medium text-[#000000]`}
                >
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={maxPriceInData}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#000000]"
              />
              <div
                className={`${bodyFont} flex justify-between text-xs text-gray-400 mt-1`}
              >
                <span>$0</span>
                <span>${maxPriceInData}</span>
              </div>
            </div>

            {/* SIZE */}
            <div className="mb-8">
              <h4 className={`${headerFont} font-semibold text-gray-800 mb-3`}>
                {kh ? "ទំហំស្បែកជើង" : "Shoe Size"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {["38", "39", "40", "41", "42", "43", "44"].map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSize(selectedSize === size ? "" : size)
                    }
                    className={`${bodyFont} px-4 py-2 border text-sm transition-all
                      ${
                        selectedSize === size
                          ? "bg-black text-white border-[#4e4e4e]"
                          : "bg-white hover:border-[#4e4e4e]"
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
                onClick={() => {
                  clearAll();
                  setShowFilters(false);
                }}
                className={`${bodyFont} flex-1 py-2.5  border border-gray-200 text-gray-600 hover:border-gray-300 text-sm font-medium transition`}
              >
                {kh ? "លុបទាំងអស់" : "Clear All"}
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className={`${bodyFont} flex-1 py-2.5  bg-black text-white text-sm font-medium hover:opacity-90 transition`}
              >
                {kh ? "អនុវត្ត" : "Apply Filters"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
