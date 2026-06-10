import { useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { products } from "../data/products";
import { PromotionCard } from "./PromotionCard";

export function PromotionPage() {
  const { lang } = useLang();
  const kh = lang === "km";

  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const promotionProducts = products.filter(
    (p) => p.discount > 0 || p.isNew || p.isPopular
  );

  const handleScroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    const width = scrollRef.current.clientWidth;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -width * 0.8 : width * 0.8,
      behavior: "smooth",
    });
  };

  const handleScrollUpdate = () => {
    const el = scrollRef.current;

    if (!el) return;

    setShowLeft(el.scrollLeft > 10);

    setShowRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 10
    );
  };

  return (
    <div className={kh ? "font-body-kh" : "font-body-en"}>
      <section className="w-full py-8 md:py-10 lg:py-14">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-primary rounded-full" />

              <h2
                className={`text-xl lg:text-2xl font-bold text-[#1C1917] ${
                  kh ? "font-header-kh" : "font-header-en"
                }`}
              >
                {kh ? "បញ្ចុះតម្លៃពិសេស" : "Flash Sale"}
              </h2>

              <span className="hidden sm:flex items-center gap-1 px-3 py-1 bg-red-50 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

                <span
                  className={`text-xs font-semibold text-red-600 ${
                    kh ? "font-body-kh" : "font-body-en"
                  }`}
                >
                  {kh ? "កំពុងដំណើរការ" : "Live"}
                </span>
              </span>
            </div>

            <Link
              to="/products"
              className={`flex items-center gap-2 text-xl font-bold text-black hover:text-black/60 transition-colors ${
                kh ? "font-body-kh" : "font-body-en"
              }`}
            >
              {kh ? "មើលទាំងអស់" : "Shop More"}

            </Link>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-primary via-primary/40 to-transparent mb-8" />

          {/* Slider */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => handleScroll("left")}
              className={`
                absolute
                left-0
                md:left-2
                top-1/2
                -translate-y-1/2
                z-20
                w-10
                h-10
                md:w-12
                md:h-12
                rounded-full
                bg-white/95
                backdrop-blur-sm
                shadow-lg
                border
                border-gray-200
                flex
                items-center
                justify-center
                transition-all
                duration-300
                ${
                  showLeft
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }
              `}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Products */}
            <div
              ref={scrollRef}
              onScroll={handleScrollUpdate}
              className="
                flex
                gap-6
                overflow-x-auto
                scroll-smooth
                px-2
                md:px-4
                pb-6
                scrollbar-hide
              "
            >
              {promotionProducts.map((product) => (
                <PromotionCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => handleScroll("right")}
              className={`
                absolute
                right-0
                md:right-2
                top-1/2
                -translate-y-1/2
                z-20
                w-10
                h-10
                md:w-12
                md:h-12
                rounded-full
                bg-white/95
                backdrop-blur-sm
                shadow-lg
                border
                border-gray-200
                flex
                items-center
                justify-center
                transition-all
                duration-300
                ${
                  showRight
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }
              `}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}