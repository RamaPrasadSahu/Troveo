import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import ProductRating from '../components/product/ProductRating';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product._id || product.id);
    toast.success(`Moved "${product.name}" to cart!`);
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save items you love to your wishlist so you can easily find them later."
          action={
            <Link to="/products">
              <Button variant="primary" size="md">
                Browse Products
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900">My Saved Wishlist</h1>
        <p className="text-sm text-slate-500 mt-1">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const price = product.discountPrice || product.price;

          return (
            <div
              key={product._id || product.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square bg-slate-100">
                  <img
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(product._id || product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-rose-500 rounded-full shadow-sm backdrop-blur-xs transition"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[11px] font-bold text-indigo-600 uppercase">
                    {product.category}
                  </span>
                  <Link to={`/products/${product._id || product.id}`}>
                    <h3 className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <ProductRating rating={product.rating || 4.5} size="xs" />
                  <p className="text-base font-extrabold text-slate-900">
                    {formatCurrency(price)}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleMoveToCart(product)}
                  className="w-full"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" /> Move to Cart
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
