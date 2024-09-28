import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Endpoints } from '../Endpoints.types';
import { axiosInstance } from '../QueryClient';
import { UnitsApiResponse, UnitsQueryParams } from '@/ts/interface/Faculties';

export const useGetUnits = (params: UnitsQueryParams) => {
  return useQuery<UnitsApiResponse, AxiosError>({
    queryKey: ['units', JSON.stringify(params)],
    queryFn: async () => {
      const queryParams: any = {
        institutionId: params.institutionId
      };

      const res = await axiosInstance.get(Endpoints.UNITS, { params: queryParams });

      return res.data;
    }
  });
};
