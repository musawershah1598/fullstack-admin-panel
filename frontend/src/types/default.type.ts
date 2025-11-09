export type ValidationErrorObj = {
  [field: string]: string;
};

export type ApiResponse = {
  status: boolean | number;
  message: string;
  data?: ValidationErrorObj | Record<string, unknown>;
};

export type ApiQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  searchFields?: string[];
};
