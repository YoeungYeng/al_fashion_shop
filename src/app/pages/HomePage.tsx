import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Slideshow } from "../components/Slideshow";
import { ProductCard } from "../components/ProductCard";
import { useLang } from "../context/LanguageContext";
import { products, categories } from "../data/products";
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
    <div className="flex items-center justify-between mb-8">
      <div>
        <div className="w-8 h-[3px] bg-primary mb-2 rounded-full" />
        <h2 className="text-2xl  text-[#1C1917] font-display font-semibold">
          {title}
        </h2>
      </div>
      <Link
        to={linkTo}
        className="flex items-center gap-1.5 text-sm text-[#9B1C1C] hover:text-[#C9A84C] font-medium transition-colors"
      >
        {linkLabel} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export function HomePage() {
  const { lang, t } = useLang();
  const kh = lang === "km";

  return (
    <div className={`${kh ? "font-khmer" : ""} bg-[#FAF6EF] min-h-screen `}>
      {/* Slideshow */}
      <Slideshow />

      {/* promotion card */}
      <PromotionPage />
      {/* Gold divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent bg-primary to-transparent" />
      </div>
      {/* new arrivals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent bg-primary to-transparent" />
      </div>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader
          title={t("home.categories")}
          linkTo="/products"
          linkLabel={t("home.viewAll")}
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
          {products
            .filter((p) => p.isPopular)
            .slice(0, 6)
            .map((product) => (
              <NewArrivalCard key={product.id} product={product} />
            ))}
        </div>
      </section>
      {/* Gold divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#ff0303] to-transparent" />
      </div>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader
          title={t("home.featured")}
          linkTo="/products"
          linkLabel={t("home.viewAll")}
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
          {/* show all */}
          {products
            .filter((p) => p.isPopular)
            .slice(0, 8)
            .map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
}
