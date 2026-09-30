import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
  ShoppingBag,
  Award,
  Shield,
} from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { getProducts, getFeaturedProducts, getTrendingProducts } from '../services/product.service';
import { CATEGORIES } from '../utils/constants';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [featured, trending, allRes] = await Promise.all([
          getFeaturedProducts(),
          getTrendingProducts(),
          getProducts({ limit: 4, page: 1, sortBy: 'newest' }),
        ]);
        setFeaturedProducts(featured || []);
        setTrendingProducts(trending || []);
        setNewArrivals(allRes.products || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Next-Gen E-Commerce Experience</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Discover Products <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
                Made for Your Life.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore curated premium electronics, trendsetting apparel, and essential home decor with fast worldwide shipping and guaranteed lowest prices.
            </p>

            {/* Hero Search */}
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto lg:mx-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="What are you looking for today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-28 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4" />
                <button
                  type="submit"
                  className="absolute right-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition shadow-md cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition group"
              >
                <span>Shop All Collections</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Hero Showcase Card */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800/80 p-2 backdrop-blur-md">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                alt="Featured Product"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex justify-between items-center text-white">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Featured Release</span>
                  <p className="text-sm font-bold">Aura SoundPro Headphones</p>
                </div>
                <Link to="/products/prod_1" className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-500 transition">
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Categories</h2>
            <p className="text-sm text-slate-500 mt-1">Browse by popular departments</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-indigo-600 hover:underline flex items-center">
            All Categories <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group p-5 bg-white border border-slate-200 rounded-2xl text-center hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Offer / Discount Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="px-3 py-1 bg-amber-400 text-slate-900 text-xs font-extrabold rounded-full inline-block mb-2">
              LIMITED TIME OFFER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Get Up to 40% OFF Seasonal Best-Sellers</h3>
            <p className="text-indigo-100 text-sm max-w-lg">
              Use promo code <span className="font-mono bg-white/20 px-2 py-0.5 rounded font-bold">SHOP10</span> at checkout for instant discounts.
            </p>
          </div>
          <Link
            to="/products"
            className="z-10 px-8 py-3.5 bg-white text-indigo-900 font-extrabold text-sm rounded-xl hover:bg-indigo-50 shadow-lg transition transform hover:scale-105 shrink-0"
          >
            Claim Deals Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
            <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-indigo-600 hover:underline">
            View All
          </Link>
        </div>
        <ProductGrid products={featuredProducts} isLoading={loading} />
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-900">Trending Right Now</h2>
          </div>
        </div>
        <ProductGrid products={trendingProducts} isLoading={loading} />
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-900">New Arrivals</h2>
          </div>
        </div>
        <ProductGrid products={newArrivals} isLoading={loading} />
      </section>
    </div>
  );
};

export default Home;
