import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useLang } from "../context/LanguageContext";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&h=700&fit=crop&auto=format",
    title: {
      en: "Step Into Style",
      km: "ជំហានទៅកាន់ម៉ូដទាន់សម័យ",
    },
    subtitle: {
      en: "Discover the latest sneakers and footwear collections",
      km: "ស្វែងរកស្បែកជើង និងស្បែកជើងកីឡាទំនើបចុងក្រោយ",
    },
    cta: {
      en: "Shop Shoes",
      km: "ទិញស្បែកជើង",
    },
    link: "/products",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1400&h=700&fit=crop&auto=format",
    title: {
      en: "Premium Running Shoes",
      km: "ស្បែកជើងរត់គុណភាពខ្ពស់",
    },
    subtitle: {
      en: "Comfort, speed, and performance for every runner",
      km: "ផាសុកភាព ល្បឿន និងសមត្ថភាពសម្រាប់អ្នករត់គ្រប់រូប",
    },
    cta: {
      en: "Explore Running",
      km: "មើលស្បែកជើងរត់",
    },
    link: "/category/running",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1400&h=700&fit=crop&auto=format",
    title: {
      en: "Casual & Lifestyle Collection",
      km: "ស្បែកជើងប្រចាំថ្ងៃ និងម៉ូដ",
    },
    subtitle: {
      en: "Perfect shoes for work, travel, and everyday wear",
      km: "សាកសមសម្រាប់ការងារ ដំណើរកម្សាន្ត និងប្រើប្រាស់ប្រចាំថ្ងៃ",
    },
    cta: {
      en: "View Collection",
      km: "មើលបណ្ដុំផលិតផល",
    },
    link: "/category/casual",
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
    <div className={`relative w-full h-[480px] sm:h-[560px] lg:h-[640px] overflow-hidden bg-background ${kh ? "font-khmer" : ""}`}>

      {/* IMAGE */}
      <img
        key={slide.id}
        src={slide.image}
        alt={slide.title.en}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* CONTENT */}
      <div
        className={`absolute inset-0 flex items-center transition-all duration-500 ${
          animating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-xl">

            {/* Accent line */}
            <div className="w-14 h-[3px] bg-primary mb-5 rounded-full" />

            {/* TITLE */}
            <h1
              className={`text-white mb-4 leading-tight font-semibold ${
                kh
                  ? "Kantumruy_Pro text-3xl sm:text-4xl"
                  : "Poppins text-4xl sm:text-5xl lg:text-6xl"
              }`}
            >
              {slide.title[lang]}
            </h1>

            {/* SUBTITLE */}
            <p
              className={`text-white/80 mb-8 text-base sm:text-lg font-normal ${
                kh ? "Battambang" : "Inter"
              }`}
            >
              {slide.subtitle[lang]}
            </p>

            {/* CTA BUTTON */}
            <button
              onClick={() => navigate(slide.link)}
              className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg
                bg-primary text-primary-foreground hover:bg-primary/90
                ${kh ? "font-header-kh" : "font-header-en"}
              `}
            >
              {slide.cta[lang]}
            </button>

          </div>
        </div>
      </div>

      {/* PREV */}
      <button
        onClick={() => go(current - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* NEXT */}
      <button
        onClick={() => go(current + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? "w-7 bg-primary"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

    </div>
  );
}