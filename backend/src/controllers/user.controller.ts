import { Request, Response } from "express";
import asyncHandler from "@/utils/asyncHandler";
import userService from "@/services/user.service";
import ApiResponse from "@/utils/ApiResponse";
import { IPaginationOptions } from "@/types/pagination.types";
import PaginatedHelper from "@/utils/PaginatedResponse";
import UserModel from "@/models/User.model";

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await userService.profileUpdate(req.user?._id, req.body);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result.toJSON(),
          "Profile information updated successfully"
        )
      );
  }
);

export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await userService.changePassword(req.user?._id, req.body);
    res
      .status(200)
      .json(new ApiResponse(200, result, "Password changed successfully"));
  }
);

export const users = asyncHandler(async (req: Request, res: Response) => {
  const results = await userService.fetchUsers(req.query);

  res
    .status(200)
    .json(
      new ApiResponse(200, results.data, results.message, results.metadata)
    );
});
