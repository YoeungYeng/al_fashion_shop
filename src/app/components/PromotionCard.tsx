import { Send } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { Product } from "../data/products";
import { Link } from "react-router";

interface PromotionCardProps {
  product: Product;
}

export function PromotionCard({ product }: PromotionCardProps) {
  const { lang, t } = useLang();
  const kh = lang === "km";

  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  const handleOrder = () => {
    const detailLink = `${window.location.origin}/products/${product.id}`;
    const message = `
      NEW SHOE ORDER
      -------------------
      Name: ${product.name[lang]}
      Price: $${discountedPrice.toFixed(2)}
      Category: ${product.category}
      Discount: ${product.discount}%
      Stock: ${product.inStock ? "In Stock" : "Out of Stock"}
      Product page: ${detailLink}
    `;
    const url = `https://t.me/small_team_bot?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`group bg-white rounded-xl overflow-hidden border border-gray-100 flex flex-col shrink-0 w-44 sm:w-52 cursor-pointer hover:shadow-md transition-all duration-300 ${
        kh ? "font-khmer" : "font-body-en"
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        {/*  */}
        <Link to={`/products/${product.id}`}>
          <img
            src={product.images?.[0]}
            alt={product.name[lang as Lang]}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badge — top left circle like screenshot */}
        {(product.discount > 0 || product.isNew) && (
          <div className="absolute top-2 left-2">
            {product.discount > 0 ? (
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-black/70 text-white text-center leading-tight">
                <span className="text-[11px] uppercase font-bold">OFF</span>
                <span className="text-[12px]  font-extrabold leading-none">
                  {product.discount}%
                </span>
              </div>
            ) : product.isNew ? (
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white">
                <span
                  className={`text-[14px] font-bold uppercase ${
                    kh ? "font-khmer" : "font-header-en"
                  }`}
                >
                  {t("home.new")}
                </span>
              </div>
            ) : null}
          </div>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span
              className={`px-2 py-1 bg-gray-800 text-gray-200 text-[11px] font-semibold rounded ${
                kh ? "font-khmer" : "font-header-en"
              }`}
            >
              {t("product.outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5">
        {/* Price row — original struck through + discounted red, like screenshot */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[#9B1C1C] font-bold text-base">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-gray-400 text-xs line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className={`text-[#1C1917] font-semibold text-xs leading-snug line-clamp-2 ${
            kh ? "font-khmer" : "font-header-en"
          }`}
        >
          {product.name[lang as Lang]}
        </h3>

        {/* Order button */}
        <button
          onClick={handleOrder}
          disabled={!product.inStock}
          className={`mt-1 w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all active:scale-95
            ${
              product.inStock
                ? "bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-60 pointer-events-none"
            }
            ${kh ? "font-khmer" : "font-header-en"}
          `}
        >
          <Send className="w-3 h-3 shrink-0" />
          {t("product.orderTelegram")}
        </button>
      </div>
    </div>
  );
}
