import { Send } from "lucide-react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { Product } from "../data/products";
import { Link } from "react-router";

interface ProductCardProps {
  product: Product;
}

// ←←← CHANGE THIS TO YOUR PERSONAL TELEGRAM USERNAME
const TELEGRAM_USERNAME = "yoeungyeng"; // e.g. "john_doe" without @
const BOT_TOKEN = "8721063918:AAHNrOPCapeQl9nRd5uOojuKipWX2pMdf4M";
const CHAT_ID = "8721063918";

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLang();
  const kh = lang === "km";
  const [currentIndex, setCurrentIndex] = useState(0);

  const images: string[] = product.images?.length
    ? product.images
    : product.images
      ? [product.images[0]]
      : [];

  const hasMultiple = images.length > 1;

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  const handleOrder = () => {
    const imageLines = images
      .map((img, index) => {
        const fileName =
          img.split("/").pop()?.split("?")[0] || `photo-${index + 1}`;
        return `photo-${index + 1}\n${img}`;
      })
      .join("\n\n");

    const message = `NEW SHOE ORDER
        -------------------
        Name: ${product.name[lang]}
        Price: $${product.price}
        Qty: 1
        Size: Not selected
        Total: $${discountedPrice.toFixed(2)}
        Category: ${product.category}
        Discount: ${product.discount}%
        Stock: ${product.inStock ? "In Stock" : "Out of Stock"}

-------------------
Images:
${imageLines}`;
    console.log(imageLines);

    const encodedMessage = encodeURIComponent(message);
    const url = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  return (
    <div
      className={`group bg-white rounded-xl overflow-hidden  hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-1 ${kh ? "font-khmer" : "font-body-en"}`}
    >
      {/* Image Carousel - unchanged */}
      <div className="relative overflow-hidden bg-[#FAF6EF] aspect-square">
        <Link to={`/products/${product.id}`}>
          <img
            src={images[currentIndex]}
            alt={`${product.name[lang as Lang]} ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {hasMultiple && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-0.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-0.5 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentIndex ? "bg-white scale-125" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex justify-center items-center flex-col gap-1 ">
          {product.isNew && (
            <span
              className={`px-2 py-0.5 bg-primary text-white text-[10px] font-semibold rounded-full uppercase ${kh ? "font-khmer" : ""}`}
            >
              {t("home.new")}
            </span>
          )}
          {product.isPopular && (
            <span
              className={`px-2 py-0.5 bg-[#C9A84C] text-white text-[12px] font-semibold rounded-full uppercase ${kh ? "font-khmer" : ""}`}
            >
              {t("home.popular")}
            </span>
          )}
          {product.discount > 0 && (
            <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full shadow-sm">
              -{product.discount}% {t("product.discount")}
            </span>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span
              className={`px-3 py-1.5 bg-gray-800 text-gray-200 text-xs font-semibold rounded ${kh ? "font-khmer" : ""}`}
            >
              {t("product.outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[#9B1C1C] font-bold text-base">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-gray-400 text-xs line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <h3
          className={`text-[#1C1917] font-semibold line-clamp-2 leading-snug ${kh ? "font-khmer text-base" : "text-sm"}`}
        >
          {product.name[lang as Lang]}
        </h3>

        <button
          onClick={handleOrder}
          disabled={!product.inStock}
          className={`mt-1 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all active:scale-95
            ${
              product.inStock
                ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-md"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-60 pointer-events-none"
            } ${kh ? "font-khmer" : ""}`}
        >
          <Send className="w-3.5 h-3.5 flex-shrink-0" />
          {t("product.orderTelegram")}
        </button>
      </div>
    </div>
  );
}
