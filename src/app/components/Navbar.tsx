import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { X, Search, Check } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useSearch } from "../context/SearchContext";
import { categories } from "../data/products";
import "flag-icons/css/flag-icons.min.css";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import logo from "../../assets/al_fashion_logo-LF9KwT_A.jpg";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const { query, setQuery, selectedCategory, setSelectedCategory } = useSearch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const kh = lang === "km";

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const activeCategoryLabel = selectedCategory
    ? categories.find((c) => c.slug === selectedCategory)?.name[lang] ?? t("nav.category")
    : kh ? "គ្រប់ប្រភេទ" : "All Categories";

  const khmerNation = {
    icon: <span className="fi fi-kh"></span>,
    label: "ខ្មែរ",
  };

  const englishNation = {
    icon: <span className="fi fi-us"></span>,
    label: "EN",
  };

  const languageSwitch = lang === "en" ? khmerNation : englishNation;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center overflow-hidden">
              <img src={logo} className="w-8 h-8 object-contain" />
            </div>
            <div className="hidden sm:block">
              <p className={`font-bold text-black leading-none ${kh ? "font-header-kh" : "font-header-en"}`}>
                {kh ? "អេអិល ហ្វេសសិន" : "AL Fashion"}
              </p>
            </div>
          </NavLink>

          {/* SEARCH + DROPDOWN — together as one search bar unit */}
          <div className="flex flex-1 items-center max-w-xl border border-gray-200 rounded-lg overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-[#ff0000]/50 focus-within:border-[#ff0000] transition">

            {/* CATEGORY DROPDOWN — left side of search bar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm whitespace-nowrap border-r border-gray-200 bg-gray-100 hover:bg-gray-200 transition shrink-0
                    ${selectedCategory ? "text-[#9B1C1C] font-medium" : "text-black/60"}
                    ${kh ? "font-body-kh" : "font-body-en"}`}
                >
                  {activeCategoryLabel}
                  <svg className="w-3 h-3 opacity-50" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuItem asChild>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("");
                      navigate("/products");
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1.5 text-sm rounded
                      ${!selectedCategory ? "text-[#9B1C1C] font-medium" : "text-black/70"}
                      ${kh ? "font-body-kh" : "font-body-en"}`}
                  >
                    <span>{kh ? "គ្រប់ប្រភេទ" : "All Categories"}</span>
                    {!selectedCategory && <Check className="w-3.5 h-3.5 text-[#9B1C1C]" />}
                  </button>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {categories.map((category) => {
                  const active = selectedCategory === category.slug;
                  return (
                    <DropdownMenuItem asChild key={category.slug}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category.slug);
                          navigate("/products");
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1.5 text-sm rounded
                          ${active ? "text-[#9B1C1C] font-medium" : "text-black/70"}
                          ${kh ? "font-body-kh" : "font-body-en"}`}
                      >
                        <span>{category.name[lang]}</span>
                        {active && <Check className="w-3.5 h-3.5 text-[#9B1C1C]" />}
                      </button>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* SEARCH INPUT — right side of search bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("product.search")}
                className={`w-full pl-9 pr-8 py-2 bg-transparent text-sm text-[#1C1917] placeholder-gray-400 outline-none
                  ${kh ? "font-body-kh" : "font-body-en"}`}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT ACTIONS */}
           <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLang(lang === "en" ? "km" : "en")}
              className="px-3 py-1.5 text-xs rounded-full border border-black/10 hover:bg-black/5 flex items-center gap-1"
            >
              {languageSwitch.icon}
              {languageSwitch.label}
            </button>

            {/* <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded hover:bg-black/5"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button> */}
          </div> 
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-black/10 px-4 py-3 space-y-2">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded text-sm ${
                isActive(to) ? "bg-primary text-white" : "text-black/70"
              } ${kh ? "font-body-kh" : "font-body-en"}`}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}