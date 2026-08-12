import React from 'react';

export default function TopMarquee() {
  return (
    <div className="bg-[#f8f9fa] border-b border-gray-200 py-2 overflow-hidden font-sans text-sm">
      <div className="w-full whitespace-nowrap overflow-hidden">
        <div className="animate-marquee font-semibold tracking-wide">
          <span className="text-[#c0392b] font-bold">WELCOME TO KCNAVKAR.COM</span>
          <span className="text-black mx-1">:</span>
          <span className="text-[#666600]"> CASH ON DELIVERY WITH EXPRESS COURIER SERVICE AND DOMESTIC AND INTERNATIONAL SHIPPING </span>
          <span className="text-[#e67e22] font-bold">(POWERED BY ART RIDDH MANUFACTURER BRAND)</span>
          <span className="mx-8 text-gray-400">|</span>
          <span className="text-[#c0392b] font-bold">WELCOME TO KCNAVKAR.COM</span>
          <span className="text-black mx-1">:</span>
          <span className="text-[#666600]"> CASH ON DELIVERY WITH EXPRESS COURIER SERVICE AND DOMESTIC AND INTERNATIONAL SHIPPING </span>
          <span className="text-[#e67e22] font-bold">(POWERED BY ART RIDDH MANUFACTURER BRAND)</span>
        </div>
      </div>
    </div>
  );
}
