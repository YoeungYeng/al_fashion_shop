import { useRef, useState, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { Search, X as CloseIcon, Menu } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useSearch } from "../context/SearchContext";
import logo from "../../assets/al_fashion_logo-LF9KwT_A.jpg";
import "flag-icons/css/flag-icons.min.css";

type MenuKey =
  | "sneakers"
  | "heels"
  | "sandals"
  | "flats"
  | "boots"
  | "loafers"
  | "sale"
  | null;

interface NavItem {
  key: MenuKey;
  en: string;
  km: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: "sneakers",
    en: "Sneakers",
    km: "ស្បែកជើងកីឡា",
    href: "/products?category=sneakers",
  },
  {
    key: "heels",
    en: "Heels",
    km: "ស្បែកជើងកែង",
    href: "/products?category=heels",
  },
  {
    key: "boots",
    en: "Boots",
    km: "ស្បែកជើងវែង",
    href: "/products?category=boots",
  },
  {
    key: "loafers",
    en: "Loafers",
    km: "ឡូហ្វ័រ",
    href: "/products?category=loafers",
  },
];

export function Navbar() {
  const { lang, setLang } = useLang();
  const { query, setQuery } = useSearch();
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const kh = lang === "km";

  const activeCategory = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("category") as MenuKey;
  }, [location.search]);

  const handleCategoryClick = (slug: string) => {
    navigate(slug ? `/products?category=${slug}` : "/products");
    setOpenMenu(null);
    setMobileOpen(false);
  };

  // Font classes — no clamp, clean Tailwind responsive
  const logoClass = kh
    ? "font-header-kh text-base lg:text-lg font-bold tracking-wide"
    : "font-header-en text-sm lg:text-base font-bold tracking-[0.08em] uppercase";
  const navLinkClass = kh
    ? "font-header-kh text-[13px] lg:text-[14px] font-bold"
    : "font-header-en text-[11px] lg:text-[13px] font-bold tracking-[0.1em] uppercase";
  const searchClass = kh
    ? "font-body-kh text-sm"
    : "font-body-en text-[13px] tracking-[0.02em]";
  const mobileNavClass = kh
    ? "font-header-kh text-base font-semibold"
    : "font-header-en text-sm font-bold tracking-[0.08em] uppercase";
  const langClass = kh
    ? "font-body-kh text-sm"
    : "font-header-en text-[11px] font-bold tracking-[0.1em]";

  const activeUnderline =
    "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2.5px] after:bg-black after:rounded-full";

  return (
    <header className="fixed w-full top-0 z-[999] h-auto bg-white border-b border-black/10 shadow-sm isolate">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center h-14 gap-3">
          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0 mr-4">
            <img
              src={logo}
              className="w-8 h-8 rounded-full object-cover border border-black/10"
              alt="AL Fashion"
            />
            <span className={logoClass}>
              {kh ? "អេអិល ហ្វេសសិន" : "AL Fashion"}
            </span>
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center flex-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeCategory === item.key;
              return (
                <div key={item.key} className="relative h-14 flex items-center">
                  <button
                    onClick={() => navigate(item.href)}
                    className={`relative h-14 px-4 flex items-center transition-all
                      hover:text-black ${isActive ? `text-black ${activeUnderline}` : "text-black/60"}`}
                  >
                    <span className={navLinkClass}>
                      {kh ? item.km : item.en}
                    </span>
                  </button>
                </div>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* SEARCH */}
            <div className="hidden sm:flex items-center gap-1.5 border-b border-black/20 pb-0.5">
              <button
                onClick={() => {
                  if (query.trim()) {
                    if (location.pathname !== "/products")
                      navigate("/products");
                  }
                }}
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-black/40 hover:text-black/70 transition shrink-0" />
              </button>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    if (location.pathname !== "/products")
                      navigate("/products");
                  }
                }}
                placeholder={kh ? "ស្វែងរក..." : "Search..."}
                className={`${searchClass} bg-transparent outline-none text-black/70 placeholder-black/40 w-24 focus:w-44 transition-all`}
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear">
                  <CloseIcon className="w-3.5 h-3.5 text-black/50 hover:text-black" />
                </button>
              )}
            </div>

            {/* LANGUAGE */}
            <button
              onClick={() => setLang(lang === "en" ? "km" : "en")}
              className="inline-flex items-center gap-1.5 rounded-full bg-black/5 hover:bg-black/10 px-2.5 py-1 transition shrink-0"
              aria-label="Switch language"
            >
              <span
                className={lang === "en" ? "fi fi-us" : "fi fi-kh"}
                style={{ width: 18, height: 13, borderRadius: 2 }}
              />
              <span className={langClass}>{kh ? "ខ្មែរ" : "EN"}</span>
            </button>

            {/* MOBILE HAMBURGER */}
            <button
              className="lg:hidden p-1.5 rounded hover:bg-black/5 transition"
              onClick={() => setMobileOpen((v) => !v)}
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
        <div className="lg:hidden bg-white border-t border-black/10 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {/* Mobile Search */}
          <div className="flex items-center gap-2 border border-black/10 rounded-lg px-3 py-2 mb-4">
            <button
              onClick={() => {
                if (query.trim()) {
                  if (location.pathname !== "/products") navigate("/products");
                  setMobileOpen(false);
                }
              }}
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-black/40 hover:text-black/70 transition" />
            </button>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  if (location.pathname !== "/products") navigate("/products");
                  setMobileOpen(false);
                }
              }}
              placeholder={kh ? "ស្វែងរក..." : "Search..."}
              className={`${searchClass} flex-1 bg-transparent outline-none text-black/70 placeholder-black/40`}
            />
            {query && (
              <CloseIcon
                className="w-4 h-4 text-black/50 cursor-pointer"
                onClick={() => setQuery("")}
              />
            )}
          </div>

          {/* Mobile Nav Items */}
          {NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleCategoryClick(item.key!)}
                className={`w-full text-left px-3 py-3.5 rounded-lg transition-all
            ${isActive ? "text-black bg-black/5" : "text-black/70 hover:text-black hover:bg-black/5"}`}
              >
                <span className={mobileNavClass}>{kh ? item.km : item.en}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
