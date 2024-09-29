import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Endpoints } from '../Endpoints.types';
import { AcademicInstitutionsApiResponse, AcademicInstitutionsQueryParams } from '@/ts/interface/AcademicInstitutions';
import { axiosInstance } from '../QueryClient';

export const useGetAcademicInstitutions = (params: AcademicInstitutionsQueryParams) => {
  return useQuery<AcademicInstitutionsApiResponse, AxiosError>({
    queryKey: ['academicInstitutions', JSON.stringify(params)],
    queryFn: async () => {
      const filters = {
        name: params.name
      };
      const queryParams: any = {
        filters: JSON.stringify(filters)
      };

      const res = await axiosInstance.post(Endpoints.ACADEMIC_INSTITUTIONS, { data: filters });

      return res.data;
    }
  });
};
