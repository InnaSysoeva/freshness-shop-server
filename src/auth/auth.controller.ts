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
import { UserInterface } from "src/common/interfaces/user.interface";
import { AuhtRequest } from "src/common/interfaces/auth-request.interface";
import { UserTokensInterface } from "src/common/interfaces/user-tokens.interface";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  @ApiOperation(authDescription.registerUser.apiOperation)
  @ApiResponse(authDescription.registerUser.apiResponse)
  async registerUser(
    @Body() userDto: CreateUserDto,
  ): Promise<UserTokensInterface> {
    return this.authService.registerUser(userDto);
  }

  @Post("/login")
  @ApiOperation(authDescription.loginUser.apiOperation)
  @ApiResponse(authDescription.loginUser.apiResponse)
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserTokensInterface> {
    return this.authService.loginUser(loginUserDto);
  }

  @Get("/profile")
  @UseGuards(JwtAuthGuard)
  @ApiOperation(authDescription.getCurrentUser.apiOperation)
  @ApiResponse(authDescription.getCurrentUser.apiResponse)
  getCurrentUser(@Request() request: UserRequest): UserInterface {
    return request.user;
  }

  @Post("/refresh-token")
  @UseGuards(JwtAuthGuard)
  @ApiOperation(authDescription.refreshToken.apiOperation)
  @ApiResponse(authDescription.refreshToken.apiResponse)
  async refreshToken(
    @Request() request: AuhtRequest,
  ): Promise<UserTokensInterface> {
    const authHeader = request.headers.authorization;
    const refreshToken = authHeader && authHeader.split(" ")[1];

    return this.authService.refreshToken(refreshToken);
  }
}
