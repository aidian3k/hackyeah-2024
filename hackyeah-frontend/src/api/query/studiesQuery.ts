import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Endpoints } from '../Endpoints.types';
import { AcademicInstitutionsApiResponse, AcademicInstitutionsQueryParams } from '@/ts/interface/AcademicInstitutions';
import { axiosInstance } from '../QueryClient';

export const useGetStudies = (params: AcademicInstitutionsQueryParams) => {
  return useQuery<AcademicInstitutionsApiResponse, AxiosError>({
    queryKey: ['studies', JSON.stringify(params)],
    queryFn: async () => {
      const filters = {
        name: params.name
      };
      const queryParams: any = {
        filters: JSON.stringify(filters)
      };

      const res = await axiosInstance.get(Endpoints.ACADEMIC_INSTITUTIONS, { params: queryParams });

      return res.data;
    }
  });
};
