import { useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from "lucide-react";
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
    (p) => p.discount > 0 || p.isNew || p.isPopular,
  );

  const handleScroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  // Update arrow visibility based on scroll position
  const handleScrollUpdate = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  return (
    <div className={`bg-[#FAF6EF] ${kh ? "font-khmer" : "font-body-en"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Flash Sale header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <div className="flex items-center gap-2">
              {/* <Zap className="w-5 h-5 text-[#C9A84C] fill-[#C9A84C]" /> */}
              <h2
                className={`text-xl font-semibold text-[#1C1917] ${
                  kh ? "font-header-kh" : "font-header-en"
                }`}
              >
                {kh ? "បញ្ចុះតម្លៃពិសេស" : "Flash Sale"}
              </h2>
            </div>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-[#9B1C1C]/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fc2c2c] animate-pulse" />
              <span
                className={`text-[11px] font-semibold text-[#ff0000] ${
                  kh ? "font-body-kh" : "font-body-en"
                }`}
              >
                {kh ? "កំពុងដំណើរការ" : "Live"}
              </span>
            </span>
          </div>

          <Link
            to="/products"
            className={`flex items-center gap-1 text-sm text-[#9B1C1C] hover:text-[#C9A84C] font-medium transition-colors ${
              kh ? "font-body-kh" : "font-body-en"
            }`}
          >
            {kh ? "មើលទាំងអស់" : "View All"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gold divider */}
        <div className="h-px bg-gradient-to-r from-[#C9A84C] via-[#C9A84C]/40 to-transparent mb-6" />

        {/* Carousel with flanking arrows */}
        <div className="relative">

          {/* Left arrow — hidden until user scrolls right */}
          <button
            onClick={() => handleScroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-all duration-300 ${
              showLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            onScroll={handleScrollUpdate}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-3 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {promotionProducts.map((product) => (
              <PromotionCard key={product.id} product={product} />
            ))}
          </div>

          {/* Right arrow — hidden when scrolled to the end */}
          <button
            onClick={() => handleScroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-all duration-300 ${
              showRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

      </div>
    </div>
  );
}