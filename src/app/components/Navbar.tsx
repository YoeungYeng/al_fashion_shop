import { useRef, useState, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { Search, X as CloseIcon, Menu } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useSearch } from "../context/SearchContext";
import logo from "../../assets/al_fashion_logo-LF9KwT_A.jpg";
import "flag-icons/css/flag-icons.min.css";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type MenuKey = "sneakers" | "heels" | "sandals" | "flats" | "boots" | "loafers" | "sale" | null;

interface CategoryItem {
  slug: string;
  en: string;
  km: string;
}

interface NavItem {
  key: MenuKey;
  en: string;
  km: string;
  href: string;
}

// ─────────────────────────────────────────────
// Nav data
// ─────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  
  { key: "sneakers", en: "Sneakers",   km: "ស្បែកជើងកីឡា", href: "/products?category=sneakers" },
  { key: "heels",    en: "Heels",      km: "ស្បែកជើងកែង",  href: "/products?category=heels" },
  { key: "boots",    en: "Boots",      km: "ស្បែកជើងវែង",  href: "/products?category=boots" },
  { key: "loafers",  en: "Loafers",    km: "ឡូហ្វ័រ",       href: "/products?category=loafers" },
];

// ─────────────────────────────────────────────
// Font hook - BIGGER FONTS
// ─────────────────────────────────────────────
function useNavFont(kh: boolean) {
  return {
    logo: {
      className: kh ? "font-header-kh" : "font-header-en",
      style: {
        fontSize: "clamp(15px, 1.65vw, 19px)",   // Bigger logo
        fontWeight: 700,
        letterSpacing: kh ? 0 : "0.08em",
        textTransform: kh ? "none" : ("uppercase" as const),
      } as React.CSSProperties,
    },
    navLink: {
      className: kh ? "font-header-kh" : "font-header-en",
      style: {
        fontSize: "clamp(12px, 0.95vw, 15px)",   // Bigger nav text
        fontWeight: 700,
        letterSpacing: kh ? 0 : "0.1em",
        textTransform: kh ? "none" : ("uppercase" as const),
        whiteSpace: "nowrap" as const,
      } as React.CSSProperties,
    },
    megaHead: {
      className: kh ? "font-body-kh" : "font-body-en",
      style: {
        fontSize: "clamp(11px, 1vw, 13px)",
        fontWeight: 600,
        letterSpacing: kh ? 0 : "0.12em",
        textTransform: kh ? "none" : ("uppercase" as const),
        color: "rgba(0,0,0,0.45)",
      } as React.CSSProperties,
    },
    megaFeat: {
      className: kh ? "font-body-kh" : "font-body-en",
      style: {
        fontSize: "clamp(14.5px, 1.2vw, 16px)",   // Bigger featured
        fontWeight: 600,
      } as React.CSSProperties,
    },
    megaItem: {
      className: kh ? "font-body-kh" : "font-body-en",
      style: {
        fontSize: "clamp(14px, 1.15vw, 15.5px)",  // Bigger menu items
        fontWeight: 400,
      } as React.CSSProperties,
    },
    search: {
      className: kh ? "font-body-kh" : "font-body-en",
      style: {
        fontSize: "clamp(13px, 1.05vw, 14.5px)",
        letterSpacing: kh ? 0 : "0.02em",
      } as React.CSSProperties,
    },
    langLabel: {
      style: kh
        ? ({
            fontFamily: "var(--font-body-kh)",
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: 0,
            color: "#333",
            lineHeight: 1,
          } as React.CSSProperties)
        : ({
            fontFamily: "var(--font-header-en)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "#333",
            lineHeight: 1,
          } as React.CSSProperties),
    },
  };
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export function Navbar() {
  const { lang, setLang } = useLang();
  const { query, setQuery } = useSearch();
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const kh = lang === "km";
  const f = useNavFont(kh);

  // Get active category from URL
  const activeCategory = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("category") as MenuKey;
  }, [location.search]);

  const showMenu = (key: MenuKey) => {
    clearTimeout(hideTimer.current!);
    setOpenMenu(key);
  };
  const schedHide = () => {
    hideTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };
  const cancelHide = () => clearTimeout(hideTimer.current!);

  const handleCategoryClick = (slug: string) => {
    navigate(slug ? `/products?category=${slug}` : "/products");
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const activeUnderline = "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2.5px] after:bg-black after:rounded-full";

  return (
    <header className="sticky top-0 z-[999] h-auto bg-white border-b border-black/10 shadow-sm isolate">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center h-14 gap-3">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0 mr-4">
            <img
              src={logo}
              className="w-8 h-8 rounded-full object-cover border border-black/10"
              alt="AL Fashion"
            />
            <span className={f.logo.className} style={f.logo.style}>
              {kh ? "អេអិល ហ្វេសសិន" : "AL Fashion"}
            </span>
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center flex-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeCategory === item.key;

              return (
                <div
                  key={item.key}
                  className="relative h-14 flex items-center"
                >
                  <button
                    onClick={() => navigate(item.href)}
                    className={`relative h-14 px-4 flex items-center transition-all
                      hover:text-black ${isActive ? `text-black ${activeUnderline}` : "text-black/60"}`}
                  >
                    <span
                      className={f.navLink.className}
                      style={f.navLink.style}
                    >
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
              <Search className="w-4 h-4 text-black/40 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={kh ? "ស្វែងរក..." : "Search..."}
                className={`${f.search.className} bg-transparent outline-none
                            text-black/70 placeholder-black/40 w-24 focus:w-44 transition-all`}
                style={f.search.style}
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
              <span style={f.langLabel.style}>
                {kh ? "ខ្មែរ" : "EN"}
              </span>
            </button>

            {/* MOBILE HAMBURGER */}
            <button
              className="lg:hidden p-1.5 rounded hover:bg-black/5 transition"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/10 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {/* Mobile Search */}
          <div className="flex items-center gap-2 border border-black/10 rounded-lg px-3 py-2 mb-4">
            <Search className="w-4 h-4 text-black/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={kh ? "ស្វែងរក..." : "Search..."}
              className={`${f.search.className} flex-1 bg-transparent outline-none text-black/70 placeholder-black/40`}
              style={f.search.style}
            />
            {query && <CloseIcon className="w-4 h-4 text-black/50" onClick={() => setQuery("")} />}
          </div>

          {/* Mobile Nav Items */}
          {NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleCategoryClick(item.key!)}
                className={`w-full text-left px-3 py-3.5 rounded-lg transition-all text-lg
                  ${isActive ? "text-black font-bold bg-black/5" : "text-black/70 hover:text-black hover:bg-black/5"}`}
                style={f.navLink.style}
              >
                {kh ? item.km : item.en}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}