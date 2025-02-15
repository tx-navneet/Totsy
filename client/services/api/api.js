import axios from 'axios';

const api = axios.create({
  baseURL: '/api/api', // Proxy will forward requests to the actual backend
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
