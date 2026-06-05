import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { MenuItem, MenuItemType } from './MenuItem';

interface BrowseViewProps {
  items: MenuItemType[];
  onAddToCart: (item: MenuItemType) => void;
}

const allCategories = ['All', 'Coffee', 'Pastries', 'Desserts'];

export function BrowseView({ items, onAddToCart }: BrowseViewProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = items.filter(item => {
    const matchesQuery =
      query.trim() === '' ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-full pb-24">
      {/* Search header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Browse Menu</h2>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search drinks, pastries…"
            className="w-full pl-9 pr-9 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:bg-gray-50 focus:ring-2 focus:ring-amber-500/30 transition"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-4 max-w-md mx-auto">
        {query && (
          <p className="text-xs text-gray-400 mb-3">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(item => (
              <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No items match your search</p>
            <button
              onClick={() => { setQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-amber-600 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
