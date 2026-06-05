import { Gift } from 'lucide-react';

export function PromoBar() {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-3">
      <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
        <Gift className="w-5 h-5" />
        <p className="text-sm font-medium">
          Free delivery on orders over $15
        </p>
      </div>
    </div>
  );
}
