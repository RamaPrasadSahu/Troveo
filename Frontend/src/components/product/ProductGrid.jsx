import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from '../common/EmptyState';

const ProductGrid = ({ products = [], isLoading = false, emptyMessage = 'No products found.' }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 animate-pulse">
            <div className="w-full aspect-square bg-slate-200 rounded-xl mb-4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <EmptyState title="No Products Available" description={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
