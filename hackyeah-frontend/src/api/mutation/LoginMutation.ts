import { LoginFormInputs, LoginResponse } from '@/ts/interface/Login.types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '../QueryClient';
import { RoutePaths } from '@/router/Routes.types';

export const useLoginUser = () => {
  return useMutation<LoginResponse, AxiosError, LoginFormInputs>({
    mutationFn: async (data: LoginFormInputs) => {
      const form = new FormData()
      form.append('email', data.email)
      form.append('password', data.password)
      const response = await axiosInstance.post(RoutePaths.LOGIN, form);
      return response;
    }
  });
};
