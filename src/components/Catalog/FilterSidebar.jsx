import React, { useState } from 'react';
import { Filter, RotateCcw, Check, ChevronDown } from 'lucide-react';
import { FABRIC_OPTIONS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedFabrics,
  onToggleFabric,
  selectedSizes,
  onToggleSize,
  priceRange,
  onPriceRangeChange,
  onResetFilters
}) {
  const [minPriceInput, setMinPriceInput] = useState(priceRange.min || '');
  const [maxPriceInput, setMaxPriceInput] = useState(priceRange.max || '');
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [fabricOpen, setFabricOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

  const handleApplyPrice = (e) => {
    e.preventDefault();
    onPriceRangeChange({
      min: minPriceInput ? Number(minPriceInput) : null,
      max: maxPriceInput ? Number(maxPriceInput) : null
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 text-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
        <div className="flex items-center gap-2 font-extrabold text-base text-[#36454F]">
          <Filter className="w-4 h-4 text-[#b10607]" />
          <span>FILTER CATALOG</span>
        </div>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#b10607] transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Category Accordion */}
      <div className="border-b border-gray-100 pb-3 mb-3">
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="w-full flex items-center justify-between font-bold text-sm text-gray-800 mb-2 uppercase"
        >
          <span>Categories</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
        </button>

        {categoryOpen && (
          <div className="space-y-1 max-h-56 overflow-y-auto pl-1">
            <button
              onClick={() => onSelectCategory('all')}
              className={`block w-full text-left py-1 text-sm transition ${
                selectedCategory === 'all' ? 'text-[#b10607] font-bold' : 'text-gray-600 hover:text-black'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`block w-full text-left py-1 text-sm font-semibold transition ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? 'text-[#b10607] font-extrabold'
                    : 'text-gray-800 hover:text-[#b10607]'
                }`}
              >
                {cat.name}
              </button>
            ))}
            <div className="border-t border-gray-100 my-1 pt-1">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Styles & Types</div>
              {CATEGORIES[0].subcategories.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectCategory(sub.name)}
                  className={`block w-full text-left py-0.5 text-xs transition ${
                    selectedCategory.toLowerCase() === sub.name.toLowerCase() ? 'text-[#b10607] font-bold' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-gray-100 pb-3 mb-3">
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="w-full flex items-center justify-between font-bold text-sm text-gray-800 mb-2 uppercase"
        >
          <span>Price Filter (INR)</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${priceOpen ? 'rotate-180' : ''}`} />
        </button>

        {priceOpen && (
          <form onSubmit={handleApplyPrice} className="space-y-2 mt-1">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                className="w-1/2 border border-gray-300 rounded px-2.5 py-1.5 text-sm outline-none focus:border-[#b10607]"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                className="w-1/2 border border-gray-300 rounded px-2.5 py-1.5 text-sm outline-none focus:border-[#b10607]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#36454F] hover:bg-[#b10607] text-white py-1.5 rounded font-bold text-sm transition"
            >
              Apply Price
            </button>
          </form>
        )}
      </div>

      {/* Size Filter Pills */}
      <div className="border-b border-gray-100 pb-3 mb-3">
        <button
          onClick={() => setSizeOpen(!sizeOpen)}
          className="w-full flex items-center justify-between font-bold text-sm text-gray-800 mb-2 uppercase"
        >
          <span>Select Size</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${sizeOpen ? 'rotate-180' : ''}`} />
        </button>

        {sizeOpen && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {availableSizes.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => onToggleSize(size)}
                  className={`px-3 py-1 rounded border font-bold text-xs transition ${
                    isSelected
                      ? 'bg-[#8a3ca9] border-[#8a3ca9] text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Fabric Checkboxes */}
      <div className="pb-1">
        <button
          onClick={() => setFabricOpen(!fabricOpen)}
          className="w-full flex items-center justify-between font-bold text-sm text-gray-800 mb-2 uppercase"
        >
          <span>Fabric Filter</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${fabricOpen ? 'rotate-180' : ''}`} />
        </button>

        {fabricOpen && (
          <div className="space-y-1.5 max-h-56 overflow-y-auto pl-0.5">
            {FABRIC_OPTIONS.map((fabric, idx) => {
              const isChecked = selectedFabrics.includes(fabric);
              return (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black transition"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleFabric(fabric)}
                    className="rounded text-[#b10607] focus:ring-0 border-gray-300 cursor-pointer w-4 h-4"
                  />
                  <span className="text-sm font-medium">{fabric}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
