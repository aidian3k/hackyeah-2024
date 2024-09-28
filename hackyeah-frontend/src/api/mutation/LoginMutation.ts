import { LoginFormInputs, LoginResponse } from '@/ts/interface/Login.types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '../QueryClient';
import { RoutePaths } from '@/router/Routes.types';

export const useLoginUser = () => {
  return useMutation<LoginResponse, AxiosError, LoginFormInputs>({
    mutationFn: async (data: LoginFormInputs) => {
      const response = await axiosInstance.post(RoutePaths.LOGIN, data);
      return response;
    }
  });
};
