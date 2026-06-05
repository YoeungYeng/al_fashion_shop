import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'en' | 'km';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const translations: Record<string, Record<Lang, string>> = {
  'nav.home':             { en: 'Sneakers',                    km: 'ស្បែកជើងប៉ាតា' },
  'nav.products':         { en: 'Running Shoes',                km: 'ស្បែកជើងរត់' },
  'nav.category':         { en: 'Casual Shoes',                km: 'ស្បែកជើងធម្មតា' },
  'nav.contact':          { en: 'Sports Shoes',              km: 'ស្បែកជើងកីឡា' },

  'home.hero.title':      { en: 'Authentic Cambodian Crafts & Goods', km: 'សិប្បកម្ម និងទំនិញខ្មែរពិតប្រាកដ' },
  'home.hero.subtitle':   { en: 'Handcrafted with love, delivered to your door', km: 'ផលិតដោយដៃ ដឹកជញ្ជូនដល់ទ្វារ' },
  'home.hero.cta':        { en: 'Shop Now',                km: 'ទិញឥឡូវ' },
  'home.featured':        { en: 'Featured Products',       km: 'ផលិតផលពិសេស' },
  'home.categories':      { en: 'New Arrivals',       km: 'ការមកដល់ថ្មី' },
  'home.viewAll':         { en: 'View All',                km: 'មើលទាំងអស់' },
  'home.follow':          { en: 'Follow Us',               km: 'តាមដានយើង' },
  'home.popular':         { en: 'Popular',                 km: 'ពេញនិយម' },
  'home.new':             { en: 'New',                     km: 'ថ្មី' },
  'home.contactSection':  { en: 'Find Us',                 km: 'រកយើងឃើញ' },

  'product.search':       { en: 'Search products…',        km: 'ស្វែងរកផលិតផល…' },
  'product.filter':       { en: 'Filter',                  km: 'តម្រង' },
  'product.sortBy':       { en: 'Sort by',                 km: 'តម្រៀបតាម' },
  'product.sortName':     { en: 'Name',                    km: 'ឈ្មោះ' },
  'product.sortPrice':    { en: 'Price: Low–High',         km: 'តម្លៃ: ទាប–ខ្ពស់' },
  'product.sortPriceDesc':{ en: 'Price: High–Low',         km: 'តម្លៃ: ខ្ពស់–ទាប' },
  'product.sortDate':     { en: 'Newest',                  km: 'ថ្មីបំផុត' },
  'product.priceRange':   { en: 'Price Range',             km: 'ជួរតម្លៃ' },
  'product.allCategories':{ en: 'All Categories',          km: 'ប្រភេទទាំងអស់' },
  'product.inStock':      { en: 'In Stock',                km: 'មានក្នុងស្តុក' },
  'product.outOfStock':   { en: 'Out of Stock',            km: 'អស់ពីស្តុក' },
  'product.discount':     { en: 'OFF',                     km: 'បញ្ចុះ' },
  'product.description':  { en: 'Description',             km: 'ការពិពណ៌នា' },
  'product.orderTelegram':{ en: 'Chat',      km: 'ឆាត' },
  'product.noResults':    { en: 'No products found',       km: 'រកមិនឃើញផលិតផល' },
  'product.clearFilters': { en: 'Clear Filters',           km: 'លុបតម្រង' },
  'product.allProducts':  { en: 'All Products',            km: 'ផលិតផលទាំងអស់' },

  'category.title':       { en: 'Categories',              km: 'ប្រភេទទំនិញ' },
  'category.products':    { en: 'products',                km: 'ផលិតផល' },
  'category.explore':     { en: 'New Arrivals',                 km: 'ការមកដល់ថ្មី' },
  'category.cover':       { en: 'Category',                km: 'ប្រភេទ' },

  'contact.title':        { en: 'Contact Us',              km: 'ទំនាក់ទំនងយើង' },
  'contact.subtitle':     { en: "We'd love to hear from you", km: 'យើងរីករាយក្នុងការស្តាប់អ្នក' },
  'contact.phone':        { en: 'Phone',                   km: 'លេខទូរស័ព្ទ' },
  'contact.email':        { en: 'Email',                   km: 'អ៊ីម៉ែល' },
  'contact.address':      { en: 'Address',                 km: 'អាសយដ្ឋាន' },
  'contact.location':     { en: 'Location',                km: 'ទីតាំង' },
  'contact.hours':        { en: 'Opening Hours',           km: 'ម៉ោងបើក' },
  'contact.weekdays':     { en: 'Mon – Fri',               km: 'ច័ន្ទ – សុក្រ' },
  'contact.saturday':     { en: 'Saturday',                km: 'ថ្ងៃសៅរ៍' },
  'contact.sunday':       { en: 'Sunday',                  km: 'ថ្ងៃអាទិត្យ' },
  'contact.closed':       { en: 'Closed',                  km: 'បិទ' },
  'contact.getDir':       { en: 'Get Directions',          km: 'ស្វែងរកទិស' },
  'contact.name':         { en: 'Your Name',               km: 'ឈ្មោះ' },
  'contact.message':      { en: 'Message',                 km: 'សារ' },
  'contact.send':         { en: 'Send Message',            km: 'ផ្ញើសារ' },

  'footer.rights':        { en: 'All rights reserved.',    km: 'រក្សាសិទ្ធិគ្រប់យ៉ាង។' },
  'footer.tagline':       { en: 'Bringing Cambodia to the world.', km: 'ផ្សព្វផ្សាយប្រទេសខ្មែរទៅកាន់ពិភពលោក។' },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('km');
  const t = (key: string): string => translations[key]?.[lang] ?? key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return ctx;
}
