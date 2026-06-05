import { useParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { useLang, Lang } from '../context/LanguageContext';
import { categories, products } from '../data/products';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const kh = lang === 'km';

  // If no slug → show all categories
  if (!slug) {
    return (
      <div className="bg-[#FAF6EF] min-h-screen">
        <div className="bg-[#9B1C1C] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-8 h-[3px] bg-[#C9A84C] mb-3 rounded-full" />
            <h1 className={`text-white ${kh ? 'font-khmer text-3xl' : 'font-display text-4xl font-semibold'}`}>
              {t('category.title')}
            </h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(cat => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.slug === slug);
  const categoryProducts = products.filter(p => p.category === slug);

  if (!category) {
    return (
      <div className="bg-[#FAF6EF] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🏺</p>
          <p className={`text-gray-500 mb-4 ${kh ? 'font-khmer' : ''}`}>
            {kh ? 'រកមិនឃើញប្រភេទ' : 'Category not found'}
          </p>
          <Link to="/category" className="text-[#9B1C1C] hover:underline text-sm">
            ← {t('category.title')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6EF] min-h-screen">
      {/* Cover hero */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden bg-[#1C0A0A]">
        <img
          src={category.cover}
          alt={category.name.en}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#9B1C1C]/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('category.title')}
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{category.icon}</span>
            <div className="w-px h-8 bg-[#C9A84C]" />
            <span className={`text-[#C9A84C] text-sm ${kh ? 'font-khmer' : ''}`}>
              {categoryProducts.length} {t('category.products')}
            </span>
          </div>

          <h1 className={`text-white drop-shadow-lg ${kh ? 'font-khmer text-3xl sm:text-4xl' : 'font-display text-4xl sm:text-5xl font-semibold'}`}>
            {category.name[lang as Lang]}
          </h1>
          <p className={`text-gray-200 mt-2 text-sm max-w-xl ${kh ? 'font-khmer' : ''}`}>
            {category.description[lang as Lang]}
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categoryProducts.length > 0 ? (
          <>
            <div className="w-8 h-[3px] bg-[#C9A84C] mb-2 rounded-full" />
            <h2 className={`text-[#1C1917] mb-8 ${kh ? 'font-khmer text-xl' : 'font-display text-2xl font-semibold'}`}>
              {category.name[lang as Lang]}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📦</p>
            <p className={`text-gray-500 ${kh ? 'font-khmer' : ''}`}>
              {kh ? 'មិនទាន់មានផលិតផលក្នុងប្រភេទនេះ' : 'No products in this category yet'}
            </p>
          </div>
        )}

        {/* Other categories */}
        <div className="mt-16">
          <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mb-12" />
          <div className="w-8 h-[3px] bg-[#C9A84C] mb-2 rounded-full" />
          <h2 className={`text-[#1C1917] mb-8 ${kh ? 'font-khmer text-xl' : 'font-display text-2xl font-semibold'}`}>
            {kh ? 'ប្រភេទផ្សេងទៀត' : 'Other Categories'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.filter(c => c.slug !== slug).map(cat => (
              <ProductCard key={cat.slug} product={cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
