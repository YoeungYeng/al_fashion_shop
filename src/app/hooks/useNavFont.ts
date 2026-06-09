import { useLang } from "../context/LanguageContext";

export function useNavFont() {
  const { lang } = useLang();
  const kh = lang === "km";

  return {
    kh,

    // Logo — Poppins (EN bold) / Kantumruy Pro (KH bold)
    logoText: kh
      ? "font-header-kh text-[13px] sm:text-[14px] font-semibold tracking-normal"
      : "font-header-en text-[13px] sm:text-[14px] font-semibold tracking-[0.12em] uppercase",

    // Top nav links — Poppins (EN) / Kantumruy Pro (KH)
    navLink: kh
      ? "font-header-kh text-[13px] sm:text-[14px] font-semibold tracking-normal"
      : "font-header-en text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase",

    // Mega menu section headings — Inter (EN) / Battambang (KH)
    megaHead: kh
      ? "font-body-kh text-[11px] font-semibold tracking-normal text-black/40"
      : "font-body-en text-[9px] sm:text-[10px] font-semibold tracking-[0.12em] uppercase text-black/40",

    // Mega menu featured "All shoes" link — Inter / Battambang
    megaFeat: kh
      ? "font-body-kh text-[13px] font-semibold text-black"
      : "font-body-en text-[12px] sm:text-[13px] font-medium text-black",

    // Mega menu regular items — Inter / Battambang
    megaItem: kh
      ? "font-body-kh text-[13px] font-normal text-black/65 hover:text-black"
      : "font-body-en text-[12px] sm:text-[13px] font-normal text-black/65 hover:text-black",

    // Mega menu sale item — same size, red color
    megaSale: kh
      ? "font-body-kh text-[13px] font-semibold text-[#c00]"
      : "font-body-en text-[12px] sm:text-[13px] font-medium text-[#c00]",

    // Search input
    searchInput: kh
      ? "font-body-kh text-[13px] tracking-normal"
      : "font-body-en text-[11px] sm:text-[12px] tracking-wide",

    // Lang toggle label
    langLabel: kh
      ? { fontFamily: "'Battambang', 'Kantumruy Pro', sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: 0 }
      : { fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em" },
  };
}