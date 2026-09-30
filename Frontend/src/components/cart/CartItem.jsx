import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, variant } = item;

  if (!product) return null;

  const price = product.discountPrice || product.price;
  const itemSubtotal = price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl gap-4 hover:border-slate-300 transition">
      {/* Product Image & Title */}
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <img
          src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-xl bg-slate-100 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <Link
            to={`/products/${product._id}`}
            className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition line-clamp-1"
          >
            {product.name}
          </Link>
          <p className="text-xs text-slate-500 capitalize mt-0.5">
            Category: {product.category}
          </p>
          {variant && (
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] bg-slate-100 text-slate-600 rounded">
              {variant}
            </span>
          )}
          <p className="text-sm font-bold text-slate-900 mt-1 sm:hidden">
            {formatCurrency(price)}
          </p>
        </div>
      </div>

      {/* Controls & Subtotal */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
        {/* Quantity Selector */}
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
          <button
            onClick={() => updateQuantity(product._id, quantity - 1)}
            className="p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 text-sm font-semibold text-slate-900 w-8 text-center">
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(product._id, quantity + 1)}
            className="p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total Price */}
        <div className="hidden sm:block text-right min-w-[80px]">
          <p className="text-sm font-bold text-slate-900">
            {formatCurrency(itemSubtotal)}
          </p>
          {quantity > 1 && (
            <p className="text-[11px] text-slate-400">
              {formatCurrency(price)} each
            </p>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(product._id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
          title="Remove Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
