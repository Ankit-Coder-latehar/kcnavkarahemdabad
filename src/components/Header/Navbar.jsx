import React, { useState } from 'react';
import { ChevronDown, ChevronRight, X, Layers } from 'lucide-react';
import { CATEGORIES, BRANDS } from '../../data/categories';

export default function Navbar({
  selectedCategory,
  onSelectCategory,
  mobileNavOpen,
  onToggleMobileNav,
  categories,
  brands
}) {
  const [activeHoverCategory, setActiveHoverCategory] = useState(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState(null);
  const [brandSearch, setBrandSearch] = useState('');

  // Use prop categories if provided, fall back to static import
  const navCategories = categories || CATEGORIES;
  const navBrands = brands || BRANDS;

  const filteredBrands = navBrands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm relative z-30">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Desktop Nav Items */}
        <ul className="hidden lg:flex items-center flex-wrap font-bold text-sm text-[#36454F]">
          {/* Home Link */}
          <li>
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-3.5 hover:text-[#b10607] uppercase transition border-b-2 ${
                selectedCategory === 'all'
                  ? 'border-[#b10607] text-[#b10607] font-extrabold'
                  : 'border-transparent'
              }`}
            >
              Home
            </button>
          </li>

          {/* Categories List with Hover Mega-Menu */}
          {navCategories.map((cat) => (
            <li
              key={cat.id}
              className="relative group"
              onMouseEnter={() => setActiveHoverCategory(cat.id)}
              onMouseLeave={() => setActiveHoverCategory(null)}
            >
              <button
                onClick={() => onSelectCategory(cat.name)}
                className={`flex items-center gap-1 px-3.5 py-3.5 hover:text-[#b10607] uppercase transition border-b-2 ${
                  selectedCategory === cat.name
                    ? 'border-[#b10607] text-[#b10607] font-extrabold'
                    : 'border-transparent'
                }`}
              >
                <span>{cat.name}</span>
                {cat.subcategories.length > 0 && <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#b10607]" />}
              </button>

              {/* Subcategories Mega Menu Dropdown */}
              {cat.subcategories.length > 0 && activeHoverCategory === cat.id && (
                <div className="absolute left-0 top-full w-72 bg-white border border-gray-200 shadow-xl rounded-b-md py-2 z-50 animate-fadeIn">
                  <div className="max-h-96 overflow-y-auto">
                    {cat.subcategories.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onSelectCategory(sub.name);
                          setActiveHoverCategory(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#b10607] flex items-center gap-2 transition"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span>{sub.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}

          {/* Catalog Dropdown */}
          <li
            className="relative group"
            onMouseEnter={() => setActiveHoverCategory('brands')}
            onMouseLeave={() => setActiveHoverCategory(null)}
          >
            <button className="flex items-center gap-1 px-3.5 py-3.5 hover:text-[#b10607] uppercase transition border-b-2 border-transparent">
              <span>Catalog</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {activeHoverCategory === 'brands' && (
              <div className="absolute left-0 top-full w-72 bg-white border border-gray-200 shadow-xl rounded-b-md p-3 z-50">
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm mb-2 outline-none focus:border-[#b10607]"
                />
                <div className="max-h-60 overflow-y-auto">
                  {filteredBrands.map((brand, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onSelectCategory(brand);
                        setActiveHoverCategory(null);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#b10607] transition flex items-center gap-2"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      <span>{brand}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={onToggleMobileNav}
          ></div>

          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl z-50 flex flex-col overflow-y-auto">
            {/* Mobile Header */}
            <div className="bg-[#b10607] text-white p-4 flex items-center justify-between">
              <div className="font-bold text-base flex items-center gap-2">
                <Layers className="w-5 h-5" /> Navigation Menu
              </div>
              <button onClick={onToggleMobileNav} className="text-white hover:opacity-80">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav Items List */}
            <div className="p-3 divide-y divide-gray-100 font-semibold text-xs">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  onToggleMobileNav();
                }}
                className="w-full text-left py-2.5 text-[#36454F] hover:text-[#b10607] uppercase"
              >
                Home
              </button>

              {navCategories.map((cat) => (
                <div key={cat.id} className="py-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        onSelectCategory(cat.name);
                        onToggleMobileNav();
                      }}
                      className="text-[#36454F] hover:text-[#b10607] uppercase text-left"
                    >
                      {cat.name}
                    </button>
                    {cat.subcategories.length > 0 && (
                      <button
                        onClick={() =>
                          setMobileExpandedCat(mobileExpandedCat === cat.id ? null : cat.id)
                        }
                        className="px-2 py-1 text-gray-500 font-bold"
                      >
                        {mobileExpandedCat === cat.id ? '-' : '+'}
                      </button>
                    )}
                  </div>

                  {cat.subcategories.length > 0 && mobileExpandedCat === cat.id && (
                    <div className="ml-3 mt-1.5 border-l-2 border-gray-200 pl-2 space-y-1">
                      {cat.subcategories.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            onSelectCategory(sub.name);
                            onToggleMobileNav();
                          }}
                          className="block w-full text-left py-1 text-gray-600 hover:text-[#b10607] text-[11px]"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Catalog Dropdown */}
              <div className="py-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#36454F] uppercase font-semibold">Catalog</span>
                  <button
                    onClick={() =>
                      setMobileExpandedCat(mobileExpandedCat === 'catalog' ? null : 'catalog')
                    }
                    className="px-2 py-1 text-gray-500 font-bold"
                  >
                    {mobileExpandedCat === 'catalog' ? '-' : '+'}
                  </button>
                </div>
                {mobileExpandedCat === 'catalog' && (
                  <div className="ml-3 mt-1.5 border-l-2 border-gray-200 pl-2 space-y-1 max-h-48 overflow-y-auto">
                    {navBrands.map((brand, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onSelectCategory(brand);
                          onToggleMobileNav();
                        }}
                        className="block w-full text-left py-1 text-gray-600 hover:text-[#b10607] text-[11px]"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
