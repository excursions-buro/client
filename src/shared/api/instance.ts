import axios from 'axios';
import { CONFIG } from '../model/config';

export const publicFetchClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  withCredentials: true,
});
