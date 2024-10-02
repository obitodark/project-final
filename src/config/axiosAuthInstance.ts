import { getToken } from '@/utils/authService';
import axios from 'axios';

const axiosAuthInstance = axios.create({
  baseURL: 'http://98.80.244.103:8080/api/v1',
  timeout: 60000,
});

// Interceptor para agregar el token solo a axiosAuthInstance
axiosAuthInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
