import axios from "axios";

const api= axios.create({
    baseURL:"http://localhost:5000/api",
    Headers:{
        "Content-Type": "application/json",
    }
});

//attach token if usqer is authenticated
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      window.location.href = "/login";
    }

    // Handle server errors
    if (error.response?.status >= 500) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error); // Pass error back to the caller
  }
);

export default api;