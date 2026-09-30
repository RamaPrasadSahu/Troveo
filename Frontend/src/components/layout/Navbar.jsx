import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  LogOut,
  Package,
  Shield,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { CATEGORIES } from '../../utils/constants';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 tracking-tight shrink-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span>Shop<span className="text-indigo-600">Sphere</span></span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white border border-transparent focus:border-indigo-500 rounded-full focus:outline-none transition duration-150"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            </div>
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <Link
              to="/"
              className={`hover:text-indigo-600 transition ${
                location.pathname === '/' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/products"
              className={`hover:text-indigo-600 transition ${
                location.pathname === '/products' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Products
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" onMouseLeave={() => setCategoriesOpen(false)}>
              <button
                onMouseEnter={() => setCategoriesOpen(true)}
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center space-x-1 hover:text-indigo-600 transition cursor-pointer py-2"
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {categoriesOpen && (
                <div className="absolute left-0 w-48 bg-white border border-slate-100 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.id}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-600 hover:text-rose-600 transition rounded-full hover:bg-slate-100"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-600 hover:text-indigo-600 transition rounded-full hover:bg-slate-100"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-indigo-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Menu / User Profile */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full border border-slate-200 hover:border-indigo-300 transition cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden md:inline text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-medium text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 mr-2 text-slate-400" /> My Profile
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Package className="w-4 h-4 mr-2 text-slate-400" /> My Orders
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50"
                      >
                        <Shield className="w-4 h-4 mr-2 text-indigo-500" /> Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-slate-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2 text-rose-500" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Search & Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-4 animate-in fade-in duration-150">
            {/* Search Input for Mobile */}
            <form onSubmit={handleSearchSubmit} className="px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 rounded-lg border border-slate-200"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              </div>
            </form>

            <div className="flex flex-col space-y-2 px-2 text-sm font-medium">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                Browse All Products
              </Link>
              
              <div className="pt-2 border-t border-slate-100">
                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Categories
                </p>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-slate-600 hover:text-indigo-600"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
