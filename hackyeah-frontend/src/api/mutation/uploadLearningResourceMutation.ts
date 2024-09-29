import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '../QueryClient';
import { RoutePaths } from '@/router/Routes.types';
import { PostLearningResourceDTO } from '@/ts/interface/LearningResource';

export const useUploadLearningResource = () => {
  return useMutation<any, AxiosError, PostLearningResourceDTO>({
    mutationFn: async (data: PostLearningResourceDTO) => {
        const formData = new FormData();
        console.log(data);
        
        // Przekształcenie danych do formatu FormData
        formData.append("title", data.learningResourceCreationDTO.title);
        formData.append("institutionId", data.learningResourceCreationDTO.institutionId);
        formData.append("unitId", data.learningResourceCreationDTO.unitId);
        formData.append("courseId", data.learningResourceCreationDTO.courseId);
        formData.append("subjectName", data.learningResourceCreationDTO.subjectName);
        formData.append("description", data.learningResourceCreationDTO.description);

        if (data.filesList) {
        Array.from(data.filesList).forEach((file) => {
            formData.append("filesList", file);
        });
        }

        const response = await axiosInstance.post(RoutePaths.UPLOAD_LEARNING_RESOURCE, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      return response;
    }
  });
};
