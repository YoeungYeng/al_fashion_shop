import { useLang } from "../context/LanguageContext";

export function ProductDetailPage() {
  const { lang } = useLang();
  const kh = lang === "km";

  return (
    <div className={`min-h-screen bg-[#FAF6EF] ${kh ? "font-khmer" : "font-body-en"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
          <h1 className={`text-3xl font-semibold text-[#1C1917] mb-4 ${kh ? "font-khmer" : "font-header-en"}`}>
            {kh ? "ព័ត៌មានលម្អិតផលិតផល" : "Product Detail"}
          </h1>
          <p className={`text-gray-600 leading-relaxed ${kh ? "font-khmer" : "font-body-en"}`}>
            {kh
              ? "ទំព័រនេះនឹងបង្ហាញព័ត៌មានលម្អិតអំពីផលិតផលដែលអ្នកបានជ្រើស។"
              : "This page will show detailed information about the selected product."}
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#FAF6EF] p-6">
              <h2 className={`text-lg font-semibold mb-2 ${kh ? "font-khmer" : "font-header-en"}`}>
                {kh ? "ឈ្មោះផលិតផល" : "Product Name"}
              </h2>
              <p className={kh ? "font-khmer text-gray-700" : "font-body-en text-gray-700"}>
                {kh ? "ឈ្មោះផលិតផលគឺត្រូវបានបង្ហាញនៅទីនេះ។" : "The selected product name appears here."}
              </p>
            </div>
            <div className="rounded-2xl bg-[#FAF6EF] p-6">
              <h2 className={`text-lg font-semibold mb-2 ${kh ? "font-khmer" : "font-header-en"}`}>
                {kh ? "ពត៌មានបន្ថែម" : "Additional Info"}
              </h2>
              <p className={kh ? "font-khmer text-gray-700" : "font-body-en text-gray-700"}>
                {kh
                  ? "ពត៌មានបន្ថែម និងលក្ខណៈពិសេសនៃផលិតផលនឹងត្រូវបង្ហាញនៅទីនេះ។"
                  : "Additional information and product details will appear here."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
