import { Request } from "express";

export interface ProtectedRequest extends Request {
  user: {
    userId: string;
    admin?: boolean;
  };
}
