import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const AUTH_URL = import.meta.env.VITE_AUTH_URL;


const apiClient= axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
        'accept':"application/json",
    }
});

const authClient = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const getCsrfCookie = async () => {
  await authClient.get('/sanctum/csrf-cookie');
};

authClient.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
    await getCsrfCookie();
  }
  return config;
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
