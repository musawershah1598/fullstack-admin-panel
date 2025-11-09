import { Router } from "express";
import * as authController from "@/controllers/auth.controller";
import { authenticate } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validation.middleware";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "@/validators/auth.validator";
import {
  changePasswordSchema,
  profileSchema,
} from "@/validators/user.validator";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/user", authenticate, authController.user);
router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  authController.refreshToken
);
router.post("/logout", authenticate, authController.logout);

router.post(
  "/update-profile",
  [authenticate, validate(profileSchema)],
  authController.updateProfile
);

router.post(
  "/change-password",
  [authenticate, validate(changePasswordSchema)],
  authController.changePassword
);

export default router;
