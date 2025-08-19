import { authClient } from "./axiosInstance";
const AUTH_URL = import.meta.env.VITE_AUTH_URL;


export const register = async (userData) => {
  const response = await authClient.post(`${AUTH_URL}/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await authClient.post(`${AUTH_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = async () => {
  try {
    await authClient.post('/logout');
  } catch (error) {
    console.log('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
  }
};

export const isAuthenticated = () => {
  return !!getToken();
};