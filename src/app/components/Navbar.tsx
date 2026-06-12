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

  const kh = lang === "km";

  const activeCategory = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("category") || "";
  }, [location.search]);

  const activeSale = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("sale") === "true";
  }, [location.search]);

  const handleCategoryClick = (category: string) => {
    if (category === "sale") {
      navigate("/products?sale=true");
    } else {
      navigate(`/products?category=${category}`);
    }
    setMobileOpen(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    commitQuery();
    if (location.pathname !== "/products") navigate("/products");
    setMobileOpen(false);
  };

  // ✅ UNIFIED FONT STYLE (FIXED)
  const navTextClass = kh
    ? "font-body-kh text-[14px] font-medium"
    : "font-body-en text-[14px] font-medium tracking-[0.1em]";

  const logoClass = kh
    ? "font-body-kh text-base lg:text-lg font-medium"
    : "font-header-en text-sm lg:text-base font-medium tracking-[0.08em]";

  const searchClass = kh ? "font-body-kh text-sm" : "font-body-en text-sm";

  const langClass = kh
    ? "font-body-kh text-sm"
    : "font-header-en text-[11px] font-bold tracking-[0.1em]";

  return (
    <header className="fixed top-0 w-full z-[999] bg-white border-b border-black/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center h-14">

          {/* LOGO */}
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

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center ml-10">
            {categories.map((category) => {
              const isSaleItem = category.slug === "sale";
              const active = isSaleItem
                ? activeSale
                : activeCategory === category.slug;

              return (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`relative px-5 h-14 transition ${
                    isSaleItem
                      ? active
                        ? "text-red-600"
                        : "text-red-500/80 hover:text-red-600"
                      : active
                      ? "text-black font-semibold"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  <span className={navTextClass}>
                    {kh ? category.name.km : category.name.en}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 ml-auto">

            {/* SEARCH DESKTOP */}
            <div className="hidden lg:flex items-center gap-2 border border-black/15 px-3 py-1.5 w-52 xl:w-64 rounded">
              <Search
                className="w-4 h-4 text-gray-400 cursor-pointer"
                onClick={handleSearch}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={kh ? "ស្វែងរក..." : "Search..."}
                className={`${searchClass} flex-1 outline-none bg-transparent`}
              />
              {query && (
                <button onClick={clearQuery}>
                  <CloseIcon className="w-3.5 h-3.5 text-gray-400 hover:text-black" />
                </button>
              )}
            </div>

            {/* LANGUAGE */}
            <button
              onClick={() => setLang(lang === "en" ? "km" : "en")}
              className="inline-flex items-center gap-1.5 bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded"
            >
              <span
                className={lang === "en" ? "fi fi-us" : "fi fi-kh"}
                style={{ width: 18, height: 13, borderRadius: 2 }}
              />
              <span className={langClass}>
                {kh ? "ខ្មែរ" : "EN"}
              </span>
            </button>

            {/* MOBILE BUTTON */}
            <button
              className="lg:hidden p-2 hover:bg-black/5 rounded"
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

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-black/10 bg-white px-4 py-4">

          {/* SEARCH */}
          <div className="flex items-center gap-2 rounded border border-black/15 px-3 py-2 mb-4">
            <Search
              className="w-4 h-4 text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={kh ? "ស្វែងរក..." : "Search..."}
              className={`${searchClass} flex-1 outline-none bg-transparent`}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {query && (
              <CloseIcon
                className="w-4 h-4 cursor-pointer text-gray-400"
                onClick={clearQuery}
              />
            )}
          </div>

          {/* NAV ITEMS */}
          <div className="space-y-1">
            {categories.map((category) => {
              const isSaleItem = category.slug === "sale";
              const active = isSaleItem
                ? activeSale
                : activeCategory === category.slug;

              return (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`w-full text-left px-4 py-3 transition ${
                    isSaleItem
                      ? active
                        ? "bg-red-50 text-red-600"
                        : "text-red-500/80 hover:bg-red-50"
                      : active
                      ? "bg-black/5 text-black"
                      : "text-black/70 hover:bg-black/5"
                  }`}
                >
                  <span className={navTextClass}>
                    {kh ? category.name.km : category.name.en}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}