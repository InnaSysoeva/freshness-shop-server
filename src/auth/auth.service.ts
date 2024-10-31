import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../models/users/dto/create-user.dto";
import { UsersService } from "../models/users/users.service";
import * as bcrypt from "bcryptjs";
import { hashRounds } from "../common/constants/hash.rounds.const";
import { User } from "../models/users/user.schema";
import errorMessages from "../common/constants/error.messages";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateToken({email}: User): Promise<{ token: string }> {
    const payload = { email };

    return { token: this.jwtService.sign(payload) };
  }

  async registerUser(userDto: CreateUserDto): Promise<{ token: string }> {
    const user = await this.usersService.getUserByEmail(userDto.email);

    if (user) {
      throw new HttpException(
        errorMessages.emailValidation(),
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, hashRounds);
    const accessToken = await this.generateToken(userDto);

    try {
      await this.usersService.createUser({
        ...userDto,
        password: hashPassword,
        accessToken: accessToken.token,
      });
    } catch (error) {
      throw new HttpException(
        errorMessages.create("User"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return accessToken;
  }
}
