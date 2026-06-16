import { Link } from "react-router";
import { Slideshow } from "../components/Slideshow";
import { useLang } from "../context/LanguageContext";
import { products } from "../data/products";
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
            <button
              // onClick={() => handleCategoryClick(cat.slug)}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-24 md:w-32 transition-all duration-300 scale-110 group-hover:scale-105 `}
              >
                <img
                  src=""
                  alt=""
                  className="max-w-20 max-h-20 object-contain mx-auto"
                />
              </div>

              {/* TEXT: red if Sale+Active, black otherwise */}
              <span
                className={`mt-2 text-[14px] transition-colors text-red-600 font-medium"
                       
                    }`}
              >
                Category
              </span>

              {/* UNDERLINE: red if Sale+Active, black otherwise */}
              <div
                className={`mt-1 h-[2px] transition-all duration-300 ${"w-14 bg-black"}`}
              />
            </button>
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
