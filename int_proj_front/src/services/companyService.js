import { apiClient } from "./axiosInstance";

export const createCompany = (payload) => apiClient.post(`/company`, payload);
export const deleteCompany = () => apiClient.delete(`/company`);
export const updateCompany = (payload) => apiClient.put(`/company`, payload);
export const showCompany = () => apiClient.get(`/company`);

export const getCompanyById = (id) => apiClient.get(`/companies/${id}`);
