import api from './api';
import { MOCK_PRODUCTS } from '../utils/mockData';

// Local memory store for mock CRUD when backend is offline
let localMockProducts = [...MOCK_PRODUCTS];

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      // Mock Filtering & Search Logic
      let filtered = [...localMockProducts];

      if (params.category && params.category !== 'all') {
        filtered = filtered.filter(p => p.category === params.category);
      }

      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
        );
      }

      if (params.minPrice) {
        filtered = filtered.filter(p => (p.discountPrice || p.price) >= Number(params.minPrice));
      }
      if (params.maxPrice) {
        filtered = filtered.filter(p => (p.discountPrice || p.price) <= Number(params.maxPrice));
      }

      if (params.minRating) {
        filtered = filtered.filter(p => p.rating >= Number(params.minRating));
      }

      // Sorting
      if (params.sortBy === 'price-low') {
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
      } else if (params.sortBy === 'price-high') {
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
      } else if (params.sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else {
        // default newest
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }

      // Pagination
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 12;
      const startIndex = (page - 1) * limit;
      const paginated = filtered.slice(startIndex, startIndex + limit);

      return {
        products: paginated,
        total: filtered.length,
        page,
        totalPages: Math.ceil(filtered.length / limit) || 1,
      };
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      const product = localMockProducts.find(p => p._id === id || p.slug === id);
      if (product) return product;
      throw new Error('Product not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch product details');
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await api.get('/products/featured');
    return response.data?.data || response.data;
  } catch (error) {
    return localMockProducts.filter(p => p.isFeatured);
  }
};

export const getTrendingProducts = async () => {
  try {
    const response = await api.get('/products/trending');
    return response.data?.data || response.data;
  } catch (error) {
    return localMockProducts.filter(p => p.isTrending);
  }
};

export const getRelatedProducts = async (productId, category) => {
  try {
    const response = await api.get(`/products/related/${productId}`);
    return response.data?.data || response.data;
  } catch (error) {
    return localMockProducts
      .filter(p => p._id !== productId && p.category === category)
      .slice(0, 4);
  }
};

// Admin Service Methods
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      const newProd = {
        _id: 'prod_' + Date.now(),
        ...productData,
        rating: 5.0,
        numReviews: 0,
        isNew: true,
        images: productData.images && productData.images.length > 0
          ? productData.images
          : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
      };
      localMockProducts.unshift(newProd);
      return newProd;
    }
    throw new Error(error.response?.data?.message || 'Failed to create product');
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      const index = localMockProducts.findIndex(p => p._id === id);
      if (index !== -1) {
        localMockProducts[index] = { ...localMockProducts[index], ...productData };
        return localMockProducts[index];
      }
      throw new Error('Product not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      localMockProducts = localMockProducts.filter(p => p._id !== id);
      return { success: true, message: 'Product deleted successfully' };
    }
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
};
