import api from './api';
import { MOCK_USER, MOCK_ADMIN_USER } from '../utils/mockData';
import { STORAGE_KEYS } from '../utils/constants';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const data = response.data?.data || response.data;
    if (data?.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user || data));
    }
    return data;
  } catch (error) {
    // Fallback mock logic when backend API is unavailable
    if (!error.response) {
      const emailLower = credentials.email?.toLowerCase();
      const isAdmin = emailLower?.includes('admin');
      const mockUser = isAdmin ? MOCK_ADMIN_USER : { ...MOCK_USER, email: credentials.email };
      const fakeToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem(STORAGE_KEYS.TOKEN, fakeToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      
      return { token: fakeToken, user: mockUser, success: true };
    }
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const data = response.data?.data || response.data;
    if (data?.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user || data));
    }
    return data;
  } catch (error) {
    if (!error.response) {
      const newUser = {
        _id: 'user_' + Date.now(),
        name: userData.fullName || userData.name,
        email: userData.email,
        role: 'user',
      };
      const fakeToken = 'mock_jwt_token_' + Date.now();
      localStorage.setItem(STORAGE_KEYS.TOKEN, fakeToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      return { token: fakeToken, user: newUser, success: true };
    }
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (e) {
    // ignore offline errors
  } finally {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data?.data || response.data;
  } catch (error) {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    if (!error.response) {
      return { success: true, message: 'Password reset email sent (Mock).' };
    }
    throw new Error(error.response?.data?.message || 'Failed to send reset email');
  }
};
