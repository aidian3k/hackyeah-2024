import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Endpoints } from '../Endpoints.types';
import { axiosInstance } from '../QueryClient';
import { StudiesApiResponse, StudiesSearchParams } from '@/ts/interface/Studies';

export const useGetStudies = (params: StudiesSearchParams) => {
  return useQuery<StudiesApiResponse, AxiosError>({
    queryKey: ['studies', JSON.stringify(params)],
    queryFn: async () => {
      const filters = {
        institutionUid: params.institutionUid
      };

      const res = await axiosInstance.post(Endpoints.STUDIES, filters);

      return res.data;
    }
  });
};
