import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone } from 'lucide-react';

export default function SubscribeModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    city: '',
    businessType: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg max-w-md w-full shadow-2xl relative border-t-4 border-[#b10607]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 p-1 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#b10607] text-white p-4 rounded-t-sm">
          <h3 className="font-bold text-base">Subscribe & Get Latest Updates</h3>
          <p className="text-xs opacity-90">Join 50,000+ Retailers Getting Daily Wholesale Catalog Updates</p>
        </div>

        <div className="p-5">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2 animate-bounce" />
              <h4 className="font-extrabold text-gray-800 text-sm">Thank You for Subscribing!</h4>
              <p className="text-xs text-gray-500 mt-1">
                You will now receive exclusive Ahmedabad wholesale updates directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#b10607]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">E-mail Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#b10607]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Contact Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#b10607]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#b10607]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Type of Business</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Retail Shop Owner, Reseller, Online Store"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#b10607]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#b10607] hover:bg-[#8b0405] text-white py-2.5 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-md mt-2"
              >
                <Send className="w-3.5 h-3.5" /> Subscribe Now
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
