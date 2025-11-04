export type ValidationErrorObj = {
  [field: string]: string;
};

export type ApiResponse = {
  status: boolean | number;
  message: string;
  data?: ValidationErrorObj | Record<string, unknown>;
};
