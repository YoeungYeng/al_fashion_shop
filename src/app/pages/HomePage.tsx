import { Link } from "react-router";
import { Slideshow } from "../components/Slideshow";
import { ProductCard } from "../components/ProductCard";
import { useLang } from "../context/LanguageContext";
import { products } from "../data/products";
import { NewArrivalCard } from "../components/NewArrivalCard";
import { PromotionPage } from "../components/PromotionPage";

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
      <h2 className="text-[14px] font-medium text-[#1C1917]">{title}</h2>
      <Link
        to={linkTo}
        className="flex items-center gap-2 text-[14px] font-medium text-black hover:text-black/60 transition-colors"
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
        {/* FLASH SALE */}
        <section className="w-full py-4 md:py-4 lg:py-4">
          <div className="mx-auto px-4 md:px-8 lg:px-12 mb-8">
            <SectionHeader
              title={kh ? "បញ្ចុះតម្លៃពិសេស" : "Flash Sale"}
              linkTo="/products?sale=true"
              linkLabel={kh ? "មើលទាំងអស់" : "Shop More"}
            />
          </div>
          <div className="-mt-16">
             <PromotionPage />
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section
          className="w-
       py-4 md:py-4 lg:py-4 -mt-20"
        >
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
                  <NewArrivalCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
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
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
