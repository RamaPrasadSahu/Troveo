import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import ProductRating from './ProductRating';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product._id);
  const displayPrice = product.discountPrice || product.price;
  const originalPrice = product.discountPrice ? product.price : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Added "${product.name}" to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (inWishlist) {
      toast.error(`Removed from wishlist`);
    } else {
      toast.success(`Added to wishlist!`);
    }
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10">
          {product.discountPercent > 0 && (
            <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-rose-500 rounded-full shadow-sm">
              -{product.discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-indigo-600 rounded-full shadow-sm">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer shadow-sm ${
            inWishlist
              ? 'bg-rose-50 text-rose-500'
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
          }`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick Add Overlay Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 px-4 bg-slate-900/90 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl backdrop-blur-xs flex items-center justify-center space-x-2 shadow-lg transition duration-200 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
            {product.category}
          </span>

          <Link to={`/products/${product._id}`}>
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition line-clamp-2 mt-1 mb-2">
              {product.name}
            </h3>
          </Link>

          <ProductRating rating={product.rating || 4.5} numReviews={product.numReviews} size="xs" />
        </div>

        <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base font-bold text-slate-900">
                {formatCurrency(displayPrice)}
              </span>
              {originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
