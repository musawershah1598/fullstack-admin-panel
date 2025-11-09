import { Request, Response, NextFunction } from "express";
import authService from "@/services/auth.service";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  res.status(201).json(new ApiResponse(201, result, "Registration successful"));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.status(200).json(new ApiResponse(200, result, "Login successful"));
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.status(200).json(new ApiResponse(200, result, "Token refreshed"));
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await authService.logout(req.user!._id);
  res.status(200).json(new ApiResponse(200, null, "Logout successful"));
});

export const user = asyncHandler(async (req: Request, res: Response) => {
  const result = req.user?.toJSON();
  res
    .status(200)
    .json(new ApiResponse(200, result, "User fetched successfully"));
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authService.profileUpdate(req.user?._id, req.body);

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
    const result = await authService.changePassword(req.user?._id, req.body);
    res
      .status(200)
      .json(new ApiResponse(200, result, "Password changed successfully"));
  }
);
