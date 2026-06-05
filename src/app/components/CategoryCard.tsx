import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLang, Lang } from '../context/LanguageContext';
import { Category, products } from '../data/products';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const kh = lang === 'km';

  const count = products.filter(p => p.category === category.slug).length;

  return (
    <div
      onClick={() => navigate(`/category/${category.slug}`)}
      className="group relative overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 aspect-[4/3] bg-[#1C0A0A]"
    >
      {/* Cover image */}
      <img
        src={category.cover}
        alt={category.name.en}
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-all duration-500 group-hover:opacity-50 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Gold shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 to-[#C9A84C]/0 group-hover:from-[#C9A84C]/10 group-hover:to-transparent transition-all duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">

        <div>
          {/* Count */}
          <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.18em] mb-1">
            {count} {t('category.products')}
          </p>

          {/* Name */}
          <h3 className={`text-white font-semibold text-xl leading-snug mb-3 ${kh ? 'font-header-kh' : 'font-header-en'}`}>
            {category.name[lang as Lang]}
          </h3>

          {/* CTA */}
          <div className="flex items-center gap-1.5 text-[#C9A84C] text-sm group-hover:gap-3 transition-all">
            <span className={kh ? 'font-khmer' : ''}>{t('category.explore')}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Border on hover */}
      <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 group-hover:ring-[#C9A84C]/50 transition-all duration-300" />
    </div>
  );
}
