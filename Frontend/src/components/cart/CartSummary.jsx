import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

const CartSummary = ({ showCheckoutBtn = true }) => {
  const { cartSubtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');

  const shipping = cartSubtotal > 50 || cartSubtotal === 0 ? 0 : 5.99;
  const tax = cartSubtotal * 0.08;
  const grandTotal = Math.max(0, cartSubtotal + shipping + tax - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SHOP10') {
      setDiscount(cartSubtotal * 0.10);
      setAppliedPromo('SHOP10 (10% Off)');
      setPromoCode('');
    } else if (promoCode.trim().toUpperCase() === 'SAVE20') {
      setDiscount(20);
      setAppliedPromo('SAVE20 ($20 Off)');
      setPromoCode('');
    } else {
      alert('Invalid promo code. Try "SHOP10" or "SAVE20"');
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
      <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
        Order Summary
      </h3>

      {/* Promo Code Input */}
      <form onSubmit={handleApplyPromo} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Promo code (e.g. SHOP10)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 uppercase"
          />
          <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
        <button
          type="submit"
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
        >
          Apply
        </button>
      </form>

      {appliedPromo && (
        <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs flex justify-between items-center font-medium">
          <span>Promo applied: {appliedPromo}</span>
          <button
            onClick={() => { setDiscount(0); setAppliedPromo(''); }}
            className="text-emerald-800 font-bold hover:underline"
          >
            Remove
          </button>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">{formatCurrency(cartSubtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Discount</span>
            <span className="font-semibold">-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Shipping</span>
          <span className="font-semibold text-slate-900">
            {shipping === 0 ? <span className="text-emerald-600">FREE</span> : formatCurrency(shipping)}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Estimated Tax (8%)</span>
          <span className="font-semibold text-slate-900">{formatCurrency(tax)}</span>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
          <span className="text-base font-bold text-slate-900">Total</span>
          <span className="text-xl font-extrabold text-indigo-600">{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      {showCheckoutBtn && (
        <Link to="/checkout" className="block w-full">
          <Button variant="primary" size="lg" className="w-full group">
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      )}

      <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Guaranteed 256-bit SSL Secure Checkout</span>
      </div>
    </div>
  );
};

export default CartSummary;
