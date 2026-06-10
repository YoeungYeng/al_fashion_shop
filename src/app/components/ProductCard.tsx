import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { Product } from "../data/products";
import { Link } from "react-router";
import { SocialBar } from "./SocialBar";

interface ProductCardProps {
  product: Product;
}

// Telegram username only (safe)
const TELEGRAM_USERNAME = "yoeungyeng";

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLang();
  const kh = lang === "km";
  const [currentIndex, setCurrentIndex] = useState(0);

  // CLEAN IMAGE LOGIC
  const images = product.images?.length ? product.images : [];
  const hasMultiple = images.length > 1;

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  // PRICE CALC
  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  // TELEGRAM ORDER (SAFE + CLEAN)
  const handleOrder = () => {
    const message = `🛒 NEW ORDER
    ----------------
    Name: ${product.name[lang]}
    Price: $${discountedPrice.toFixed(2)}
    Category: ${product.category}
    Discount: ${product.discount}%
    Stock: ${product.inStock ? "In Stock" : "Out of Stock"}
    `;

    const encodedMessage = encodeURIComponent(message);

    const url = `https://t.me/share/url?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  const handleTelegram = () => {
    const allImages = images
      .map((img) => {
        const fileName = img.split("/").pop()?.split("?")[0] || "image";
        return `${fileName}\n${img}`;
      })
      .join("\n\n");

    const message = `
      NEW SHOE ORDER
      -------------------
      Name: ${product.name[lang]}
      Price: $${product.price}
      Category: ${product.category}
      Discount: ${product.discount}%
      Stock: ${product.inStock ? "In Stock" : "Out of Stock"}

      -------------------
      Images:
      ${allImages}
    `;

    const url = `https://t.me/yoeungyeng?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleMessenger = () => {
    const allImages = images
      .map((img) => {
        const fileName = img.split("/").pop()?.split("?")[0] || "image";
        return `${fileName}\n${img}`;
      })
      .join("\n\n");

    const message = `
      NEW SHOE ORDER
      -------------------
      Name: ${product.name[lang]}
      Price: $${product.price}
      Category: ${product.category}
      Discount: ${product.discount}%
      Stock: ${product.inStock ? "In Stock" : "Out of Stock"}

      -------------------
      Images:
      ${allImages}
    `;

    const url = `https://m.me/smallTeam760?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`
        group   overflow-hidden
        hover:-translate-y-1 transition-all duration-300
        flex flex-col
        ${kh ? "font-khmer" : "font-body-en"}
      `}
    >
      {/* IMAGE SECTION */}
      <div className="relative overflow-hidden bg-[#FAF6EF] aspect-square">
        <Link to={`/products/${product.id}`}>
          <img
            src={images[currentIndex]}
            alt={product.name[lang as Lang]}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* NAV ARROWS */}
        {hasMultiple && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-12 h-12 text-gray-400 drop-shadow-md" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-12 h-12 text-gray-400 drop-shadow-md" />
            </button>

            {/* DOTS */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* BADGES */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {/* {product.isNew && (
            <span className="px-2 py-0.5 w-8 h-8 flex justify-center items-center bg-red-500 text-white text-[14px] rounded-full">
              {t("home.new")}
            </span>
          )} */}

          {/* {product.isPopular && (
            <span className="px-2 py-0.5 bg-yellow-500 text-white text-[10px] rounded-full">
              {t("home.popular")}
            </span>
          )}

          {product.discount > 0 && (
            <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full">
              -{product.discount}%
            </span>
          )} */}
        </div>

        {/* OUT OF STOCK */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-3 py-1 text-xs rounded">
              {t("product.outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* PRICE */}
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

        {/* NAME */}
        <h3
          className={`
            text-[#1C1917] font-semibold text-sm line-clamp-2
            ${kh ? "font-khmer" : ""}
          `}
        >
          {product.name[lang as Lang]}
        </h3>

        {/* ACTIONS */}
        <SocialBar onTelegram={handleTelegram} onMessenger={handleMessenger} />
      </div>
    </div>
  );
}
