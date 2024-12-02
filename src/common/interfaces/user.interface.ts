import { Document } from "mongoose";

export interface UserInterface extends Document {
  firstName: string;
  lastName: String;
  email: string;
  password: string;
  phoneNumber?: string;
  accessToken?: string;
  refreshToken?: string;
  wishList?: string[];
}
