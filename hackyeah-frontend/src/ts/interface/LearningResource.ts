export type LearningResourcesFilterInputs = {
  subject?: string;
  institutionId?: string;
  unitId?: string;
  studyId?: string;
};

export type LearningResourceFilterDTO = {
  subjectName?: string;
  institutionId?: string;
  unitId?: string;
  courseId?: string;
}

export type ReviewDTO = {
  learningResourceId: number;
  reviewId: number;
  rating: number;
  comment: string;
  authorName: string;
  createdAt: string;
}

export type Resource = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  reviewDTO: ReviewDTO;
  numberOfPhotos: number;
  numberOfVideos: number;
  numberOfPdfs: number;
  otherMaterials: number;
}

export type PostLearningResourceDTO = {
  learningResourceCreationDTO: {
    "title": string,
    "institutionId": string,
    "unitId": string,
    "courseId": string,
    "subjectName": string,
    "description": string
  },
  filesList: any[];
}
