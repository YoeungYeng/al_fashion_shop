import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Search, Menu, X as CloseIcon } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useSearch } from "../context/SearchContext";
import logo from "../../assets/al_fashion_logo-LF9KwT_A.jpg";
import "flag-icons/css/flag-icons.min.css";

type MegaMenu = "shoes" | null;

const shoeCategories = [
  { slug: "sneakers", en: "Sneakers", km: "ស្បែកជើងកីឡា" },
  { slug: "heels",    en: "Heels",    km: "ស្បែកជើងកែង"  },
  { slug: "sandals",  en: "Sandals",  km: "ស្បែកជើងស"    },
  { slug: "flats",    en: "Flats",    km: "ស្បែកជើងរាប"  },
  { slug: "boots",    en: "Boots",    km: "ស្បែកជើងវែង"  },
  { slug: "loafers",  en: "Loafers",  km: "ឡូហ្វ័រ"       },
];



function useNavFont(kh: boolean) {
  return {
    /* logo */
    logo: {
      className: kh ? "font-header-kh" : "font-header-en",
      style: {
        fontSize: "clamp(13px, 1.4vw, 16px)",
        fontWeight: 700,
        letterSpacing: kh ? 0 : "0.12em",
        textTransform: kh ? "none" : "uppercase",
      } as React.CSSProperties,
    },

    /* top nav link */
    navLink: {
      className: kh ? "font-header-kh" : "font-header-en",
      style: {
        fontSize: "clamp(12px, 1.1vw, 14px)",
        fontWeight: 600,
        letterSpacing: kh ? 0 : "0.09em",
        textTransform: kh ? "none" : "uppercase",
      } as React.CSSProperties,
    },

    /* mega menu section heading */
    megaHead: {
      className: kh ? "font-body-kh" : "font-body-en",
      style: {
        fontSize: "clamp(9px, 0.85vw, 11px)",
        fontWeight: 600,
        letterSpacing: kh ? 0 : "0.14em",
        textTransform: kh ? "none" : "uppercase",
        color: "rgba(0,0,0,0.38)",
      } as React.CSSProperties,
    },

    /* mega menu featured item */
    megaFeat: {
      className: kh ? "font-body-kh" : "font-body-en",
      style: {
        fontSize: "clamp(13px, 1.1vw, 14px)",
        fontWeight: 600,
      } as React.CSSProperties,
    },

    /* mega menu regular item */
    megaItem: {
      className: kh ? "font-body-kh" : "font-body-en",
      style: {
        fontSize: "clamp(13px, 1.1vw, 14px)",
        fontWeight: 400,
      } as React.CSSProperties,
    },

    /* search placeholder + input */
    search: {
      className: kh ? "font-body-kh" : "font-body-en",
      style: {
        fontSize: "clamp(12px, 1vw, 13px)",
        letterSpacing: kh ? 0 : "0.02em",
      } as React.CSSProperties,
    },

    /* lang toggle label */
    langLabel: {
      style: kh
        ? {
            fontFamily: "var(--font-body-kh)",
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: 0,
            color: "#333",
            lineHeight: 1,
          } as React.CSSProperties
        : {
            fontFamily: "var(--font-header-en)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "#333",
            lineHeight: 1,
          } as React.CSSProperties,
    },
  };
}

