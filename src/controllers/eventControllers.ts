import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import EventModel from "../models/Event";
import {
  CreateEventSchema,
  UpdateEventSchema,
} from "../validation/EventValidation";
import UserModel from "../models/User";
import CustomError from "../errors/CustomError";
import { ProtectedRequest } from "../utils/types";

class EventController {
  public async createEvent(req: Request, res: Response) {
    const data = await CreateEventSchema.validateAsync(req.body);

    const event = await EventModel.create(data);

    res
      .status(StatusCodes.CREATED)
      .json({ status: "Success", data: { event } });
  }

  public async getEvents(req: Request, res: Response) {
    const events = await EventModel.find({});

    return res.status(StatusCodes.CREATED).json({
      status: "Success",
      data: {
        events,
      },
    });
  }
  public async getEvent(req: Request, res: Response) {
    const { id } = req.params;

    const event = await EventModel.findById(id);

    if (!event)
      throw new CustomError("No event of given ID", StatusCodes.NOT_FOUND);

    return res.status(StatusCodes.OK).json({
      status: "Success",
      data: {
        event,
      },
    });
  }

  public async deleteEvent(req: ProtectedRequest, res: Response) {
    const { id } = req.params;

    const event = await EventModel.findById(id);

    if (!event)
      throw new CustomError(
        "Event not found. Can't delete.",
        StatusCodes.NOT_FOUND
      );

    await event.deleteOne();

    return res.status(StatusCodes.OK).json({
      status: "Success",
      data: null,
    });
  }

  public async updateEvent(req: ProtectedRequest, res: Response) {
    const { id } = req.params;
    const data = await UpdateEventSchema.validateAsync(req.body);

    let event = await EventModel.findById(id);

    if (!event)
      throw new CustomError(
        "No event of given id. Can't update",
        StatusCodes.NOT_FOUND
      );

    await event.updateOne(data);

    event = await EventModel.findById(id);

    res.status(StatusCodes.OK).json({
      status: "Success",
      data: { event },
    });
  }
}

export default new EventController();
