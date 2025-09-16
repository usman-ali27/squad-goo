import axios from 'axios';
import { BASE_URL } from '@/config/api';
import useAuthStore from '@/stores/authStore';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor: Injects the auth token into every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles API responses, especially auth errors
apiClient.interceptors.response.use(
  (response) => {
    // If the response body indicates a failure (but the HTTP status is 2xx)
    if (response.data && response.data.success === false) {
      return Promise.reject(new Error(response.data.message || 'An API error occurred'));
    }
    return response;
  },
  (error) => {
    // If the error is a 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Use the logout action from the auth store
      useAuthStore.getState().actions.logout();
      // Optionally, redirect to the login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
