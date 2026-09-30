import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return response.data?.data || response.data;
  } catch (error) {
    // Fallback to local storage cart
    const localCart = localStorage.getItem(STORAGE_KEYS.CART);
    return localCart ? JSON.parse(localCart) : [];
  }
};

export const addToCart = async (productId, quantity = 1, variant = null) => {
  try {
    const response = await api.post('/cart/add', { productId, quantity, variant });
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      // Offline fallback handling handled in CartContext or returned
      return { productId, quantity, variant, success: true };
    }
    throw new Error(error.response?.data?.message || 'Failed to add item to cart');
  }
};

export const updateCartQuantity = async (productId, quantity) => {
  try {
    const response = await api.put(`/cart/item/${productId}`, { quantity });
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      return { productId, quantity, success: true };
    }
    throw new Error(error.response?.data?.message || 'Failed to update quantity');
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(`/cart/item/${productId}`);
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      return { productId, success: true };
    }
    throw new Error(error.response?.data?.message || 'Failed to remove item from cart');
  }
};

export const clearCart = async () => {
  try {
    await api.delete('/cart');
  } catch (e) {
    localStorage.removeItem(STORAGE_KEYS.CART);
  }
};
