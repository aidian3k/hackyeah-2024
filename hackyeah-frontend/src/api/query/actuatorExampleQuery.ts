import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '../QueryClient';
import { Endpoints } from '../Endpoints.types';

interface ExampleInterface {}

interface ExampleParamsInterface {}

export const useActuatorExampeQuery = (params: ExampleParamsInterface) => {
  return useQuery<ExampleInterface, AxiosError>({
    queryKey: ['actuatorExample', JSON.stringify(params)],
    queryFn: async () => {
      const queryParams: any = {
        ...params
      };

      const res = await axiosInstance.get(Endpoints.ACTUATOR_HEALTH_CHECK, { params: queryParams });

      return res.data;
    }
  });
};
