import ApiError from "@/utils/ApiError";
import { Request, Response, NextFunction } from "express";

export const enforceContentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Only check for methods that typically send body data
  const methodsWithBody = ["POST", "PUT", "PATCH"];

  if (methodsWithBody.includes(req.method)) {
    const contentType = req.get("Content-Type");

    // Check if Content-Type is missing or not application/json
    if (!contentType || !contentType.includes("application/json")) {
      return res
        .status(400)
        .json(new ApiError(400, "Content-Type must be application/json"));
    }
  }

  next();
};
