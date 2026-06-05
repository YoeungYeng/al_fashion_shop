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

const socials = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Send, href: 'https://t.me/yourcafe', label: 'Telegram' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export function Footer() {
  const { lang, t } = useLang();
  const kh = lang === 'km';

  return (
    <footer className={`bg-white border-t border-black/10 text-black ${kh ? "font-khmer" : "font-body-en"}`}>

      {/* TOP RED LINE (brand identity like navbar) */}
      <div className="h-[3px] bg-primary" />

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>

              <div>
                <p className={`font-bold text-lg leading-none ${kh ? 'font-khmer' : ''}`}>
                  Shoes Store
                </p>
                <p className="text-xs text-primary uppercase tracking-widest">
                  Premium Sneakers
                </p>
              </div>

            </div>

            <p className={`text-sm text-black/60 ${kh ? 'font-khmer' : ''}`}>
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

          {/* LINKS */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase">
              {kh ? 'តំណភ្ជាប់' : 'Quick Links'}
            </h4>

            <ul className="space-y-2">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/products', label: t('nav.products') },
                { to: '/category', label: t('nav.category') },
                { to: '/contact', label: t('nav.contact') },
              ].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="text-sm text-black/60 hover:text-primary transition"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
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
              href="https://t.me/small_team_bot"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              <Send className="w-4 h-4" />
              {kh ? 'តេលេក្រាម' : 'Telegram'}
            </a>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center text-xs text-black/50">
          <p>© 2026 Shoes Store. All rights reserved.</p>
          <span>🇰🇭 Made in Cambodia</span>
        </div>

      </div>
    </footer>
  );
}