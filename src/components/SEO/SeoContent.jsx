import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Truck, Percent, Package } from 'lucide-react';

export default function SeoContent() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What is the Minimum Order Quantity (MOQ) for Wholesale Kurtis?",
      a: "Our standard Minimum Order Quantity (MOQ) ranges from 4 to 8 pieces per catalog set, depending on the manufacturer and catalog tier."
    },
    {
      q: "Do you offer Cash on Delivery (COD) across India?",
      a: "Yes, KC Navkar provides Cash on Delivery (COD) services with reliable express courier logistics across all major cities and pin codes in India."
    },
    {
      q: "Do you ship wholesale kurtis internationally?",
      a: "Absolutely! We export ladies kurtis and textile garments worldwide to USA, UK, Canada, Australia, UAE, Malaysia, Nepal, and over 50+ countries with DHL/FedEx priority shipping."
    },
    {
      q: "Are all products manufactured directly in Surat textile market?",
      a: "Yes, KC Navkar is located at Shop no. 20 Ground Floor, Sharanam estate - 4, opp. Ashima mill, near anupam cinema road, Khokra, Ahmedabad, Gujrat - 380021. We source directly from premier brand manufacturers to give you guaranteed lowest wholesale prices."
    }
  ];

  return (
    <div className="bg-white border-t border-gray-200 mt-12 py-10 text-gray-700 text-sm leading-relaxed">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main H1 Title & Introduction */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="font-extrabold text-2xl text-gray-900 mb-3">
            Wholesale Kurtis Online at KCNavkar.com
          </h1>
          <p className="mb-2">
            KC Navkar is one of the finest and most reliable readymade garments outsourcing companies in India. We have a vast variety of wholesale clothes available for sale online to boutique owners, retailers, and global distributors. Setting up your seller profile and finding authentic Surat manufacturer quality at lucrative prices is effortless with KC Navkar.
          </p>
          <p>
            We eliminate offline market wanderings by bringing Surat’s renowned textile market directly to your screen. Our specialized catalog team curates top designer Kurtis, Anarkalis, Jaipuri prints, and daily-wear Kurtis with persistent follow-ups across manufacturers to ensure maximum profit margin for your business.
          </p>
        </div>

        {/* Feature Grid Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded p-4 flex items-start gap-3">
            <Percent className="w-6 h-6 text-[#b10607] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm mb-1">Lowest Price Guarantee</h3>
              <p className="text-gray-600 text-xs">Direct Surat factory pricing with up to 50%+ profit margin for retailers.</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded p-4 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#76b51b] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm mb-1">100% Quality Assured</h3>
              <p className="text-gray-600 text-xs">Strict quality check on stitching, fabric softness, print durability, and sizing.</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded p-4 flex items-start gap-3">
            <Truck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm mb-1">Worldwide Express Shipping</h3>
              <p className="text-gray-600 text-xs">Fast domestic door delivery & international dispatch to 50+ countries.</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded p-4 flex items-start gap-3">
            <Package className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm mb-1">Ready Stock Catalogs</h3>
              <p className="text-gray-600 text-xs">Thousands of latest 2026 designs ready for immediate dispatch.</p>
            </div>
          </div>
        </div>

        {/* Types of Wholesale Kurtis */}
        <div>
          <h2 className="font-extrabold text-lg text-gray-900 mb-3">
            Types of Wholesale Kurtis Available At KC Navkar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 text-sm mb-1">1. Designer & Boutique Kurtis</h3>
              <p className="text-gray-600 text-xs">
                Must-have graceful outfits crafted with delicate embroideries, sequin work, mirror embellishments, and premium Viscose Mul Chanderi fabric for festive celebrations.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 text-sm mb-1">2. Pure Cotton & Rayon Kurtis</h3>
              <p className="text-gray-600 text-xs">
                Breathable, soft 60s premium cotton and heavy 14kg Viscose Rayon daily wear Kurtis ideal for office wear and hot summer climates.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 text-sm mb-1">3. Anarkali & Naira Cut Sets</h3>
              <p className="text-gray-600 text-xs">
                Flowy floor-length flares, flared Anarkalis, Aliya cuts, and stylish Naira cut Kurtis paired with pants and dupattas.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h3 className="font-bold text-gray-800 text-sm mb-1">4. Co-Ord Sets & Tunics</h3>
              <p className="text-gray-600 text-xs">
                Modern western fusion two-piece co-ord sets and Indo-western tunics highly trending among modern shoppers.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="font-extrabold text-lg text-gray-900 mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#b10607]" />
            <span>Frequently Asked Questions (FAQ)</span>
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-3.5 text-left font-bold text-sm text-gray-800 hover:bg-gray-50 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-3.5 pt-0 text-xs text-gray-600 border-t border-gray-100 bg-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
