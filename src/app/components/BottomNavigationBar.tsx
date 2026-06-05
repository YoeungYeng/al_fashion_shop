import { Home, Search, ShoppingBag, User } from 'lucide-react';

type Tab = 'home' | 'search' | 'cart' | 'profile';

interface BottomNavigationBarProps {
  activeTab: Tab;
  cartCount: number;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { id: 'home' as Tab, label: 'Home', icon: Home },
  { id: 'search' as Tab, label: 'Browse', icon: Search },
  { id: 'cart' as Tab, label: 'Cart', icon: ShoppingBag },
  { id: 'profile' as Tab, label: 'Profile', icon: User },
];

export function BottomNavigationBar({ activeTab, cartCount, onTabChange }: BottomNavigationBarProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto px-2 py-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          const isCart = id === 'cart';

          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className="flex flex-col items-center gap-1 px-4 py-1 min-w-0 flex-1 relative"
            >
              <span className="relative">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-amber-600' : 'text-gray-400'
                  }`}
                />
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[10px] font-semibold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 leading-none">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </span>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-amber-600' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-600" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export type { Tab };
