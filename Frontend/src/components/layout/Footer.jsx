import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Headphones, Mail } from 'lucide-react';
import { APP_NAME } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-20">
      {/* Benefits Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-800 rounded-xl text-indigo-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free Express Shipping</h4>
              <p className="text-xs text-slate-400">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-800 rounded-xl text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Secure Payments</h4>
              <p className="text-xs text-slate-400">100% protected checkout</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-800 rounded-xl text-indigo-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Easy 30-Day Returns</h4>
              <p className="text-xs text-slate-400">Hassle-free money back guarantee</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-800 rounded-xl text-indigo-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 Priority Support</h4>
              <p className="text-xs text-slate-400">Always here to help you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span>Shop<span className="text-indigo-400">Sphere</span></span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            ShopSphere is your premier destination for high-quality electronics, modern fashion, home decor, and lifestyle products with unmatched customer service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Shop</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/products" className="hover:text-indigo-400 transition">All Products</Link></li>
            <li><Link to="/products?category=electronics" className="hover:text-indigo-400 transition">Electronics</Link></li>
            <li><Link to="/products?category=fashion" className="hover:text-indigo-400 transition">Fashion</Link></li>
            <li><Link to="/products?category=home" className="hover:text-indigo-400 transition">Home & Living</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Account & Support</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/profile" className="hover:text-indigo-400 transition">My Account</Link></li>
            <li><Link to="/orders" className="hover:text-indigo-400 transition">Order History</Link></li>
            <li><Link to="/cart" className="hover:text-indigo-400 transition">Shopping Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-indigo-400 transition">Wishlist</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Stay Connected</h3>
          <p className="text-xs text-slate-400 mb-3">Subscribe for exclusive deals and new arrivals.</p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-6 text-center md:flex md:items-center md:justify-between text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for ultimate shopping experiences.</p>
      </div>
    </footer>
  );
};

export default Footer;
