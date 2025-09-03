import { apiClient } from "./axiosInstance";
import  { getJobApplications } from "./ApplicationService";

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

export const getJob = async(id)=>{
  try{
    const res = await apiClient.get(`/job-offers/${id}`);
        return res.data;

  } catch (err) {
    console.error(`Failed to delete job ${id}:`, err);
    throw err;
  }
}

export const getJobsByCompany = async (companyId, page = 1) => {
  try {
    const res = await apiClient.get(`/job-offers/company/${companyId}?page=${page}`);
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return { data: [], total: 0, totalPages: 0 };
    }
    handleApiError(err, `fetch jobs for company ${companyId}`);
  }
};

//################# employer #########################

export const getMyJobOffers = async () => {
  try {
    const res = await apiClient.get('/employer/job-offers');
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return []; // Return empty array if no jobs found
    }
    handleApiError(err, 'fetch your job offers');
  }
};

export const createJobOffer = async (jobData) => {
  try {
    const res = await apiClient.post('/employer/job-offers', jobData);
    return res.data;
  } catch (err) {
    handleApiError(err, 'create job offer');
  }
};

export const updateJobOffer = async (id, jobData) => {
  try {
    const res = await apiClient.put(`/employer/job-offers/${id}`, jobData);
    return res.data;
  } catch (err) {
    handleApiError(err, `update job offer ${id}`);
  }
};

export const deleteJobOffer = async (id) => {
  try {
    const res = await apiClient.delete(`/employer/job-offers/${id}`);
    return res.data;
  } catch (err) {
    handleApiError(err, `delete job offer ${id}`);
  }
};


// ============================
// DASHBOARD STATISTICS
// ============================

export const getEmployerDashboardStats = async () => {
  try {
    const [jobOffers, applications] = await Promise.all([
      getMyJobOffers(),
      getJobApplications()
    ]);

    const stats = {
      totalJobs: jobOffers.length,
      activeJobs: jobOffers.filter(job => job.status?.toLowerCase() === 'active').length,
      totalApplications: applications.length,
      pendingApplications: applications.filter(app => app.status?.toLowerCase() === 'pending').length,
      scheduledInterviews: applications.filter(app => 
        app.status?.toLowerCase().includes('interview') || 
        app.status?.toLowerCase().includes('scheduled')
      ).length,
      hiredCandidates: applications.filter(app => app.status?.toLowerCase() === 'hired').length,
      totalViews: jobOffers.reduce((sum, job) => sum + (job.views || 0), 0)
    };

    return stats;
  } catch (err) {
    handleApiError(err, 'fetch dashboard statistics');
  }
};