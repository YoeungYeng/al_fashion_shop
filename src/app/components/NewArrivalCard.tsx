import { Send, Tag, CheckCircle, XCircle } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { Product } from "../data/products";

interface NewArrivalCardProps {
  product: Product;
}

export function NewArrivalCard({ product }: NewArrivalCardProps) {
  const { lang, t } = useLang();
  const kh = lang === "km";

  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  // handle order button click — use product from closure to avoid event being passed
  const handleOrder = () => {
    const message = `
      NEW SHOE ORDER
      -------------------
      Name: ${product.name[lang]}
      Price: $${product.price}
      Category: ${product.category}
      Discount: ${product.discount}%
      Stock: ${product.inStock ? "In Stock" : "Out of Stock"}
      
      -------------------
      Image:
      ${product.image} 
    `;

    const username = "small_team_bot";
    const url = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-1 ${kh ? "font-khmer" : "font-body-en"}`}>
      {/* Image */}
      <div className="relative overflow-hidden bg-[#FAF6EF] aspect-square">
        <img
          src={product.image}
          alt={product.name[lang as Lang]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col justify-center items-center  gap-1">
          {product.isNew && (
            <span
              className={`px-2 py-0.5 bg-primary text-white  text-[12px] font-semibold rounded-full uppercase ${kh ? "font-khmer" : ""}`}
            >
              {t("home.new")}
            </span>
          )}
          {product.isPopular && (
            <span
              className={`px-2 py-0.5 bg-[#cfa83a] text-[#ffffff] text-[12px] font-semibold rounded-full uppercase ${kh ? "font-khmer" : ""}`}
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

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span
              className={`px-3 py-1.5 bg-gray-800 text-gray-200 text-[12px] font-semibold rounded ${kh ? "font-khmer" : ""}`}
            >
              {t("product.outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        {/* Name */}
        <h3
          className={`text-[#1C1917] font-semibold line-clamp-2 leading-snug ${kh ? "Battambang text-base" : "Inter text-sm"}`}
        >
          {product.name[lang as Lang]}
        </h3>

        {/* Description */}
        <p
          className={`text-gray-500 text-xs line-clamp-2 flex-1 ${kh ? "Battambang leading-relaxed" : "Inter"}`}
        >
          {product.description[lang as Lang]}
        </p>

        {/* Price row */}
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

        {/* Telegram button */}
        <button
          onClick={handleOrder}
          disabled={!product.inStock}
          className={`mt-1 w-1/2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all active:scale-95
      ${
        product.inStock
          ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-md"
          : "bg-muted text-muted-foreground cursor-not-allowed opacity-60 pointer-events-none"
      }
      ${kh ? "font-khmer" : ""}
    `}
        >
          <Send className="w-3.5 h-3.5 flex-shrink-0" />
          {t("product.orderTelegram")}
        </button>
      </div>
    </div>
  );
}
