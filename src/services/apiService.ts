import axios from 'axios';
import { BASE_URL } from '@/config/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Add a response interceptor to handle API-level success/failure
apiClient.interceptors.response.use(
  (response) => {
    // If the API response body indicates failure, reject the promise
    // This will trigger the .catch() block in our component
    if (response.data && response.data.success === false) {
      // Reject with an object that mimics an Axios error structure
      return Promise.reject({ response: response });
    }
    // If successful, just return the response
    return response;
  },
  (error) => {
    // For genuine network errors or non-2xx status codes, let the error propagate
    return Promise.reject(error);
  }
);

export default apiClient;
