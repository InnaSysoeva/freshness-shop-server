import { Request } from "express";
import { UserInterface } from "./user.interface";

export interface UserRequest extends Request {
  user?: UserInterface;
}
