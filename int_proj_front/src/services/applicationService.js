import { apiClient } from "./axiosInstance";

const handleError = (err, context = 'Request') => {
    console.error(`${context} error:`, err);
    
    if (!err.response) {
        throw new Error('Network error. Please check your connection.');
    }
    const { status, data } = err.response;
    
    if (data?.message) {
        throw new Error(data.message);
    }
    
    switch (status) {
        case 400:
            throw new Error('Invalid request data.');
        case 401:
            throw new Error('Please log in to continue.');
        case 403:
            throw new Error('You are not authorized to perform this action.');
        case 404:
            throw new Error('Resource not found.');
        case 409:
            throw new Error('Conflict: This action cannot be completed.');
        case 410:
            throw new Error('This resource is no longer available.');
        case 422:
            throw new Error('Validation failed. Please check your input.');
        case 429:
            throw new Error('Too many requests. Please try again later.');
        default:
            if (status >= 500) {
                throw new Error('Server error. Please try again later.');
            }
            throw new Error(`Request failed with status ${status}.`);
    }
};

// Get user's applications with search and filters
export const buildQueryParams = async ({ page = 1, search = "", filters = {} } = {}) => {
    const params = new URLSearchParams({
        page: page.toString(),
        per_page: '10'
    });

    if (search) params.append('search', search);
        
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "") {
            if (key === 'salary_range' && (value.min || value.max)) {
                if (value.min) params.append('salary_min', value.min.toString());
                if (value.max) params.append('salary_max', value.max.toString());
            } else if (typeof value === 'string' || typeof value === 'number') {
                params.append(key, value.toString());
            }
        }
    });
    return params.toString();
    };

export const getMyApplications = async({ page = 1, search = "", filters = {} } = {}) => {
    const queryString = await buildQueryParams(page, 10, search, filters);
    const res= await apiClient.get(`/employee/my-applications?${queryString}`);
    return res.data;
}
// Apply for a job
export const applyForJob = async (jobOfferId, applicationData) => {
    try {
        const res = await apiClient.post(`/employee/applications/${jobOfferId}`, applicationData);
        return res.data;
    } catch (error) {
        handleError(error, 'Applying for job');
    }
};

export const withdrawApplication = async (applicationId) => {
    try {
        const res = await apiClient.delete(`/employee/applications/${applicationId}`);
        return res.data;
    } catch (error) {
        handleError(error, 'withdrawing application');
    }
};

export const updateApplicationStatus = async (applicationId, status, notes = "") => {
    try {
        const res = await apiClient.patch(`/applications/${applicationId}/status`, { status, notes });
        return res.data;
    } catch (error) {
        handleError(error, 'updating application');
    }
};

// Add or update motivation letter
export const updateMotivationLetter = async (applicationId, motivationLetter) => {
    try {
        const res = await apiClient.put(`/employee/applications/${applicationId}`)
        } catch (error) {
        handleError(error, 'motivation letter update');
    }
};

// Get applications for a specific job offer (for recruiters)
export const getJobApplications = async (jobOfferId, { page = 1, filters = {} } = {}) => {
    try {
        const queryString = buildQueryParams({ page, filters });
        const res = await apiClient.get(`/job-offers/${jobOfferId}/applications?${queryString}`);
        return res.data;
    } catch (error) {
        handleError(error, ' getting jobs');
    }
};

// Reject an application (for recruiters)
export const rejectApplication = async (jobOfferId, applicationId, reason = "") => {
    try {
        const res = await apiClient.post(`/employer/applications/${jobOfferId}/${applicationId}`, { reason });
        return res.data;
    } catch (error) {
        handleError(error, 'rejecting job');
    }
};

// Get application statistics
export const getApplicationStats = async () => {
    try {
        const res = await apiClient.get('/applications/stats');
        return res.data;
    } catch (error) {
        handleError(error, 'getting application stats');
    }
};

export const getApplicationDetails = async (applicationId) => {
    try {
        const res = await apiClient.get(`/employer/applications/${applicationId}`);
        return res.data;
    } catch (error) {
        handleError(error, 'application details');
    }
};

export const checkMyApplication = async (jobId) => {
    try {
        const res = await apiClient.get(`/employee/my-application/${jobId}`);
        return res.data;
    } catch (error) {
        handleError(error, 'app details');
    }
};
// Upload resume/CV for application
export const uploadApplicationDocument = async (applicationId, file, documentType = 'resume') => {
    try {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('type', documentType);

        const res = await apiClient.post(`/applications/${applicationId}/documents`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        handleError(error, 'document upload');
    }
};

export const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

export const formatSalary = (salary) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(salary);
    };

export default {
    getMyApplications,
    applyForJob,
    withdrawApplication,
    updateApplicationStatus,
    updateMotivationLetter,
    getJobApplications,
    rejectApplication,
    getApplicationStats,
    getApplicationDetails,
    checkMyApplication,
    uploadApplicationDocument,
    formatDate,formatSalary
};