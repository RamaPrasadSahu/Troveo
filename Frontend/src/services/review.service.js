import api from './api';
import { MOCK_REVIEWS } from '../utils/mockData';

let localMockReviews = [...MOCK_REVIEWS];

export const getProductReviews = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}/reviews`);
    return response.data?.data || response.data;
  } catch (error) {
    return localMockReviews.filter(r => r.productId === productId);
  }
};

export const createReview = async (productId, { rating, comment }) => {
  try {
    const response = await api.post(`/products/${productId}/reviews`, { rating, comment });
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      const newReview = {
        _id: 'rev_' + Date.now(),
        productId,
        userName: 'Current User',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        rating: Number(rating),
        comment,
        createdAt: new Date().toISOString(),
      };
      localMockReviews.unshift(newReview);
      return newReview;
    }
    throw new Error(error.response?.data?.message || 'Failed to submit review');
  }
};
