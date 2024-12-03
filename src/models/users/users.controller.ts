import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Request,
  Get,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { userApiDescription } from "./user-api.description";
import { UserInterface } from "src/common/interfaces/user.interface";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { UserRequest } from "../../common/interfaces/user-request.interface";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOperation(userApiDescription.createUser.apiOperation)
  @ApiResponse(userApiDescription.createUser.apiResponse)
  async create(@Body() userDto: CreateUserDto): Promise<UserInterface> {
    return this.usersService.createUser(userDto);
  }

  @Get("/wish-list")
  @UseGuards(JwtAuthGuard)
  @ApiOperation(userApiDescription.getWishList.apiOperation)
  @ApiResponse(userApiDescription.getWishList.apiResponse)
  async getWishList(@Request() request: UserRequest): Promise<string[]> {
    return this.usersService.getWishList(request.user._id);
  }

  @Patch("/wish-list/add/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation(userApiDescription.addToWishList.apiOperation)
  @ApiResponse(userApiDescription.addToWishList.apiResponse)
  async addToWishList(
    @Param("id") productId: string,
    @Request() request: UserRequest,
  ): Promise<void> {
    return this.usersService.addToWishList(productId, request.user._id);
  }

  @Patch("/wish-list/remove/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation(userApiDescription.removeFromWishList.apiOperation)
  @ApiResponse(userApiDescription.removeFromWishList.apiResponse)
  async removeFromWishList(
    @Param("id") productId: string,
    @Request() request: UserRequest,
  ): Promise<void> {
    return this.usersService.removeFromWishList(
      productId,
      request.user._id,
    );
  }

  @Patch("/wish-list/remove-all")
  @UseGuards(JwtAuthGuard)
  @ApiOperation(userApiDescription.removeAllFromWishList.apiOperation)
  @ApiResponse(userApiDescription.removeAllFromWishList.apiResponse)
  async removeAllFromWishList(@Request() request: UserRequest): Promise<void> {
    return this.usersService.removeAllFromWishList(request.user._id);
  }
}
