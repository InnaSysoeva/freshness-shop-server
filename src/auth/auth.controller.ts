import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../models/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { authDescription } from "./auth-api.description";
import { LoginUserDto } from "../models/users/dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation(authDescription.registerUser.apiOperation)
  @ApiResponse(authDescription.registerUser.apiResponse)
  @Post("/register")
  registerUser(@Body() userDto: CreateUserDto) {
    return this.authService.registerUser(userDto);
  }

  @ApiOperation(authDescription.loginUser.apiOperation)
  @ApiResponse(authDescription.loginUser.apiResponse)
  @Post("/login")
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
