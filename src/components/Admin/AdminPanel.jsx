import React, { useState } from 'react';
import { savePdfBlob, generatePdfKey, isIndexedDbRef, makeRef } from '../../utils/pdfStorage';
import {
  Plus,
  Edit2,
  Trash2,
  Tag,
  CheckCircle,
  Package,
  Layers,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Search,
  X,
  UploadCloud,
  Upload,
  Link,
  FileText,
  Download
} from 'lucide-react';
import { FABRIC_OPTIONS, CURRENCY_RATES } from '../../data/products';
import { CATEGORIES } from '../../data/categories';

export default function AdminPanel({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  onBackToStorefront,
  onLogout,
  activeCurrency
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [imageUploadMode, setImageUploadMode] = useState('upload'); // 'upload' | 'url'
  const [uploadFileName, setUploadFileName] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [pdfUploading, setPdfUploading] = useState(false);


  // Image Upload File Handler
  const handleImageFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (PNG, JPG, WEBP, etc.).');
        return;
      }
      setUploadFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData((prev) => ({ ...prev, image: event.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // PDF Upload — stores file in IndexedDB, saves only a ref key in formData
  const handlePdfFile = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      alert('Please select a valid PDF file.');
      return;
    }
    setPdfUploading(true);
    setPdfFileName(file.name);
    try {
      const key = generatePdfKey();
      await savePdfBlob(key, file);
      setFormData((prev) => ({ ...prev, catalogPdf: makeRef(key) }));
    } catch (err) {
      console.error('Failed to save PDF to IndexedDB', err);
      alert('Failed to save PDF. Please try again.');
    } finally {
      setPdfUploading(false);
    }
  };

  const handlePdfFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) handlePdfFile(file);
  };

  const handlePdfDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handlePdfDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handlePdfFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Please drop a valid image file.');
        return;
      }
      setUploadFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData((prev) => ({ ...prev, image: event.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    catalogCode: '',
    category: 'Rayon Kurtis',
    fabric: 'Rayon',
    type: 'Kurti',
    price: 850,
    mrp: 1699,
    moq: 'Minimum 10 Pcs.',
    margin: '50%',
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: '',
    catalogPdf: '',
    fastShip: true,
    inStock: true
  });

  const availableSizesList = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

  // Currency helper
  const currencyInfo = CURRENCY_RATES[activeCurrency] || CURRENCY_RATES.INR;
  const formatPrice = (amount) => {
    const converted = Math.round(amount * currencyInfo.rate);
    return `${currencyInfo.prefix}${converted}`;
  };

  // Open Form for Adding New Product
  const handleOpenAddForm = () => {
    setFormData({
      id: null,
      title: '',
      catalogCode: `KCN-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Rayon Kurtis',
      fabric: 'Rayon',
      type: 'Kurti',
      price: 799,
      mrp: 1499,
      moq: 'Minimum 10 Pcs.',
      margin: '47%',
      sizes: ['M', 'L', 'XL', 'XXL'],
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      catalogPdf: '',
      fastShip: true,
      inStock: true
    });
    setEditingProduct(null);
    setUploadFileName('');
    setIsFormOpen(true);
  };

  // Open Form for Editing Existing Product
  const handleOpenEditForm = (prod) => {
    setFormData({ ...prod, catalogPdf: prod.catalogPdf || '' });
    setEditingProduct(prod);
    setUploadFileName('');
    setPdfFileName(isIndexedDbRef(prod.catalogPdf) ? '(PDF already uploaded)' : prod.catalogPdf || '');
    setIsFormOpen(true);
  };

  // Toggle Size Checkbox in Form
  const handleToggleFormSize = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      const updatedSizes = exists
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: updatedSizes };
    });
  };

  // Auto-calculate margin when Price/MRP changes
  const handlePriceChange = (priceVal, mrpVal) => {
    const price = Number(priceVal) || 0;
    const mrp = Number(mrpVal) || 0;
    let marginStr = '45%';
    if (mrp > 0 && price > 0 && mrp >= price) {
      const calcPercent = Math.round(((mrp - price) / mrp) * 100);
      marginStr = `${calcPercent}%`;
    }
    setFormData((prev) => ({
      ...prev,
      price,
      mrp,
      margin: marginStr
    }));
  };

  // Form Submit
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a product title.');
      return;
    }
    if (!formData.image || !formData.image.trim()) {
      alert('Please upload or select a product image.');
      return;
    }
    if (formData.sizes.length === 0) {
      alert('Please select at least one size.');
      return;
    }

    if (editingProduct) {
      onUpdateProduct(formData);
    } else {
      onAddProduct({
        ...formData,
        id: Date.now()
      });
    }

    setIsFormOpen(false);
  };

  // Filtered Products for Admin Table
  const filteredAdminProducts = products.filter((prod) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      prod.title.toLowerCase().includes(q) ||
      prod.catalogCode.toLowerCase().includes(q) ||
      prod.fabric.toLowerCase().includes(q);
    const matchesCategory =
      selectedCategoryFilter === 'all' ||
      prod.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase());
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-6 lg:p-8">
      {/* Top Admin Header Bar */}
      <div className="w-full mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToStorefront}
            className="flex items-center gap-2 bg-gray-100 hover:bg-[#b10607] text-gray-700 hover:text-white px-4 py-2 rounded-md font-bold text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" /> Storefront
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#b10607]" /> KC Navkar Admin Panel
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Manage product catalogs, update images, titles, pricing, and live storefront inventory.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetProducts}
            className="flex items-center gap-1.5 border border-gray-300 hover:border-red-500 text-gray-600 hover:text-red-600 px-3 py-2 rounded-md font-bold text-xs transition bg-white"
            title="Reset catalog to default items"
          >
            <RotateCcw className="w-4 h-4" /> Reset Defaults
          </button>
          <button
            onClick={handleOpenAddForm}
            className="flex items-center gap-2 bg-[#b10607] hover:bg-[#8b0405] text-white px-4 py-2 rounded-md font-extrabold text-sm transition shadow-md"
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 bg-[#36454F] hover:bg-black text-white px-3.5 py-2 rounded-md font-extrabold text-xs transition shadow-sm"
            title="Log out of Admin Panel"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Admin Quick Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-[#b10607] rounded-lg">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">Total Catalogs</div>
            <div className="text-2xl font-black text-gray-900">{products.length}</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-[#8a3ca9] rounded-lg">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">Categories</div>
            <div className="text-2xl font-black text-gray-900">
              {new Set(products.map((p) => p.category)).size}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-[#76b51b] rounded-lg">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">In Stock Catalogs</div>
            <div className="text-2xl font-black text-gray-900">
              {products.filter((p) => p.inStock).length}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Tag className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">Fast Ship Items</div>
            <div className="text-2xl font-black text-gray-900">
              {products.filter((p) => p.fastShip).length}
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar for Admin Table */}
      <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search product title, code, or fabric..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-[#b10607]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-600 uppercase">Filter Category:</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-xs font-bold text-gray-800 outline-none focus:border-[#b10607]"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
            {CATEGORIES[0].subcategories.map((sub, idx) => (
              <option key={`sub-${idx}`} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Management Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-[#36454F] text-white text-xs uppercase tracking-wider font-extrabold">
              <tr>
                <th className="p-3.5">Product Image</th>
                <th className="p-3.5">Title & Code</th>
                <th className="p-3.5">Category & Fabric</th>
                <th className="p-3.5">Price & Margin</th>
                <th className="p-3.5">Sizes & MOQ</th>
                <th className="p-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {filteredAdminProducts.length > 0 ? (
                filteredAdminProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-gray-50 transition">
                    {/* Image */}
                    <td className="p-3">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-16 h-16 object-contain rounded border border-gray-200 bg-gray-50 p-1"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                    </td>

                    {/* Title & Code */}
                    <td className="p-3 max-w-xs">
                      <div className="font-extrabold text-gray-900 text-sm line-clamp-2">
                        {prod.title}
                      </div>
                      <div className="text-xs text-gray-500 font-semibold mt-1">
                        Code: <span className="text-[#8a3ca9] font-bold">{prod.catalogCode}</span>
                      </div>
                    </td>

                    {/* Category & Fabric */}
                    <td className="p-3">
                      <span className="inline-block bg-gray-100 border border-gray-300 text-gray-800 text-xs font-bold px-2 py-0.5 rounded mb-1">
                        {prod.category}
                      </span>
                      <div className="text-xs text-gray-600 font-semibold">
                        Fabric: {prod.fabric}
                      </div>
                    </td>

                    {/* Price & Margin */}
                    <td className="p-3">
                      <div className="font-extrabold text-[#b10607] text-sm">
                        {formatPrice(prod.price)} / Pc
                      </div>
                      <div className="text-xs text-gray-400 line-through">
                        MRP: {formatPrice(prod.mrp)}
                      </div>
                      <span className="inline-block bg-[#76b51b] text-white text-[10px] font-bold px-1.5 py-0.2 rounded mt-1">
                        Margin {prod.margin}
                      </span>
                    </td>

                    {/* Sizes & MOQ */}
                    <td className="p-3">
                      <div className="text-xs font-semibold text-gray-700 mb-1">
                        MOQ: <strong className="text-gray-900">{prod.moq}</strong>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {prod.sizes.map((s, idx) => (
                          <span
                            key={idx}
                            className="bg-[#8a3ca9] text-white text-[10px] font-bold px-1.5 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditForm(prod)}
                          className="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white p-2 rounded-md transition font-bold text-xs flex items-center gap-1 border border-blue-200"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                              onDeleteProduct(prod.id);
                            }
                          }}
                          className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white p-2 rounded-md transition font-bold text-xs flex items-center gap-1 border border-red-200"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-500 font-bold">
                    No products matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border-t-4 border-[#b10607] p-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <h3 className="font-black text-xl text-gray-900 flex items-center gap-2">
                {editingProduct ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-[#b10607]" />}
                {editingProduct ? 'Edit Product Catalog' : 'Add New Product Catalog'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-red-600 bg-gray-100 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Product Title */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Blue Hills Victoria Vol 35 Kurti Wholesale Market"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-semibold outline-none focus:border-[#b10607]"
                />
              </div>

              {/* Product Image Selection: File Upload & URL option */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-extrabold text-gray-700 uppercase">
                    Product Image *
                  </label>
                  <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded text-xs">
                    <button
                      type="button"
                      onClick={() => setImageUploadMode('upload')}
                      className={`px-2.5 py-1 rounded font-bold transition flex items-center gap-1 ${
                        imageUploadMode === 'upload'
                          ? 'bg-[#b10607] text-white shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Upload className="w-3 h-3" /> Upload Image File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadMode('url')}
                      className={`px-2.5 py-1 rounded font-bold transition flex items-center gap-1 ${
                        imageUploadMode === 'url'
                          ? 'bg-[#b10607] text-white shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Link className="w-3 h-3" /> Image URL Link
                    </button>
                  </div>
                </div>

                {imageUploadMode === 'upload' ? (
                  <div className="space-y-2">
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className="border-2 border-dashed border-gray-300 hover:border-[#b10607] rounded-lg p-4 text-center bg-gray-50/70 hover:bg-red-50/20 transition cursor-pointer relative"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-red-100 text-[#b10607] flex items-center justify-center">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-gray-800">
                          Click to browse image file or drag & drop here
                        </p>
                        <p className="text-[11px] text-gray-500 font-medium">
                          Supports PNG, JPG, WEBP, GIF formats
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#b10607] font-semibold"
                    />
                  </div>
                )}

                {/* Selected / Uploaded Image Preview Box */}
                {formData.image && (
                  <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={formData.image}
                        alt="Product Preview"
                        className="w-14 h-14 object-contain rounded border border-gray-300 bg-white shrink-0 shadow-xs"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="min-w-0">
                        <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-extrabold uppercase rounded mb-0.5">
                          {formData.image.startsWith('data:') ? 'Uploaded Image File' : 'Product Image Selected'}
                        </span>
                        <p className="text-xs font-bold text-gray-800 truncate">
                          {uploadFileName || (formData.image.startsWith('data:') ? 'Local Image File Loaded' : formData.image)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, image: '' });
                        setUploadFileName('');
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded transition shrink-0 flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Grid 2 Cols: Catalog Code & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Catalog Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.catalogCode}
                    onChange={(e) => setFormData({ ...formData, catalogCode: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-bold outline-none focus:border-[#b10607]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-bold outline-none focus:border-[#b10607]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                    {CATEGORIES[0].subcategories.map((sub, idx) => (
                      <option key={`sub-${idx}`} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid 2 Cols: Fabric & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Fabric
                  </label>
                  <select
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-semibold outline-none focus:border-[#b10607]"
                  >
                    {FABRIC_OPTIONS.map((fab, idx) => (
                      <option key={idx} value={fab}>
                        {fab}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Type / Work
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-semibold outline-none focus:border-[#b10607]"
                  />
                </div>
              </div>

              {/* Grid 3 Cols: Wholesale Price, MRP & Auto Margin */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-3 rounded-md border border-gray-200">
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Wholesale Price (INR)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => handlePriceChange(e.target.value, formData.mrp)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm font-extrabold text-[#b10607] outline-none focus:border-[#b10607]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    MRP (INR)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.mrp}
                    onChange={(e) => handlePriceChange(formData.price, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm font-bold text-gray-700 outline-none focus:border-[#b10607]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                    Retailer Margin
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formData.margin}
                    className="w-full border border-gray-300 bg-gray-100 rounded px-3 py-1.5 text-sm font-black text-green-700 outline-none"
                  />
                </div>
              </div>

              {/* MOQ Input */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                  Minimum Order Quantity (MOQ)
                </label>
                <input
                  type="text"
                  required
                  value={formData.moq}
                  onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-semibold outline-none focus:border-[#b10607]"
                />
              </div>

              {/* Available Sizes Checkboxes */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">
                  Available Sizes *
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizesList.map((size) => {
                    const isChecked = formData.sizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleToggleFormSize(size)}
                        className={`px-3 py-1 rounded font-bold text-xs border transition ${
                          isChecked
                            ? 'bg-[#8a3ca9] border-[#8a3ca9] text-white'
                            : 'bg-gray-100 border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fast Ship & Stock Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.fastShip}
                    onChange={(e) => setFormData({ ...formData, fastShip: e.target.checked })}
                    className="w-4 h-4 text-[#76b51b] rounded cursor-pointer"
                  />
                  <span>Fast Ship Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-[#b10607] rounded cursor-pointer"
                  />
                  <span>In Stock</span>
                </label>
              </div>

              {/* Catalog PDF — Upload via IndexedDB (no size limit) */}
              <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50/40">
                <label className="block text-xs font-extrabold text-gray-700 uppercase flex items-center gap-1.5 mb-3">
                  <FileText className="w-3.5 h-3.5 text-[#8a3ca9]" /> Catalog PDF
                  <span className="text-gray-400 font-medium normal-case text-[11px]">(optional)</span>
                </label>

                {/* Drop zone */}
                <div
                  onDragOver={handlePdfDragOver}
                  onDrop={handlePdfDrop}
                  className={`border-2 border-dashed rounded-lg p-5 text-center transition cursor-pointer relative ${
                    formData.catalogPdf && isIndexedDbRef(formData.catalogPdf)
                      ? 'border-green-400 bg-green-50'
                      : 'border-purple-300 hover:border-[#8a3ca9] bg-white hover:bg-purple-50/30'
                  }`}
                >
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={pdfUploading}
                  />
                  <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                    {pdfUploading ? (
                      <>
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-[#8a3ca9] flex items-center justify-center animate-pulse">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-[#8a3ca9]">Saving PDF to browser storage...</p>
                      </>
                    ) : formData.catalogPdf && isIndexedDbRef(formData.catalogPdf) ? (
                      <>
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-extrabold text-green-700">
                          ✅ PDF Uploaded: <span className="text-green-900">{pdfFileName || 'PDF file stored'}</span>
                        </p>
                        <p className="text-[11px] text-green-600">Click or drop a new file to replace it</p>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-[#8a3ca9] flex items-center justify-center">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-gray-800">Click to browse PDF or drag &amp; drop here</p>
                        <p className="text-[11px] text-gray-500">PDF files of any size — stored securely in browser</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Current PDF status */}
                {formData.catalogPdf && isIndexedDbRef(formData.catalogPdf) && (
                  <div className="mt-2 flex items-center justify-between bg-green-50 border border-green-200 rounded-md px-3 py-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-xs font-bold text-green-800">
                        {pdfFileName || 'PDF stored'} — View/Download buttons will appear on product page
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setFormData({ ...formData, catalogPdf: '' }); setPdfFileName(''); }}
                      className="ml-2 px-2.5 py-1 text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded transition flex items-center gap-1 shrink-0"
                    >
                      <X className="w-3 h-3" /> Remove
                    </button>
                  </div>
                )}

                {/* If there's a plain URL (e.g. /pdfs/sofiya-catalog.pdf from products.js defaults) */}
                {formData.catalogPdf && !isIndexedDbRef(formData.catalogPdf) && !formData.catalogPdf.startsWith('data:') && (
                  <div className="mt-2 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-md px-3 py-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-xs font-bold text-blue-800">Current PDF path: <span className="font-extrabold">{formData.catalogPdf}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <a
                        href={formData.catalogPdf}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 text-xs font-bold text-[#8a3ca9] hover:text-white hover:bg-[#8a3ca9] border border-purple-200 rounded transition"
                      >
                        Test
                      </a>
                      <button
                        type="button"
                        onClick={() => { setFormData({ ...formData, catalogPdf: '' }); setPdfFileName(''); }}
                        className="px-2 py-1 text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded transition"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit / Save Button */}
              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-md font-bold text-xs text-gray-600 hover:bg-gray-100 border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#b10607] hover:bg-[#8b0405] text-white px-6 py-2.5 rounded-md font-extrabold text-sm shadow-md uppercase tracking-wider"
                >
                  {editingProduct ? 'Update Product' : 'Save New Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
