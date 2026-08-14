import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, ShieldCheck, Truck, Sparkles, MessageSquare } from 'lucide-react';

import logoImg from '../../assets/logo.png';

export default function HeroSection({ onSelectCategory, onOpenSubscribe }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "KC NAVKAR",
      subtitle: "MAA SANKHWALI CREATION",
      tagline: "Premier Wholesale B2B Market for Designer Kurtis, Sarees & Dress Materials",
      badge: "Direct Factory Manufacturer Pricing",
      bgGradient: "from-[#8b0405] via-[#b10607] to-[#5a0001]",
      textColor: "text-amber-300",
      accentBg: "bg-amber-400 text-gray-900",
      categoryLink: "Kurti",
      imgUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "LATEST 2026 CATALOGS",
      subtitle: "Wholesale Cotton Kurtis, Anarkali & Co-Ord Sets",
      tagline: "100% Quality Assured Fabrics Direct From Ahmedabad Garment Hub",
      badge: "Express Worldwide Shipping",
      bgGradient: "from-gray-900 via-[#1f242e] to-[#0f172a]",
      textColor: "text-red-400",
      accentBg: "bg-[#b10607] text-white",
      categoryLink: "Cotton Kurtis",
      imgUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "B2B WHOLESALE DISCOUNTS",
      subtitle: "Cash On Delivery Available Across India",
      tagline: "Boost Your Retail Margin Up to 50%+ with Ready Stock Express Dispatch",
      badge: "Minimum Order Quantity 10 Pcs",
      bgGradient: "from-[#1c1917] via-[#451a03] to-[#78350f]",
      textColor: "text-amber-400",
      accentBg: "bg-amber-500 text-gray-950",
      categoryLink: "Ahmedabad Wholesale Sarees",
      imgUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80",
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full bg-gray-100 overflow-hidden relative border-b border-gray-200">
      
      {/* Brand Header Banner Bar */}
      <div className="bg-[#1f242e] text-white py-2 px-4 border-b border-amber-600/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
          <div className="flex items-center gap-2 text-amber-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="tracking-wide uppercase font-bold text-white">KC NAVKAR</span>
            <span className="text-gray-400">|</span>
            <span className="text-amber-300 font-medium">Maa Sankhwali Creation</span>
          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> 100% Original Brand Guarantee
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-blue-400" /> Fast Express Shipping
            </span>
          </div>
        </div>
      </div>

      {/* Main Slideshow Container */}
      <div className="relative min-h-[300px] sm:min-h-[360px] md:min-h-[400px] flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Background with Gradient & Image Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`}>
                <img
                  src={slide.imgUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover mix-blend-overlay opacity-30"
                />
              </div>

              {/* Decorative Brand Watermark Ornament */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Slide Content Overlay */}
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12 text-white grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                <div className="md:col-span-8 space-y-3">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                      {slide.title}
                    </h2>
                    <h3 className={`text-lg sm:text-2xl font-bold mt-1 ${slide.textColor}`}>
                      {slide.subtitle}
                    </h3>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-gray-200 max-w-xl leading-relaxed">
                    {slide.tagline}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => onSelectCategory(slide.categoryLink)}
                      className={`px-5 py-2.5 rounded-md font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg transform hover:-translate-y-0.5 ${slide.accentBg}`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Explore Collection</span>
                    </button>
                    
                    <a
                      href="https://api.whatsapp.com/send?phone=919327332114&text=Hi%20KC%20Navkar,%20I%20want%20to%20inquire%20about%20wholesale%20kurtis%20catalogs."
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-md font-bold text-xs sm:text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white transition flex items-center gap-2 shadow-lg transform hover:-translate-y-0.5"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                  </div>

                </div>

                {/* Right Decorative Brand Card with Maa Sankhwali Creation Logo Image & Address */}
                <div className="hidden md:flex md:col-span-4 justify-end">
                  <div className="bg-white/95 backdrop-blur-md border-2 border-amber-500/40 p-4 rounded-2xl text-center shadow-2xl space-y-3 max-w-xs transform hover:scale-[1.02] transition duration-300">
                    <div className="bg-white p-2 rounded-xl shadow-inner border border-gray-100 overflow-hidden flex items-center justify-center min-h-[140px]">
                      <img
                        src={logoImg}
                        alt="K.C. NAVKAR Maa Sankhwali Creation"
                        className="w-full h-auto max-h-40 object-contain mx-auto"
                      />
                    </div>
                    <div className="border-t border-gray-200 pt-2 text-xs text-gray-800 font-medium leading-relaxed">
                      <div className="font-bold text-[#b10607] mb-0.5 text-xs">Shop no. 20 Ground Floor</div>
                      <div className="text-gray-600 text-[11px]">Sharanam estate - 4, opp. Ashima mill, near anupam cinema road, Khokra, Ahmedabad, Gujrat - 380021</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          );
        })}

        {/* Carousel Prev / Next Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition backdrop-blur-sm border border-white/20"
          aria-label="Previous Banner"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition backdrop-blur-sm border border-white/20"
          aria-label="Next Banner"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
