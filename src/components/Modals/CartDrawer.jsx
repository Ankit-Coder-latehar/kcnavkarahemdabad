import React from 'react';
import { X, Trash2, ShoppingCart, ArrowRight, MessageSquare } from 'lucide-react';
import { CURRENCY_RATES } from '../../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  activeCurrency
}) {
  if (!isOpen) return null;

  const currencyInfo = CURRENCY_RATES[activeCurrency] || CURRENCY_RATES.INR;

  const formatPrice = (amount) => {
    const converted = Math.round(amount * currencyInfo.rate);
    return `${currencyInfo.prefix}${converted}`;
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;

    const itemsSummary = cartItems
      .map((item, index) => {
        const itemTotal = item.product.price * item.quantity;
        return `${index + 1}. *${item.product.title}*\n   • Fabric: ${item.product.fabric}\n   • Size: ${item.selectedSize}\n   • Qty: ${item.quantity} Pcs × ${formatPrice(item.product.price)} = *${formatPrice(itemTotal)}*`;
      })
      .join('\n\n');

    const orderMessage = `*New Wholesale Order Request - KC Navkar*\n\n` +
      `Hello! I would like to place an order for the following catalog items:\n\n` +
      `${itemsSummary}\n\n` +
      `💰 *Total Estimated Order Amount*: *${formatPrice(totalAmount)}*\n\n` +
      `Please confirm stock availability and share payment & shipping details. Thank you!`;

    const encodedMsg = encodeURIComponent(orderMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919712582172&text=${encodedMsg}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Cart Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-50 border-l border-gray-200">
        
        {/* Cart Header */}
        <div className="bg-[#b10607] text-white p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 font-bold text-base">
            <ShoppingCart className="w-5 h-5" />
            <span>Shopping Cart ({cartItems.length})</span>
          </div>
          <button onClick={onClose} className="text-white hover:opacity-80">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="py-3.5 flex gap-3 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-contain rounded border border-gray-200 bg-gray-50 p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 truncate" title={item.product.title}>
                    {item.product.title}
                  </h4>
                  <div className="text-xs text-gray-600 font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <span>Fabric: {item.product.fabric}</span>
                    <span className="bg-[#b10607] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                      Size: {item.selectedSize}
                    </span>
                  </div>
                  {/* Multiplication Line Price */}
                  <div className="text-xs font-extrabold text-[#b10607] mt-1.5 bg-red-50 p-1 rounded border border-red-100 inline-block">
                    {formatPrice(item.product.price)} × {item.quantity} Pcs ={' '}
                    <span className="text-[#36454F] font-black text-sm">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>

                {/* Quantity Controls (Min 10 Pcs) */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 bg-gray-100 border border-gray-300 rounded px-1 py-0.5">
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                      className="px-1.5 py-0.5 text-xs font-black text-gray-700 hover:text-red-600"
                      title="Decrease (Min 10 Pcs)"
                    >
                      -
                    </button>
                    <span className="text-xs font-extrabold px-1.5 text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                      className="px-1.5 py-0.5 text-xs font-black text-gray-700 hover:text-green-600"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold">(Min 10 Pcs)</span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-gray-400 hover:text-red-600 transition p-1 shrink-0"
                  title="Remove Item"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-400">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="font-bold text-sm text-gray-600">Your Cart is Currently Empty</p>
              <p className="text-xs text-gray-400 mt-1">Explore our wholesale catalog to add items!</p>
            </div>
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-sm text-gray-700 uppercase">Subtotal Amount:</span>
              <span className="font-black text-xl text-[#b10607]">{formatPrice(totalAmount)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-3 text-center">
              Direct order inquiry via WhatsApp for stock confirmation & payment details.
            </p>
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#25D366] hover:bg-[#1eb855] text-white py-3.5 rounded-md font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Proceed to WhatsApp Checkout ({formatPrice(totalAmount)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
