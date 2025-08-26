import { authClient, apiClient, removeAuthToken, setAuthToken, getAuthToken} from "./axiosInstance";


export const register = async (userData) => {
   try {
    const response = await authClient.post('api/register', userData);
    setAuthToken(token);
    return {
      user: response.data.user,
      token: response.data.token
    };
  } catch (error) {
    console.error('Registration error:', error.response?.data);
    throw error;
  }
};

export const login = async (credentials) => {
  try{
    const response = await authClient.post(`/api/login`, credentials);
    const token = response.data.token
    setAuthToken(token);
    return {
      user: response.data.user,
      token
    };
  } catch (error) {
    console.error('Login error:', error.response?.data);
    throw error;
  }
};


export const logout = async () => {
  try {
    await apiClient.post('/api/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }finally{
    removeAuthToken();
    window.location.href = "/api/login";
  }
};

export const isAuthenticated = async () => {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const response = await apiClient.get("/user"); 
    return response.data;
  } catch (error) {
    console.log('Auth check failed:', error.response?.status, error.response?.data);
    return null;
  }
};
