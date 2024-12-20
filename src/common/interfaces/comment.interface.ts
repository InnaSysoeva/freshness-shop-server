import { ReplyInterface } from "./reply.interface";

export interface CommentInterface {
  _id: string;
  userId: string;
  productId?: string;
  content: string;
  replies?: ReplyInterface[];
  createdAt: Date;
  updatedAt: Date;
}
