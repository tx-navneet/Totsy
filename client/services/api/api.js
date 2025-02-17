import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Uses Vite proxy instead of hardcoded backend URL
  timeout: 10000,
});

export default api;
