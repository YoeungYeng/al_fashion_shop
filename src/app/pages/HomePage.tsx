import { Link, useNavigate } from "react-router";
import { Slideshow } from "../components/Slideshow";
import { useLang } from "../context/LanguageContext";
import { products, categories } from "../data/products";
import { PromotionPage } from "../components/PromotionPage";
import { CompactProductCard } from "../components/CompactProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function SectionHeader({
  title,
  linkTo,
  linkLabel,
  external = false,
}: {
  title?: string;
  linkTo?: string;
  linkLabel?: string;
  external?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-6 gap-4">
      <h2 className="text-[16px] font-medium text-[#1C1917]">{title}</h2>

      {external ? (
        <a
          href={linkTo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[16px] font-medium text-black hover:text-black/60 transition-colors"
        >
          {linkLabel}
        </a>
      ) : (
        <Link
          to={linkTo}
          className="flex items-center gap-2 text-[16px] font-medium text-black hover:text-black/60 transition-colors"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export function HomePage() {
  const { lang, t } = useLang();
  const kh = lang === "km";
  const navigate = useNavigate();
  const l = lang as "en" | "km";
  const bodyFont = kh ? "font-body-kh" : "font-body-en";

  // Every category slug (including "all" and "discount") routes through the
  // same `?category=` param. ProductsPage + getProductsByCategory() already
  // special-case "all" (no filtering) and "discount" (discount > 0 across
  // every category), so no branching is needed here.
  const handleCategoryClick = (slug: string) => {
    navigate(`/products?category=${slug}`);
  };

  const STORE = {
    name: "AL Fashion Store",
    address: "Phnom Penh, Cambodia",
    lat: 11.5544553,
    lng: 104.9000144,
  };

  const getGoogleMapLinks = (lat: number, lng: number) => {
    return {
      mapEmbedSrc: `https://maps.google.com/maps?q=${lat},${lng}&output=embed`,
      mapDirectionsLink: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    };
  };

  const { mapEmbedSrc, mapDirectionsLink } = getGoogleMapLinks(
    STORE.lat,
    STORE.lng,
  );

  return (
    <div
      className={`${kh ? "font-body-kh" : "font-body-en"} bg-transparent min-h-screen `}
    >
      {/* HERO */}
      <Slideshow />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10">
        {/* CATEGORY */}
        <section className="w-full px-2 md:px-2 lg:px-2 py-2 md:py-2 -mb-5 -mt-4">
          <Swiper
            spaceBetween={4}
            slidesPerView={5}
            allowSlideNext
            centerInsufficientSlides
            observer
            observeParents
            breakpoints={{
              640: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 7,
              },
              1024: {
                slidesPerView: 14,
              },
            }}
          >
            {/* All */}

            {categories.map((cat) => (
              <SwiperSlide key={cat.slug}>
                <button
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="group flex flex-col items-center"
                >
                  <img
                    src={cat.cover}
                    alt={cat.name[l]}
                    className="w-20 h-20 object-contain"
                  />

                  <span
                    className={`mt-2 text-sm ${
                      cat.slug === "discount" ? "text-red-600" : "text-black/60"
                    }`}
                  >
                    {cat.name[l]}
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
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
                    imageAspect="aspect-square"
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
                    imageAspect="aspect-square"
                  />
                ))}
            </div>
          </div>
        </section>

        {/* VISIT US */}
        <section className="w-full py-4 md:py-4 lg:py-6">
          <div className="mx-auto px-4 md:px-8 lg:px-12">
            <SectionHeader
              title={kh ? "ស្វែងរកហាងយើង" : "Visit Our Store"}
              linkTo={mapDirectionsLink}
              external
            />

            <div className="flex w-full  gap-5 lg:gap-6">
              {/* Google Map */}
              <div className="lg:col-span-2 w-full rounded-lg overflow-hidden border border-black/10">
                <div className="relative">
                  <iframe
                    src={mapEmbedSrc}
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />

                  {/* small invisible hint only on hover */}
                  <a
                    href={mapDirectionsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                  />

                  <div className="absolute bottom-3 right-3 bg-white/90 px-3 py-1 text-xs rounded shadow">
                    Click to open in Google Maps
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
