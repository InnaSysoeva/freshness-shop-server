import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { CommentInterface } from "src/common/interfaces/comment.interface";

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop()
  productId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: [] })
  replies?: CommentInterface[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
