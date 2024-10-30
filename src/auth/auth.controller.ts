import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import { CreateUserDto } from "../models/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { authDescription } from "./auth-api.description";
import { LoginUserDto } from "../models/users/dto/login-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { UserRequest } from "src/common/interfaces/user-request.interface";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation(authDescription.registerUser.apiOperation)
  @ApiResponse(authDescription.registerUser.apiResponse)
  @Post("/register")
  async registerUser(
    @Body() userDto: CreateUserDto,
  ): Promise<{ token: string }> {
    return this.authService.registerUser(userDto);
  }

  @ApiOperation(authDescription.loginUser.apiOperation)
  @ApiResponse(authDescription.loginUser.apiResponse)
  @Post("/login")
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ token: string }> {
    return this.authService.loginUser(loginUserDto);
  }

  @ApiOperation(authDescription.getCurrentUser.apiOperation)
  @ApiResponse(authDescription.getCurrentUser.apiResponse)
  @UseGuards(JwtAuthGuard)
  @Get("/profile")
  getCurrentUser(@Request() request: UserRequest) {
    return request.user;
  }
}
