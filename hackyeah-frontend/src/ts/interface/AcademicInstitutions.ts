export type AcademicInstitution = {
  id: string;
  name: string;
  status: string;
};

export type AcademicInstitutionsApiResponse = {
  results: any[];
  version: string;
  institutions: AcademicInstitution[];
};

export type AcademicInstitutionsQueryParams = {
  name: string;
};
