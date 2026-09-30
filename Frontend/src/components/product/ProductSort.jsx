import React from 'react';
import { SORT_OPTIONS } from '../../utils/constants';

const ProductSort = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
        Sort By:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSort;
