import { Request, Response } from "express";
import asyncHandler from "@/utils/asyncHandler";
import notificationService from "@/services/notification.service";
import ApiResponse from "@/utils/ApiResponse";

export const index = asyncHandler(async (req: Request, res: Response) => {
  const results = await notificationService.index(req.query);
  res
    .status(200)
    .json(
      new ApiResponse(200, results.data, results.message, results.metadata),
    );
});

export const store = asyncHandler(async (req: Request, res: Response) => {
  const result = await notificationService.store(req.body);
  res
    .status(200)
    .json(new ApiResponse(200, result, "Notification added successfully"));
});

export const readNotification = asyncHandler(
  async (req: Request, res: Resposne) => {},
);
