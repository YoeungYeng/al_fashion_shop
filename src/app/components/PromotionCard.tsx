import { CompactProductCard } from "./CompactProductCard";
import { Product } from "../data/products";

interface PromotionCardProps {
  product: Product;
  onLinkClick?: (e: React.MouseEvent) => void;
}

export function PromotionCard({ product, onLinkClick }: PromotionCardProps) {
  return (
    <CompactProductCard
      product={product}
      showCarousel={false}
      className="w-full border-0 shadow-none"
      imageAspect="aspect-square"
      onLinkClick={onLinkClick}
    />
  );
}