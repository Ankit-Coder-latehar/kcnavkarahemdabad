import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, X, AlertCircle } from 'lucide-react';

export default function AdminLoginModal({
  isOpen,
  onClose,
  onLogin
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = onLogin(email, password);
    if (!success) {
      setError('Invalid admin credentials. Please check your username/password and try again.');
    } else {
      setEmail('');
      setPassword('');
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg max-w-md w-full shadow-2xl relative border-t-4 border-[#b10607] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#36454F] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-black text-base">
            <ShieldCheck className="w-5 h-5 text-yellow-400" />
            <span>Admin Portal Login</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          <div className="text-center mb-5">
            <div className="w-12 h-12 bg-red-50 text-[#b10607] rounded-full flex items-center justify-center mx-auto mb-2 border border-red-100">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Restricted Admin Access</h3>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              Please enter your administrator credentials to access the catalog management panel.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 text-red-700 p-3 rounded text-xs font-bold mb-4 flex items-center gap-2 animate-bounce">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email / Username Input */}
            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                Admin Username or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="admin@kcnavkar.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#b10607] font-semibold"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#b10607] font-semibold"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#b10607] hover:bg-[#8b0405] text-white py-3 rounded-md font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md mt-2"
            >
              <Lock className="w-4 h-4" /> Authenticate & Open Dashboard
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
