import React, { useState } from 'react';
import { Phone, ChevronDown, Award, Globe, Bell } from 'lucide-react';
import { CURRENCY_RATES } from '../../data/products';

export default function TopBar({ activeCurrency, onCurrencyChange, onOpenSubscribe }) {
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <div className="bg-[#f0f0f0] border-b border-gray-200 text-sm text-[#36454F]">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-2">
        {/* Left Side: Contact Numbers & Currency */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Phone className="w-4 h-4 text-[#b10607]" />
            <span className="hidden sm:inline font-medium">For Inquiry:</span>
            <a
              href="https://api.whatsapp.com/send?phone=919327332114"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#b10607] font-semibold text-[#000000]"
            >
              +91 9327332114
            </a>
            <span className="text-gray-400">,</span>
            <a
              href="https://api.whatsapp.com/send?phone=918690695238"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#b10607] font-semibold text-[#000000]"
            >
              +91 8690695238
            </a>
            <span className="text-gray-400 font-medium hidden md:inline">|</span>
            <a
              href="https://api.whatsapp.com/send?phone=919712582172"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#b10607] font-semibold text-[#000000] hidden lg:inline"
            >
              +91 9712582172
            </a>
          </div>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1 bg-white border border-gray-300 px-2.5 py-1 rounded font-semibold text-[#000] hover:bg-gray-50 transition text-xs"
            >
              {activeCurrency} <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
            </button>
            {currencyOpen && (
              <div className="absolute left-0 mt-1 w-24 bg-white border border-gray-200 shadow-lg rounded z-50">
                {Object.keys(CURRENCY_RATES).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      onCurrencyChange(curr);
                      setCurrencyOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-[#b10607] hover:text-white transition ${
                      activeCurrency === curr ? 'bg-gray-100 font-bold text-[#b10607]' : 'text-gray-700'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Apps & Notification Links */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 font-semibold text-[#36bc49] whitespace-nowrap">
            <Bell className="w-4 h-4 animate-bounce" />
            <span>Regular Notification:</span>
          </div>

          {/* App Store Buttons */}
          <div className="flex items-center gap-1.5">
            <a
              href="https://play.google.com/store/apps/details?id=com.silicon.vastralife"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition"
            >
              <img
                src="https://vastralife.com/img/android.png"
                alt="Google Play"
                className="h-5 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/vastra-life/id1574654877"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition"
            >
              <img
                src="https://vastralife.com/img/Appstore.png"
                alt="App Store"
                className="h-5 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
          </div>

          <button
            onClick={onOpenSubscribe}
            className="bg-white border border-gray-300 px-3 py-1 rounded font-semibold text-xs text-[#36454F] hover:bg-[#b10607] hover:text-white transition"
          >
            Subscribe
          </button>

          <a
            href="#shipping"
            className="bg-white border border-gray-300 px-3 py-1 rounded font-semibold text-xs text-[#36454F] hover:bg-[#b10607] hover:text-white transition"
          >
            Shipping Rate
          </a>
        </div>
      </div>

      {/* Award & Trust Banner */}
      <div className="bg-[#f8f8f8] border-t border-gray-200 py-1.5 text-center font-semibold text-gray-800 text-xs flex justify-center items-center gap-3">
        <span className="flex items-center gap-1">
          <Award className="w-4 h-4 text-amber-600" /> Trusted Since 2017
        </span>
        <span className="text-gray-300">|</span>
        <span className="flex items-center gap-1">
          <Globe className="w-4 h-4 text-blue-600" /> World Wide Shipping
        </span>
      </div>
    </div>
  );
}
