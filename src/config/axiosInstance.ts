
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://obisstore.online/api/v1',
  timeout: 60000,

});

export default axiosInstance;
