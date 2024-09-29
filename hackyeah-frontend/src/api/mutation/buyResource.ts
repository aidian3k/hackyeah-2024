import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '../QueryClient';
import { RoutePaths } from '@/router/Routes.types';
import { RegisterDTO, RegisterResponse } from '@/ts/interface/Register.types';

type BuyType = {
    learningResourceId: number;
}

export const useBuyResource = () => {
  return useMutation<any, AxiosError, BuyType>({
    mutationFn: async (data: BuyType) => {
      const response = await axiosInstance.post(RoutePaths.BUY_RESOURCE.replace(':id', data.learningResourceId.toString()));
      return response;
    }
  });
};
