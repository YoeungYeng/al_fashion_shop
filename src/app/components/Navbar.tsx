import { useState, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { Search, X as CloseIcon, Menu } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useSearch } from "../context/SearchContext";
import { categories } from "../data/products";
import logo from "../../assets/al_fashion_logo-LF9KwT_A.jpg";
import "flag-icons/css/flag-icons.min.css";

export function Navbar() {
  const { lang, setLang } = useLang();
  const { query, setQuery, commitQuery, clearQuery } = useSearch();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const kh = lang === "km";

  // Read ?category= from URL
  const activeCategory = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("category") || "";
  }, [location.search]);

  // Read ?sale=true from URL
  const activeSale = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("sale") === "true";
  }, [location.search]);

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category}`);
    setMobileOpen(false);
  };

  const handleSaleClick = () => {
    navigate("/products?sale=true");
    setMobileOpen(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    commitQuery();
    if (location.pathname !== "/products") navigate("/products");
    setSearchOpen(false);
    setMobileOpen(false);
  };

  // ── Font utility classes ──────────────────────────────────────────
  const logoClass = kh
    ? "font-header-kh text-base lg:text-lg font-medium"
    : "font-header-en text-sm lg:text-base font-medium tracking-[0.08em]";

  const navLinkClass = kh
    ? "font-body-kh text-[14px] lg:text-[14px] font-medium"
    : "font-body-en text-[14px] lg:text-[14px] font-medium tracking-[0.1em]";

  const mobileNavClass = kh
    ? "font-header-kh text-base font-semibold"
    : "font-header-en text-sm font-bold tracking-[0.08em] uppercase";

  const searchClass = kh ? "font-body-kh text-sm" : "font-body-en text-sm";

  const langClass = kh
    ? "font-body-kh text-sm"
    : "font-header-en text-[11px] font-bold tracking-[0.1em]";

  return (
    <>
      <header className="fixed top-0 w-full z-[999] bg-white border-b border-black/10  p-2">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14">

            {/* ── LOGO ─────────────────────────────────────────────── */}
            <NavLink to="/" className="flex items-center gap-2 shrink-0">
              <img
                src={logo}
                alt="AL Fashion"
                className="w-12 h-12 object-cover rounded-full"
              />
              <span className={logoClass}>
                {kh ? "អេអិល ហ្វេសសិន" : "AL Fashion"}
              </span>
            </NavLink>

            {/* ── DESKTOP NAV ──────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center ml-10">
              {categories.map((category) => {
                const active = activeCategory === category.slug;
                return (
                  <button
                    key={category.slug}
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`relative px-5 h-14 transition font-medium ${
                      active
                        ? "text-black"
                        : "text-black/70 hover:text-black"
                    }`}
                  >
                    <span className={navLinkClass}>
                      {kh ? category.name.km : category.name.en}
                    </span>
                    {active && (
                      <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-black " />
                    )}
                  </button>
                );
              })}

              {/* SALE */}
              <button
                onClick={handleSaleClick}
                className={`relative px-5 h-14 transition font-medium ${
                  activeSale
                    ? "text-red-600"
                    : "text-red-500/80 hover:text-red-600"
                }`}
              >
                <span className={navLinkClass}>
                  {kh ? "បញ្ចុះតម្លៃ" : "Sale"}
                </span>
                {activeSale && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-red-600 " />
                )}
              </button>
            </nav>

            {/* ── RIGHT SIDE ───────────────────────────────────────── */}
            <div className="flex items-center gap-2 ml-auto">

              {/* DESKTOP INLINE SEARCH */}
              <div className="hidden lg:flex items-center gap-2 border border-black/15 px-3 py-1.5 w-52 xl:w-64 hover:border-black/30 transition">
                <Search
                  className="w-4 h-4 text-gray-400 shrink-0 cursor-pointer"
                  onClick={handleSearch}
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder={kh ? "ស្វែងរកស្បែកជើង..." : "Search shoes..."}
                  className={`${searchClass} flex-1 outline-none bg-transparent min-w-0`}
                />
                {query && (
                  <button onClick={clearQuery}>
                    <CloseIcon className="w-3.5 h-3.5 text-gray-400 hover:text-black transition" />
                  </button>
                )}
              </div>

              {/* MOBILE SEARCH ICON → modal */}
              {/* <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-black/5 transition"
              >
                <Search className="w-5 h-5" />
              </button> */}

              {/* LANGUAGE TOGGLE */}
              <button
                onClick={() => setLang(lang === "en" ? "km" : "en")}
                className="inline-flex items-center gap-1.5 rounded-full bg-black/5 hover:bg-black/10 px-3 py-1.5 transition"
              >
                <span
                  className={lang === "en" ? "fi fi-us" : "fi fi-kh"}
                  style={{ width: 18, height: 13, borderRadius: 2 }}
                />
                <span className={langClass}>{kh ? "ខ្មែរ" : "EN"}</span>
              </button>

              {/* MOBILE HAMBURGER */}
              <button
                className="lg:hidden p-2 rounded hover:bg-black/5"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <CloseIcon className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ──────────────────────────────────────────── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-black/10 bg-white px-4 py-4">

            {/* MOBILE SEARCH */}
            <div className="flex items-center gap-2 border border-black/15 px-3 py-2 mb-4">
              <Search
                className="w-4 h-4 text-gray-500 cursor-pointer shrink-0"
                onClick={handleSearch}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={kh ? "ស្វែងរកស្បែកជើង..." : "Search shoes..."}
                className={`${searchClass} flex-1 outline-none bg-transparent min-w-0`}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {query && (
                <CloseIcon
                  className="w-4 h-4 cursor-pointer text-gray-400 shrink-0"
                  onClick={clearQuery}
                />
              )}
            </div>

            {/* MOBILE CATEGORY ITEMS */}
            <div className="space-y-1">
              {categories.map((category) => {
                const active = activeCategory === category.slug;
                return (
                  <button
                    key={category.slug}
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`w-full text-left px-4 py-3  transition ${
                      active
                        ? "bg-black/5 text-black"
                        : "text-black/70 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    <span className={mobileNavClass}>
                      {kh ? category.name.km : category.name.en}
                    </span>
                  </button>
                );
              })}

              {/* MOBILE SALE */}
              <button
                onClick={handleSaleClick}
                className={`w-full text-left px-4 py-3  transition ${
                  activeSale
                    ? "bg-red-50 text-red-600"
                    : "text-red-500/80 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <span className={mobileNavClass}>
                  {kh ? "បញ្ចុះតម្លៃ" : "SALE"}
                </span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── MOBILE SEARCH MODAL ──────────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex justify-center items-start pt-24 px-4">
          <div className="bg-white w-full max-w-xl shadow-xl p-4">
            <div className="flex items-center gap-3">
              <Search
                className="w-5 h-5 text-gray-500 cursor-pointer shrink-0"
                onClick={handleSearch}
              />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={kh ? "ស្វែងរកស្បែកជើង..." : "Search shoes..."}
                className={`${searchClass} flex-1 outline-none`}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {query && (
                <button onClick={clearQuery}>
                  <CloseIcon className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <button onClick={() => setSearchOpen(false)}>
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}