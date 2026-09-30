export const APP_NAME = 'ShopSphere';

export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
  { id: 'fashion', name: 'Fashion & Apparel', icon: 'Shirt' },
  { id: 'home', name: 'Home & Living', icon: 'Home' },
  { id: 'beauty', name: 'Beauty & Personal Care', icon: 'Sparkles' },
  { id: 'sports', name: 'Sports & Outdoors', icon: 'Activity' },
  { id: 'books', name: 'Books & Stationery', icon: 'BookOpen' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export const ORDER_STATUSES = {
  ORDERED: 'Ordered',
  CONFIRMED: 'Confirmed',
  SHIPPED: 'Shipped',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit / Debit Card' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'cod', name: 'Cash on Delivery' },
];

export const STORAGE_KEYS = {
  TOKEN: 'shopsphere_token',
  USER: 'shopsphere_user',
  CART: 'shopsphere_cart',
  WISHLIST: 'shopsphere_wishlist',
};
