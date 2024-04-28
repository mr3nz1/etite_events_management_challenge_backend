import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  LoginUserSchema,
  RegisterUserSchema,
  UpdateUserSchema,
} from "../validation/UserValidation";
import UserModel from "../models/User";
import CustomError from "../errors/CustomError";
import { ProtectedRequest } from "../utils/types";
import BookingModel from "../models/Booking";

class UserController {
  public async login(req: Request, res: Response) {
    const { email, password } = await LoginUserSchema.validateAsync(req.body);

    const user = await UserModel.findOne({
      email,
    });

    if (!user)
      throw new CustomError(
        "No user matches the given email",
        StatusCodes.NOT_FOUND
      );

    const passwordCorrect = await user.isPasswordCorrect(password);

    if (!passwordCorrect)
      throw new CustomError("Incorrect password", StatusCodes.BAD_REQUEST);

    const token = user.createJWT();

    return res
      .status(StatusCodes.OK)
      .json({ status: "Success", data: { token } });
  }

  public async register(req: Request, res: Response) {
    const data = await RegisterUserSchema.validateAsync(req.body);

    await UserModel.create(data);

    return res
      .status(StatusCodes.CREATED)
      .json({ status: "success", message: "User created" });
  }

  public async getUserInfo(req: ProtectedRequest, res: Response) {
    const { userId } = req.user;

    const user = await UserModel.findById(userId);

    if (!user)
      throw new CustomError("No user with given Id", StatusCodes.NOT_FOUND);

    return res.status(StatusCodes.OK).json({
      status: "Success",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          admin: user.admin,
        },
      },
    });
  }

  public async deleteUser(req: ProtectedRequest, res: Response) {
    const { userId } = req.params;
    const { admin } = req.query;

    const user = await UserModel.findById(userId);

    if (!user)
      throw new CustomError(
        "No user of given ID. Can't Delete.",
        StatusCodes.NOT_FOUND
      );

    if (!Boolean(admin)) {
      const bookings = await BookingModel.find({
        user: userId,
      });

      bookings.forEach(async (booking) => {
        await booking.deleteOne();
      });
    } else {
      const adminUsers = await UserModel.find({ admin: true });

      if (adminUsers.length < 2)
        throw new CustomError(
          "Can't delete all admin users. Can't delete account.",
          StatusCodes.BAD_REQUEST
        );
    }

    await user.deleteOne();

    return res.status(StatusCodes.OK).json({
      status: "Success",
      data: null,
    });
  }

  public async updateUser(req: ProtectedRequest, res: Response) {
    const { userId } = req.params;
    const data = await UpdateUserSchema.validateAsync(req.body);

    let user = await UserModel.findById(userId);

    if (!user)
      throw new CustomError(
        "No user of given ID. Can't Update.",
        StatusCodes.NOT_FOUND
      );

    await user.updateOne(data);

    user = await UserModel.findById(userId);

    return res.status(StatusCodes.OK).json({
      status: "Success",
      data: {
        user,
      },
    });
  }
}

export default new UserController();
