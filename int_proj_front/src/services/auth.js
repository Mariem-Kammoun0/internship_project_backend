import { authClient } from "./axiosInstance";


export const register = async (userData) => {
  // Ensure CSRF cookie is set before mutating request
  await authClient.get(`/sanctum/csrf-cookie`);
  const response = await authClient.post(`/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  // Ensure CSRF cookie is set before mutating request
  await authClient.get(`/sanctum/csrf-cookie`);
  const response = await authClient.post(`/login`, credentials);
  return response.data;
};


export const logout = async () => {
  try {
    await authClient.get(`/sanctum/csrf-cookie`);
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

