import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useLang } from "../context/LanguageContext";

const slides = [
  {
    id: 1,
    image:
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PW1-66210006-41-5_1800x1800.jpg?v=1780462049",
    title: { en: "Step Into Style", km: "ជំហានទៅកាន់ម៉ូដទាន់សម័យ" },
    subtitle: {
      en: "Discover the latest sneakers and footwear collections",
      km: "ស្វែងរកស្បែកជើង និងស្បែកជើងកីឡាទំនើបចុងក្រោយ",
    },
    cta: { en: "Shop Shoes", km: "ទិញស្បែកជើង" },
    link: "/products",
  },
  {
    id: 2,
    image:
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PW1-66210006-41-5_1800x1800.jpg?v=1780462049",
    title: { en: "Premium Running Shoes", km: "ស្បែកជើងរត់គុណភាពខ្ពស់" },
    subtitle: {
      en: "Comfort, speed, and performance for every runner",
      km: "ផាសុកភាព ល្បឿន និងសមត្ថភាពសម្រាប់អ្នករត់គ្រប់រូប",
    },
    cta: { en: "Explore Running", km: "មើលស្បែកជើងរត់" },
    link: "/products",
  },
  {
    id: 3,
    image:
      "https://pedroshoes.com.kh/cdn/shop/files/2025-L3-PM1-46380091-29-2_e0c8f614-60bc-49be-bac2-1dd4bc381d79_1800x1800.jpg?v=1749086562",
    title: {
      en: "Casual & Lifestyle Collection",
      km: "ស្បែកជើងប្រចាំថ្ងៃ និងម៉ូដ",
    },
    subtitle: {
      en: "Perfect shoes for work, travel, and everyday wear",
      km: "សាកសមសម្រាប់ការងារ ដំណើរកម្សាន្ត និងប្រើប្រាស់ប្រចាំថ្ងៃ",
    },
    cta: { en: "View Collection", km: "មើលបណ្ដុំផលិតផល" },
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
    const timer = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[480px] sm:h-[480px] lg:h-[900px] overflow-hidden bg-black">
      {/* IMAGE */}
      <img
        key={slide.id}
        src={slide.image}
        alt={slide.title.en}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      />

  
      <div
        className={`absolute inset-0 flex items-center transition-all duration-500 ${
          animating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-xl"></div>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? "w-6 sm:w-7 bg-primary"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
