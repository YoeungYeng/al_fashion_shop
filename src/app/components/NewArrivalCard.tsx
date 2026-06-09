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
  const images = product.images || [];
  const hasMultiple = images.length > 1;

  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  // Carousel handlers
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
  };

  const goToImage = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(i);
  };

  // Order handlers
  const handleTelegram = () => {
    const allImages = images
      .map((img) => `${img.split("/").pop()?.split("?")[0] || "image"}\n${img}`)
      .join("\n\n");

    const message = `
NEW SHOE ORDER
-------------------
Name: ${product.name[lang]}
Price: $${product.price}
Category: ${product.category}
Discount: ${product.discount}%
Stock: ${product.inStock ? "In Stock" : "Out of Stock"}

Images:
${allImages}`;

    window.open(`https://t.me/yoeungyeng?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleMessenger = () => {
    const allImages = images
      .map((img) => `${img.split("/").pop()?.split("?")[0] || "image"}\n${img}`)
      .join("\n\n");

    const message = `
NEW SHOE ORDER
-------------------
Name: ${product.name[lang]}
Price: $${product.price}
Category: ${product.category}
Discount: ${product.discount}%
Stock: ${product.inStock ? "In Stock" : "Out of Stock"}

Images:
${allImages}`;

    window.open(`https://m.me/smallTeam760?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className={`group bg-white overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-1 rounded-xl ${kh ? "font-body-kh" : "font-body-en"}`}>
      
      {/* Image Area */}
      <div className="relative overflow-hidden bg-[#FAF6EF] aspect-square">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={images[currentIndex] || "/placeholder.jpg"}
            alt={product.name[lang as Lang]}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Carousel Controls */}
        {hasMultiple && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => goToImage(i, e)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? "bg-white scale-125" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
              {t("home.new")}
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <span className="px-6 py-2 bg-white text-red-600 font-semibold rounded-lg">
              {t("product.outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Product Info - Also Clickable */}
      <Link to={`/products/${product.id}`} className="flex-1 p-4 block">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#9B1C1C] font-bold text-lg">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-gray-400 text-sm line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <h3 className={`text-[#1C1917] font-medium leading-tight line-clamp-2 ${kh ? "text-base" : "text-base"}`}>
          {product.name[lang as Lang]}
        </h3>
      </Link>

      {/* Social Buttons (Stop navigation) */}
      <div className="px-4 pb-4 pt-1" onClick={(e) => e.stopPropagation()}>
        <SocialBar 
          onTelegram={handleTelegram} 
          onMessenger={handleMessenger} 
        />
      </div>
    </div>
  );
}