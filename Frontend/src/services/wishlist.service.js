import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const getWishlist = async () => {
  try {
    const response = await api.get('/wishlist');
    return response.data?.data || response.data;
  } catch (error) {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return saved ? JSON.parse(saved) : [];
  }
};

export const addToWishlist = async (product) => {
  try {
    const productId = typeof product === 'string' ? product : product._id;
    const response = await api.post('/wishlist', { productId });
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      return { product, success: true };
    }
    throw new Error(error.response?.data?.message || 'Failed to add to wishlist');
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      return { productId, success: true };
    }
    throw new Error(error.response?.data?.message || 'Failed to remove from wishlist');
  }
};
