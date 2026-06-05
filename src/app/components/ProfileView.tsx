import { User, MapPin, Bell, CreditCard, Heart, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export function ProfileView() {
  const menuRows = [
    { icon: MapPin, label: 'Saved Addresses', hint: '2 saved' },
    { icon: CreditCard, label: 'Payment Methods', hint: 'Visa •••• 4242' },
    { icon: Heart, label: 'Favourites', hint: '3 items' },
    { icon: Bell, label: 'Notifications', hint: 'On' },
  ];

  const supportRows = [
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: LogOut, label: 'Sign Out', danger: true },
  ];

  return (
    <div className="min-h-full pb-24 bg-gray-50">
      {/* Profile card */}
      <div className="bg-white px-4 pt-8 pb-6 flex flex-col items-center border-b border-gray-100">
        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-3">
          <User className="w-9 h-9 text-amber-600" />
        </div>
        <h2 className="text-base font-semibold text-gray-900">Alex Johnson</h2>
        <p className="text-sm text-gray-400 mt-0.5">alex@email.com</p>

        <div className="flex gap-6 mt-5">
          {[
            { label: 'Orders', value: '12' },
            { label: 'Points', value: '840' },
            { label: 'Reviews', value: '5' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        {/* Account section */}
        <div className="bg-white rounded-2xl overflow-hidden divide-y divide-gray-100">
          {menuRows.map(({ icon: Icon, label, hint }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-amber-600" />
              </span>
              <span className="flex-1 text-sm text-gray-800">{label}</span>
              {hint && <span className="text-xs text-gray-400 mr-1">{hint}</span>}
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>

        {/* Support section */}
        <div className="bg-white rounded-2xl overflow-hidden divide-y divide-gray-100">
          {supportRows.map(({ icon: Icon, label, danger }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${danger ? 'bg-red-50' : 'bg-amber-50'}`}>
                <Icon className={`w-4 h-4 ${danger ? 'text-red-500' : 'text-amber-600'}`} />
              </span>
              <span className={`flex-1 text-sm ${danger ? 'text-red-500' : 'text-gray-800'}`}>{label}</span>
              {!danger && <ChevronRight className="w-4 h-4 text-gray-300" />}
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-gray-300 pb-2">Café Noir v1.0.0</p>
      </div>
    </div>
  );
}
