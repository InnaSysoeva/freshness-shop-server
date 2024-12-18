import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment } from "./comment.schema";
import { CommentInterface } from "src/common/interfaces/comment.interface";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import errorMessages from "../../common/constants/error.messages";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentInterface>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<string> {
    try {
      const comment = new this.commentModel(createCommentDto);
      await comment.save();

      return comment._id;
    } catch (error) {
      throw new HttpException(
        errorMessages.create("Comment"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateComment(
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentInterface> {
    try {
      const updatedComment = await this.commentModel.findByIdAndUpdate(
        commentId,
        { content: updateCommentDto.content },
        { new: true },
      );

      if (!updatedComment) {
        throw new HttpException(
          errorMessages.notFound(`Comment with id ${commentId}`),
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedComment;
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Comment"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteComment(commentId: string): Promise<void> {
    try {
      await this.commentModel.deleteMany({ parentId: commentId });

      await this.commentModel.findByIdAndDelete(commentId);
    } catch (error) {
      throw new HttpException(
        errorMessages.delete("Comment"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCommentsByProductId(productId: string): Promise<CommentInterface[]> {
    try {
      return this.commentModel.find({ productId, parentId: null });
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Comments"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
