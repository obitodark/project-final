
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://98.80.244.103:8080/api/v1', 
  timeout: 60000,

});

export default axiosInstance;
