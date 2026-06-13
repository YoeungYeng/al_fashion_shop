import { Send, MessageCircleMore, Share2 } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { Product } from "../data/products";

interface ProductActionsProps {
  product: Product;
  showShareUrl?: boolean;
}

export function ProductActions({
  product,
  showShareUrl = false,
}: ProductActionsProps) {
  const { lang } = useLang();
  const kh = lang === "km";

  const images = product.images?.length ? product.images : [];

  const discountRate = Math.max(
    0,
    Math.min(100, Number(product.discount) || 0),
  );

  const discountedPrice =
    discountRate > 0 ? product.price * (1 - discountRate / 100) : product.price;

  const handleTelegramOrder = () => {
    const productUrl = `${window.location.origin}/products/${product.slug}`;
    const message = `
    🛒 NEW SHOE ORDER
${productUrl}
    Name: ${product.name[lang as Lang]}
    Price: $${discountedPrice.toFixed(2)}
    ${discountRate > 0 ? `Original Price: $${product.price.toFixed(2)}` : ""}
    Category: ${product.category}
    Discount: ${discountRate}%
    Stock: ${product.inStock ? "In Stock" : "Out of Stock"}
    
`.trim();

    window.open(
      `https://t.me/yoeungyeng?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleShareFacebook = () => {
    const productUrl = `${window.location.origin}/products/${product.slug}`;

    const message = `
    Hi! I'm interested in this product:

    👟 ${product.name[lang as Lang]}
    💰 $${discountedPrice.toFixed(2)}
    ${discountRate > 0 ? `🔥 ${discountRate}% OFF` : ""}

🛍 ${productUrl}
  `.trim();

    window.open(
      `https://m.me/smallTeam760?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleShareViaUrl = () => {
    const telegramUsername = "yoeungyeng"; // without @

    const productUrl = `${window.location.origin}/products/${product.slug}`;

    const message = `
🛍 ${product.name[lang as Lang]}
💰 $${discountedPrice.toFixed(2)}
${discountRate > 0 ? `🔥 ${discountRate}% OFF` : ""}
🔗 ${productUrl}
`.trim();

    // Open seller chat
    window.open(`https://t.me/${telegramUsername}`, "_blank");

    // Optional: copy message to clipboard
    navigator.clipboard.writeText(message);
  };

  const buttonClass = `w-full h-8 text-[12px] sm:text-[12px] md:text-[12px] rounded flex items-center hover:cursor-pointer justify-center gap-2 text-[12px] 
    text-white transition-all duration-200 active:scale-95`;

  return (
    <div
      className={`grid w-full gap-3 ${
        showShareUrl
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2"
      }`}
    >
      {/* Telegram */}
      <button
        onClick={handleTelegramOrder}
        className={`${buttonClass} bg-[#229ED9] hover:bg-[#1A8AC4] rounded`}
      >
        <Send className="w-3 h-3 md:w-3 md:-h-3 sm:w-3 sm:-3 shrink-0 text-[12px] sm:text-sm md:text-[12px]" />
        <span>{kh ? "Telegram" : "Telegram"}</span>
      </button>

      {/* Messenger */}
      <button
        onClick={handleShareFacebook}
        className={`${buttonClass} bg-[#0084FF] hover:bg-[#0077E6]`}
      >
        <MessageCircleMore className="w-3 h-3 md:w-3 md:-h-3 sm:w-3 sm:-3 shrink-0 text-[12px] sm:text-sm md:text-[12px]" />
        <span>{kh ? "Messenger" : "Messenger"}</span>
      </button>

      {/* Share */}
      {/* {showShareUrl && (
        <button
          onClick={handleShareViaUrl}
          className={`${buttonClass} bg-gray-700 hover:bg-gray-800`}
        >
          <Share2 className="w-5 h-5 shrink-0" />
          <span>{kh ? "ចែករំលែក" : "Share"}</span>
        </button>
      )} */}
    </div>
  );
}
