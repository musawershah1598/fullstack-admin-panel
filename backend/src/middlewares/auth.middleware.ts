import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "@/utils/ApiError";
import config from "@/config/env";
import User from "@/models/User.model";
import { IJwtPayload } from "@/types/auth.types";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Authentication required");
    }

    const decoded = jwt.verify(token, config.jwt.secret) as IJwtPayload;
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Account is deactivated");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, "Invalid token"));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new ApiError(401, "Token expired"));
    } else {
      next(error);
    }
  }
};
