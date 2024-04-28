import { Router } from "express";
import BookingController from "../controllers/bookingControllers";
import asyncHandler from "../middlewares/asyncHandler";
import auth, { clientOnly } from "../middlewares/auth";

const router: Router = Router();

// router.get(
//   "/:userId/:eventId/get",
//   asyncHandler(auth),
//   asyncHandler(BookingController.getBookings)
// );

router.get(
  "/:userId/get",
  asyncHandler(auth),
  asyncHandler(BookingController.getBookings)
);


router.post(
  "/:eventId/create",
  asyncHandler(clientOnly),
  asyncHandler(BookingController.createBooking)
);


router.get(
  "/:bookingId/getBookings",
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
