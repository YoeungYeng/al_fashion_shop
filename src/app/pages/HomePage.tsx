import { Link, useNavigate } from "react-router";
import { Slideshow } from "../components/Slideshow";
import { useLang } from "../context/LanguageContext";
import { products, categories } from "../data/products";
import { PromotionPage } from "../components/PromotionPage";
// Import the CompactProductCard instead of NewArrivalCard and ProductCard
import { CompactProductCard } from "../components/CompactProductCard";

function SectionHeader({
  title,
  linkTo,
  linkLabel,
}: {
  title: string;
  linkTo: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6 gap-4">
      <h2 className="text-[16px] font-medium text-[#1C1917]">{title}</h2>
      <Link
        to={linkTo}
        className="flex items-center gap-2 text-[16px] font-medium text-black hover:text-black/60 transition-colors"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

export function HomePage() {
  const { lang, t } = useLang();
  const kh = lang === "km";
  const navigate = useNavigate();
  const l = lang as "en" | "km";
  const bodyFont = kh ? "font-body-kh" : "font-body-en";

  const handleCategoryClick = (slug: string) => {
    if (slug === "sale") {
      navigate("/products?sale=true");
    } else {
      navigate(`/products?category=${slug}`);
    }
  };

  return (
    <div
      className={`${kh ? "font-body-kh" : "font-body-en"} bg-transparent min-h-screen `}
    >
      {/* HERO */}
      <Slideshow />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10">
        {/* category */}
        <section>
          <div className="mb-4 flex flex-wrap justify-center gap-8 md:gap-12">
            {/* "All" link */}
            <button
              onClick={() => navigate("/products")}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="w-24 md:w-32 transition-all duration-300 group-hover:scale-105">
                <img
                  src="/icons/all.png" // swap for your actual "all" icon
                  alt={kh ? "ទាំងអស់" : "All"}
                  className="max-w-20 max-h-20 object-contain mx-auto"
                />
              </div>
              <span
                className={`${bodyFont} mt-2 text-[14px] text-black/60 group-hover:text-black transition-colors`}
              >
                {kh ? "ទាំងអស់" : "All"}
              </span>
              <div className="mt-1 h-[2px] w-0 group-hover:w-14 bg-black transition-all duration-300" />
            </button>

            {/* Real categories, including Sale */}
            {categories.map((cat) => {
              const isSale = cat.slug === "sale";
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="group flex flex-col items-center cursor-pointer"
                >
                  <div className="w-24 md:w-32 transition-all duration-300 group-hover:scale-105">
                    <img
                      src={cat.cover}
                      alt={cat.name[l]}
                      className="max-w-20 max-h-20 object-contain mx-auto"
                    />
                  </div>
                  <span
                    className={`${bodyFont} mt-2 text-[14px] transition-colors ${
                      isSale
                        ? "text-red-600 font-medium"
                        : "text-black/60 group-hover:text-black"
                    }`}
                  >
                    {cat.name[l]}
                  </span>
                  <div
                    className={`mt-1 h-[2px] w-0 group-hover:w-14 transition-all duration-300 ${
                      isSale ? "bg-red-600" : "bg-black"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </section>
        {/* FLASH SALE (The Slider) */}
        <section className="w-full py-4 md:py-4 lg:py-4">
          <div className="mx-auto px-4 md:px-8 lg:px-12 mb-8">
            <SectionHeader
              title={kh ? "បញ្ចុះតម្លៃពិសេស" : "Flash Sale🔥"}
              linkTo="/products?sale=true"
              linkLabel={kh ? "មើលទាំងអស់" : "Shop More"}
            />
          </div>
          <div className="-mt-6">
            <PromotionPage />
          </div>
        </section>

        {/* NEW ARRIVALS (Now using CompactProductCard) */}
        <section className="w-full py-4 md:py-4 lg:py-4 -mt-4">
          <div className="mx-auto px-4 md:px-8 lg:px-12">
            <SectionHeader
              title={t("home.categories")}
              linkTo="/products"
              linkLabel={t("home.viewAll")}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 lg:gap-6">
              {products
                .filter((p) => p.isPopular)
                .slice(0, 6)
                .map((product) => (
                  <CompactProductCard
                    key={product.id}
                    showCarousel={true}
                    product={product}
                    imageAspect="aspect-square" // Makes it square like the promotion cards
                  />
                ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS (Now using CompactProductCard) */}
        <section className="w-full py-2 md:py-2 lg:py-4">
          <div className="mx-auto px-4 md:px-8 lg:px-12">
            <SectionHeader
              title={t("home.featured")}
              linkTo="/products"
              linkLabel={t("home.viewAll")}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 lg:gap-6">
              {products
                .filter((p) => p.isPopular)
                .slice(0, 10)
                .map((product) => (
                  <CompactProductCard
                    key={product.id}
                    product={product}
                    showCarousel={true}
                    imageAspect="aspect-square" // Consistency across all sections
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
