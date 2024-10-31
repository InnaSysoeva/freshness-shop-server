import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../models/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { authDescription } from "./auth-api.description";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  @ApiOperation(authDescription.registerUser.apiOperation)
  @ApiResponse(authDescription.registerUser.apiResponse)
  async registerUser(@Body() userDto: CreateUserDto): Promise<{token: string}> {
    return this.authService.registerUser(userDto);
  }
}
