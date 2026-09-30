import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, clearCart, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Cart is Empty"
          description="Looks like you haven't added anything to your cart yet. Discover awesome deals in our catalog!"
          action={
            <Link to="/products">
              <Button variant="primary" size="md">
                Start Shopping Now
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Shopping Cart</h1>
          <p className="text-sm text-slate-500 mt-1">
            You have <span className="font-bold text-slate-900">{cartCount}</span> {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          className="inline-flex items-center text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Clear Entire Cart
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <CartItem key={item.product._id || index} item={item} />
          ))}

          <div className="pt-4">
            <Link to="/products" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:underline">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Cart Summary Sidebar */}
        <div className="lg:sticky lg:top-24">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
