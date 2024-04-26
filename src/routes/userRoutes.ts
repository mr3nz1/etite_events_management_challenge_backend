import { Router } from "express";
import UserController from "../controllers/userControllers";

const router: Router = Router({});

router.post("/login", UserController.login);
router.post("/registers", UserController.register);

export default router;
