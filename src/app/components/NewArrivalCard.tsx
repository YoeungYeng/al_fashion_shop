import { CompactProductCard } from "./CompactProductCard";

export function NewArrivalCard({ product }: NewArrivalCardProps) {
  return (
    <CompactProductCard
      product={product}
      showCarousel={true}
      imageAspect="aspect-square" // Square for main ProductCard
      className="w-full border-0 shadow-none "
    />
  );
}
