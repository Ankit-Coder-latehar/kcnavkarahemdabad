import React, { useState } from 'react';
import { MessageSquare, Phone, ChevronUp, X, Sparkles } from 'lucide-react';

export default function WhatsAppFloat() {
  const [openMenu, setOpenMenu] = useState(false);

  const groups = [
    { title: 'Kurti Set Catalogue Group', link: 'https://chat.whatsapp.com/E2MMM83jFVwK7RTSW6ZwQ5' },
    { title: 'Sarees Catalogue Group', link: 'https://chat.whatsapp.com/FvZx8nno3b1FbuPrJsgr7Y' },
    { title: 'Dress Material Group', link: 'https://chat.whatsapp.com/FQz8sz5FpuG9L2v9nLVX6Q' },
    { title: 'Pakistani Suits Group', link: 'https://chat.whatsapp.com/GwgUNiOEO19LiL80aZhgfv' },
    { title: 'KC Navkar Official Channel', link: 'https://whatsapp.com/channel/0029Va4ynU9CXC3BkYqkLQ3W' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Broadcast Groups Window */}
      {openMenu && (
        <div className="bg-white border border-gray-200 shadow-2xl rounded-lg p-3 w-72 mb-3 animate-fadeIn border-t-4 border-[#25D366]">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
            <div className="font-extrabold text-xs text-gray-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span>Join WhatsApp Groups</span>
            </div>
            <button onClick={() => setOpenMenu(false)} className="text-gray-400 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-gray-600 mb-2">
            Get instant daily new catalog updates on WhatsApp:
          </p>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {groups.map((grp, idx) => (
              <a
                key={idx}
                href={grp.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-1.5 rounded bg-green-50 hover:bg-green-100 text-green-800 text-[11px] font-semibold transition"
              >
                <Phone className="w-3.5 h-3.5 text-green-600 shrink-0" />
                <span className="truncate">{grp.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition transform hover:scale-105 group"
        title="WhatsApp Broadcast & Inquiry"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="hidden group-hover:inline font-bold text-xs pr-1 uppercase tracking-wide">
          WhatsApp Broadcast
        </span>
      </button>
    </div>
  );
}
