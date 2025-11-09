import { Request, Response } from "express";
import asyncHandler from "@/utils/asyncHandler";
import userService from "@/services/user.service";
import ApiResponse from "@/utils/ApiResponse";

export const users = asyncHandler(async (req: Request, res: Response) => {
  const results = await userService.fetchUsers(req.query);

  res
    .status(200)
    .json(
      new ApiResponse(200, results.data, results.message, results.metadata)
    );
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);
  res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});
