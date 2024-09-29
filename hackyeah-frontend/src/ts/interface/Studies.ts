export type Study = {
  uid: string;
  courseId: number;
  name: string;
  level: string;
  profile: string;
  title: string;
  forms: string;
  institutions: string[];
};

export type StudiesApiResponse = {
  courses: Study[];
};

export type StudiesSearchParams = {
  institutionUid: string;
};