export function Navbar() {
  const { lang, setLang } = useLang();
  const { query, setQuery } = useSearch();
  const [openMenu, setOpenMenu] = useState<MegaMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const kh = lang === "km";
  const f = useNavFont(kh);

  const showMenu   = () => { clearTimeout(hideTimer.current!); setOpenMenu("shoes"); };
  const schedHide  = () => { hideTimer.current = setTimeout(() => setOpenMenu(null), 150); };
  const cancelHide = () => clearTimeout(hideTimer.current!);

  const handleCategoryClick = (slug: string) => {
    navigate(slug ? `/products?category=${slug}` : "/products");
    setOpenMenu(null);
    setMobileOpen(false);
  };

  /* underline indicator for active nav */
  const activeUnderline =
    "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-black after:rounded-full";

  return (
    <header className="sticky top-0 z-[999] h-auto bg-white border-b border-black/10 shadow-sm isolate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-2 sm:gap-4">

          {/* ── LOGO ── */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0 mr-2 sm:mr-6">
            <img
              src={logo}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-black/10"
              alt="AL Fashion"
            />
            <span className={f.logo.className} style={f.logo.style}>
              {kh ? "អេអិល ហ្វេសសិន" : "AL Fashion"}
            </span>
          </NavLink>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center flex-1">

            {/* SHOES — mega menu trigger */}
            <div
              className="relative h-16 flex items-center"
              onMouseEnter={showMenu}
              onMouseLeave={schedHide}
            >
              <button
                onClick={() => navigate("/products")}
                className={`relative h-16 px-4 flex items-center transition-colors
                  hover:text-black
                  ${openMenu === "shoes"
                    ? `text-black ${activeUnderline}`
                    : "text-black/65"
                  }`}
                style={f.navLink.style}
              >
                <span className={f.navLink.className}>
                  {kh ? "ស្បែកជើង" : "Shoes"}
                </span>
              </button>

              {/* ── FULL-WIDTH MEGA PANEL ── */}
              {openMenu === "shoes" && (
                <div
                  onMouseEnter={cancelHide}
                  onMouseLeave={schedHide}
                  className="fixed left-0 right-0 top-16 z-50 bg-white
                             border-t border-b border-black/10 shadow-md"
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6
                                  grid grid-cols-3 gap-8">

                    {/* Col 1 — Categories */}
                    <div>
                      <p
                        className={`${f.megaHead.className} mb-3`}
                        style={f.megaHead.style}
                      >
                        {kh ? "ប្រភេទ" : "Categories"}
                      </p>
                      <button
                        onClick={() => handleCategoryClick("")}
                        className={`${f.megaFeat.className} block mb-2
                                    hover:underline underline-offset-2 text-black`}
                        style={f.megaFeat.style}
                      >
                        {kh ? "ស្បែកជើងទាំងអស់" : "All shoes"}
                      </button>
                      <div className="w-full h-px bg-black/[0.07] my-2" />
                      {shoeCategories.map((c) => (
                        <button
                          key={c.slug}
                          onClick={() => handleCategoryClick(c.slug)}
                          className={`${f.megaItem.className} block py-[3px]
                                      text-black/60 hover:text-black
                                      hover:underline underline-offset-2
                                      transition-colors`}
                          style={f.megaItem.style}
                        >
                          {kh ? c.km : c.en}
                        </button>
                      ))}
                    </div>

                   
                  </div>
                </div>
              )}
            </div>

            
          </nav>

          {/* ── RIGHT SIDE ── */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">

            {/* SEARCH — desktop */}
            <div className="hidden sm:flex items-center gap-1.5
                            border-b border-black/20 pb-0.5">
              <Search className="w-3.5 h-3.5 text-black/40 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={kh ? "ស្វែងរក..." : "Search..."}
                className={`${f.search.className} bg-transparent outline-none
                            text-black/60 placeholder-black/30
                            w-20 focus:w-36 transition-all`}
                style={f.search.style}
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear">
                  <CloseIcon className="w-3 h-3 text-black/40 hover:text-black/70" />
                </button>
              )}
            </div>

            {/* ── LANGUAGE TOGGLE ── */}
            <button
              onClick={() => setLang(lang === "en" ? "km" : "en")}
              className="inline-flex items-center gap-1.5 rounded-full
                         bg-black/5 hover:bg-black/10 px-2.5 py-1
                         transition shrink-0"
              aria-label="Switch language"
            >
              <span
                className={lang === "en" ? "fi fi-us" : "fi fi-kh"}
                style={{
                  display: "inline-block",
                  width: 18,
                  height: 13,
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <span style={f.langLabel.style}>
                {kh ? "ខ្មែរ" : "EN"}
              </span>
            </button>

            {/* HAMBURGER */}
            <button
              className="md:hidden p-1.5 rounded hover:bg-black/5 transition"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <CloseIcon className="w-5 h-5 text-black/70" />
                : <Menu      className="w-5 h-5 text-black/70" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-black/10 px-4 py-4 space-y-1">

          {/* mobile search */}
          <div className="flex items-center gap-2 border border-black/10
                          rounded-lg px-3 py-2 mb-3">
            <Search className="w-4 h-4 text-black/40 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={kh ? "ស្វែងរក..." : "Search..."}
              className={`${f.search.className} flex-1 bg-transparent outline-none
                          text-black/60 placeholder-black/30`}
              style={f.search.style}
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <CloseIcon className="w-3.5 h-3.5 text-black/40" />
              </button>
            )}
          </div>

          {/* categories */}
          <p
            className={`${f.megaHead.className} px-1 mb-1`}
            style={f.megaHead.style}
          >
            {kh ? "ប្រភេទ" : "Categories"}
          </p>
          {shoeCategories.map((c) => (
            <button
              key={c.slug}
              onClick={() => handleCategoryClick(c.slug)}
              className={`${f.megaItem.className} block w-full text-left
                          text-black/70 hover:text-black
                          px-1 py-2 border-b border-black/5 transition-colors`}
              style={f.megaItem.style}
            >
              {kh ? c.km : c.en}
            </button>
          ))}

          <div className="pt-2 space-y-1">
            {[
              { to: "/contact", en: "Contact", km: "ទំនាក់ទំនង" },
              { to: "/about",   en: "About",   km: "អំពីយើង"    },
            ].map(({ to, en, km }) => (
              <button
                key={to}
                onClick={() => { navigate(to); setMobileOpen(false); }}
                className={`${f.megaItem.className} block w-full text-left
                            text-black/70 hover:text-black
                            px-1 py-2 transition-colors`}
                style={f.megaItem.style}
              >
                {kh ? km : en}
              </button>
            ))}
            <button
              onClick={() => { navigate("/products?category=sale"); setMobileOpen(false); }}
              className={`${f.megaItem.className} block w-full text-left
                          font-semibold text-[#c00] px-1 py-2`}
              style={f.megaItem.style}
            >
              {kh ? "លក់" : "Sale"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}