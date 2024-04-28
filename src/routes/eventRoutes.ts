import { Router } from "express";
import auth, { adminOnly } from "../middlewares/auth";
import asyncHandler from "../middlewares/asyncHandler";
import EventControllers from "../controllers/eventControllers";

const router: Router = Router();

router.post(
  "/create",
  asyncHandler(adminOnly),
  asyncHandler(EventControllers.createEvent)
);

router.get("/all", asyncHandler(EventControllers.getEvents));
router.get("/:id/get", asyncHandler(EventControllers.getEvent));

router.delete(
  "/:id/delete",
  asyncHandler(adminOnly),
  asyncHandler(EventControllers.deleteEvent)
);
router.patch(
  "/:id/update",
  asyncHandler(adminOnly),
  asyncHandler(EventControllers.updateEvent)
);

export default router;
