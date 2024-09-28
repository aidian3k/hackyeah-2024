export type Unit = {
  uid: string;
  name: string;
  status: string;
};

export type UnitsApiResponse = {
  results: any[];
  version: string;
  units: Unit[];
};

export type UnitsQueryParams = {
  institutionId: string;
};
