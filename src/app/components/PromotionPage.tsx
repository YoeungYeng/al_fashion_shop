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

  // ✅ show only discounted products
  const promotionProducts = products.filter(
    (p) => p.discount && p.discount > 0
  );

  // ✅ 4 cards per view (LIKE YOUR IMAGE)
  const CARDS_PER_VIEW = 4;

  const DOT_COUNT = Math.ceil(
    promotionProducts.length / CARDS_PER_VIEW
  );

  // =========================
  // SCROLL HANDLING (PAGE BASED)
  // =========================
  const handleScrollUpdate = () => {
    const el = scrollRef.current;
    if (!el) return;

    const pageWidth = el.clientWidth;
    const index = Math.round(el.scrollLeft / pageWidth);

    setActiveDot(index);
  };

  // =========================
  // DRAG START
  // =========================
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

  // =========================
  // DRAG MOVE
  // =========================
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

  // =========================
  // DRAG END + GLIDE
  // =========================
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

    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
    }
  };

  // =========================
  // DOT CLICK NAVIGATION
  // =========================
  const scrollToPage = (page: number) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({
      left: el.clientWidth * page,
      behavior: "smooth",
    });

    setActiveDot(page);
  };

  // =========================
  // EMPTY STATE
  // =========================
  if (promotionProducts.length === 0) return null;

  return (
    <div className={`w-full ${kh ? "font-body-kh" : "font-body-en"}`}>
      <section className="w-full py-8 md:py-10 lg:py-14">
        <div className="mx-auto px-4 md:px-8 lg:px-12">

          {/* =========================
              SLIDER
          ========================= */}
          <div
            ref={scrollRef}
            onScroll={handleScrollUpdate}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            className="
              flex
              gap-6
              overflow-x-auto
              scroll-smooth
              scrollbar-hide
              cursor-grab
              select-none
              snap-x snap-mandatory
            "
          >
            {promotionProducts.map((product) => (
              <div
                key={product.id}
                className="
                  
                  flex-shrink-0
                  snap-start
                "
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

          {/* =========================
              DOTS (LIKE IMAGE)
          ========================= */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {Array.from({ length: DOT_COUNT }).map((_, i) => (
              <span
                key={i}
                onClick={() => scrollToPage(i)}
                className={`
                  rounded-full
                  cursor-pointer
                  transition-all
                  duration-300
                  ${
                    i === activeDot
                      ? "w-6 h-2 bg-blue-900"
                      : "w-2 h-2 bg-gray-300"
                  }
                `}
              />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}