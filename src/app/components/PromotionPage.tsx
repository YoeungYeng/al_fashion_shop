import { useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { products } from "../data/products";
import { PromotionCard } from "./PromotionCard";

export function PromotionPage() {
  const { lang } = useLang();
  const kh = lang === "km";

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const animFrame = useRef<number>(0);
  const [activeDot, setActiveDot] = useState(0);
  const DOT_COUNT = 3;

  const promotionProducts = products.filter((p) => p.discount && p.discount > 0);

  const handleScrollUpdate = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const scrollProgress = el.scrollLeft / max;
    setActiveDot(Math.round(scrollProgress * (DOT_COUNT - 1)));
  };

  // ... (keep all onMouseDown, onMouseMove, onMouseUp, onMouseLeave logic exactly as you have it)
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
    if (Math.abs(walk) >= 4) didDrag.current = true;
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

  if (promotionProducts.length === 0) return null;

  return (
    <div className={`w-full ${kh ? "font-body-kh" : "font-body-en"}`}>
      <section className="w-full py-4">
        <div className="mx-auto px-4 md:px-8 lg:px-12">
          <div
            ref={scrollRef}
            onScroll={handleScrollUpdate}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            /* gap-5 (20px) and lg:gap-6 (24px) to match New Arrivals exactly */
            className="flex items-start w-full h-auto gap-5 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide cursor-grab select-none snap-x snap-mandatory"
          >
            {promotionProducts.map((product) => (
              /* 
                 CLEAN WRAPPER:
                 - shrink-0: Stops the cards from squashing (The most important fix!)
                 - w-[calc...]: Precisely matches New Arrival Grid columns
              */
              <div 
                key={product.id} 
                className="snap-start shrink-0 w-[calc(50%-10px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)]"
              > 
                <PromotionCard
                  product={product}
                  
                  onLinkClick={(e) => {
                    if (didDrag.current) e.preventDefault();
                  }}
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {Array.from({ length: DOT_COUNT }).map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === activeDot ? "w-4 h-2 bg-gray-700" : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
