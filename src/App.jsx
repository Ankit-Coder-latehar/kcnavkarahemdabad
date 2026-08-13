import React, { useState, useEffect, useMemo } from 'react';
import TopMarquee from './components/Header/TopMarquee';
import TopBar from './components/Header/TopBar';
import MainHeader from './components/Header/MainHeader';
import Navbar from './components/Header/Navbar';
import FilterSidebar from './components/Catalog/FilterSidebar';
import ProductGrid from './components/Catalog/ProductGrid';
import ProductDetailModal from './components/Modals/ProductDetailModal';
import CartDrawer from './components/Modals/CartDrawer';
import SubscribeModal from './components/Modals/SubscribeModal';
import WhatsAppFloat from './components/Floating/WhatsAppFloat';
import SeoContent from './components/SEO/SeoContent';
import Footer from './components/Footer/Footer';
import AdminPanel from './components/Admin/AdminPanel';
import AdminLoginModal from './components/Admin/AdminLoginModal';
import HeroSection from './components/Hero/HeroSection';

import { PRODUCTS } from './data/products';

export default function App() {
  // State for Navigation / View Mode
  const [currentView, setCurrentView] = useState('storefront'); // 'storefront' | 'admin'

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('kcnavkar_admin_logged') === 'true';
  });
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  // Dynamic Products List with localStorage Persistence
  const [productsList, setProductsList] = useState(() => {
    try {
      const saved = localStorage.getItem('kcnavkar_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const defaultMap = new Map(PRODUCTS.map((p) => [p.id, p]));
          const existingIds = new Set(parsed.map((p) => p.id));

          // Merge: default fields first, then cached overrides on top
          // - `...defaults` ensures new fields added to products.js appear for all products
          // - `...p` restores all admin edits (title, price, image, etc.)
          // - catalogPdf: prefer admin-saved value if the key exists in cache, else use default
          const merged = parsed.map((p) => {
            const defaults = defaultMap.get(p.id);
            if (!defaults) return p;
            return {
              ...defaults,
              ...p,
              catalogPdf: 'catalogPdf' in p ? p.catalogPdf : defaults.catalogPdf
            };
          });

          // Add any brand-new default products not yet in localStorage
          const missingDefaults = PRODUCTS.filter((p) => !existingIds.has(p.id));
          const final = [...missingDefaults, ...merged];

          localStorage.setItem('kcnavkar_products', JSON.stringify(final));
          return final;
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return PRODUCTS;
  });

  // Save to localStorage when products change
  // Note: base64-encoded catalogPdf values are stripped before saving (too large for localStorage).
  // Only URL/path strings (e.g. /pdfs/sofiya-catalog.pdf) are persisted.
  useEffect(() => {
    try {
      const toSave = productsList.map((p) => ({
        ...p,
        catalogPdf: p.catalogPdf && p.catalogPdf.startsWith('data:') ? '' : (p.catalogPdf || '')
      }));
      localStorage.setItem('kcnavkar_products', JSON.stringify(toSave));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
      alert('⚠️ Could not save changes to browser storage. Please use a PDF file path (e.g. /pdfs/sofiya-catalog.pdf) instead of uploading a PDF file directly.');
    }
  }, [productsList]);

  // Catalog Filter States
  const [activeCurrency, setActiveCurrency] = useState('INR');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: null, max: null });

  // Modal / Drawer States
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Cart Items State
  const [cartItems, setCartItems] = useState([
    {
      product: productsList[0] || PRODUCTS[0],
      selectedSize: 'M',
      quantity: 10
    }
  ]);

  // Hash & URL Route handling for Admin Panel (#/admin or /admin)
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const isAdminRoute = hash === '#/admin' || hash === '#/kc-admin' || pathname === '/admin';

      if (isAdminRoute) {
        const loggedIn = sessionStorage.getItem('kcnavkar_admin_logged') === 'true';
        if (loggedIn) {
          setIsAdminLoggedIn(true);
          setCurrentView('admin');
          setAdminLoginModalOpen(false);
        } else {
          setCurrentView('storefront');
          setAdminLoginModalOpen(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  // Admin Authentication Handlers
  const handleAdminLogin = (emailInput, passwordInput) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    if (
      (cleanEmail === 'admin@kcnavkar.com' || cleanEmail === 'admin') &&
      passwordInput === 'admin123'
    ) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('kcnavkar_admin_logged', 'true');
      setCurrentView('admin');
      setAdminLoginModalOpen(false);
      if (window.location.hash !== '#/admin') {
        window.location.hash = '#/admin';
      }
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('kcnavkar_admin_logged');
    setCurrentView('storefront');
    setAdminLoginModalOpen(false);
    if (window.location.hash === '#/admin' || window.location.hash === '#/kc-admin') {
      window.location.hash = '';
    }
  };

  const handleCloseAdminLoginModal = () => {
    setAdminLoginModalOpen(false);
    if (window.location.hash === '#/admin' || window.location.hash === '#/kc-admin') {
      window.location.hash = '';
    }
  };

  // Handlers for Admin Product Operations
  const handleAddProduct = (newProduct) => {
    setProductsList((prev) => [newProduct, ...prev]);
    alert(`Product "${newProduct.title}" added successfully!`);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    if (activeProductModal && activeProductModal.id === updatedProduct.id) {
      setActiveProductModal(updatedProduct);
    }
    alert(`Product "${updatedProduct.title}" updated successfully!`);
  };

  const handleDeleteProduct = (productId) => {
    setProductsList((prev) => prev.filter((p) => p.id !== productId));
    if (activeProductModal && activeProductModal.id === productId) {
      setActiveProductModal(null);
    }
  };

  const handleResetProducts = () => {
    if (confirm('Are you sure you want to reset all products back to default initial items?')) {
      setProductsList(PRODUCTS);
      localStorage.removeItem('kcnavkar_products');
      alert('Product catalog reset to default items successfully!');
    }
  };

  // Handlers for Filters
  const handleToggleFabric = (fabric) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  const handleToggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedFabrics([]);
    setSelectedSizes([]);
    setPriceRange({ min: null, max: null });
  };

  // Cart Management
  const handleAddToCart = (product, selectedSize = 'M', quantity = 10) => {
    const qtyToAdd = Math.max(10, quantity);
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qtyToAdd;
        return updated;
      }
      return [...prev, { product, selectedSize, quantity: qtyToAdd }];
    });
    setCartDrawerOpen(true);
  };

  const handleUpdateCartQty = (productId, newQty) => {
    if (newQty < 10) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Filtered Products Logic for Storefront
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      // Search term query match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesFabric = product.fabric.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesFabric && !matchesCat) return false;
      }

      // Category match
      if (selectedCategory !== 'all') {
        const catQ = selectedCategory.toLowerCase();
        const matchesCat = product.category.toLowerCase().includes(catQ);
        const matchesTitle = product.title.toLowerCase().includes(catQ);
        const matchesType = product.type.toLowerCase().includes(catQ);
        if (!matchesCat && !matchesTitle && !matchesType) return false;
      }

      // Fabric filter match
      if (selectedFabrics.length > 0) {
        const matchesFabric = selectedFabrics.some((f) =>
          product.fabric.toLowerCase().includes(f.toLowerCase())
        );
        if (!matchesFabric) return false;
      }

      // Size filter match
      if (selectedSizes.length > 0) {
        const hasSize = selectedSizes.some((s) => product.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Price filter match
      if (priceRange.min !== null && product.price < priceRange.min) return false;
      if (priceRange.max !== null && product.price > priceRange.max) return false;

      return true;
    });
  }, [productsList, searchQuery, selectedCategory, selectedFabrics, selectedSizes, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* 1. Top Announcement Marquee */}
      <TopMarquee />

      {/* 2. Header Top Contact & Currency Switcher Bar */}
      <TopBar
        activeCurrency={activeCurrency}
        onCurrencyChange={setActiveCurrency}
        onOpenSubscribe={() => setSubscribeModalOpen(true)}
      />

      {/* 3. Main Header with Logo & Cart */}
      <MainHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setCartDrawerOpen(true)}
        onToggleMobileNav={() => setMobileNavOpen(!mobileNavOpen)}
      />

      {/* Conditional View Rendering: Admin Panel or Storefront */}
      {currentView === 'admin' && isAdminLoggedIn ? (
        <AdminPanel
          products={productsList}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetProducts={handleResetProducts}
          onBackToStorefront={handleAdminLogout}
          onLogout={handleAdminLogout}
          activeCurrency={activeCurrency}
        />
      ) : (
        <>
          {/* 4. Main Navigation Mega Menu */}
          <Navbar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            mobileNavOpen={mobileNavOpen}
            onToggleMobileNav={() => setMobileNavOpen(!mobileNavOpen)}
          />

          {/* Hero Section Banner */}
          <HeroSection
            onSelectCategory={setSelectedCategory}
            onOpenSubscribe={() => setSubscribeModalOpen(true)}
          />

          {/* Breadcrumbs Banner */}
          <div className="bg-white border-b border-gray-200 py-3">
            <div className="w-full px-4 sm:px-6 lg:px-8 text-sm text-gray-600 font-medium flex items-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className="hover:text-[#b10607]"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-gray-900 font-bold capitalize text-sm">
                {selectedCategory === 'all' ? 'Wholesale Kurtis In Surat' : selectedCategory}
              </span>
            </div>
          </div>

          {/* Main Catalog Layout Section */}
          <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              
              {/* Sidebar Filter Column */}
              <div className="lg:col-span-1">
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  selectedFabrics={selectedFabrics}
                  onToggleFabric={handleToggleFabric}
                  selectedSizes={selectedSizes}
                  onToggleSize={handleToggleSize}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  onResetFilters={handleResetFilters}
                />
              </div>

              {/* Product Grid Column */}
              <div className="lg:col-span-4">
                <ProductGrid
                  products={filteredProducts}
                  activeCurrency={activeCurrency}
                  selectedCategory={selectedCategory}
                  onViewProduct={setActiveProductModal}
                  onAddToCart={handleAddToCart}
                />
              </div>

            </div>
          </main>

          {/* SEO Section at Bottom */}
          <SeoContent />

          {/* Footer */}
          <Footer onSelectCategory={setSelectedCategory} />
        </>
      )}

      {/* Modals & Floating Components */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={handleCloseAdminLoginModal}
        onLogin={handleAdminLogin}
      />

      {activeProductModal && (
        <ProductDetailModal
          product={activeProductModal}
          activeCurrency={activeCurrency}
          onClose={() => setActiveProductModal(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        activeCurrency={activeCurrency}
      />

      <SubscribeModal
        isOpen={subscribeModalOpen}
        onClose={() => setSubscribeModalOpen(false)}
      />

      <WhatsAppFloat />

    </div>
  );
}
