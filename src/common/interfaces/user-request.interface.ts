import { Request } from "express";
import { User } from "../../models/users/user.schema";

export interface UserRequest extends Request {
  user?: User;
}
