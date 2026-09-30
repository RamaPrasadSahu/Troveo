import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import ProductSort from '../components/product/ProductSort';
import ErrorMessage from '../components/common/ErrorMessage';
import { getProducts } from '../services/product.service';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Pagination & Total State
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filter params derived from URL searchParams
  const category = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const minRating = searchParams.get('minRating') || '';
  const sortBy = searchParams.get('sortBy') || 'newest';
  const page = Number(searchParams.get('page')) || 1;

  const filters = { category, search: searchQuery, minPrice, maxPrice, minRating };

  const fetchProductsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts({
        category,
        search: searchQuery,
        minPrice,
        maxPrice,
        minRating,
        sortBy,
        page,
        limit: 12,
      });

      setProducts(data.products || []);
      setTotalProducts(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // reset page on filter change
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', newPage.toString());
      setSearchParams(newParams);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Explore Products</h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing {products.length} of {totalProducts} items
            {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <ProductSort
            sortBy={sortBy}
            onSortChange={(val) => updateFilters('sortBy', val)}
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block">
          <ProductFilters
            filters={filters}
            onFilterChange={updateFilters}
            onResetFilters={handleResetFilters}
          />
        </aside>

        {/* Mobile Filters Drawer */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto">
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-slate-400 font-bold hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
              <ProductFilters
                filters={filters}
                onFilterChange={(k, v) => {
                  updateFilters(k, v);
                  setMobileFiltersOpen(false);
                }}
                onResetFilters={() => {
                  handleResetFilters();
                  setMobileFiltersOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-8">
          {error ? (
            <ErrorMessage message={error} onRetry={fetchProductsData} />
          ) : (
            <>
              <ProductGrid
                products={products}
                isLoading={loading}
                emptyMessage="No products matched your filters. Try adjusting search terms or resetting filters."
              />

              {/* Pagination */}
              {totalPages > 1 && !loading && (
                <div className="flex items-center justify-center space-x-2 pt-8 border-t border-slate-200">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const p = i + 1;
                    return (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${
                          page === p
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
