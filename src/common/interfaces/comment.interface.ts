export interface CommentInterface {
  _id: string;
  userId: string;
  productId: string;
  content: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
