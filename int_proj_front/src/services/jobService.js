// services/jobService.js
import api from "./axiosInstance";
const API_URL = "http://localhost:5000/api";

export const getJobs = async ({ page = 1, search = '', filters = {} }) => {
  try {
    const paramsObj = { page, search, ...filters };

    if (paramsObj.salary && typeof paramsObj.salary === 'object') {
      paramsObj.salary_min = paramsObj.salary.min || '';
      paramsObj.salary_max = paramsObj.salary.max || '';
      delete paramsObj.salary;
    }

    if (paramsObj.requirements && Array.isArray(paramsObj.requirements)) {
      paramsObj.requirements = paramsObj.requirements.join(',');
    }

    const params = new URLSearchParams(paramsObj).toString();
    const res = await api.get(`${API_URL}/job-offers?${params}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    throw err;
  }
};


export const createJob = async (jobData) => {
  try {
    const res = await api.post(`${API_URL}/job-offers`, jobData);
    return res.data;
  } catch (err) {
    console.error("Failed to create job:", err);
    throw err;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const res = await api.put(`${API_URL}/job-offers/${id}`, jobData);
    return res.data;
  } catch (err) {
    console.error(`Failed to update job ${id}:`, err);
    throw err;
  }
};

export const removeJob = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/job-offers/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete job ${id}:`, err);
    throw err;
  }
};
