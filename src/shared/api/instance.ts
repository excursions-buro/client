import axios from 'axios';
import { CONFIG } from '../model/config';

export const publicFetchClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  withCredentials: true,
});

publicFetchClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
