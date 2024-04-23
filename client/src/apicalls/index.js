import axios from 'axios';

export const axiosInstance = axios.create({
  // No headers are set initially
});

// Add a request interceptor to dynamically set the Authorization header
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
});
