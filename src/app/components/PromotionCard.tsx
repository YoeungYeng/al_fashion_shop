import { Send, MessageCircleMore } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { Product } from "../data/products";
import { Link } from "react-router";
import { SocialBar } from "./SocialBar";

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
  const images = product.images;
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

  const handleTelegramOrder = () => {
    const url = `https://t.me/small_team_bot?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank");
  };

  const handleFacebookOrder = () => {
    // Replace with your Facebook Page username
    window.open("https://m.me/YOUR_PAGE_USERNAME", "_blank");
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
        group
        bg-transparent
        
        overflow-hidden
        border
        border-gray-100
        flex
        flex-col
        shrink-0
        w-[260px]
        sm:w-[280px]
        lg:w-[320px]
        cursor-pointer
        transition-all
        duration-300
        hover:shadow-xl
        hover:-translate-y-1
        ${kh ? "font-khmer" : "font-body-en"}
      `}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-[#F8F8F8] aspect-[4/5]">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.images?.[0]}
            alt={product.name[lang as Lang]}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Discount / New Badge */}
        {(product.discount > 0 || product.isNew) && (
          <div className="absolute top-3 left-3">
            {product.discount > 0 ? (
              <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg">
                <span className="text-[10px] font-bold uppercase leading-none">
                  OFF
                </span>
                <span className="text-sm font-extrabold leading-none">
                  {product.discount}%
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500 text-white shadow-lg">
                <span
                  className={`text-xs font-bold uppercase ${
                    kh ? "font-khmer" : "font-header-en"
                  }`}
                >
                  {t("home.new")}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Out Of Stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span
              className={`
                px-4 py-2
                rounded-lg
                bg-gray-900
                text-white
                text-sm
                font-semibold
                ${kh ? "font-khmer" : "font-header-en"}
              `}
            >
              {t("product.outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-primary font-light text-lg lg:text-xl">
            ${discountedPrice.toFixed(2)}
          </span>

          {product.discount > 0 && (
            <span className="text-gray-400 text-sm line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3
          className={`
      text-[#1C1917]
      font-light
      text-sm
      lg:text-base
      leading-snug
      line-clamp-2
      ${kh ? "font-khmer" : "font-header-en"}
    `}
        >
          {product.name[lang as Lang]}
        </h3>

        {/* Contact Buttons */}
        <div className="flex items-center justify-center">
          <SocialBar
            onTelegram={handleTelegram}
            onMessenger={handleMessenger}
          />
        </div>
      </div>
    </div>
  );
}
