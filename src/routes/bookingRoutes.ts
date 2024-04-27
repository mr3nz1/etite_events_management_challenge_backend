import { Router } from "express";
import BookingController from "../controllers/bookingControllers";
import asyncHandler from "../middlewares/asyncHandler";
import auth, { clientOnly } from "../middlewares/auth";

const router: Router = Router();

router.post(
  "/:eventId/create",
  asyncHandler(clientOnly),
  asyncHandler(BookingController.createBooking)
);

router.get(
  "/:eventId/all",
  asyncHandler(auth),
  asyncHandler(BookingController.getBookings)
);

router.get(
  "/:bookingId/get",
  asyncHandler(auth),
  asyncHandler(BookingController.getBooking)
);

router.delete(
  "/:bookingId/delete",
  asyncHandler(clientOnly),
  asyncHandler(BookingController.deleteBooking)
);

router.patch(
  "/:bookingId/update",
  asyncHandler(clientOnly),
  asyncHandler(BookingController.updateBooking)
);

export default router;
