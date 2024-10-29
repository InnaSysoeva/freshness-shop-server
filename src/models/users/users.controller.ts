import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { userApiDescription } from "./user-api.description";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation(userApiDescription.createUser.apiOperation)
  @ApiResponse(userApiDescription.createUser.apiResponse)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
}
