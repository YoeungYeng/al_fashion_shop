import { useLang, Lang } from "../context/LanguageContext";
import { Product } from "../data/products";
import { Link } from "react-router";
import { ProductActions } from "./ProductActions";
import { CompactProductCard } from "./CompactProductCard";

interface PromotionCardProps {
  product: Product;
  onLinkClick?: (e: React.MouseEvent) => void;
}

export function PromotionCard({ product, onLinkClick }: PromotionCardProps) {
  const { lang, t } = useLang();
  const kh = lang === "km";

  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  return (
    <>
      <CompactProductCard
        product={product}
        // className="w-full"
        imageAspect="aspect-square"
         onLinkClick={onLinkClick}
      />
    </>
  );
}
