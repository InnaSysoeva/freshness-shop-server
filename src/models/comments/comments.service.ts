import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment } from "./comment.schema";
import { CommentInterface } from "src/common/interfaces/comment.interface";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { ReplyInterface } from "src/common/interfaces/reply.interface";
import { CreateReplyDto } from "./dto/create-reply.dto";
import errorMessages from "../../common/constants/error.messages";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentInterface>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    userId: string,
  ): Promise<CommentInterface> {
    try {
      const comment = new this.commentModel({ ...createCommentDto, userId });

      await comment.save();

      return comment;
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
      await this.commentModel.findByIdAndDelete(commentId);
    } catch (error) {
      throw new HttpException(
        errorMessages.delete("Comment"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCommentsByProductId(
    productId: string,
    page: number,
    limit: number,
  ): Promise<CommentInterface[]> {
    try {
      return await this.commentModel
        .find({ productId })
        .skip((page - 1) * limit)
        .limit(limit);
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Comments"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addReplyToComment(
    commentId: string,
    createReplyDto: CreateReplyDto,
    userId: string,
  ): Promise<ReplyInterface> {
    try {
      const updatedComment = await this.commentModel.findByIdAndUpdate(
        commentId,
        {
          $push: { replies: { ...createReplyDto, userId } },
        },
        { new: true },
      );

      return updatedComment.replies[updatedComment.replies.length - 1];
    } catch (error) {
      throw new HttpException(
        errorMessages.create("Reply"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateReplyToComment(
    commentId: string,
    replyId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<ReplyInterface> {
    try {
      const updatedComment = await this.commentModel.findOneAndUpdate(
        {
          _id: commentId,
          "replies._id": replyId,
        },
        {
          $set: {
            "replies.$.content": updateCommentDto.content,
          },
        },
        { new: true },
      );

      return updatedComment.replies.find(
        (reply) => reply._id.toString() === replyId,
      );
    } catch (error) {
      throw new HttpException(
        errorMessages.update("Reply"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteReplyToComment(
    commentId: string,
    replyId: string,
  ): Promise<void> {
    try {
      await this.commentModel.findByIdAndUpdate(commentId, {
        $pull: { replies: { _id: replyId } },
      });
    } catch (error) {
      throw new HttpException(
        errorMessages.delete("Reply"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCommentsQuantityByProductId(productId: string): Promise<number> {
    try {
      const comments = await this.commentModel.find({ productId }).exec();

      return comments.reduce((count, comment) => {
        return count + 1 + (comment.replies ? comment.replies.length : 0);
      }, 0);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        errorMessages.notFound("Comments"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
