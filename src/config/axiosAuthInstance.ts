import { getToken } from '@/utils/authService';
import axios from 'axios';

const axiosAuthInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 60000,
});


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
