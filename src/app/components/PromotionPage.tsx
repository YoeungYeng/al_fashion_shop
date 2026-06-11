import { useRef, useState } from "react";
import { Link } from "react-router";
import { useLang } from "../context/LanguageContext";
import { products } from "../data/products";
import { PromotionCard } from "./PromotionCard";

export function PromotionPage() {
  const { lang } = useLang();
  const kh = lang === "km";

  const scrollRef      = useRef<HTMLDivElement>(null);
  const isDragging     = useRef(false);
  const didDrag        = useRef(false);
  const dragStartX     = useRef(0);
  const dragScrollLeft = useRef(0);
  const lastX          = useRef(0);
  const velocity       = useRef(0);
  const animFrame      = useRef<number>(0);

  const [activeDot, setActiveDot] = useState(0);

  const DOT_COUNT = 3;

  const promotionProducts = products.filter(
    (p) => p.discount > 0 || p.isNew || p.isPopular,
  );

  const handleScrollUpdate = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const scrollProgress = el.scrollLeft / max;
    setActiveDot(Math.round(scrollProgress * (DOT_COUNT - 1)));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    cancelAnimationFrame(animFrame.current);
    isDragging.current = true;
    didDrag.current = false;                   
    dragStartX.current = e.pageX - scrollRef.current.offsetLeft;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
    lastX.current = e.pageX;
    velocity.current = 0;
    scrollRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - dragStartX.current;
    if (Math.abs(walk) > 5) didDrag.current = true; 
    velocity.current = e.pageX - lastX.current;
    lastX.current = e.pageX;
    scrollRef.current.scrollLeft = dragScrollLeft.current - walk;
    handleScrollUpdate();
  };

  const onMouseUp = () => {
    if (!scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
    const glide = () => {
      if (!scrollRef.current) return;
      if (Math.abs(velocity.current) < 0.5) return;
      scrollRef.current.scrollLeft -= velocity.current;
      velocity.current *= 0.92;
      handleScrollUpdate();
      animFrame.current = requestAnimationFrame(glide);
    };
    animFrame.current = requestAnimationFrame(glide);
  };

  const onMouseLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  return (
    <div className={kh ? "font-body-kh" : "font-body-en"}>
      <section className="w-full py-8 md:py-10 lg:py-14">
        <div className=" mx-auto px-4 md:px-8 lg:px-12">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-xl lg:text-2xl font-bold text-[#1C1917] ${
                kh ? "font-header-kh" : "font-header-en"
              }`}
            >
              {kh ? "បញ្ចុះតម្លៃពិសេស" : "Flash Sale"}
            </h2>

            <Link
              to="/products"
              
              className={`flex items-center gap-2 text-xl font-bold text-black hover:text-black/60 transition-colors ${
                kh ? "font-body-kh" : "font-body-en"
              }`}
            >
              {kh ? "មើលទាំងអស់" : "Shop More"}
            </Link>
          </div>

          {/* Slider */}
          <div
            ref={scrollRef}
            onScroll={handleScrollUpdate}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            className="flex gap-6 overflow-x-auto px-2 md:px-4 pb-4 scrollbar-hide cursor-grab select-none"
          >
            {promotionProducts.map((product) => (
              <PromotionCard
                key={product.id}
                product={product}
                onLinkClick={(e) => {
                  if (didDrag.current) e.preventDefault();
                }}
              />
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {Array.from({ length: DOT_COUNT }).map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === activeDot
                    ? "w-4 h-2 bg-gray-700"
                    : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}