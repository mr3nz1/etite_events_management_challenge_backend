import { Router } from "express";
import UserController from "../controllers/userControllers";
import asyncHandler from "../middlewares/asyncHandler";
import auth, { adminOnly } from "../middlewares/auth";

const router: Router = Router();

router.post("/login", asyncHandler(UserController.login));
router.post("/register", asyncHandler(UserController.register));
router.get(
  "/getUserInfo",
  asyncHandler(auth),
  asyncHandler(UserController.getUserInfo)
);

router.delete(
  "/:userId",
  asyncHandler(adminOnly),
  asyncHandler(UserController.deleteUser)
);

router.patch(
  "/:userId",
  asyncHandler(adminOnly),
  asyncHandler(UserController.updateUser)
);
export default router;
