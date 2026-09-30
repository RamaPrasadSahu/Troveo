import api from './api';
import { MOCK_ORDERS } from '../utils/mockData';

let localMockOrders = [...MOCK_ORDERS];

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      const newOrder = {
        _id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
        createdAt: new Date().toISOString(),
        items: orderData.items || [],
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod || 'Credit Card',
        paymentStatus: 'Paid',
        orderStatus: 'Ordered',
        subtotal: orderData.subtotal || 0,
        tax: orderData.tax || 0,
        shippingCost: orderData.shippingCost || 0,
        discount: orderData.discount || 0,
        totalAmount: orderData.totalAmount || 0,
        trackingNumber: 'TRK-' + Math.floor(10000000 + Math.random() * 90000000),
      };
      localMockOrders.unshift(newOrder);
      return newOrder;
    }
    throw new Error(error.response?.data?.message || 'Failed to place order');
  }
};

export const getUserOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data?.data || response.data;
  } catch (error) {
    return localMockOrders;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data?.data || response.data;
  } catch (error) {
    const order = localMockOrders.find(o => o._id === orderId);
    if (order) return order;
    throw new Error('Order not found');
  }
};

// Admin operations
export const getAllOrders = async () => {
  try {
    const response = await api.get('/orders/admin/all');
    return response.data?.data || response.data;
  } catch (error) {
    return localMockOrders;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      const index = localMockOrders.findIndex(o => o._id === orderId);
      if (index !== -1) {
        localMockOrders[index].orderStatus = status;
        return localMockOrders[index];
      }
      throw new Error('Order not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to update order status');
  }
};
