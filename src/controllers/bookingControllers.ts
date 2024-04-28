import { Request, Response } from "express";
import {
  CreateBookingSchema,
  UpdateBookingSchema,
} from "../validation/BookingValidation";
import EventModel from "../models/Event";
import CustomError from "../errors/CustomError";
import { StatusCodes } from "http-status-codes";
import BookingModel from "../models/Booking";
import { ProtectedRequest } from "../utils/types";

class BookingingController {
  public async createBooking(req: ProtectedRequest, res: Response) {
    const { eventId } = req.params;
    const { userId } = req.user;
    const { numberOfTickets } = await CreateBookingSchema.validateAsync(
      req.body
    );

    const event = await EventModel.findById(eventId);

    if (!event)
      throw new CustomError(
        "No event of the given ID. Can't book.",
        StatusCodes.NOT_FOUND
      );

    const booking = await BookingModel.create({
      user: userId,
      event: eventId,
      numberOfTickets,
    });

    await event.updateOne({
      users: [...event.users, userId],
      boughtTickets: event.boughtTickets + numberOfTickets,
    });

    return res.status(StatusCodes.CREATED).json({
      status: "Success",
      data: {
        booking,
      },
    });
  }

  public async getBookings(req: ProtectedRequest, res: Response) {
    const { userId } = req.params;

    const bookings = await BookingModel.find({ user: userId }).populate({
      path: "event",
      select: "date title location tickets",
    });

    return res.status(StatusCodes.OK).json({
      status: "Success",
      data: { bookings },
    });
  }

  public async getBooking(req: ProtectedRequest, res: Response) {
    const { bookingId } = req.params;

    const booking = await BookingModel.findById(bookingId);

    if (!booking)
      throw new CustomError("No booking of given ID", StatusCodes.NOT_FOUND);

    return res.status(StatusCodes.OK).json({
      status: "Success",
      data: {
        booking,
      },
    });
  }

  public async deleteBooking(req: ProtectedRequest, res: Response) {
    const { bookingId } = req.params;

    const booking = await BookingModel.findById(bookingId);

    if (!booking)
      throw new CustomError("No booking with given ID", StatusCodes.NOT_FOUND);

    await booking.deleteOne();

    return res.status(StatusCodes.OK).json({
      status: "Success",
      data: null,
    });
  }

  public async updateBooking(req: ProtectedRequest, res: Response) {
    const { bookingId } = req.params;
    const data = await UpdateBookingSchema.validateAsync(req.body);

    let booking = await BookingModel.findById(bookingId);

    if (!booking)
      throw new CustomError("No booking with given ID", StatusCodes.NOT_FOUND);

    await booking.updateOne(data);

    booking = await BookingModel.findById(bookingId);

    return res.status(StatusCodes.OK).json({
      status: "Success",
      data: {
        booking,
      },
    });
  }
}

export default new BookingingController();
