import api from './api';
import { MOCK_USER, MOCK_ADMIN_USER } from '../utils/mockData';
import { STORAGE_KEYS } from '../utils/constants';

let localMockUsers = [MOCK_USER, MOCK_ADMIN_USER];

export const getProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data?.data || response.data;
  } catch (error) {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : MOCK_USER;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/users/profile', profileData);
    const updated = response.data?.data || response.data;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    return updated;
  } catch (error) {
    if (!error.response) {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      const current = stored ? JSON.parse(stored) : MOCK_USER;
      const updated = { ...current, ...profileData };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
      return updated;
    }
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const response = await api.put('/users/change-password', { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    if (!error.response) {
      return { success: true, message: 'Password updated successfully' };
    }
    throw new Error(error.response?.data?.message || 'Failed to change password');
  }
};

// Admin Operations
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users/admin/all');
    return response.data?.data || response.data;
  } catch (error) {
    return localMockUsers;
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const response = await api.put(`/users/admin/${userId}/role`, { role });
    return response.data?.data || response.data;
  } catch (error) {
    if (!error.response) {
      const user = localMockUsers.find(u => u._id === userId);
      if (user) {
        user.role = role;
        return user;
      }
      throw new Error('User not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to update user role');
  }
};
