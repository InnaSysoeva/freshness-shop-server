import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { commentsApiDescription } from "./comments-api.description";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentInterface } from "src/common/interfaces/comment.interface";
import { ReplyInterface } from "src/common/interfaces/reply.interface";
import { CreateReplyDto } from "./dto/create-reply.dto";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { UserRequest } from "src/common/interfaces/user-request.interface";

@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(commentsApiDescription.createComment.apiOperation)
  @ApiResponse(commentsApiDescription.createComment.apiResponse)
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Request() request: UserRequest,
  ): Promise<CommentInterface> {
    return this.commentsService.createComment(
      createCommentDto,
      request.user._id,
    );
  }

  @Put("/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation(commentsApiDescription.updateComment.apiOperation)
  @ApiResponse(commentsApiDescription.updateComment.apiResponse)
  async updateComment(
    @Param("id") commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentInterface> {
    return this.commentsService.updateComment(commentId, updateCommentDto);
  }

  @Delete("/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation(commentsApiDescription.deleteComment.apiOperation)
  @ApiResponse(commentsApiDescription.deleteComment.apiResponse)
  async deleteComment(@Param("id") commentId: string): Promise<void> {
    return this.commentsService.deleteComment(commentId);
  }

  @Get("/by-product-id/:id/:page/:limit")
  @ApiOperation(commentsApiDescription.getCommentsByProductId.apiOperation)
  @ApiResponse(commentsApiDescription.getCommentsByProductId.apiResponse)
  async getCommentsByProductId(
    @Param("id") productId: string,
    @Param("page") page: number,
    @Param("limit") limit: number,
  ): Promise<CommentInterface[]> {
    return this.commentsService.getCommentsByProductId(productId, page, limit);
  }

  @Post("/reply/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation(commentsApiDescription.addReplyToComment.apiOperation)
  @ApiResponse(commentsApiDescription.addReplyToComment.apiResponse)
  async addReplyToComment(
    @Param("id") commentId: string,
    @Body() createReplyDto: CreateReplyDto,
    @Request() request: UserRequest,
  ): Promise<ReplyInterface> {
    return this.commentsService.addReplyToComment(
      commentId,
      createReplyDto,
      request.user._id,
    );
  }

  @Put("/reply/:commentId/:replyId")
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @ApiOperation(commentsApiDescription.deleteReplyToComment.apiOperation)
  @ApiResponse(commentsApiDescription.deleteReplyToComment.apiResponse)
  async deleteReplyToComment(
    @Param("commentId") commentId: string,
    @Param("replyId") replyId: string,
  ): Promise<void> {
    return this.commentsService.deleteReplyToComment(commentId, replyId);
  }

  @Get("/quantity/:productId")
  @ApiOperation(
    commentsApiDescription.getCommentsQuantityByProductId.apiOperation,
  )
  @ApiResponse(
    commentsApiDescription.getCommentsQuantityByProductId.apiResponse,
  )
  async getCommentsQuantityByProductId(
    @Param("productId") productId: string,
  ): Promise<number> {
    return this.commentsService.getCommentsQuantityByProductId(productId);
  }
}
