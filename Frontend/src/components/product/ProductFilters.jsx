import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';

const ProductFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
          <Filter className="w-5 h-5 text-indigo-600" />
          <span>Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Categories
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onFilterChange('category', 'all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium ${
              filters.category === 'all' || !filters.category
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange('category', cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium ${
                filters.category === cat.id
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Price Range ($)
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Minimum Rating
        </h4>
        <div className="space-y-1.5">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => onFilterChange('minRating', rating)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition flex items-center justify-between ${
                Number(filters.minRating) === rating
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{rating} Stars & Up</span>
              <span className="text-amber-400">★</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
