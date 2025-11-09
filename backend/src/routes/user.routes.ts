import express from "express";
import * as userController from "@/controllers/user.controller";

import { authenticate } from "@/middlewares/auth.middleware";
import { authorize } from "@/middlewares/rbac.middleware";
import { UserRole } from "@/types/user.types";

const router = express.Router();

router.get(
  "/",
  [authenticate, authorize(UserRole.ADMIN)],
  userController.users
);

router.delete(
  "/:id",
  [authenticate, authorize(UserRole.ADMIN)],
  userController.deleteUser
);

export default router;
