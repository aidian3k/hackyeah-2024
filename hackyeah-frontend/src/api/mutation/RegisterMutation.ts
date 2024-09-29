import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '../QueryClient';
import { RoutePaths } from '@/router/Routes.types';
import { RegisterDTO, RegisterResponse } from '@/ts/interface/Register.types';

export const useRegisterUser = () => {
  return useMutation<RegisterResponse, AxiosError, RegisterDTO>({
    mutationFn: async (data: RegisterDTO) => {
      const response = await axiosInstance.post(RoutePaths.REGISTER, data);
      return response;
    }
  });
};
