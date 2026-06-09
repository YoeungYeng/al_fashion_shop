import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { SocialBar } from "../components/SocialBar";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLang();
  const kh = lang === "km";

  // Find product by ID
  const product = products.find(p => p.id === Number(id));

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-primary text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const [mainIndex, setMainIndex] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const VISIBLE_THUMBS = 4;
  const canScrollUp = thumbOffset > 0;
  const canScrollDown = thumbOffset + VISIBLE_THUMBS < images.length;

  const scrollUp = () => setThumbOffset((o) => Math.max(o - 1, 0));
  const scrollDown = () => setThumbOffset((o) => Math.min(o + 1, images.length - VISIBLE_THUMBS));

  const discountedPrice = product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product.price;

  // Related products
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const displayProducts = related.length > 0 ? related : products.filter((p) => p.isPopular);

  const handleTelegram = () => {
    const allImages = images
      .map((img) => `${img.split("/").pop()?.split("?")[0] || "image"}\n${img}`)
      .join("\n\n");

    const message = `NEW SHOE ORDER\n-------------------\nName: ${product.name[lang]}\nPrice: $${product.price}\nCategory: ${product.category}\nDiscount: ${product.discount}%\nStock: ${product.inStock ? "In Stock" : "Out of Stock"}\n\nImages:\n${allImages}`;

    window.open(`https://t.me/yoeungyeng?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleMessenger = () => {
    const allImages = images
      .map((img) => {
        const fileName = img.split("/").pop()?.split("?")[0] || "image";
        return `${fileName}\n${img}`;
      })
      .join("\n\n");

    const message = `
      NEW SHOE ORDER
      -------------------
      Name: ${product.name[lang]}
      Price: $${product.price}
      Category: ${product.category}
      Discount: ${product.discount}%
      Stock: ${product.inStock ? "In Stock" : "Out of Stock"}

      -------------------
      Images:
      ${allImages}
    `;

    const url = `https://m.me/smallTeam760?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

 return (
  <div className={`min-h-screen bg-[#FAF6EF] ${kh ? "font-khmer" : "font-body-en"}`}>
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* === IMAGE GALLERY === */}
          <div className="flex gap-3 flex-1">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex flex-col items-center gap-2 w-[72px] shrink-0">
                <button
                  onClick={scrollUp}
                  disabled={!canScrollUp}
                  className={`p-1 rounded-full border transition-all ${
                    canScrollUp
                      ? "border-gray-300 hover:border-primary text-gray-600 hover:text-primary"
                      : "border-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>

                <div className="flex flex-col gap-2 overflow-hidden">
                  {images.slice(thumbOffset, thumbOffset + VISIBLE_THUMBS).map((img, i) => {
                    const realIndex = thumbOffset + i;
                    return (
                      <button
                        key={realIndex}
                        onClick={() => setMainIndex(realIndex)}
                        className={`w-[68px] h-[68px] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          mainIndex === realIndex
                            ? "border-primary shadow-md"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`thumb-${realIndex}`} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/300x300?text=No+Image";
                          }}
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={scrollDown}
                  disabled={!canScrollDown}
                  className={`p-1 rounded-full border transition-all ${
                    canScrollDown
                      ? "border-gray-300 hover:border-primary text-gray-600 hover:text-primary"
                      : "border-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 rounded-2xl overflow-hidden bg-[#FAF6EF] aspect-square max-h-[480px]">
              <img
                src={images[mainIndex] || images[0] || "https://via.placeholder.com/600x600?text=No+Image"}
                alt={product.name[lang as Lang]}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/600x600?text=Image+Not+Found";
                }}
              />
            </div>
          </div>

          {/* === PRODUCT INFO === */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className={`text-3xl font-semibold ${kh ? "font-khmer" : ""}`}>
              {product.name[lang as Lang]}
            </h1>

            <p className="text-gray-600 leading-relaxed">
              {product.description[lang as Lang]}
            </p>

            <div className="text-3xl font-bold text-[#9B1C1C]">
              ${discountedPrice.toFixed(2)}
              {product.discount > 0 && (
                <span className="text-gray-400 line-through ml-3 text-xl">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="font-medium mb-2">{kh ? "ទំហំ:" : "Sizes:"}</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color */}
            {product.color && (
              <div className="flex items-center gap-3">
                <span className="text-gray-500">{kh ? "ពណ៌:" : "Color:"}</span>
                <span className="font-medium">{product.color}</span>
              </div>
            )}

            <SocialBar onTelegram={handleTelegram} onMessenger={handleMessenger} />
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-8">
          {kh ? "ផលិតផលស្រដៀងគ្នា" : "You May Also Like"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
}