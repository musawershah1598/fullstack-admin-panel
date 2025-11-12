import express from "express";
import * as userController from "@/controllers/user.controller";

import { authenticate } from "@/middlewares/auth.middleware";
import { authorize } from "@/middlewares/rbac.middleware";
import { UserRole } from "@/types/user.types";
import { validate } from "@/middlewares/validation.middleware";
import { profileSchema } from "@/validators/user.validator";

const router = express.Router();

router.get(
  "/",
  [authenticate, authorize(UserRole.ADMIN)],
  userController.users
);

router.put(
  "/:id",
  [authenticate, authorize(UserRole.ADMIN), validate(profileSchema)],
  userController.updateUser
);

router.delete(
  "/:id",
  [authenticate, authorize(UserRole.ADMIN)],
  userController.deleteUser
);

export default router;
