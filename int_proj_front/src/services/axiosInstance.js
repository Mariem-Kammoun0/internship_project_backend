import axios from "axios";

const api= axios.create({
    baseURL:"http://localhost:5000/api",
    Headers:{
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
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

export default api;