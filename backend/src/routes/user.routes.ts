import express from "express";
import { validate } from "@/middlewares/validation.middleware";
import * as userController from "@/controllers/user.controller";
import {
  changePasswordSchema,
  profileSchema,
} from "@/validators/user.validator";
import { authenticate } from "@/middlewares/auth.middleware";
import { authorize } from "@/middlewares/rbac.middleware";
import { UserRole } from "@/types/user.types";

const router = express.Router();

router.post(
  "/update-profile",
  [authenticate, validate(profileSchema)],
  userController.updateProfile
);

router.post(
  "/change-password",
  [authenticate, validate(changePasswordSchema)],
  userController.changePassword
);

router.get(
  "/",
  [authenticate, authorize(UserRole.ADMIN)],
  userController.users
);

export default router;
