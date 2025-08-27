import { apiClient } from "./axiosInstance";

export const getUser= () => apiClient.get(`/user/profile`);
export const updateUser= (payload) => apiClient.put(`/user/profile`,payload);