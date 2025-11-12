import express from "express";
import { authenticate } from "@/middlewares/auth.middleware";
import * as notificationController from "@/controllers/notification.controller";
import { validate } from "@/middlewares/validation.middleware";
import { notificationSchema } from "@/validators/notification.validator";
const router = express.Router();

router.get("/", [authenticate], notificationController.index);
router.post("/", [
  authenticate,
  validate(notificationSchema),
  notificationController.store,
]);

export default router;
