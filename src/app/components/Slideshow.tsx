import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useLang } from "../context/LanguageContext";
import slide1 from "../../assets/vetrivel-viswanathar.jpg";
import slide2 from "../../assets/vitor-monthay.jpg";
const slides = [
  // {
  //   id: 1,
  //   image:
  //     "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=2000",
  //   title: {
  //     en: "Classic Derby Shoes",
  //     km: "ស្បែកជើង Derby បុរាណ",
  //   },
  //   subtitle: {
  //     en: "Premium leather craftsmanship for modern gentlemen",
  //     km: "ស្បែកជើងស្បែកគុណភាពខ្ពស់សម្រាប់បុរសទំនើប",
  //   },
  //   cta: {
  //     en: "Shop Derby",
  //     km: "ទិញ Derby",
  //   },
  //   link: "/products",
  // },
  {
    id: 2,
    image:
      slide1,
    title: {
      en: "Elegant Oxford Collection",
      km: "បណ្តុំស្បែកជើង Oxford",
    },
    subtitle: {
      en: "Timeless style for business and formal occasions",
      km: "សម្រាប់ការងារ និងពិធីការផ្លូវការ",
    },
    cta: {
      en: "Explore Oxford",
      km: "មើល Oxford",
    },
    link: "/products",
  },
  {
    id: 3,
    image:
      slide2,
    title: {
      en: "Premium Leather Loafers",
      km: "ស្បែកជើង Loafers ប្រណិត",
    },
    subtitle: {
      en: "Comfort, elegance and style in every step",
      km: "ផាសុកភាព ភាពប្រណិត និងម៉ូដគ្រប់ជំហាន",
    },
    cta: {
      en: "Shop Loafers",
      km: "ទិញ Loafers",
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
                ? "w-8 bg-black/70"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}