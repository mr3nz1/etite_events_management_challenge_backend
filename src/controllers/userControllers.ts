import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class UserController {
  public async login(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json({ message: "Login" });
  }

  public async register(req: Request, res: Response) {
    return res.json({ message: "Register" });
  }
}

export default new UserController();
