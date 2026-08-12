import React from 'react';
import { ShoppingBag, Eye, Zap } from 'lucide-react';
import { CURRENCY_RATES } from '../../data/products';

export default function ProductCard({
  product,
  activeCurrency,
  onViewProduct,
  onAddToCart
}) {
  const [selectedSize, setSelectedSize] = React.useState('');
  const [showSizeError, setShowSizeError] = React.useState(false);

  const currencyInfo = CURRENCY_RATES[activeCurrency] || CURRENCY_RATES.INR;

  const formatPrice = (amount) => {
    const converted = Math.round(amount * currencyInfo.rate);
    return `${currencyInfo.prefix}${converted}`;
  };

  const handleCartClick = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    setShowSizeError(false);
    onAddToCart(product, selectedSize, 10);
  };

  return (
    <div className="bg-white border-2 border-[#8a3ca9] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between h-full relative group">
      
      {/* Fast Ship Badge */}
      {product.fastShip && (
        <div className="absolute top-2 left-2 z-10 bg-[#76b51b] text-white text-xs font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
          <Zap className="w-3.5 h-3.5 fill-current" /> Fast Ship
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-72 bg-gray-50 overflow-hidden relative flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        
        <div>
          {/* Price Block */}
          <div className="bg-black text-white p-2 rounded text-center mb-2.5 flex items-center justify-center gap-2">
            <span className="line-through text-gray-400 text-sm font-semibold">
              {formatPrice(product.mrp)}
            </span>
            <span className="text-yellow-400 font-extrabold text-base">
              {formatPrice(product.price)} / Pc
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewProduct(product)}
            className="font-bold text-sm text-gray-900 line-clamp-2 hover:text-[#b10607] cursor-pointer mb-2.5 leading-snug"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Specs Table */}
          <table className="w-full text-xs border border-gray-200 rounded mb-2.5 overflow-hidden">
            <tbody>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-1.5 font-bold text-gray-700 w-16">MOQ</td>
                <td className="p-1.5 text-gray-900 font-semibold">{product.moq}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-1.5 font-bold text-gray-700">Fabric</td>
                <td className="p-1.5 text-gray-900 font-semibold truncate max-w-[130px]" title={product.fabric}>
                  {product.fabric}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-1.5 font-bold text-gray-700">Sizes</td>
                <td className="p-1.5 text-gray-800">
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map((s, idx) => {
                      const isSelected = selectedSize === s;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedSize(s);
                            setShowSizeError(false);
                          }}
                          className={`text-[11px] font-bold px-1.5 py-0.5 rounded transition ${
                            isSelected
                              ? 'bg-[#b10607] text-white ring-2 ring-[#b10607]'
                              : 'bg-[#8a3ca9] text-white hover:bg-[#6c2e86]'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Size Required Warning Message */}
          {showSizeError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-xs font-bold mb-2 text-center animate-bounce">
              ⚠️ Please select size!
            </div>
          )}
        </div>

        <div>
          {/* Your Margin & Batch Total */}
          <div className="text-center font-bold text-xs text-[#b10607] py-1 border-t border-b border-gray-100 mb-2.5">
            10 Pcs Price: <span className="text-[#36454F] font-extrabold">{formatPrice(product.price * 10)}</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewProduct(product)}
              className="bg-[#36454F] hover:bg-gray-800 text-white py-2 rounded-full font-bold text-xs flex items-center justify-center gap-1 transition"
            >
              <Eye className="w-4 h-4" /> View
            </button>
            <button
              onClick={handleCartClick}
              className="bg-[#b10607] hover:bg-[#8b0405] text-white py-2 rounded-full font-bold text-xs flex items-center justify-center gap-1 transition shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
