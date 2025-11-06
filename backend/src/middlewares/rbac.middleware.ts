// middleware for authorization
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import { UserRole } from "../types/user.types";

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Insufficient permissions"));
    }

    next();
  };
};
