import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Get,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { commentsApiDescription } from "./comments-api.description";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentInterface } from "src/common/interfaces/comment.interface";
import { ReplyInterface } from "src/common/interfaces/reply.interface";
import { CreateReplyDto } from "./dto/create-reply.dto";

@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @ApiOperation(commentsApiDescription.createComment.apiOperation)
  @ApiResponse(commentsApiDescription.createComment.apiResponse)
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentInterface> {
    return this.commentsService.createComment(createCommentDto);
  }

  @Put("/:id")
  @ApiOperation(commentsApiDescription.updateComment.apiOperation)
  @ApiResponse(commentsApiDescription.updateComment.apiResponse)
  async updateComment(
    @Param("id") commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentInterface> {
    return this.commentsService.updateComment(commentId, updateCommentDto);
  }

  @Delete("/:id")
  @ApiOperation(commentsApiDescription.deleteComment.apiOperation)
  @ApiResponse(commentsApiDescription.deleteComment.apiResponse)
  async deleteComment(@Param("id") commentId: string): Promise<void> {
    return this.commentsService.deleteComment(commentId);
  }

  @Get("/by-product-id/:id")
  @ApiOperation(commentsApiDescription.getCommentsByProductId.apiOperation)
  @ApiResponse(commentsApiDescription.getCommentsByProductId.apiResponse)
  async getCommentsByProductId(
    @Param("id") productId: string,
  ): Promise<CommentInterface[]> {
    return this.commentsService.getCommentsByProductId(productId);
  }

  @Post("/reply/:id")
  @ApiOperation(commentsApiDescription.addReplyToComment.apiOperation)
  @ApiResponse(commentsApiDescription.addReplyToComment.apiResponse)
  async addReplyToComment(
    @Param("id") commentId: string,
    @Body() createReplyDto: CreateReplyDto,
  ): Promise<ReplyInterface> {
    return this.commentsService.addReplyToComment(commentId, createReplyDto);
  }

  @Put("/reply/:commentId/:replyId")
  @ApiOperation(commentsApiDescription.updateReplyToComment.apiOperation)
  @ApiResponse(commentsApiDescription.updateReplyToComment.apiResponse)
  async updateReplyToComment(
    @Param("commentId") commentId: string,
    @Param("replyId") replyId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<ReplyInterface> {
    return this.commentsService.updateReplyToComment(
      commentId,
      replyId,
      updateCommentDto,
    );
  }

  @Delete("/reply/:commentId/:replyId")
  @ApiOperation(commentsApiDescription.deleteReplyToComment.apiOperation)
  @ApiResponse(commentsApiDescription.deleteReplyToComment.apiResponse)
  async deleteReplyToComment(
    @Param("commentId") commentId: string,
    @Param("replyId") replyId: string,
  ): Promise<void> {
    return this.commentsService.deleteReplyToComment(commentId, replyId);
  }
}
