import React, { createContext, useState, useEffect, useContext } from 'react';
import * as cartService from '../services/cart.service';
import { STORAGE_KEYS } from '../utils/constants';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Sync to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Load from API on mount if available
  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      try {
        const items = await cartService.getCart();
        if (Array.isArray(items) && items.length > 0) {
          setCart(items);
        }
      } catch (err) {
        // preserve local cart state
      } finally {
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);

  const addToCart = async (product, quantity = 1, variant = null) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => (item.product._id || item.product) === (product._id || product)
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, variant }];
      }
    });

    try {
      await cartService.addToCart(product._id || product, quantity, variant);
    } catch (e) {
      // API sync failed, kept in local state
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.product._id || item.product) === productId
          ? { ...item, quantity }
          : item
      )
    );

    try {
      await cartService.updateCartQuantity(productId, quantity);
    } catch (e) {
      // local fallback preserved
    }
  };

  const removeFromCart = async (productId) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => (item.product._id || item.product) !== productId
      )
    );

    try {
      await cartService.removeFromCart(productId);
    } catch (e) {
      // local fallback preserved
    }
  };

  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.CART);
    try {
      await cartService.clearCart();
    } catch (e) {
      // ignore
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => {
    const price = item.product?.discountPrice || item.product?.price || 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        cartCount,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
