import { apiClient } from "./axiosInstance";


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
        const response = await fetch(`${API_BASE_URL}/job-offers/${jobOfferId}/apply`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(applicationData),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error applying for job:', error);
        throw error;
    }
};

export const withdrawApplication = async (applicationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/${applicationId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error withdrawing application:', error);
        throw error;
    }
};

export const updateApplicationStatus = async (applicationId, status, notes = "") => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status, notes }),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error updating application status:', error);
        throw error;
    }
};

// Add or update motivation letter
export const updateMotivationLetter = async (applicationId, motivationLetter) => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/motivation`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ motivation_letter: motivationLetter }),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error updating motivation letter:', error);
        throw error;
    }
};

// Get applications for a specific job offer (for recruiters)
export const getJobApplications = async (jobOfferId, { page = 1, filters = {} } = {}) => {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            per_page: '10'
        });

        // Add filter parameters
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== "") {
                params.append(key, value.toString());
            }
        });

        const response = await fetch(`${API_BASE_URL}/job-offers/${jobOfferId}/applications?${params}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching job applications:', error);
        throw error;
    }
};

// Reject an application (for recruiters)
export const rejectApplication = async (jobOfferId, applicationId, reason = "") => {
    try {
        const response = await fetch(`${API_BASE_URL}/job-offers/${jobOfferId}/applications/${applicationId}/reject`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ reason }),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error rejecting application:', error);
        throw error;
    }
};

// Get application statistics
export const getApplicationStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/stats`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching application stats:', error);
        throw error;
    }
};

// Get application details
export const getApplicationDetails = async (applicationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/${applicationId}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching application details:', error);
        throw error;
    }
};

// Upload resume/CV for application
export const uploadApplicationDocument = async (applicationId, file, documentType = 'resume') => {
    try {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('type', documentType);

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/documents`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: formData,
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error uploading document:', error);
        throw error;
    }
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
    uploadApplicationDocument
};