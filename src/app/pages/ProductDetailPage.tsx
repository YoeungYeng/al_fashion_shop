import { useState } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { ProductCard } from "../components/ProductCard";
import { products, categories, menus } from "../data/products";
import { SocialBar } from "../components/SocialBar";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLang();
  const [searchParams] = useSearchParams();

  const kh = lang === "km";
  const l = lang as "en" | "km";

  // Font helpers
  const headerFont = kh ? "font-header-kh" : "font-header-en";
  const bodyFont = kh ? "font-body-kh" : "font-body-en";

  // ALL hooks must be declared before any early return
  const [mainIndex, setMainIndex] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // URL params
  const genderFromUrl = searchParams.get("gender") as "men" | "women" | null;

  // Find product
  const product = products.find((p) => p.id === Number(id));

  // Derived values (safe after hooks, before early return)
  const currentMenu = menus.find((m) => m.slug === genderFromUrl);
  const currentCategory = product
    ? categories.find((c) => c.slug === product.category)
    : undefined;

  // Early return — after all hooks
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`${headerFont} text-2xl font-bold mb-4`}>
            {kh ? "រកមិនឃើញផលិតផល" : "Product Not Found"}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className={`${bodyFont} px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition`}
          >
            {kh ? "ត្រឡប់ក្រោយ" : "Go Back"}
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [];

  const VISIBLE_THUMBS = 4;
  const canScrollUp = thumbOffset > 0;
  const canScrollDown = thumbOffset + VISIBLE_THUMBS < images.length;

  const scrollUp = () => setThumbOffset((o) => Math.max(o - 1, 0));
  const scrollDown = () =>
    setThumbOffset((o) => Math.min(o + 1, images.length - VISIBLE_THUMBS));

  const discountedPrice =
    product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  // Related products
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  const displayProducts =
    related.length > 0 ? related : products.filter((p) => p.isPopular);

  const handleTelegram = () => {
    const allImages = images
      .map((img) => `${img.split("/").pop()?.split("?")[0] || "image"}\n${img}`)
      .join("\n\n");

    const message =
      `NEW SHOE ORDER\n` +
      `-------------------\n` +
      `Name: ${product.name[l]}\n` +
      `Price: $${product.price}\n` +
      `Size: ${selectedSize ?? "Not selected"}\n` +
      `Category: ${product.category}\n` +
      `Discount: ${product.discount}%\n` +
      `Stock: ${product.inStock ? "In Stock" : "Out of Stock"}\n\n` +
      `Images:\n${allImages}`;

    window.open(
      `https://t.me/yoeungyeng?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleMessenger = () => {
    const allImages = images
      .map((img) => {
        const fileName = img.split("/").pop()?.split("?")[0] || "image";
        return `${fileName}\n${img}`;
      })
      .join("\n\n");

    const message =
      `NEW SHOE ORDER\n` +
      `-------------------\n` +
      `Name: ${product.name[l]}\n` +
      `Price: $${product.price}\n` +
      `Size: ${selectedSize ?? "Not selected"}\n` +
      `Category: ${product.category}\n` +
      `Discount: ${product.discount}%\n` +
      `Stock: ${product.inStock ? "In Stock" : "Out of Stock"}\n\n` +
      `Images:\n${allImages}`;

    window.open(
      `https://m.me/smallTeam760?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className={`min-h-screen mt-20 bg-transparent ${bodyFont}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* BREADCRUMB */}
        <div className="mb-8">
          <nav
            className={`${bodyFont} text-lg md:text-lg sm:text-sm text-gray-500 flex items-center gap-1.5 flex-wrap`}
          >
            <Link to="/" className="hover:text-black transition-colors">
              {kh ? "ទំព័រដើម" : "Home"}
            </Link>

            <span>/</span>

            <Link to="/products" className="hover:text-black transition-colors">
              {kh ? "ផលិតផល" : "Products"}
            </Link>

            {currentMenu && (
              <>
                <span>/</span>
                <Link
                  to={`/products?gender=${currentMenu.slug}`}
                  className="hover:text-black transition-colors"
                >
                  {currentMenu.name[l]}
                </Link>
              </>
            )}

            {currentCategory && (
              <>
                <span>/</span>
                <Link
                  to={`/products?gender=${currentMenu?.slug}&category=${currentCategory.slug}`}
                  className="hover:text-black transition-colors"
                >
                  {currentCategory.name[l]}
                </Link>
              </>
            )}

            {/* Current page — not a link */}
            <>
              <span>/</span>
              <span className="text-gray-900 font-medium">
                {product.name[l]}
              </span>
            </>
          </nav>
        </div>

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
                    className={`p-1 border transition-all ${
                      canScrollUp
                        ? "border-gray-300 hover:border-primary text-gray-600 hover:text-black"
                        : "border-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col gap-2 overflow-hidden">
                    {images
                      .slice(thumbOffset, thumbOffset + VISIBLE_THUMBS)
                      .map((img, i) => {
                        const realIndex = thumbOffset + i;
                        return (
                          <button
                            key={realIndex}
                            onClick={() => setMainIndex(realIndex)}
                            className={`w-[68px] h-[68px] overflow-hidden border-2 transition-all shrink-0 ${
                              mainIndex === realIndex
                                ? "border-black/20 shadow-md"
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`thumb-${realIndex}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://via.placeholder.com/300x300?text=No+Image";
                              }}
                            />
                          </button>
                        );
                      })}
                  </div>

                  <button
                    onClick={scrollDown}
                    disabled={!canScrollDown}
                    className={`p-1 border transition-all ${
                      canScrollDown
                        ? "border-gray-300 hover:border-black text-gray-600 hover:text-black"
                        : "border-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Main Image */}
              <div className="flex-1 overflow-hidden bg-[#FAF6EF] aspect-square max-h-[480px]">
                <img
                  src={
                    images[mainIndex] ||
                    images[0] ||
                    "https://via.placeholder.com/600x600?text=No+Image"
                  }
                  alt={product.name[lang as Lang]}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/600x600?text=Image+Not+Found";
                  }}
                />
              </div>
            </div>

            {/* === PRODUCT INFO === */}
            <div className="flex-1 flex flex-col gap-4">
              <h1
                className={`${headerFont} text-xl sm:text-xl font-semibold`}
              >
                {product.name[lang as Lang]}
              </h1>

              <p className={`${bodyFont} text-gray-600 leading-relaxed`}>
                {product.description[lang as Lang]}
              </p>

              <div className="flex items-center gap-2 flex-wrap justify-start">
                <span
                  className={`font-semibold text-base sm:text-lg ${
                    product.discount > 0 ? "text-primary" : "text-black"
                  }`}
                >
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-gray-400 text-xs sm:text-sm line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <p className={`${bodyFont} font-medium mb-2`}>
                    {kh ? "ទំហំ:" : "Sizes:"}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`${bodyFont} px-4 py-2 border text-sm font-medium transition-all ${
                          selectedSize === size
                            ? "border-black bg-black/5 text-black"
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
                  <span className={`${bodyFont} text-gray-500`}>
                    {kh ? "ពណ៌:" : "Color:"}
                  </span>
                  <span className={`${bodyFont} font-medium`}>
                    {product.color}
                  </span>
                </div>
              )}

              <SocialBar
                onTelegram={handleTelegram}
                onMessenger={handleMessenger}
              />
            </div>
          </div>
        </div>

        {/* YOU MAY ALSO LIKE */}
        <div className="mt-16">
          <h2 className={`${headerFont} text-2xl font-semibold mb-8`}>
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
