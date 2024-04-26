import { NextFunction } from "express";

async function asyncHandler(cb: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (err: Error | any) {
      next(err);
    }
  };
}

export default asyncHandler;
