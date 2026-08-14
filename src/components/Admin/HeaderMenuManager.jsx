import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  MoveUp,
  MoveDown,
  Layers,
  Link,
  RotateCcw,
  Sparkles,
  Search,
  X,
  PlusCircle,
  Tag,
  Check,
  Eye,
  Sliders,
  ExternalLink,
  FolderTree
} from 'lucide-react';
import { CATEGORIES, BRANDS } from '../../data/categories';

export default function HeaderMenuManager({
  siteConfig,
  onUpdateSiteConfig
}) {
  const activeHeaderCategories = siteConfig?.headerCategories || CATEGORIES;
  const activeBrands = siteConfig?.brands || BRANDS;

  // Search filter inside header manager
  const [searchFilter, setSearchFilter] = useState('');

  // Active view tab inside Header Manager: 'menu-items' | 'brands' | 'preview'
  const [activeSubTab, setActiveSubTab] = useState('menu-items');

  // Form State for Adding New Header Item
  const [newItemName, setNewItemName] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('');
  const [quickSubcategories, setQuickSubcategories] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null); // { id, name, url }
  const [editItemName, setEditItemName] = useState('');
  const [editItemUrl, setEditItemUrl] = useState('');

  // Expanded categories for subcategory management
  const [expandedCatIds, setExpandedCatIds] = useState({});

  // Subcategory Add Form State
  const [subcatInputs, setSubcatInputs] = useState({}); // { [catId]: { name: '', url: '' } }

  // Subcategory Edit State
  const [editingSubcat, setEditingSubcat] = useState(null); // { catId, subIdx, name, url }

  // Brand Manager State
  const [newBrandName, setNewBrandName] = useState('');
  const [brandSearch, setBrandSearch] = useState('');

  // Auto-generate URL slug from name
  const generateSlug = (name) => {
    return '/' + name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  };

  // Toggle Category Expand
  const toggleExpand = (catId) => {
    setExpandedCatIds((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Expand All / Collapse All
  const handleExpandAll = () => {
    const allExpanded = {};
    activeHeaderCategories.forEach((c) => {
      allExpanded[c.id] = true;
    });
    setExpandedCatIds(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedCatIds({});
  };

  // 1. ADD NEW HEADER ITEM
  const handleAddHeaderItem = (e) => {
    if (e) e.preventDefault();
    if (!newItemName.trim()) {
      alert('Please enter a header item name.');
      return;
    }

    const id = newItemName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const url = newItemUrl.trim() || generateSlug(newItemName);

    // Parse initial subcategories if provided (comma separated)
    let initialSubs = [];
    if (quickSubcategories.trim()) {
      initialSubs = quickSubcategories
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => ({
          name: s,
          url: generateSlug(s)
        }));
    }

    const newItem = {
      id: `${id}-${Date.now().toString().slice(-4)}`,
      name: newItemName.trim(),
      url,
      subcategories: initialSubs
    };

    const updated = [...activeHeaderCategories, newItem];
    onUpdateSiteConfig({ headerCategories: updated });

    // Reset Form
    setNewItemName('');
    setNewItemUrl('');
    setQuickSubcategories('');
    setIsAddFormOpen(false);

    // Expand newly created item
    setExpandedCatIds((prev) => ({ ...prev, [newItem.id]: true }));
  };

  // 2. DELETE HEADER ITEM
  const handleDeleteHeaderItem = (catId, catName) => {
    if (window.confirm(`Are you sure you want to delete "${catName}" from the header navigation bar?`)) {
      const updated = activeHeaderCategories.filter((c) => c.id !== catId);
      onUpdateSiteConfig({ headerCategories: updated });
    }
  };

  // 3. EDIT HEADER ITEM (OPEN MODAL)
  const handleOpenEditModal = (cat) => {
    setEditingItem(cat);
    setEditItemName(cat.name);
    setEditItemUrl(cat.url || generateSlug(cat.name));
  };

  // 3b. SAVE EDITED HEADER ITEM
  const handleSaveEditItem = () => {
    if (!editItemName.trim()) {
      alert('Header item name cannot be empty.');
      return;
    }

    const updated = activeHeaderCategories.map((c) => {
      if (c.id === editingItem.id) {
        return {
          ...c,
          name: editItemName.trim(),
          url: editItemUrl.trim() || generateSlug(editItemName)
        };
      }
      return c;
    });

    onUpdateSiteConfig({ headerCategories: updated });
    setEditingItem(null);
  };

  // 4. REORDER HEADER ITEMS (MOVE UP / MOVE DOWN)
  const handleMoveHeaderItem = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= activeHeaderCategories.length) return;

    const updated = [...activeHeaderCategories];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedItem);

    onUpdateSiteConfig({ headerCategories: updated });
  };

  // 5. ADD SUBCATEGORY
  const handleAddSubcategory = (catId) => {
    const input = subcatInputs[catId] || {};
    const name = (input.name || '').trim();
    if (!name) {
      alert('Please enter a subcategory name.');
      return;
    }

    const url = (input.url || '').trim() || generateSlug(name);

    const updated = activeHeaderCategories.map((c) => {
      if (c.id === catId) {
        const subs = Array.isArray(c.subcategories) ? c.subcategories : [];
        return {
          ...c,
          subcategories: [...subs, { name, url }]
        };
      }
      return c;
    });

    onUpdateSiteConfig({ headerCategories: updated });

    // Clear input for this cat
    setSubcatInputs((prev) => ({
      ...prev,
      [catId]: { name: '', url: '' }
    }));
  };

  // 6. DELETE SUBCATEGORY
  const handleDeleteSubcategory = (catId, subIdx, subName) => {
    if (window.confirm(`Delete subcategory "${subName}"?`)) {
      const updated = activeHeaderCategories.map((c) => {
        if (c.id === catId) {
          const subs = (c.subcategories || []).filter((_, idx) => idx !== subIdx);
          return { ...c, subcategories: subs };
        }
        return c;
      });
      onUpdateSiteConfig({ headerCategories: updated });
    }
  };

  // 7. EDIT SUBCATEGORY
  const handleStartEditSubcat = (catId, subIdx, sub) => {
    setEditingSubcat({
      catId,
      subIdx,
      name: sub.name,
      url: sub.url
    });
  };

  const handleSaveEditSubcat = () => {
    if (!editingSubcat || !editingSubcat.name.trim()) return;

    const { catId, subIdx, name, url } = editingSubcat;
    const updated = activeHeaderCategories.map((c) => {
      if (c.id === catId) {
        const subs = [...(c.subcategories || [])];
        subs[subIdx] = {
          name: name.trim(),
          url: url.trim() || generateSlug(name)
        };
        return { ...c, subcategories: subs };
      }
      return c;
    });

    onUpdateSiteConfig({ headerCategories: updated });
    setEditingSubcat(null);
  };

  // 8. REORDER SUBCATEGORIES (UP / DOWN)
  const handleMoveSubcategory = (catId, subIdx, direction) => {
    const targetIdx = subIdx + direction;
    const cat = activeHeaderCategories.find((c) => c.id === catId);
    if (!cat || !cat.subcategories) return;
    if (targetIdx < 0 || targetIdx >= cat.subcategories.length) return;

    const updatedSubs = [...cat.subcategories];
    const [moved] = updatedSubs.splice(subIdx, 1);
    updatedSubs.splice(targetIdx, 0, moved);

    const updated = activeHeaderCategories.map((c) => {
      if (c.id === catId) {
        return { ...c, subcategories: updatedSubs };
      }
      return c;
    });

    onUpdateSiteConfig({ headerCategories: updated });
  };

  // 9. BRAND MANAGEMENT
  const handleAddBrand = () => {
    const clean = newBrandName.trim();
    if (!clean) return;
    if (activeBrands.some((b) => b.toLowerCase() === clean.toLowerCase())) {
      alert('This brand already exists in the header list.');
      return;
    }
    const updated = [...activeBrands, clean];
    onUpdateSiteConfig({ brands: updated });
    setNewBrandName('');
  };

  const handleDeleteBrand = (brandName) => {
    if (window.confirm(`Remove brand "${brandName}" from header dropdown?`)) {
      const updated = activeBrands.filter((b) => b !== brandName);
      onUpdateSiteConfig({ brands: updated });
    }
  };

  const handleResetBrands = () => {
    if (window.confirm('Reset brands dropdown list back to original default brands?')) {
      onUpdateSiteConfig({ brands: BRANDS });
    }
  };

  // 10. RESET TO DEFAULT HEADER CATEGORIES
  const handleResetToDefaults = () => {
    if (
      window.confirm(
        '⚠️ Are you sure you want to reset all Header Menu items back to original defaults? Any custom items you added will be replaced with defaults.'
      )
    ) {
      onUpdateSiteConfig({
        headerCategories: CATEGORIES,
        brands: BRANDS
      });
      alert('Header menu restored to default configuration successfully!');
    }
  };

  // Filtered categories by search
  const filteredCategories = activeHeaderCategories.filter((cat) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    const matchesName = cat.name.toLowerCase().includes(q);
    const matchesUrl = (cat.url || '').toLowerCase().includes(q);
    const matchesSub = cat.subcategories?.some((s) => s.name.toLowerCase().includes(q));
    return matchesName || matchesUrl || matchesSub;
  });

  const totalSubcategories = activeHeaderCategories.reduce(
    (acc, cat) => acc + (cat.subcategories ? cat.subcategories.length : 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Banner / Stats Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-100 text-[#b10607] text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                Header Menu Editor
              </span>
              <span className="text-gray-400 text-xs font-semibold">Live Storefront Sync</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1 flex items-center gap-2">
              <FolderTree className="w-6 h-6 text-[#b10607]" />
              Manage Storefront Header &amp; Navigation Menu
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Add new navbar categories, edit names, reorder sequence, delete unwanted items, and configure mega-menu dropdowns.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAddFormOpen(true)}
              className="bg-[#b10607] hover:bg-[#8b0405] text-white px-4 py-2.5 rounded-lg font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
            >
              <Plus className="w-4 h-4" /> Add Header Item
            </button>
            <button
              onClick={handleResetToDefaults}
              className="bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 border border-gray-300 px-3 py-2.5 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 transition"
              title="Reset header menu items to initial default list"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="text-[11px] font-bold text-gray-500 uppercase">Header Menu Items</div>
            <div className="text-xl font-black text-gray-900 mt-0.5">{activeHeaderCategories.length}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="text-[11px] font-bold text-gray-500 uppercase">Total Subcategories</div>
            <div className="text-xl font-black text-gray-900 mt-0.5">{totalSubcategories}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="text-[11px] font-bold text-gray-500 uppercase">With Dropdowns</div>
            <div className="text-xl font-black text-[#b10607] mt-0.5">
              {activeHeaderCategories.filter((c) => c.subcategories && c.subcategories.length > 0).length}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="text-[11px] font-bold text-gray-500 uppercase">Brands in Dropdown</div>
            <div className="text-xl font-black text-blue-600 mt-0.5">{activeBrands.length}</div>
          </div>
        </div>
      </div>

      {/* Live Header Navbar Visual Preview */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#b10607]" />
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">
              Live Header Navigation Bar Preview
            </h3>
          </div>
          <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
            (Shows exactly how your header items appear to visitors)
          </span>
        </div>

        {/* Mockup Header Container */}
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-2 overflow-x-auto shadow-inner bg-gradient-to-r from-gray-50 via-white to-gray-50">
          <div className="flex items-center gap-1 font-bold text-xs text-[#36454F] min-w-max">
            {/* Mock Home */}
            <span className="px-3 py-2 border-b-2 border-[#b10607] text-[#b10607] font-extrabold uppercase whitespace-nowrap">
              Home
            </span>

            {/* Render items */}
            {activeHeaderCategories.map((cat) => (
              <span
                key={cat.id}
                className="flex items-center gap-1 px-3 py-2 hover:text-[#b10607] uppercase whitespace-nowrap cursor-default border-b-2 border-transparent transition text-gray-700"
              >
                <span>{cat.name}</span>
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </span>
            ))}

            {/* Brand Dropdown Mock */}
            <span className="flex items-center gap-1 px-3 py-2 uppercase whitespace-nowrap text-gray-700">
              <span>Brand</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </span>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-lg p-1 shadow-sm max-w-lg">
        <button
          onClick={() => setActiveSubTab('menu-items')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-md flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'menu-items'
              ? 'bg-[#b10607] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Layers className="w-4 h-4" /> Header Menu Items ({activeHeaderCategories.length})
        </button>
        <button
          onClick={() => setActiveSubTab('brands')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-md flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'brands'
              ? 'bg-[#b10607] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Tag className="w-4 h-4" /> Brands Dropdown List ({activeBrands.length})
        </button>
      </div>

      {/* TAB 1: HEADER MENU ITEMS */}
      {activeSubTab === 'menu-items' && (
        <div className="space-y-6">
          {/* Add New Header Item Modal / Drawer */}
          {isAddFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
              <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative border-t-4 border-[#b10607]">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                  <h3 className="font-black text-lg text-gray-900 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-[#b10607]" />
                    Add New Header Menu Item
                  </h3>
                  <button
                    onClick={() => setIsAddFormOpen(false)}
                    className="text-gray-400 hover:text-red-600 bg-gray-100 p-1.5 rounded-full transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddHeaderItem} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                      Header Menu Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Exclusive Gowns, Cotton Suits, Designer Sarees"
                      value={newItemName}
                      onChange={(e) => {
                        setNewItemName(e.target.value);
                        if (!newItemUrl) {
                          setNewItemUrl(generateSlug(e.target.value));
                        }
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-[#b10607] focus:ring-1 focus:ring-[#b10607]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                      Link URL Slug (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. /exclusive-gowns-wholesale"
                        value={newItemUrl}
                        onChange={(e) => setNewItemUrl(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg pl-9 pr-3.5 py-2 text-xs font-mono font-semibold outline-none focus:border-[#b10607]"
                      />
                      <Link className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1 block">
                      Auto-generated slug: <code className="text-gray-600 font-bold">{generateSlug(newItemName || 'category')}</code>
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                      Quick Subcategories (Optional - Comma Separated)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Banarasi Sarees, Linen Saree, Party Wear, Casual Saree"
                      value={quickSubcategories}
                      onChange={(e) => setQuickSubcategories(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-xs font-semibold outline-none focus:border-[#b10607]"
                    />
                    <span className="text-[11px] text-gray-400 mt-0.5 block">
                      Tip: You can also add and manage subcategories anytime after creating the item.
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsAddFormOpen(false)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-xs transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#b10607] hover:bg-[#8b0405] text-white rounded-lg font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Plus className="w-4 h-4" /> Add To Header
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Header Item Modal */}
          {editingItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
              <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative border-t-4 border-amber-500">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                  <h3 className="font-black text-lg text-gray-900 flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-amber-500" />
                    Edit Header Item
                  </h3>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="text-gray-400 hover:text-red-600 bg-gray-100 p-1.5 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                      Header Menu Name *
                    </label>
                    <input
                      type="text"
                      value={editItemName}
                      onChange={(e) => setEditItemName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm font-semibold outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                      Link URL Slug
                    </label>
                    <input
                      type="text"
                      value={editItemUrl}
                      onChange={(e) => setEditItemUrl(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-xs font-mono font-semibold outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-xs transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEditItem}
                      className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Check className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Subcategory Modal */}
          {editingSubcat && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
              <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl relative border-t-4 border-blue-600">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                  <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                    <Edit2 className="w-4 h-4 text-blue-600" />
                    Edit Subcategory Item
                  </h3>
                  <button
                    onClick={() => setEditingSubcat(null)}
                    className="text-gray-400 hover:text-red-600 bg-gray-100 p-1.5 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Subcategory Title
                    </label>
                    <input
                      type="text"
                      value={editingSubcat.name}
                      onChange={(e) =>
                        setEditingSubcat((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm font-semibold outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Link URL Slug
                    </label>
                    <input
                      type="text"
                      value={editingSubcat.url}
                      onChange={(e) =>
                        setEditingSubcat((prev) => ({ ...prev, url: e.target.value }))
                      }
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs font-mono font-semibold outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setEditingSubcat(null)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEditSubcat}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-extrabold text-xs flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search and Action Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <input
                type="text"
                placeholder="Search header item or subcategory..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-semibold outline-none focus:border-[#b10607]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExpandAll}
                className="px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition"
              >
                Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition"
              >
                Collapse All
              </button>
              <button
                onClick={() => setIsAddFormOpen(true)}
                className="px-3 py-1.5 text-xs font-extrabold text-white bg-[#b10607] hover:bg-[#8b0405] rounded-lg transition flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>
          </div>

          {/* Header Navigation Items List */}
          <div className="space-y-3">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat, index) => {
                const isExpanded = !!expandedCatIds[cat.id];
                const subCount = cat.subcategories ? cat.subcategories.length : 0;
                const catInput = subcatInputs[cat.id] || { name: '', url: '' };

                return (
                  <div
                    key={cat.id}
                    className={`bg-white border rounded-xl shadow-xs transition ${
                      isExpanded ? 'border-[#b10607]/40 ring-1 ring-[#b10607]/10' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Header Item Row */}
                    <div className="p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
                      {/* Left: Reorder Arrows & Title */}
                      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-[200px]">
                        {/* Sequence Position Badge */}
                        <div className="w-6 h-6 rounded-md bg-gray-100 border border-gray-200 text-gray-600 text-[11px] font-black flex items-center justify-center shrink-0">
                          {index + 1}
                        </div>

                        {/* Reorder Buttons */}
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => handleMoveHeaderItem(index, -1)}
                            disabled={index === 0}
                            className={`p-1 rounded text-gray-500 hover:text-white hover:bg-[#b10607] transition ${
                              index === 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer bg-gray-50'
                            }`}
                            title="Move Up in Navbar Sequence"
                          >
                            <MoveUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleMoveHeaderItem(index, 1)}
                            disabled={index === activeHeaderCategories.length - 1}
                            className={`p-1 rounded text-gray-500 hover:text-white hover:bg-[#b10607] transition ${
                              index === activeHeaderCategories.length - 1
                                ? 'opacity-20 cursor-not-allowed'
                                : 'cursor-pointer bg-gray-50'
                            }`}
                            title="Move Down in Navbar Sequence"
                          >
                            <MoveDown className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Title & URL */}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-sm sm:text-base text-gray-900 uppercase tracking-wide">
                              {cat.name}
                            </span>
                            {subCount > 0 ? (
                              <span className="bg-red-50 text-[#b10607] border border-red-200 text-[10px] font-black px-2 py-0.5 rounded-full">
                                {subCount} Sub-items
                              </span>
                            ) : (
                              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                Direct Link
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-gray-400 font-mono mt-0.5 flex items-center gap-1">
                            <Link className="w-3 h-3 text-gray-400" />
                            <span className="text-blue-600 font-semibold">{cat.url || generateSlug(cat.name)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* Expand / Collapse Subcategories */}
                        <button
                          onClick={() => toggleExpand(cat.id)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition ${
                            isExpanded
                              ? 'bg-red-50 text-[#b10607] border border-red-200'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Subcategories</span> ({subCount})
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Edit Item */}
                        <button
                          onClick={() => handleOpenEditModal(cat)}
                          className="p-2 text-gray-600 hover:text-amber-600 bg-gray-50 hover:bg-amber-50 border border-gray-200 rounded-lg transition"
                          title={`Edit name or url of ${cat.name}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Item */}
                        <button
                          onClick={() => handleDeleteHeaderItem(cat.id, cat.name)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-red-600 bg-gray-50 border border-gray-200 hover:border-red-600 rounded-lg transition"
                          title={`Delete ${cat.name} from header`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Subcategories Accordion Area */}
                    {isExpanded && (
                      <div className="bg-gray-50/70 border-t border-gray-100 p-4 sm:p-5 rounded-b-xl space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                            <ChevronRight className="w-4 h-4 text-[#b10607]" />
                            Dropdown Subcategories for "{cat.name}" ({subCount})
                          </h4>
                          <span className="text-[11px] text-gray-400 font-medium">
                            Dropdown menu shows these items on hover
                          </span>
                        </div>

                        {/* Subcategories items */}
                        {cat.subcategories && cat.subcategories.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {cat.subcategories.map((sub, subIdx) => (
                              <div
                                key={subIdx}
                                className="bg-white border border-gray-200 rounded-lg p-2.5 shadow-2xs flex items-center justify-between gap-2 hover:border-[#b10607]/40 transition group"
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="font-bold text-xs text-gray-900 truncate">
                                    {sub.name}
                                  </div>
                                  <div className="text-[10px] text-gray-400 font-mono truncate">
                                    {sub.url}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  {/* Move Sub Left / Right */}
                                  <button
                                    onClick={() => handleMoveSubcategory(cat.id, subIdx, -1)}
                                    disabled={subIdx === 0}
                                    className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-20"
                                    title="Move Earlier"
                                  >
                                    <MoveUp className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleMoveSubcategory(cat.id, subIdx, 1)}
                                    disabled={subIdx === cat.subcategories.length - 1}
                                    className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-20"
                                    title="Move Later"
                                  >
                                    <MoveDown className="w-3 h-3" />
                                  </button>
                                  {/* Edit Sub */}
                                  <button
                                    onClick={() => handleStartEditSubcat(cat.id, subIdx, sub)}
                                    className="p-1 text-gray-400 hover:text-amber-600 rounded"
                                    title="Edit Subcategory"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  {/* Delete Sub */}
                                  <button
                                    onClick={() =>
                                      handleDeleteSubcategory(cat.id, subIdx, sub.name)
                                    }
                                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                                    title="Delete Subcategory"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-white border border-dashed border-gray-300 rounded-lg p-3 text-center text-xs text-gray-400 italic">
                            No dropdown subcategories yet. When clicked on the storefront, this header item will open the direct category page.
                          </div>
                        )}

                        {/* Add New Subcategory Form Strip */}
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-2xs">
                          <div className="text-[11px] font-extrabold text-gray-700 uppercase mb-2 flex items-center gap-1.5">
                            <PlusCircle className="w-3.5 h-3.5 text-[#b10607]" />
                            Add New Sub-link to "{cat.name}" Dropdown:
                          </div>
                          <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
                            <input
                              type="text"
                              placeholder="Subcategory Title (e.g. Cotton Printed Kurti)"
                              value={catInput.name || ''}
                              onChange={(e) =>
                                setSubcatInputs((prev) => ({
                                  ...prev,
                                  [cat.id]: { ...prev[cat.id], name: e.target.value }
                                }))
                              }
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none focus:border-[#b10607] bg-white min-w-[180px]"
                            />
                            <input
                              type="text"
                              placeholder="URL Slug (e.g. /cotton-printed-kurti)"
                              value={catInput.url || ''}
                              onChange={(e) =>
                                setSubcatInputs((prev) => ({
                                  ...prev,
                                  [cat.id]: { ...prev[cat.id], url: e.target.value }
                                }))
                              }
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold outline-none focus:border-[#b10607] bg-white min-w-[150px]"
                            />
                            <button
                              onClick={() => handleAddSubcategory(cat.id)}
                              className="px-4 py-1.5 bg-[#b10607] hover:bg-[#8b0405] text-white rounded-lg font-extrabold text-xs transition flex items-center gap-1 shrink-0 shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Sub-link
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                <p className="font-bold text-sm">No header items found matching "{searchFilter}".</p>
                <button
                  onClick={() => setSearchFilter('')}
                  className="mt-2 text-xs text-[#b10607] font-bold hover:underline"
                >
                  Clear search query
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: BRAND DROPDOWN LIST */}
      {activeSubTab === 'brands' && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                "Brand" Dropdown Menu Items ({activeBrands.length})
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                These brands appear in the "Brand" search dropdown at the end of the header navigation bar.
              </p>
            </div>
            <button
              onClick={handleResetBrands}
              className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-red-700 bg-gray-50 hover:bg-red-50 border border-gray-200 rounded-lg transition self-start sm:self-auto"
            >
              Reset Default Brands
            </button>
          </div>

          {/* Add Brand Input */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="New Brand Name (e.g. Surat Fashion, Bella Silk)"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              className="flex-1 min-w-[200px] border border-gray-300 bg-white rounded-lg px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
            />
            <button
              onClick={handleAddBrand}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-extrabold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Brand
            </button>
          </div>

          {/* Brand Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search existing brands..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-semibold outline-none focus:border-blue-600"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* Brands Badges Grid */}
          <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto pr-1">
            {activeBrands
              .filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase()))
              .map((brand, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 pl-3 pr-1.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-gray-800 hover:border-blue-500 transition group"
                >
                  <span>{brand}</span>
                  <button
                    onClick={() => handleDeleteBrand(brand)}
                    className="text-gray-400 hover:text-white hover:bg-red-600 p-0.5 rounded transition"
                    title={`Delete brand ${brand}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
