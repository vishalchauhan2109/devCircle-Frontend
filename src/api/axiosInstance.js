import axios from 'axios';
import { baseUrl } from '../Constants';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
