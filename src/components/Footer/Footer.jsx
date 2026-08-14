import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="bg-[#1f242e] text-gray-300 text-sm pt-12 pb-6 border-t-4 border-[#b10607]">
      <div className="w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        
        {/* Col 1: About */}
        <div>
          <div className="font-black text-2xl text-white mb-3 tracking-tight">
            KC <span className="text-[#b10607]">NAVKAR</span>
          </div>
          <p className="text-gray-400 leading-relaxed mb-4 text-sm">
            kcnavkar.com is Surat's premier online B2B textile market for wholesale ladies Kurtis, Sarees, Lehengas, Salwar Kameez, and Dress Materials directly from brand manufacturers.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/share/17GPfdstD8/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-[#b10607] transition" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/kcnavkarahmedabad?igsh=MmtxaXJyd3g5cGZ4" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-[#b10607] transition" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://youtube.com/@sanjaydhariwal2448?si=Ejzd77ZYPYNEy0sB" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-[#b10607] transition" aria-label="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>


        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-extrabold text-white text-base uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
            <li><a href="#shipping" className="hover:text-white transition">Shipping Rate & Policy</a></li>
            <li><a href="#payment" className="hover:text-white transition">Bank Details & Payment</a></li>
            <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Col 3: Categories */}
        <div>
          <h4 className="font-extrabold text-white text-base uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
            Top Categories
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><button onClick={() => onSelectCategory('Kurti')} className="hover:text-white transition">Wholesale Kurtis Surat</button></li>
            <li><button onClick={() => onSelectCategory('Cotton Kurtis')} className="hover:text-white transition">Cotton Kurtis</button></li>
            <li><button onClick={() => onSelectCategory('Anarkali Kurtis')} className="hover:text-white transition">Anarkali Suits</button></li>
            <li><button onClick={() => onSelectCategory('Surat Wholesale Sarees')} className="hover:text-white transition">Surat Wholesale Sarees</button></li>
            <li><button onClick={() => onSelectCategory('Salwar Kameez')} className="hover:text-white transition">Pakistani Salwar Kameez</button></li>
            <li><button onClick={() => onSelectCategory('Co Ord Set')} className="hover:text-white transition">Trendy Co-Ord Sets</button></li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div>
          <h4 className="font-extrabold text-white text-base uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
            Contact Us
          </h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-[#b10607] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold text-white block">Shop no. 20 Ground Floor</span>
                <span>Sharanam estate - 4, opp. Ashima mill, near anupam cinema road, Khokra, Ahmedabad, Gujrat - 380021</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4.5 h-4.5 text-[#b10607] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <a href="https://api.whatsapp.com/send?phone=919327332114" target="_blank" rel="noreferrer" className="hover:text-white transition">+91 93273 32114</a>
                <a href="https://api.whatsapp.com/send?phone=918690695238" target="_blank" rel="noreferrer" className="hover:text-white transition">+91 86906 95238</a>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4.5 h-4.5 text-[#b10607] shrink-0" />
              <span>support@kcnavkar.com</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4.5 h-4.5 text-[#b10607] shrink-0" />
              <span>Mon - Sat: 9:00 AM - 10:00 PM</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar & Copyright */}
      <div className="border-t border-gray-800 pt-6">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-bold">kcnavkar.com</span> (Powered by Art Riddh Manufacturer Brand). All Rights Reserved.
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>Encrypted SSL 256-bit Secure Wholesale Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
