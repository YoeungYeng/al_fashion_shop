import { NavLink } from "react-router";
import {
  Facebook,
  Instagram,
  Youtube,
  Send,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useLang } from "../context/LanguageContext";

import logo from "../../assets/al_fahion_logo.png";

const socials = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Send, href: "https://t.me/yourcafe", label: "Telegram" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

type MenuKey =
  | "new"
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

// ─────────────────────────────────────────────
// Nav data
// ─────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { key: "new", en: "New", km: "ថ្មី", href: "/products?category=new" },
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

export function Footer() {
  const { lang, t } = useLang();
  const kh = lang === "km";

  return (
    <footer
      className={`bg-transparent border-t border-black/10 text-black ${kh ? "font-body-kh" : "font-body-en"}`}
    >
      <div className="w-full border-1 border-black/60" />
      <div className="max-w-[1400px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* BRAND */}

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="object-contain flex items-center justify-center">
                <img src={logo} alt="" className="h-11 object-contain"/>
              </div>

              <div>
                <p
                  className={`font-bold text-lg leading-none ${kh ? "font-header-kh" : ""}`}
                >
                  AL Fashion Store
                </p>
              </div>
            </div>

            {/* SOCIAL */}
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase">
              {t("nav.contact")}
            </h4>

            <ul className="space-y-3 text-sm text-black/60">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +855 12 345 678
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@shoestore.com
              </li>

              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {kh ? "ភ្នំពេញ, កម្ពុជា" : "Phnom Penh, Cambodia"}
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase">
              {kh ? "តាមដាន" : "FOLLOW NOW"}
            </h4>

            <div className="mt-5">
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center  transition group"
                  >
                    <Icon className="w-5 h-5 text-black group-hover:text-black/60 transition" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className={`mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center text-sm text-black/50 ${kh ? "font-body-kh" : "font-body-en"}`}
        >
          <p>© 2026 AL Fashion Store. All rights reserved.</p>
          <span>KH Made in Cambodia</span>
        </div>
      </div>
    </footer>
  );
}
