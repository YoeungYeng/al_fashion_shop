import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
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
    <div className="flex items-center justify-between mb-10">
      <div>
        <div className="w-10 h-1 bg-primary mb-3 rounded-full" />

        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1C1917]">
          {title}
        </h2>
      </div>

      <Link
        to={linkTo}
        className="
          flex items-center gap-2
          text-sm font-medium text-primary
          hover:text-primary/80
          transition-colors
        "
      >
        {linkLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export function HomePage() {
  const { lang, t } = useLang();
  const kh = lang === "km";

  return (
    <div className={`${kh ? "font-khmer" : ""} bg-[#FAF6EF] min-h-screen`}>

      {/* HERO */}
      <section className="w-full">
        <Slideshow />
      </section>

      {/* PROMOTION (FULL WIDTH EXPERIENCE) */}
      <section className="w-full">
        <PromotionPage />
      </section>

      {/* DIVIDER */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      {/* NEW ARRIVALS */}
      <section className="w-full py-16 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">

          <SectionHeader
            title={t("home.categories")}
            linkTo="/products"
            linkLabel={t("home.viewAll")}
          />

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-4
              gap-6
              lg:gap-8
            "
          >
            {products
              .filter((p) => p.isPopular)
              .slice(0, 6)
              .map((product) => (
                <NewArrivalCard
                  key={product.id}
                  product={product}
                />
              ))}
          </div>

        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="w-full py-16 lg:py-20">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">

          <SectionHeader
            title={t("home.featured")}
            linkTo="/products"
            linkLabel={t("home.viewAll")}
          />

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-4
              gap-6
              lg:gap-8
            "
          >
            {products
              .filter((p) => p.isPopular)
              .slice(0, 10)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
          </div>

        </div>
      </section>

    </div>
  );
}