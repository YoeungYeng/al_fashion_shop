import { useState } from 'react';
import { X, Plus, Minus, Trash2, CreditCard, Smartphone, Banknote, ScanQrCode, ChevronLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { MenuItemType } from './MenuItem';

export interface CartItem extends MenuItemType {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

type PaymentMethod = 'card' | 'apple_pay' | 'qr_pay' | 'cash';

const paymentOptions: { id: PaymentMethod; label: string; sublabel: string; icon: React.ElementType }[] = [
  { id: 'card',      label: 'Credit / Debit Card', sublabel: 'Visa •••• 4242',          icon: CreditCard  },
  { id: 'apple_pay', label: 'Apple Pay',            sublabel: 'Touch ID to confirm',     icon: Smartphone  },
  { id: 'qr_pay',    label: 'QR Pay',               sublabel: 'WeChat Pay · Alipay',     icon: ScanQrCode  },
  { id: 'cash',      label: 'Cash on Pickup',       sublabel: 'Pay when you collect',    icon: Banknote    },
];

function QRPayPanel({ amount, orderId }: { amount: number; orderId: string }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const qrValue = `cafenoir://pay?order=${orderId}&amount=${amount.toFixed(2)}&v=${refreshKey}`;
  const expiresIn = 300 - (refreshKey * 0);

  return (
    <div className="mt-4 mx-auto max-w-xs">
      <div className="bg-white border-2 border-amber-100 rounded-3xl p-5 flex flex-col items-center gap-4">
        {/* Brand row */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">WeChat Pay</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Alipay</span>
        </div>

        {/* QR code */}
        <div className="relative p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
          <QRCodeSVG
            value={qrValue}
            size={180}
            bgColor="#ffffff"
            fgColor="#1a1a1a"
            level="M"
            imageSettings={{
              src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23d97706'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E",
              width: 28,
              height: 28,
              excavate: true,
            }}
          />
        </div>

        {/* Amount */}
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">${amount.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-0.5">Scan with WeChat Pay or Alipay</p>
        </div>

        {/* Expiry + refresh */}
        <div className="flex items-center justify-between w-full text-xs text-gray-400">
          <span>QR expires in 5:00</span>
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        Order #{orderId} · Do not close this screen
      </p>
    </div>
  );
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const [step, setStep] = useState<'order' | 'payment'>('order');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotal = total + 2.50;

  const orderId = `CN${Date.now().toString().slice(-6)}`;

  const handleClose = () => {
    setStep('order');
    onClose();
  };

  const handlePlaceOrder = () => {
    setStep('order');
    onCheckout();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose} />

      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">

        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          {step === 'payment' && (
            <button onClick={() => setStep('order')} className="p-1 -ml-1 mr-1">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
          )}
          <h2 className="flex-1 text-xl font-semibold text-gray-900">
            {step === 'order' ? 'Your Order' : 'Payment Method'}
          </h2>
          <button onClick={handleClose} className="p-2 -mr-2">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <p className="text-gray-500 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add items to get started</p>
            </div>
          </div>

        ) : step === 'order' ? (
          /* ── Step 1: Order review ── */
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4 max-w-md mx-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-full"
                        >
                          {item.quantity === 1
                            ? <Trash2 className="w-4 h-4 text-red-500" />
                            : <Minus className="w-4 h-4 text-gray-600" />}
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-amber-600 text-white rounded-full"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => onRemoveItem(item.id)} className="p-1 text-gray-400 hover:text-red-500">
                        <X className="w-5 h-5" />
                      </button>
                      <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium text-gray-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium text-gray-900">$2.50</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-semibold text-gray-900">${grandTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setStep('payment')}
                  className="w-full mt-2 bg-amber-600 text-white py-4 rounded-xl font-medium hover:bg-amber-700 transition-colors"
                >
                  Checkout · ${grandTotal.toFixed(2)}
                </button>
              </div>
            </div>
          </>

        ) : (
          /* ── Step 2: Payment method ── */
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-md mx-auto">
                <p className="text-sm text-gray-500 mb-3">Choose how you'd like to pay</p>

                <div className="space-y-3">
                  {paymentOptions.map(({ id, label, sublabel, icon: Icon }) => {
                    const isSelected = selectedPayment === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedPayment(id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                        }`}
                      >
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-amber-600' : 'bg-white border border-gray-200'
                        }`}>
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                        </span>
                        <div className="flex-1 text-left">
                          <p className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* QR code panel — only for qr_pay */}
                {selectedPayment === 'qr_pay' && (
                  <QRPayPanel amount={grandTotal} orderId={orderId} />
                )}
              </div>
            </div>

            {/* Footer — hide Place Order for QR Pay (payment happens via scan) */}
            <div className="border-t border-gray-200 p-4">
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {itemCount} item{itemCount !== 1 ? 's' : ''} · {paymentOptions.find(p => p.id === selectedPayment)?.label}
                  </span>
                  <span className="font-semibold text-gray-900">${grandTotal.toFixed(2)}</span>
                </div>

                {selectedPayment === 'qr_pay' ? (
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-medium hover:bg-green-700 transition-colors"
                  >
                    Payment Received · Done
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-amber-600 text-white py-4 rounded-xl font-medium hover:bg-amber-700 transition-colors"
                  >
                    Place Order · ${grandTotal.toFixed(2)}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
