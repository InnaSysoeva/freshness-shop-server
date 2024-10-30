import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../models/users/dto/create-user.dto";
import { UsersService } from "../models/users/users.service";
import * as bcrypt from "bcryptjs";
import { hashRounds } from "../common/constants/hash.rounds.const";
import errorMessages from "../common/constants/error.messages";
import { isPasswordValid } from "../utils/password.validator";
import { LoginUserDto } from "../models/users/dto/login-user.dto";
import { UserInterface } from "src/common/interfaces/user.interface";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateToken(user: UserInterface): Promise<{ token: string }> {
    const payload = {
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

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

    if (!isPasswordValid(userDto.password)) {
      throw new HttpException(
        errorMessages.passwordValidation(),
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, hashRounds);

    try {
      const newUser = await this.usersService.createUser({
        ...userDto,
        password: hashPassword,
      });
      const accessToken = await this.generateToken(newUser);

      return accessToken;
    } catch (error) {
      throw new HttpException(
        errorMessages.create("User"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.usersService.getUserByEmail(loginUserDto.email);

    if (!user) {
      throw new HttpException(
        errorMessages.notFound("User with such email"),
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(errorMessages.passwordValidation());
    }

    return { token: user.accessToken };
  }
}
