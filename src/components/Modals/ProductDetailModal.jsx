import React, { useState } from 'react';
import { X, ShoppingBag, Phone, CheckCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { CURRENCY_RATES } from '../../data/products';

export default function ProductDetailModal({
  product,
  activeCurrency,
  onClose,
  onAddToCart
}) {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [showSizeError, setShowSizeError] = useState(false);

  if (!product) return null;

  const currencyInfo = CURRENCY_RATES[activeCurrency] || CURRENCY_RATES.INR;
  const formatPrice = (amount) => {
    const converted = Math.round(amount * currencyInfo.rate);
    return `${currencyInfo.prefix}${converted}`;
  };

  const calculatedTotal = product.price * quantity;

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    setShowSizeError(false);
    onAddToCart(product, selectedSize, quantity);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello KC Navkar, I am interested in ordering catalog "${product.title}" (Code: ${product.catalogCode}, Price: ${formatPrice(product.price)}, Total: ${formatPrice(calculatedTotal)} for ${quantity} Pcs).`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border-t-4 border-[#b10607]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: Image Container */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 border border-gray-200">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 object-contain rounded"
            />
            <div className="mt-3 text-center text-xs text-gray-500 font-medium">
              100% Original Manufacturer Catalog from Surat Market
            </div>
          </div>

          {/* Right: Specifications & Buying Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="bg-[#8a3ca9] text-white text-xs font-extrabold px-2.5 py-1 rounded uppercase tracking-wide">
                Catalog Code: {product.catalogCode}
              </span>

              <h2 className="font-extrabold text-xl text-gray-900 mt-2.5 mb-1.5 leading-snug">
                {product.title}
              </h2>

              {/* Price Banner */}
              <div className="bg-[#36454F] text-white p-3 rounded-md flex flex-col gap-1 my-3">
                <div className="flex items-center gap-3">
                  <span className="line-through text-gray-400 text-sm">
                    MRP: {formatPrice(product.mrp)}
                  </span>
                  <span className="text-yellow-400 font-black text-xl">
                    Wholesale: {formatPrice(product.price)} / Pcs
                  </span>
                  <span className="bg-[#76b51b] text-white text-xs font-extrabold px-2 py-0.5 rounded ml-auto">
                    Margin {product.margin}
                  </span>
                </div>
                <div className="text-xs font-bold text-yellow-300 border-t border-gray-600 pt-1.5 mt-1">
                  Cart Price ({quantity} Pcs): <span className="text-white text-sm font-extrabold">{formatPrice(calculatedTotal)}</span>
                </div>
              </div>

              {/* Table details */}
              <table className="w-full text-sm border border-gray-200 rounded mb-3">
                <tbody>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-2 font-bold text-gray-700 w-28">MOQ</td>
                    <td className="p-2 text-gray-900 font-semibold">{product.moq}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 font-bold text-gray-700">Fabric</td>
                    <td className="p-2 text-gray-900 font-semibold">{product.fabric}</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-2 font-bold text-gray-700">Type / Work</td>
                    <td className="p-2 text-gray-900 font-semibold">{product.type}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-gray-700">Availability</td>
                    <td className="p-2 text-green-700 font-extrabold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> In Stock & Fast Ship
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Quantity Selection (Min 10 Pcs) */}
              <div className="mb-3">
                <label className="block text-xs font-extrabold text-gray-700 mb-1 uppercase">
                  Quantity (Minimum 10 Pcs):
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(10, q - 1))}
                      className="bg-gray-100 text-gray-800 px-3 py-1 font-extrabold text-sm hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-sm font-extrabold text-gray-900 bg-white">
                      {quantity} Pcs
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="bg-gray-100 text-gray-800 px-3 py-1 font-extrabold text-sm hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">
                    Total: <strong className="text-[#b10607]">{formatPrice(calculatedTotal)}</strong>
                  </span>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-extrabold text-gray-700 uppercase">
                    Select Size:
                  </label>
                  {selectedSize && (
                    <span className="text-xs text-green-700 font-bold">
                      Selected: {selectedSize}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setShowSizeError(false);
                      }}
                      className={`px-3.5 py-1.5 rounded font-extrabold text-sm border transition ${
                        selectedSize === sz
                          ? 'bg-[#b10607] text-white border-[#b10607] ring-2 ring-red-400'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Error Banner if size is missing */}
                {showSizeError && (
                  <div className="bg-red-100 border-2 border-red-500 text-red-700 px-3 py-1.5 rounded text-xs font-extrabold mt-2 text-center animate-bounce">
                    ⚠️ Please select a size first before adding to cart!
                  </div>
                )}
              </div>
            </div>

            {/* Buttons & Actions */}
            <div className="space-y-2 mt-2 pt-2 border-t border-gray-200">
              <button
                onClick={handleAddToCartClick}
                className="w-full bg-[#b10607] hover:bg-[#8b0405] text-white py-3 rounded-md font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-md uppercase tracking-wider"
              >
                <ShoppingBag className="w-4 h-4" /> Add {quantity} Pcs to Cart ({formatPrice(calculatedTotal)})
              </button>

              <a
                href={`https://api.whatsapp.com/send?phone=919327332114&text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-md font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-md uppercase tracking-wider text-center"
              >
                <Phone className="w-4 h-4" /> Direct WhatsApp Inquiry
              </a>
            </div>

            {/* Feature Guarantees */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 text-xs font-semibold text-center text-gray-600">
              <div className="flex flex-col items-center">
                <Truck className="w-4.5 h-4.5 text-blue-600 mb-1" />
                <span>Express Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4.5 h-4.5 text-green-600 mb-1" />
                <span>100% Quality Assured</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="w-4.5 h-4.5 text-purple-600 mb-1" />
                <span>COD Available</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
