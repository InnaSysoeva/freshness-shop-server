export interface ReplyInterface {
  _id: string;
  userId: string;
  content: string;
  parentId: string;
  createdAt: Date;
  updatedAt: Date;
}
