import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { Product } from "../data/products";
import { ProductActions } from "./ProductActions";

interface CompactProductCardProps {
  product: Product;
  className?: string;
  imageAspect?: string;
  showCarousel?: boolean;     // ← Control carousel
}

export function CompactProductCard({
  product,
  className = "",
  imageAspect = "aspect-[4/5]",
  showCarousel = false,
}: CompactProductCardProps) {
  const { lang, t } = useLang();
  const kh = lang === "km";

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = product.images?.length ? product.images : [];
  const hasMultiple = images.length > 1 && showCarousel;

  const discountRate = Math.max(0, Math.min(100, Number(product.discount) || 0));
  const discountedPrice =
    discountRate > 0 ? product.price * (1 - discountRate / 100) : product.price;

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  return (
    <div
      className={`
        group bg-transparent gap-x-2-2 overflow-hidden flex items-center flex-col shrink-0
        w-[260px] sm:w-[280px] lg:w-[320px]
        cursor-pointer transition-all duration-300 hover:-translate-y-1
        ${kh ? "font-khmer" : "font-body-en"}
        ${className}
      `}
    >
      {/* Product Image with Optional Carousel */}
      <div className={`relative overflow-hidden bg-transparent  ${imageAspect}`}>
        <Link to={`/products/${product.id}`}>
          <img
            src={images[currentIndex] || "/placeholder.jpg"}
            alt={product.name[lang as Lang]}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.jpg";
            }}
          />
        </Link>

        {/* Carousel Controls */}
        {hasMultiple && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-12 h-12 text-gray-400 drop-shadow-md" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-12 h-12 text-gray-400 drop-shadow-md" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? "bg-white scale-125" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3">
            <div className="flex flex-col items-center justify-center w-14 h-8 bg-primary text-white shadow-lg ">
              <span className="text-xs sm:text-sm font-extrabold leading-none">
                -{product.discount}%
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Content */}
      <div className="p-4 flex items-center flex-col gap-2 flex-1">
        
        <h3 className="text-[#1C1917] font-medium text-sm sm:text-base lg:text-lg leading-snug line-clamp-2 text-center">
          {product.name[lang as Lang]}
        </h3>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-primary font-semibold text-base sm:text-lg">
            ${discountedPrice.toFixed(2)}
          </span>
          {discountRate > 0 && (
            <span className="text-gray-400 text-xs sm:text-sm line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>


        
      </div>
      <div className="p-2 w-full">
        <ProductActions product={product} />
      </div>
    </div>
  );
}