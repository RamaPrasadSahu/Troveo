import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  CheckCircle,
  AlertTriangle,
  Minus,
  Plus,
} from 'lucide-react';
import toast from 'react-hot-toast';
import ProductRating from '../components/product/ProductRating';
import ProductGrid from '../components/product/ProductGrid';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';
import { getProductById, getRelatedProducts } from '../services/product.service';
import { getProductReviews, createReview } from '../services/review.service';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../hooks/useAuth';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const prod = await getProductById(id);
        setProduct(prod);
        setSelectedImage(prod.images && prod.images[0] ? prod.images[0] : '');

        // Fetch related and reviews
        const [related, revs] = await Promise.all([
          getRelatedProducts(prod._id, prod.category),
          getProductReviews(prod._id),
        ]);
        setRelatedProducts(related || []);
        setReviews(revs || []);
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return <Loader fullScreen text="Loading product details..." />;
  if (error || !product) return <ErrorMessage message={error || 'Product not found'} />;

  const displayPrice = product.discountPrice || product.price;
  const originalPrice = product.discountPrice ? product.price : null;
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} "${product.name}" to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (inWishlist) {
      toast.error('Removed from wishlist');
    } else {
      toast.success('Added to wishlist!');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to submit a review.');
      navigate('/login');
      return;
    }
    if (!newComment.trim()) {
      toast.error('Please enter a review comment.');
      return;
    }

    setSubmittingReview(true);
    try {
      const added = await createReview(product._id, {
        rating: newRating,
        comment: newComment.trim(),
      });
      setReviews([added, ...reviews]);
      setNewComment('');
      setNewRating(5);
      toast.success('Thank you! Your review has been submitted.');
    } catch (err) {
      toast.error(err.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 font-medium flex items-center space-x-2">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-indigo-600">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-indigo-600 capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm relative">
            <img
              src={selectedImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-rose-500 text-white font-bold text-xs rounded-full shadow-md">
                -{product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {product.images.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-xl border-2 overflow-hidden bg-white shrink-0 transition ${
                    selectedImage === imgUrl ? 'border-indigo-600 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Actions */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mt-3">
              <ProductRating rating={product.rating || 4.5} numReviews={reviews.length} size="md" />
              <span className="text-slate-300">|</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> In Stock ({product.stock || 25} available)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline space-x-3 p-4 bg-slate-100/80 rounded-2xl">
            <span className="text-3xl font-extrabold text-slate-900">
              {formatCurrency(displayPrice)}
            </span>
            {originalPrice && (
              <span className="text-base text-slate-400 line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                Save {formatCurrency(originalPrice - displayPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-slate-600 hover:bg-slate-100 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-slate-600 hover:bg-slate-100 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button variant="outline" size="lg" onClick={handleAddToCart} className="w-full">
                <ShoppingBag className="w-5 h-5 mr-2 text-indigo-600" /> Add to Cart
              </Button>

              <Button variant="primary" size="lg" onClick={handleBuyNow} className="w-full">
                Buy Now
              </Button>
            </div>

            <button
              onClick={handleToggleWishlist}
              className={`w-full py-3 flex items-center justify-center space-x-2 text-sm font-semibold rounded-xl border transition ${
                inWishlist
                  ? 'border-rose-300 bg-rose-50 text-rose-600'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{inWishlist ? 'In Your Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-center">
            <div className="p-3 bg-slate-50 rounded-xl">
              <Truck className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-800">Free Shipping</p>
              <p className="text-[10px] text-slate-400">On orders over $50</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <RotateCcw className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-800">30-Day Returns</p>
              <p className="text-[10px] text-slate-400">Money back guarantee</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-800">2-Year Warranty</p>
              <p className="text-[10px] text-slate-400">100% Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Submit Form Section */}
      <section className="pt-12 border-t border-slate-200 space-y-8">
        <h2 className="text-2xl font-bold text-slate-900">Customer Reviews & Ratings</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Submission Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit space-y-4">
            <h3 className="text-base font-bold text-slate-900">Write a Review</h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Rating
                </label>
                <div className="flex space-x-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer hover:scale-110 transition"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Comment
                </label>
                <textarea
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this product..."
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={submittingReview}
                className="w-full"
              >
                Submit Review
              </Button>
            </form>
          </div>

          {/* Review List */}
          <div className="lg:col-span-2 space-y-4">
            {reviews.length === 0 ? (
              <p className="text-slate-500 text-sm italic">No reviews yet for this product. Be the first to leave one!</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev._id} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                        {rev.userName ? rev.userName.charAt(0) : 'U'}
                      </div>
                      <span className="text-sm font-bold text-slate-900">{rev.userName}</span>
                    </div>
                    <ProductRating rating={rev.rating} size="xs" />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pl-11">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-slate-200 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
