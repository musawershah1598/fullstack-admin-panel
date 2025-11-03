// ApiError.ts - Similar structure to ApiResponse
class ApiError<T = any> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;

  constructor(statusCode: number, message: string, data: T = null as T) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = false; // Always false for errors
  }

  // Static factory methods for common errors
  static badRequest<T = any>(message = "Bad request", data: T = null as T) {
    return new ApiError(400, message, data);
  }

  static unauthorized<T = any>(message = "Unauthorized", data: T = null as T) {
    return new ApiError(401, message, data);
  }

  static forbidden<T = any>(message = "Forbidden", data: T = null as T) {
    return new ApiError(403, message, data);
  }

  static notFound<T = any>(
    message = "Resource not found",
    data: T = null as T
  ) {
    return new ApiError(404, message, data);
  }

  static conflict<T = any>(message = "Conflict", data: T = null as T) {
    return new ApiError(409, message, data);
  }

  static unprocessableEntity<T = any>(
    message = "Validation failed",
    data: T = null as T
  ) {
    return new ApiError(422, message, data);
  }

  static internal<T = any>(
    message = "Internal server error",
    data: T = null as T
  ) {
    return new ApiError(500, message, data);
  }
}

export default ApiError;
