import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useLang } from "../context/LanguageContext";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop",
    title: {
      en: "Sneaker Collection",
      km: "បណ្តុំស្បែកជើងកីឡា",
    },
    subtitle: {
      en: "Modern style and everyday comfort",
      km: "ម៉ូដទាន់សម័យ និងផាសុកភាពប្រចាំថ្ងៃ",
    },
    cta: {
      en: "Shop Sneakers",
      km: "ទិញស្បែកជើងកីឡា",
    },
    link: "/products",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=2000&auto=format&fit=crop",
    title: {
      en: "Premium Loafers",
      km: "ស្បែកជើង Loafers ប្រណិត",
    },
    subtitle: {
      en: "Elegant leather loafers for every occasion",
      km: "ស្បែកជើង Loafers ស្បែកសម្រាប់គ្រប់ឱកាស",
    },
    cta: {
      en: "Explore Loafers",
      km: "មើល Loafers",
    },
    link: "/products",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=2000&auto=format&fit=crop",
    title: {
      en: "Leather Boots",
      km: "ស្បែកជើងកវែងស្បែក",
    },
    subtitle: {
      en: "Built for durability, comfort and style",
      km: "រឹងមាំ ផាសុកភាព និងទាន់សម័យ",
    },
    cta: {
      en: "Shop Boots",
      km: "ទិញស្បែកជើងកវែង",
    },
    link: "/products",
  },
];
export function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const { lang } = useLang();
  const navigate = useNavigate();

  const kh = lang === "km";

  const go = (index: number) => {
    if (animating) return;

    setAnimating(true);

    setTimeout(() => {
      setCurrent((index + slides.length) % slides.length);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      go(current + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[480px] sm:h-[550px] lg:h-[900px] overflow-hidden bg-black">
      {/* IMAGE */}
      <img
        key={slide.id}
        src={slide.image}
        alt={slide.title.en}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div
        className={`absolute inset-0 flex items-center transition-all duration-500 ${
          animating
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
      >
      
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={() => go(current - 1)}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 sm:p-3 rounded-full transition"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => go(current + 1)}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 sm:p-3 rounded-full transition"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i
                ? "w-8 bg-primary"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}