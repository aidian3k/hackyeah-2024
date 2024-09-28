import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient();

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api'
});
