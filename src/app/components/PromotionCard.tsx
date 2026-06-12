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
      className="w-[160px] sm:w-[200px] md:w-[220px] shrink-0 border-0 shadow-none"
      imageAspect="aspect-square"
      onLinkClick={onLinkClick}
    />
  );
}