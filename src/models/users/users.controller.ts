import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { userApiDescription } from "./user-api.description";
import { UserInterface } from "src/common/interfaces/user.interface";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOperation(userApiDescription.createUser.apiOperation)
  @ApiResponse(userApiDescription.createUser.apiResponse)
  async create(@Body() userDto: CreateUserDto): Promise<UserInterface> {
    return this.usersService.createUser(userDto);
  }
}
