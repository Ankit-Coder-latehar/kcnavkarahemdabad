import React, { useState } from 'react';
import { Search, ShoppingCart, User, ChevronDown, Menu } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export default function MainHeader({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onToggleMobileNav
}) {
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div className="bg-white py-3.5 border-b border-gray-100 shadow-sm relative z-40">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileNav}
            className="lg:hidden text-gray-700 hover:text-[#b10607] focus:outline-none"
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src={logoImg}
              alt="K.C. NAVKAR Logo"
              className="h-10 sm:h-13 w-auto object-contain max-w-[170px] sm:max-w-[220px]"
            />
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-2xl relative">
          <div className="flex w-full border-2 border-[#36454F] rounded-md overflow-hidden focus-within:border-[#b10607] transition">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Catalog (e.g. Rayon, Kurti, Mittoo, Cotton...)"
              className="w-full px-4 py-2 text-base outline-none text-gray-800 placeholder-gray-400"
            />
            <button
              onClick={() => {}}
              className="bg-[#36454F] hover:bg-[#b10607] text-white px-6 py-2 font-bold text-base flex items-center gap-2 transition"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Right Controls: Account & Cart */}
        <div className="flex items-center gap-4 sm:gap-5">
          
          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="flex items-center gap-1.5 text-[#36454F] hover:text-[#b10607] transition font-semibold text-sm text-right"
            >
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[#36454F]">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden md:block">
                <span className="block text-xs text-gray-500 font-normal leading-tight">Sign In</span>
                <span className="flex items-center gap-0.5 font-bold leading-tight text-sm">
                  Account <ChevronDown className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>

            {accountOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg py-1.5 z-50">
                <a
                  href="#register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#b10607] hover:text-white transition font-medium"
                >
                  Sign Up
                </a>
                <a
                  href="#login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#b10607] hover:text-white transition font-medium border-t border-gray-100"
                >
                  Login
                </a>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 bg-[#b10607] text-white px-4 py-2 rounded-md hover:bg-[#8b0405] transition relative"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 font-extrabold text-xs w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs uppercase tracking-wider font-semibold opacity-90 leading-none">
                Shopping Cart
              </span>
              <span className="text-sm font-extrabold leading-none">{cartCount} Items</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search input */}
      <div className="px-4 mt-2.5 sm:hidden">
        <div className="flex border-2 border-[#36454F] rounded-md overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Catalog..."
            className="w-full px-3 py-1 text-sm outline-none text-gray-800"
          />
          <button className="bg-[#36454F] text-white px-3 py-1">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
