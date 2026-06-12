import { CompactProductCard } from "./CompactProductCard";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <CompactProductCard
      product={product}
      showCarousel={true}           // Enable carousel
      imageAspect="aspect-square"   // Square for main ProductCard
      className=" w-full border-0 shadow-none"
    />
  );
}