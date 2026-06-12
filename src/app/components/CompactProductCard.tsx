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
  showCarousel?: boolean;
  onLinkClick?: (e: React.MouseEvent) => void;
}

export function CompactProductCard({
  product,
  className = "",
  imageAspect = "aspect",
  showCarousel = false,
  onLinkClick,
}: CompactProductCardProps) {
  const { lang, t } = useLang();
  const kh = lang === "km";

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = product.images?.length ? product.images : [];
  const hasMultiple = images.length > 1 && showCarousel;

  const discountRate = Math.max(0, Math.min(100, Number(product.discount) || 0));
  const discountedPrice = discountRate > 0 ? product.price * (1 - discountRate / 100) : product.price;

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
        group bg-transparent overflow-hidden flex flex-col
        w-full h-full
        cursor-pointer transition-all duration-300 hover:-translate-y-1
        ${kh ? "font-body-kh" : "font-body-en"}
        ${className}
      `}
    >
      {/* Product Image */}
      <div className={`relative w-full overflow-hidden bg-transparent ${imageAspect}`}>
        <Link to={`/products/${product.id}`} onClick={onLinkClick}>
          <img
            src={images[currentIndex] || "/placeholder.jpg"}
            alt={product.name[lang as Lang]}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
          />
        </Link>

        {hasMultiple && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 drop-shadow-md" />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 drop-shadow-md" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${i === currentIndex ? "bg-white scale-125" : "bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}

        {product.discount > 0 && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center rounded justify-center w-12 h-7 sm:w-14 sm:h-6 bg-primary text-white shadow-lg">
              <span className="text-xs sm:text-[12px] leading-none">{product.discount}%</span>
            </div>
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className={`${kh ? "font-body-kh" : "font-body-en"} px-4 py-2 rounded-lg bg-gray-900 text-white text-xs sm:text-sm font-semibold`}>
              {t("product.outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 flex flex-col items-center justify-center gap-2 w-full">
        
        {/* FIX 1: Title Wrapper with min-height to prevent cards from jumping */}
        <div className="w-full text-center min-h-[40px] sm:min-h-[44px] flex items-center justify-center">
          <h3 className="text-[#1C1917] font-normal text-[14px] leading-tight line-clamp-2 text-center">
            {product.name[lang as Lang]}
          </h3>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 justify-center">
          <span className={`font-normal text-[14px] ${discountRate > 0 ? "text-primary" : "text-black"}`}>
            ${discountedPrice.toFixed(2)}
          </span>
          {discountRate > 0 && (
            <span className="text-gray-400 text-xs sm:text-sm line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* FIX 2: Removed -mt-4 and added proper padding for buttons */}
      <div className="px-3 pb-4 w-full flex flex-col">
        <ProductActions product={product} />
      </div>
    </div>
  );
}
