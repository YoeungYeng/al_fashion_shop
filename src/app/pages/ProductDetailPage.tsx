import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useLang, Lang } from "../context/LanguageContext";
import { ProductCard } from "../components/ProductCard";
import { products, categories, menus } from "../data/products";
import { SocialBar } from "../components/SocialBar";

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const [searchParams] = useSearchParams();

  const kh = lang === "km";
  const l = lang as "en" | "km";

  const headerFont = kh ? "font-header-kh" : "font-header-en";
  const bodyFont = kh ? "font-body-kh" : "font-body-en";

  // hooks
  const [mainIndex, setMainIndex] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // params
  const genderFromUrl = searchParams.get("gender") as "men" | "women" | null;
  const { slug } = useParams<{ slug: string }>();

  const product = products.find((p) => p.slug === slug);

  const currentMenu = menus.find((m) => m.slug === genderFromUrl);

  const currentCategory = product
    ? categories.find((c) => c.slug === product.category)
    : undefined;

  // default color
  useEffect(() => {
    if (product?.color?.length && !selectedColor) {
      setSelectedColor(product.color[0]);
    }
  }, [product]);

  // safe images by color
  const images =
    (selectedColor && product?.imagesByColor?.[selectedColor]) ||
    product?.images ||
    [];

  // early return
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`${headerFont} text-2xl font-bold mb-4`}>
            {kh ? "រកមិនឃើញផលិតផល" : "Product Not Found"}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className={`${bodyFont} px-6 py-3 bg-primary text-white rounded-xl`}
          >
            {kh ? "ត្រឡប់ក្រោយ" : "Go Back"}
          </button>
        </div>
      </div>
    );
  }

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

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  const displayProducts =
    related.length > 0 ? related : products.filter((p) => p.isPopular);

  const handleTelegramOrder = () => {
    const productUrl = `${window.location.origin}/products/${product.slug}`;

    const colorText = selectedColor
      ? selectedColor.toUpperCase()
      : "Not selected";

    const sizeText = selectedSize ?? "Not selected";

    const message =
      `NEW ORDER\n` +
      `-------------------\n` +
      `Name: ${product.name[lang as Lang]}\n` +
      `Price: $${discountedPrice.toFixed(2)}\n` +
      // `Color: ${colorText}\n` +
      `Size: ${sizeText}\n` +
      `Stock: ${product.inStock ? "In Stock" : "Out of Stock"}\n` +
      `-------------------\n` +
      `Product: ${productUrl}`;

    window.open(
      `https://t.me/PhearaPum?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleMessenger = () => {
    const productUrl = `${window.location.origin}/products/${product.slug}`;

    const message =
      `NEW ORDER\n` +
      `-------------------\n` +
      `Name: ${product.name[l]}\n` +
      `Price: $${discountedPrice.toFixed(2)}\n` +
      `Color: ${selectedColor ?? "Not selected"}\n` +
      `Size: ${selectedSize ?? "Not selected"}\n` +
      `-------------------\n` +
      `${productUrl}`;

    window.open(
      `https://m.me/thebestwayformen?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className={`min-h-screen mt-20 ${bodyFont}`}>
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        {/* BREADCRUMB */}
        <div className="mb-4 text-gray-500 text-sm flex gap-2 flex-wrap">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          {currentCategory && (
            <>
              <span>/</span>
              <span>{currentCategory.name[l]}</span>
            </>
          )}
          <span>/</span>
          <span className="text-black">{product.name[l]}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* IMAGE */}
          <div className="flex gap-3 flex-1">
            {/* thumbnails */}
            {images.length > 1 && (
              <div className="flex flex-col gap-2 w-[72px]">
                <button onClick={scrollUp} disabled={!canScrollUp}>
                  <ChevronUp />
                </button>

                {images
                  .slice(thumbOffset, thumbOffset + VISIBLE_THUMBS)
                  .map((img, i) => {
                    const realIndex = thumbOffset + i;

                    return (
                      <button
                        key={realIndex}
                        onClick={() => setMainIndex(realIndex)}
                        className={`border ${
                          mainIndex === realIndex
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      >
                        <img src={img} />
                      </button>
                    );
                  })}

                <button onClick={scrollDown} disabled={!canScrollDown}>
                  <ChevronDown />
                </button>
              </div>
            )}

            {/* main image */}
            <div className="flex-1">
              <img
                src={images[mainIndex] || images[0]}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 space-y-4">
            <h1 className={headerFont}>{product.name[l]}</h1>

            <p className="text-gray-600">{product.description[l]}</p>

            <div className="text-lg font-bold">
              ${discountedPrice.toFixed(2)}
            </div>

            {/* SIZE */}
            {product.sizes && (
              <div>
                <p>Sizes</p>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`border px-3 py-1 ${
                        selectedSize === s ? "bg-black text-white" : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* COLOR */}
            {product.color && (
              <div className="flex gap-2 items-center">
                <p>Color:</p>

                {product.color.map((color) => {
                  const isSelected = selectedColor === color;

                  return (
                    <div
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setMainIndex(0);
                        setThumbOffset(0);
                      }}
                      className={`w-6 h-6 rounded border cursor-pointer ${
                        isSelected ? "border-black scale-110" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  );
                })}
              </div>
            )}

            {/* ORDER */}
            <h1>{kh ? "កម្មង់ឥឡូវនេះ៖" : "Order Now:"}</h1>
            <SocialBar
              onTelegram={handleTelegramOrder}
              onMessenger={handleMessenger}
            />
          </div>
        </div>

        {/* RELATED */}
        <div className="mt-16">
          <h2>You May Also Like</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayProducts.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
