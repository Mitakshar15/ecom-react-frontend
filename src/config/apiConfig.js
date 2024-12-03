import axios from 'axios';
const DEPLOYED='https://e-commerce-server-production-0873.up.railway.app'
const LOCALHOST='http://localhost:5454'

export const API_BASE_URL = LOCALHOST

const apiConfig = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem('jwt');

apiConfig.defaults.headers.common['Authorization'] = `Bearer ${token}`;

apiConfig.defaults.headers.post['Content-Type'] = 'application/json';

export default apiConfig;