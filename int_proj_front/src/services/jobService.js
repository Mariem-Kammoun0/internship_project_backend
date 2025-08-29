// services/jobService.js
import { apiClient } from "./axiosInstance";

export const getJobs = async ({ page = 1, search = '', filters = {} }) => {
  try {
    const paramsObj = { page };
    if (search) paramsObj.search = search;

    // Handle filters
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'salary' && value && typeof value === 'object') {
        if (value.min !== null && value.min !== '') paramsObj.salary_min = value.min;
        if (value.max !== null && value.max !== '') paramsObj.salary_max = value.max;
      } else if (key === 'requirements' && Array.isArray(value) && value.length > 0) {
        paramsObj.requirements = value.join(',');
      } else if (value !== '' && value !== null && value !== undefined) {
        paramsObj[key] = value;
      }
    });
    const params = new URLSearchParams();
    Object.entries(paramsObj).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
    const queryString = params.toString();
    const res = await apiClient.get(`/job-offers${queryString ? `?${queryString}` : ''}`);
    return res.data;
  }catch (err) {
  if (!err.response) {
    throw new Error('Network error. Please check your connection.');
  }
  
  switch (err.response.status) {
    case 400:
      throw new Error('Invalid request parameters.');
    case 401:
      throw new Error('Authentication required.');
    case 403:
      throw new Error('Access denied.');
    case 404:
      throw new Error('Jobs endpoint not found.');
    case 429:
      throw new Error('Too many requests. Please try again later.');
    default:
      if (err.response.status >= 500) {
        throw new Error('Server error, please try again later.');
      }
      throw new Error(`Request failed with status ${err.response.status}`);
  }
}
}

export const createJob = async (jobData) => {
  try {
    const res = await apiClient.post(`/job-offers`, jobData);
    return res.data;
  } catch (err) {
    console.error("Failed to create job:", err);
    throw err;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const res = await apiClient.put(`/job-offers/${id}`, jobData);
    return res.data;
  } catch (err) {
    console.error(`Failed to update job ${id}:`, err);
    throw err;
  }
};

export const removeJob = async (id) => {
  try {
    const res = await apiClient.delete(`/job-offers/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete job ${id}:`, err);
    throw err;
  }
};

export const getJob = async(id)=>{
  try{
    const res = await apiClient.get(`/job-offers/${id}`);
        return res.data;

  } catch (err) {
    console.error(`Failed to delete job ${id}:`, err);
    throw err;
  }
}
