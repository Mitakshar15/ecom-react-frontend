import axios from 'axios';
const DEPLOYED='https://ecom-backend-api-production.up.railway.app'
const LOCALHOST='http://localhost:5454'

export const API_BASE_URL = DEPLOYED

const apiConfig = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem('jwt');

apiConfig.defaults.headers.common['Authorization'] = `Bearer ${token}`;

apiConfig.defaults.headers.post['Content-Type'] = 'application/json';

export default apiConfig;