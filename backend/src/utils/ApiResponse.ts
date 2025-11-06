import { IPaginationMetadata } from "@/types/pagination.types";

class ApiResponse<T = any> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  metadata?: IPaginationMetadata;

  constructor(
    statusCode: number,
    data: T,
    message = "Success",
    metadata?: IPaginationMetadata
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    if (metadata) {
      this.metadata = metadata;
    }
  }
}

export default ApiResponse;
