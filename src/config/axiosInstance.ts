
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Base URL de la API
  timeout: 60000, // Tiempo máximo de espera

});

export default axiosInstance;
