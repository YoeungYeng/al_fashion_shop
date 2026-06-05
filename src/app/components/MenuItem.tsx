import { Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
}

export function MenuItem({ item, onAddToCart }: MenuItemProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="relative">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
        {item.popular && (
          <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(item)}
            className="bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
