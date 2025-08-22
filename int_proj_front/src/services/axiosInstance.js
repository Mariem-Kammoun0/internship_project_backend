import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const AUTH_URL = import.meta.env.VITE_AUTH_URL || "http://localhost:8000";


const apiClient= axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
        'accept':"application/json",
        'X-Requested-With': 'XMLHttpRequest',
    }
});

const authClient = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN' 
});

const getCsrfCookie = async () => {
  try {
    await authClient.get('/sanctum/csrf-cookie', { withCredentials: true });
  } catch (error) {
    console.error('Failed to get CSRF cookie:', error);
  }
};

authClient.interceptors.request.use(async (config) => {
  if (!config.url.includes('/sanctum/csrf-cookie') && (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || ''))){
    await getCsrfCookie();
  }
  // Ensure XSRF header is set from cookie explicitly
  try {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    if (match) {
      const token = decodeURIComponent(match[1]);
      config.headers['X-XSRF-TOKEN'] = token;
    }
  } catch (_e) {}
  return config;
});

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 419) {
      // CSRF token mismatch - refresh and retry
      console.log('CSRF token mismatch, refreshing...');
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      //window.location.href = "/login";
    }

    if (error.response?.status >= 500) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error); // Pass error back to the caller
  }
);

export { apiClient, authClient };
