import { authClient } from "./axiosInstance";
const AUTH_URL = import.meta.env.VITE_AUTH_URL;


export const register = async (userData) => {
  const response = await authClient.post(`${AUTH_URL}/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await authClient.post(`${AUTH_URL}/login`, credentials);
  return response.data;
};


export const logout = async () => {
  try {
    await authClient.post('/logout');
  } catch (error) {
    console.log('Logout error:', error);
  }
};

export const isAuthenticated = async () => {
  try {
    const response = await authClient.get("/api/user"); 
    return !!response.data;
  } catch (error) {
    return false;
  }
};

