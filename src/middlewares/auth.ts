import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../errors/CustomError";
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import { ProtectedRequest } from "../utils/types";

interface AuthenticatedUser {
  userId: string;
  admin: boolean;
}

async function auth(req: ProtectedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !String(authHeader).startsWith("Bearer ")) {
    const error = new CustomError(
      "Authentication Invalid",
      StatusCodes.FORBIDDEN
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

  // handle the malformed error

  const payload = jwt.verify(token, JWT_SECRET_KEY) as AuthenticatedUser;

  req.user = {
    userId: payload.userId,
    admin: payload.admin,
  };

  return next();
}

export async function clientOnly(
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !String(authHeader).startsWith("Bearer ")) {
    const error = new CustomError(
      "Authentication Invalid",
      StatusCodes.FORBIDDEN
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

  // handle the malformed error

  const payload = jwt.verify(token, JWT_SECRET_KEY) as AuthenticatedUser;

  if (payload.admin)
    throw new CustomError(
      "This request is strictly for admins.",
      StatusCodes.FORBIDDEN
    );

  req.user = {
    userId: payload.userId,
    admin: payload.admin,
  };

  return next();
}

export async function adminOnly(
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !String(authHeader).startsWith("Bearer ")) {
    const error = new CustomError(
      "Authentication Invalid",
      StatusCodes.FORBIDDEN
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

  // handle the malformed error

  const payload = jwt.verify(token, JWT_SECRET_KEY) as AuthenticatedUser;

  if (!payload.admin)
    throw new CustomError(
      "This request is strictly for admins.",
      StatusCodes.FORBIDDEN
    );

  req.user = {
    userId: payload.userId,
    admin: payload.admin,
  };

  return next();
}

export default auth;
