export interface CommentInterface {
  _id: string;
  userId: string;
  productId?: string;
  content: string;
  replies?: CommentInterface[];
  createdAt: Date;
  updatedAt: Date;
}
