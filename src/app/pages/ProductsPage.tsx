import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { ProductCard } from "../components/ProductCard";
import { useLang } from "../context/LanguageContext";
import { products, categories, menus } from "../data/products";
import { useSearch } from "../context/SearchContext";
import { X } from "lucide-react";
import { FilterButton } from "../components/FilterButtonProps";

type SortKey = "date" | "name" | "price_asc" | "price_desc";

const maxPriceInData = Math.max(...products.map((p) => p.price));

export function ProductsPage() {
  const { lang } = useLang();
  const { committedQuery, clearQuery } = useSearch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const kh = lang === "km";
  const l = lang as "en" | "km";

  const headerFont = kh ? "font-header-kh" : "font-header-en";
  const bodyFont = kh ? "font-body-kh" : "font-body-en";

  // Read URL params — single source of truth
  const genderFromUrl = searchParams.get("gender") as "men" | "women" | null;
  const categoryFromUrl = searchParams.get("category") || "";
  const saleFromUrl = searchParams.get("sale") === "true";

  // Sort — independent, never reset by Clear Filters
  const [sortKey, setSortKey] = useState<SortKey>("date");

  // Filters — price and size stay as local state
  const [maxPrice, setMaxPrice] = useState(maxPriceInData);
  const [selectedSize, setSelectedSize] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const isSalePage = saleFromUrl || categoryFromUrl === "sale";

  // Category click — updates URL, no local state needed
  const handleCategoryClick = (slug: string) => {
    const isSale = slug === "sale";
    const params = new URLSearchParams(searchParams);

    if (isSale) {
      if (params.get("sale") === "true") {
        params.delete("sale");
      } else {
        params.set("sale", "true");
        params.delete("category");
      }
    } else {
      if (params.get("category") === slug) {
        params.delete("category");
      } else {
        params.set("category", slug);
        params.delete("sale");
      }
    }

    navigate(`/products?${params.toString()}`, { replace: true });
  };

  const visibleCategories = useMemo(() => {
    if (!genderFromUrl) return categories;
    const menu = menus.find((m) => m.slug === genderFromUrl);
    return menu ? menu.categories : categories;
  }, [genderFromUrl]);

  const filtered = useMemo(() => {
    let list = [...products];

    // 1. Sale — URL param OR category strip "sale" click
    if (saleFromUrl || categoryFromUrl === "sale") {
      list = list.filter((p) => p.discount && p.discount > 0);
    }

    // 2. Gender
    if (genderFromUrl) {
      const menu = menus.find((m) => m.slug === genderFromUrl);
      if (menu) {
        const slugs = new Set(
          menu.categories.map((c) => c.slug).filter((s) => s !== "sale"),
        );
        list = list.filter((p) => slugs.has(p.category));
      }
    }

    // 3. Category — skip "sale" slug, handled in step 1
    if (categoryFromUrl && categoryFromUrl !== "sale") {
      list = list.filter((p) => p.category === categoryFromUrl);
    }

    // 4. Search query
    const q = committedQuery.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.km.includes(q) ||
          p.description.en?.toLowerCase().includes(q),
      );
    }

    // 5. Max price
    list = list.filter((p) => p.price <= maxPrice);

    // 6. Size
    if (selectedSize) {
      list = list.filter((p) => p.sizes?.includes(selectedSize));
    }

    // 7. Sort
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
    saleFromUrl,
    genderFromUrl,
    categoryFromUrl,
    committedQuery,
    sortKey,
    maxPrice,
    selectedSize,
  ]);

  const currentCategory = categories.find((c) => c.slug === categoryFromUrl);
  const currentMenu = menus.find((m) => m.slug === genderFromUrl);

  // Resets price/size/search filters only — sort and URL params preserved
  const clearAll = () => {
    setMaxPrice(maxPriceInData);
    setSelectedSize("");
    clearQuery();
  };

  const hasActiveFilters =
    !!selectedSize ||
    maxPrice !== maxPriceInData ||
    !!committedQuery.trim();

  // Page title: sale > category > gender > all
  const pageTitle = isSalePage
    ? kh ? "បញ្ចុះតម្លៃ" : "Sale"
    : currentCategory
      ? currentCategory.name[l]
      : currentMenu
        ? currentMenu.name[l]
        : kh ? "ផលិតផលទាំងអស់" : "All Products";

  const bannerSrc =
    "https://pedroshoes.com.kh/cdn/shop/collections/plp-slotbanner-desktop_d01b3633-5724-4fa4-a8c6-f22141def307_2400x.jpg";

  return (
    <>
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
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 -mt-4">

          {/* CATEGORY STRIP — image + cover style, URL-driven */}
          <div className="mb-4 flex flex-wrap justify-center gap-8 md:gap-12">
            {visibleCategories.map((cat) => {
              const isSaleCategory = cat.slug === "sale";
              const isActive = isSaleCategory
                ? isSalePage
                : categoryFromUrl === cat.slug;

              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="group flex flex-col items-center cursor-pointer"
                >
                  <div
                    className={`w-24 md:w-32 transition-all duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    }`}
                  >
                    <img
                      src={cat.cover}
                      alt={cat.name[l]}
                      className="max-w-20 max-h-20 object-contain mx-auto"
                    />
                  </div>

                  {/* TEXT: red if Sale+Active, black otherwise */}
                  <span
                    className={`${bodyFont} mt-2 text-[14px] transition-colors ${
                      isSaleCategory && isActive
                        ? "text-red-600 font-medium"
                        : isActive
                          ? "text-black font-medium"
                          : "text-black/60"
                    }`}
                  >
                    {cat.name[l]}
                  </span>

                  {/* UNDERLINE: red if Sale+Active, black otherwise */}
                  <div
                    className={`mt-1 h-[2px] transition-all duration-300 ${
                      isActive
                        ? isSaleCategory
                          ? "w-14 bg-red-600"
                          : "w-14 bg-black"
                        : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* TOOLBAR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-4">
            <div className="flex flex-wrap items-center gap-14">
              <FilterButton
                onClick={() => setShowFilters(true)}
                hasActiveFilters={hasActiveFilters}
                label={kh ? "តម្រង" : "Filters"}
                className={`${bodyFont} text-[14px] px-3 font-normal rounded border focus:outline-none focus:ring-2 focus:ring-black/50`}

              />

              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className={`${bodyFont} text-[14px] py-1.5 px-2 font-normal rounded border `}
              >
                <option value="date" >{kh ? "តម្រៀប" : "Sort"}</option>
                <option value="date" >{kh ? "ថ្មីបំផុត" : "Newest"}</option>
                <option value="name" >{kh ? "ឈ្មោះ A-Z" : "Name A–Z"}</option>
                <option value="price_asc" >
                  {kh ? "តម្លៃទាប → ខ្ពស់" : "Price Low → High"}
                </option>
                <option value="price_desc">
                  {kh ? "តម្លៃខ្ពស់ → ទាប" : "Price High → Low"}
                </option>
              </select>
            </div>

            <p className={`${bodyFont} text-[14px] text-gray-500`}>
              {filtered.length} {kh ? "ផលិតផល" : "products"}
            </p>
          </div>

          {/* SEARCH INDICATOR */}
          {committedQuery.trim() && (
            <div className="mb-4 p-4 bg-black/5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`${bodyFont} text-sm text-gray-500`}>
                  {kh ? "ស្វែងរក:" : "Search:"}
                </span>
                <span className={`${bodyFont} text-sm text-[#1C1917]`}>
                  "{committedQuery}"
                </span>
                <span
                  className={`${bodyFont} text-sm px-2 py-0.5 ${
                    filtered.length > 0
                      ? "bg-green-100 text-green-700"
                      : "text-black"
                  }`}
                >
                  {filtered.length > 0
                    ? `${filtered.length} ${kh ? "ផលិតផល" : "found"}`
                    : kh ? "រកមិនឃើញ" : "No results"}
                </span>
              </div>
              <button
                onClick={clearQuery}
                className={`${bodyFont} flex items-center gap-1 text-sm text-gray-500 hover:text-black transition shrink-0`}
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
              {isSalePage && (
                <p className={`${bodyFont} text-sm text-gray-400 mt-2`}>
                  {kh
                    ? "មិនមានផលិតផលបញ្ចុះតម្លៃនៅពេលនេះទេ"
                    : "No discounted products at the moment"}
                </p>
              )}
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
              className="bg-white w-full sm:max-w-md p-6 md:p-4 shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <h3 className={`${headerFont} text-lg font-bold text-[#1C1917]`}>
                  {kh ? "តម្រង" : "Filters"}
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* CATEGORY — hidden on sale page */}
              {!isSalePage && (
                <div className="mb-6">
                  <h4 className={`${headerFont} font-semibold text-gray-800 mb-3`}>
                    {kh ? "ប្រភេទ" : "Category"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate("/products", { replace: true })}
                      className={`${bodyFont} px-4 rounded py-2 border text-sm transition-all ${
                        categoryFromUrl === ""
                          ? "bg-black text-white border-black"
                          : "bg-white hover:border-black"
                      }`}
                    >
                      {kh ? "ទាំងអស់" : "All"}
                    </button>
                    {visibleCategories
                      .filter((c) => c.slug !== "sale")
                      .map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => handleCategoryClick(cat.slug)}
                          className={`${bodyFont} px-4 py-2 border rounded text-sm transition-all ${
                            categoryFromUrl === cat.slug
                              ? "bg-black text-white border-black"
                              : "bg-white hover:border-black"
                          }`}
                        >
                          {cat.name[l]}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* PRICE */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`${headerFont} font-semibold text-gray-800`}>
                    {kh ? "តម្លៃអតិបរមា" : "Max Price"}
                  </h4>
                  <span className={`${bodyFont} text-sm font-medium text-black`}>
                    ${maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxPriceInData}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black"
                />
                <div className={`${bodyFont} flex justify-between text-xs text-gray-400 mt-1`}>
                  <span>$0</span>
                  <span>${maxPriceInData}</span>
                </div>
              </div>

              {/* SIZE */}
              <div className="mb-4">
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
                      className={`${bodyFont} px-4 py-2 rounded border text-sm transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white hover:border-black"
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
                  className={`${bodyFont} flex-1 rounded py-2.5 border border-gray-200 text-gray-600 hover:border-gray-300 text-sm font-medium transition`}
                >
                  {kh ? "លុបតម្រង" : "Clear Filters"}
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className={`${bodyFont} flex-1 rounded py-2.5 bg-black text-white text-sm font-medium hover:opacity-90 transition`}
                >
                  {kh ? "អនុវត្ត" : "Apply"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}