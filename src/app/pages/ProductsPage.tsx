import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useLang } from '../context/LanguageContext';
import { products, categories, Product } from '../data/products';
import { useSearch } from '../context/SearchContext';

type SortKey = 'name' | 'price_asc' | 'price_desc' | 'date';

export function ProductsPage() {
  const { lang, t } = useLang();
  const kh = lang === 'km';
  const { query } = useSearch();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [maxPrice, setMaxPrice] = useState(200);
  const [showFilters, setShowFilters] = useState(false);

  const maxPriceInData = Math.max(...products.map(p => p.price));

  const filtered = useMemo(() => {
    let list: Product[] = [...products];

    if (selectedCategory) list = list.filter(p => p.category === selectedCategory);

    const q = query.toLowerCase().trim();
    if (q) {
      list = list.filter(p =>
        p.name.en.toLowerCase().includes(q) ||
        p.name.km.includes(q) ||
        p.description.en.toLowerCase().includes(q) ||
        String(p.price).includes(q) ||
        categories.find(c => c.slug === p.category)?.name.en.toLowerCase().includes(q)
      );
    }

    list = list.filter(p => p.price <= maxPrice);

    list.sort((a, b) => {
      if (sortKey === 'name') return a.name.en.localeCompare(b.name.en);
      if (sortKey === 'price_asc') return a.price - b.price;
      if (sortKey === 'price_desc') return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return list;
  }, [query, selectedCategory, sortKey, maxPrice]);

  const clearAll = () => {
    setSelectedCategory('');
    setSortKey('date');
    setMaxPrice(maxPriceInData);
  };

  const hasFilters = !!selectedCategory || maxPrice < maxPriceInData;

  return (
    <div className="bg-[#FAF6EF] min-h-screen">
      {/* Page hero */}
      <div className="bg-[#9B1C1C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-8 h-[3px] bg-[#C9A84C] mb-3 rounded-full" />
          <h1 className={`text-white ${kh ? 'font-khmer text-3xl' : 'font-display text-4xl font-semibold'}`}>
            {t('product.allProducts')}
          </h1>
          <p className={`text-red-200 mt-1 text-sm ${kh ? 'font-khmer' : ''}`}>
            {filtered.length} {kh ? 'ផលិតផល' : 'products found'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Sort */}
          <div className="relative min-w-[160px]">
            <select
              value={sortKey}
              onChange={e => setSortKey(e.target.value as SortKey)}
              className={`w-full appearance-none pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-[#1C1917] outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] cursor-pointer ${kh ? 'font-khmer' : ''}`}
            >
              <option value="date">{t('product.sortDate')}</option>
              <option value="name">{t('product.sortName')}</option>
              <option value="price_asc">{t('product.sortPrice')}</option>
              <option value="price_desc">{t('product.sortPriceDesc')}</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              showFilters || hasFilters
                ? 'bg-[#9B1C1C] border-[#9B1C1C] text-white'
                : 'bg-white border-gray-200 text-[#1C1917] hover:border-[#9B1C1C]'
            } ${kh ? 'font-khmer' : ''}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t('product.filter')}
            {hasFilters && <span className="w-2 h-2 bg-[#C9A84C] rounded-full" />}
          </button>
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category */}
            <div>
              <p className={`text-xs text-gray-500 uppercase tracking-wider mb-3 ${kh ? 'font-khmer' : ''}`}>
                {t('nav.category')}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    !selectedCategory
                      ? 'bg-[#9B1C1C] border-[#9B1C1C] text-white'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#9B1C1C]'
                  } ${kh ? 'font-khmer' : ''}`}
                >
                  {t('product.allCategories')}
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-[#9B1C1C] border-[#9B1C1C] text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#9B1C1C]'
                    } ${kh ? 'font-khmer' : ''}`}
                  >
                    {cat.icon} {cat.name[lang as 'en' | 'km']}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <p className={`text-xs text-gray-500 uppercase tracking-wider mb-3 ${kh ? 'font-khmer' : ''}`}>
                {t('product.priceRange')} — <span className="text-[#9B1C1C] font-semibold">${maxPrice}</span>
              </p>
              <input
                type="range"
                min={0}
                max={maxPriceInData}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#9B1C1C]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$0</span>
                <span>${maxPriceInData}</span>
              </div>
            </div>

            {/* Clear */}
            <div className="flex items-end">
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className={`flex items-center gap-1.5 text-sm text-[#9B1C1C] hover:underline ${kh ? 'font-khmer' : ''}`}
                >
                  <X className="w-4 h-4" />
                  {t('product.clearFilters')}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className={`text-gray-500 mb-4 ${kh ? 'font-khmer' : ''}`}>{t('product.noResults')}</p>
            <button
              onClick={clearAll}
              className={`px-5 py-2 bg-[#9B1C1C] text-white rounded-lg text-sm ${kh ? 'font-khmer' : ''}`}
            >
              {t('product.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}