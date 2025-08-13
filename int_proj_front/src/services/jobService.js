// services/jobService.js
import api from "./axiosInstance";

export const getAllJobs = async ({page=1,search='',filters={}}) => {
  try {
    const params=new URLSearchParams({page,search,...filters});
    const res = await api.get("/job-offers${params.toString()}");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    throw err;
  }
};

export const createJob = async (jobData) => {
  try {
    const res = await api.post("/job-offers", jobData);
    return res.data;
  } catch (err) {
    console.error("Failed to create job:", err);
    throw err;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const res = await api.put(`/job-offers/${id}`, jobData);
    return res.data;
  } catch (err) {
    console.error(`Failed to update job ${id}:`, err);
    throw err;
  }
};

export const removeJob = async (id) => {
  try {
    const res = await api.delete(`/job-offers/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete job ${id}:`, err);
    throw err;
  }
};
