import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Grid, LayoutGrid, SlidersHorizontal, PackageX } from 'lucide-react';

export default function ProductGrid({
  products,
  activeCurrency,
  selectedCategory,
  onViewProduct,
  onAddToCart
}) {
  const [sortBy, setSortBy] = useState('popularity');
  const [gridCols, setGridCols] = useState(4); // 2, 3, 4
  const [displayCount, setDisplayCount] = useState(8);

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return b.id - a.id;
    return 0; // popularity default
  });

  const visibleProducts = sortedProducts.slice(0, displayCount);

  return (
    <div>
      {/* Top Controls Bar */}
      <div className="bg-white border border-gray-200 rounded-md p-4 mb-4 flex flex-wrap items-center justify-between gap-3 text-sm shadow-sm">
        
        {/* Category Title & Count */}
        <div>
          <h1 className="font-extrabold text-xl text-[#36454F] capitalize mb-0.5">
            {selectedCategory === 'all' ? 'Wholesale Kurtis In Ahmedabad' : selectedCategory}
          </h1>
          <p className="text-gray-500 text-sm">
            Showing <span className="font-bold text-black">{visibleProducts.length}</span> of{' '}
            <span className="font-bold text-black">{products.length}</span> catalogs
          </p>
        </div>

        {/* Layout Toggle & Sort */}
        <div className="flex items-center gap-4 flex-wrap">
          
          {/* Grid Layout Switcher */}
          <div className="hidden sm:flex items-center gap-1 border border-gray-300 rounded p-1 bg-gray-50">
            <button
              onClick={() => setGridCols(2)}
              className={`p-1.5 rounded ${gridCols === 2 ? 'bg-white shadow text-[#b10607]' : 'text-gray-500'}`}
              title="2 Columns"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded ${gridCols === 3 ? 'bg-white shadow text-[#b10607]' : 'text-gray-500'}`}
              title="3 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded ${gridCols === 4 ? 'bg-white shadow text-[#b10607]' : 'text-gray-500'}`}
              title="4 Columns"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 text-sm">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 font-semibold text-sm text-gray-800 outline-none focus:border-[#b10607] bg-white cursor-pointer"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

        </div>
      </div>

      {/* Product Cards Grid */}
      {visibleProducts.length > 0 ? (
        <div
          className={`grid gap-5 ${
            gridCols === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : gridCols === 3
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'
          }`}
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              activeCurrency={activeCurrency}
              onViewProduct={onViewProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-md p-12 text-center my-6">
          <PackageX className="w-14 h-14 text-gray-300 mx-auto mb-3" />
          <h3 className="font-extrabold text-gray-800 text-lg mb-1">No Catalogs Found</h3>
          <p className="text-gray-600 text-sm">
            Try adjusting your search criteria or resetting filters to view more products.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {displayCount < sortedProducts.length && (
        <div className="text-center mt-8 mb-4">
          <button
            onClick={() => setDisplayCount((prev) => prev + 4)}
            className="bg-[#36454F] hover:bg-[#b10607] text-white px-8 py-3 rounded-full font-extrabold text-sm uppercase tracking-wider transition shadow-md"
          >
            Load More Catalogs
          </button>
        </div>
      )}
    </div>
  );
}
