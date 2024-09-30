import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient();

export const axiosInstance = axios.create({
  baseURL: 'http://51.20.54.25:8080/api',
  withCredentials: true
});
