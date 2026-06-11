import { useState, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { Search, X as CloseIcon, Menu } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useSearch } from "../context/SearchContext";
import { menus, categories } from "../data/products";
import logo from "../../assets/al_fashion_logo-LF9KwT_A.jpg";
import "flag-icons/css/flag-icons.min.css";

type GenderKey = "men" | "women" | null;

export function Navbar() {
  const { lang, setLang } = useLang();
  const { query, setQuery, commitQuery, clearQuery } = useSearch();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const kh = lang === "km";

  // Read ?gender=men|women from URL
  const activeCategory = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("category") || "";
  }, [location.search]);

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category}`);
    setMobileOpen(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    commitQuery();
    if (location.pathname !== "/products") navigate("/products");
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const logoClass = kh
    ? "font-header-kh text-base lg:text-lg font-bold"
    : "font-header-en text-sm lg:text-base font-bold tracking-[0.08em] uppercase";

  const navLinkClass = kh
    ? "font-header-kh text-[13px] lg:text-[14px] font-bold"
    : "font-header-en text-[12px] lg:text-[13px] font-bold tracking-[0.1em] uppercase";

  const mobileNavClass = kh
    ? "font-header-kh text-base font-semibold"
    : "font-header-en text-sm font-bold tracking-[0.08em] uppercase";

  const searchClass = kh ? "font-body-kh text-sm" : "font-body-en text-sm";

  const langClass = kh
    ? "font-body-kh text-sm"
    : "font-header-en text-[11px] font-bold tracking-[0.1em]";

  return (
    <>
      <header className="fixed top-0 w-full z-[999] bg-white border-b border-black/10 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14">
            {/* LOGO */}
            <NavLink to="/" className="flex items-center gap-2 shrink-0">
              <img
                src={logo}
                alt="AL Fashion"
                className="w-9 h-9 rounded-full object-cover border border-black/10"
              />
              <span className={logoClass}>
                {kh ? "អេអិល ហ្វេសសិន" : "AL Fashion"}
              </span>
            </NavLink>

            {/* DESKTOP NAV — derived from menus data */}
            <nav className="hidden lg:flex items-center ml-10">
              {categories.map((category) => {
                const active = activeCategory === category.slug;

                return (
                  <button
                    key={category.slug}
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`relative px-5 h-14 transition font-medium ${
                      active ? "text-black text-[14px]" : "text-black/80 text-[14px] hover:text-black"
                    }`}
                  >
                    <span className={navLinkClass}>
                      {kh ? category.name.km : category.name.en}
                    </span>

                    {active && (
                      <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-black rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 ml-auto">
              {/* SEARCH BUTTON */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-black/5 transition"
              >
                <Search className="w-5 h-5" />
              </button>

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

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-black/10 bg-white px-4 py-4">
            {/* MOBILE SEARCH */}
            <div className="flex items-center gap-2 border px-3 py-2 mb-4">
              <Search
                className="w-4 h-4 text-gray-500 cursor-pointer"
                onClick={handleSearch}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={kh ? "ស្វែងរកស្បែកជើង..." : "Search shoes..."}
                className={`${searchClass} flex-1 outline-none bg-transparent`}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {query && (
                <CloseIcon
                  className="w-4 h-4 cursor-pointer"
                  onClick={clearQuery}
                />
              )}
            </div>

            {/* MOBILE MENU ITEMS */}
            <div className="space-y-2">
              {categories.map((category) => {
                const active = activeCategory === category.slug;

                return (
                  <button
                    key={category.slug}
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition ${
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
            </div>
          </div>
        )}
      </header>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex justify-center items-start pt-24 px-4">
          <div className="bg-white w-full max-w-xl hadow-xl p-4">
            <div className="flex items-center gap-3">
              <Search
                className="w-5 h-5 text-gray-500 cursor-pointer"
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
