import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Endpoints } from '../Endpoints.types';
import { axiosInstance } from '../QueryClient';
import { StudiesApiResponse } from '@/ts/interface/Studies';
import { LearningResourceFilterDTO, LearningResourcesFilterInputs, Resource } from '@/ts/interface/LearningResource';

export const useGetLearningMaterials = (params: LearningResourcesFilterInputs) => {
  return useQuery<Resource[], AxiosError>({
    queryKey: ['learningMaterials', JSON.stringify(params)],
    queryFn: async () => {
      const filters: LearningResourceFilterDTO = {
        institutionId: params.institutionId,
        unitId: params.unitId,
        courseId: params.studyId,
        subjectName: params.subject
      };

      const res = await axiosInstance.post(Endpoints.LEARNING_RESOURCES, filters);

      return res.data;
    }
  });
};
