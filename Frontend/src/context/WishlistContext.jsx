import React, { createContext, useState, useEffect, useContext } from 'react';
import * as wishlistService from '../services/wishlist.service';
import { STORAGE_KEYS } from '../utils/constants';

export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const items = await wishlistService.getWishlist();
        if (Array.isArray(items) && items.length > 0) {
          setWishlist(items);
        }
      } catch (e) {
        // fallback to local state
      }
    };
    fetchWishlist();
  }, []);

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => (item._id || item.id || item) === productId
    );
  };

  const toggleWishlist = async (product) => {
    const productId = product._id || product.id || product;
    const exists = isInWishlist(productId);

    if (exists) {
      setWishlist((prev) =>
        prev.filter((item) => (item._id || item.id || item) !== productId)
      );
      try {
        await wishlistService.removeFromWishlist(productId);
      } catch (e) {
        // preserved locally
      }
    } else {
      setWishlist((prev) => [...prev, product]);
      try {
        await wishlistService.addToWishlist(product);
      } catch (e) {
        // preserved locally
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlist((prev) =>
      prev.filter((item) => (item._id || item.id || item) !== productId)
    );
    try {
      await wishlistService.removeFromWishlist(productId);
    } catch (e) {
      // preserved locally
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
