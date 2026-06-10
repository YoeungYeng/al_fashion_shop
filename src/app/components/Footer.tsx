import { NavLink } from 'react-router';
import {
  Facebook,
  Instagram,
  Youtube,
  Send,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';

import logo from "../../assets/al_fashion_logo-LF9KwT_A.jpg";

const socials = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Send, href: 'https://t.me/yourcafe', label: 'Telegram' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];


type MenuKey = "new" | "sneakers" | "heels" | "sandals" | "flats" | "boots" | "loafers" | "sale" | null;

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
  { key: "new",      en: "New",        km: "ថ្មី",           href: "/products?category=new" },
  { key: "sneakers", en: "Sneakers",   km: "ស្បែកជើងកីឡា", href: "/products?category=sneakers" },
  { key: "heels",    en: "Heels",      km: "ស្បែកជើងកែង",  href: "/products?category=heels" },
  { key: "boots",    en: "Boots",      km: "ស្បែកជើងវែង",  href: "/products?category=boots" },
  { key: "loafers",  en: "Loafers",    km: "ឡូហ្វ័រ",       href: "/products?category=loafers" },
];

export function Footer() {
  const { lang, t } = useLang();
  const kh = lang === 'km';

  return (
    <footer className={`bg-white border-t border-black/10 text-black ${kh ? 'font-body-kh' : 'font-body-en'}`}>

      {/* TOP RED LINE (brand identity like navbar) */}
      <div className="h-[3px] bg-primary" />

      <div className="max-w-[1700px] mx-auto px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-full bg-primary flex items-center shadow justify-center">
                <img src={logo} alt='' />
              </div>

              <div>
                <p className={`font-bold text-lg leading-none ${kh ? 'font-header-kh' : ''}`}>
                  AL Fashion Store
                </p>
                
              </div>

            </div>

            <p className="text-sm text-black/60">
              {t('footer.tagline')}
            </p>

            {/* SOCIAL */}
            <div className="mt-5">
              <p className="text-xs text-primary uppercase tracking-widest mb-3">
                {t('home.follow')}
              </p>

              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center hover:bg-primary/10 transition group"
                  >
                    <Icon className="w-4 h-4 text-black group-hover:text-primary transition" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase">
              {t('nav.contact')}
            </h4>

            <ul className="space-y-3 text-sm text-black/60">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +855 12 345 678
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                info@shoestore.com
              </li>


              <li className="flex items-center gap-2" >
                <MapPin className="w-4 h-4 text-primary" />
                {kh ? 'ភ្នំពេញ, កម្ពុជា' : 'Phnom Penh, Cambodia'}
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase">
              {kh ? 'បញ្ជាទិញ' : 'Order Now'}
            </h4>

            <p className="text-sm text-black/60 mb-4">
              {kh
                ? 'ទាក់ទង Telegram ដើម្បីបញ្ជាទិញភ្លាមៗ'
                : 'Contact Telegram for instant ordering'}
            </p>

            <a
              href="https://t.me/yoeungyeng"
              target="_blank"
              className="inline-flex items-center bg-[#229ED9] gap-2 px-4 py-2  text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              <Send className="w-4 h-4" />
              {kh ? 'តេលេក្រាម' : 'Telegram'}
            </a>
          </div>

        </div>

        {/* BOTTOM */}
        <div className={`mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center text-sm text-black/50 ${kh ? 'font-body-kh' : 'font-body-en'}`}>
          <p>© 2026 AL Fashion Store. All rights reserved.</p>
          <span>KH Made in Cambodia</span>
        </div>

      </div>
    </footer>
  );
}