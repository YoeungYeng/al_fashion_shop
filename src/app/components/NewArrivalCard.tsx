import { MessageCircleMore, Send } from "lucide-react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { Product } from "../data/products";
import { Link } from "react-router";
import { SocialBar } from "./SocialBar";

interface NewArrivalCardProps {
  product: Product;
}

export function NewArrivalCard({ product }: NewArrivalCardProps) {
  const { lang, t } = useLang();
  const kh = lang === "km";
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product.images;
  const hasMultiple = images.length > 1;

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
  };

  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  const handleOrder = () => {
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

    const url = `https://t.me/small_team_bot?text=${encodeURIComponent(message)}`;
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
      className={`group bg-transparent overflow-hidden  hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-1 ${kh ? "font-body-kh" : "font-body-en"}`}
    >
      {/* Image Carousel */}
      <div className="relative overflow-hidden bg-[#FAF6EF] aspect-square">
        <Link to={`/products/${product.id}`}>
          <img
            src={images[currentIndex]}
            alt={`${product.name[lang as Lang]} ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Prev / Next buttons */}
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

            {/* Dot indicators */}
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
        <div className="absolute top-2 left-2 flex justify-center items-center flex-col gap-1">
          {product.isNew && (
            <span
              className={`px-2 py-0.5 w-8 h-8 flex justify-center items-center bg-primary text-white text-[14px] font-semibold rounded-full uppercase ${kh ? "font-body-kh" : "font-body-en"}`}
            >
              {t("home.new")}
            </span>
          )}
          {/* {product.isPopular && (
            <span
              className={`px-2 py-0.5 bg-[#cfa83a] text-white text-[12px] font-semibold rounded-full uppercase ${kh ? "font-body-kh" : "font-body-en"}`}
            >
              {t("home.popular")}
            </span>
          )} */}
          {/* {product.discount > 0 && (
            <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full shadow-sm">
              -{product.discount}% {t("product.discount")}
            </span>
          )} */}
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span
              className={`px-3 py-1.5 bg-gray-800 text-gray-200 text-[12px] font-semibold rounded ${kh ? "font-body-kh" : "font-body-en"}`}
            >
              {t("product.outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[#9B1C1C] font-bold text-sm">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-gray-400 text-xs line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <h3
          className={`text-[#1C1917] font-light line-clamp-2 leading-snug ${
            kh ? "font-header-kh text-sm" : "font-header-en text-sm"
          }`}
        >
          {product.name[lang as Lang]}
        </h3>
        {/* <p
          className={`text-gray-500 text-xs line-clamp-2 flex-1 ${
            kh ? "font-body-kh leading-relaxed" : "font-body-en"
          }`}
        >
          {product.description[lang as Lang]}
        </p> */}

        {/* CONTACT BUTTONS */}
        <SocialBar onTelegram={handleTelegram} onMessenger={handleMessenger} />
      </div>
    </div>
  );
}
