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

@Controller("comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @ApiOperation(commentsApiDescription.createComment.apiOperation)
  @ApiResponse(commentsApiDescription.createComment.apiResponse)
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<string> {
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
}
