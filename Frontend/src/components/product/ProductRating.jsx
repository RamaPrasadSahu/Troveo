import React from 'react';
import { Star } from 'lucide-react';

const ProductRating = ({ rating = 0, numReviews, size = 'sm', className = '' }) => {
  const stars = [1, 2, 3, 4, 5];
  const starSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex items-center text-amber-400">
        {stars.map((star) => (
          <Star
            key={star}
            className={`${starSizes[size]} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-slate-100 text-slate-300'
            }`}
          />
        ))}
      </div>
      {numReviews !== undefined && (
        <span className="text-xs text-slate-500 font-medium ml-1">
          {rating.toFixed(1)} ({numReviews})
        </span>
      )}
    </div>
  );
};

export default ProductRating;
