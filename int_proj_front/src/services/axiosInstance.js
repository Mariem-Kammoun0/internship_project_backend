import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const AUTH_URL = import.meta.env.VITE_AUTH_URL || "http://localhost:8000";

//token : bearer
const getAuthToken = () => {
  return localStorage.getItem('token');
};
const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};
const removeAuthToken = () => {
  localStorage.removeItem('token');
};

const apiClient= axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type': 'application/json',
        'accept':"application/json",
    }
});

const authClient = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

apiClient.interceptors.request.use(
  (config)=>{
    const token = getAuthToken();
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },(error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      removeAuthToken();
    }
    if (error.response?.status >= 500) {
      console.error("Server error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

authClient.interceptors.response.use(
  (response) => {
    if (response.data?.token || response.data?.access_token) {
      const token = response.data.token || response.data.access_token;
      setAuthToken(token);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Authentication failed");
      removeAuthToken();
    }

    if (error.response?.status >= 500) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);


export { apiClient, authClient,  getAuthToken, setAuthToken, removeAuthToken};
