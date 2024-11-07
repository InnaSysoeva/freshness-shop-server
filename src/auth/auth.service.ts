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
import { hashRounds } from "../common/constants/hash-rounds.const";
import errorMessages from "../common/constants/error.messages";
import { LoginUserDto } from "../models/users/dto/login-user.dto";
import { UserInterface } from "src/common/interfaces/user.interface";
import {
  accessTokenExpirationTime,
  refreshTokenExpirationTime,
} from "../common/constants/token-expiration.const";
import { UserTokensInterface } from "src/common/interfaces/user-tokens.interface";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateAccesToken({
    _id,
    email,
    firstName,
    lastName,
  }: UserInterface): Promise<string> {
    const payload = {
      _id: _id.toString(),
      email,
      firstName,
      lastName,
    };

    return this.jwtService.sign(payload, {
      expiresIn: accessTokenExpirationTime,
    });;
  }

  async generateRefreshToken(email: string): Promise<string> {
    const payload = {
      email,
    };

    return this.jwtService.sign(payload, {
      expiresIn: refreshTokenExpirationTime,
    });;
  }

  async registerUser(
    userDto: CreateUserDto,
  ): Promise<UserTokensInterface> {
    const user = await this.usersService.getUserByEmail(userDto.email);

    if (user) {
      throw new HttpException(
        errorMessages.emailValidation(),
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, hashRounds);

    try {
      const refreshToken = await this.generateRefreshToken(userDto.email);

      const newUser = await this.usersService.createUser({
        ...userDto,
        password: hashPassword,
        refreshToken: refreshToken,
      });

      const accessToken = await this.generateAccesToken(newUser);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException(
        errorMessages.create("User"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<UserTokensInterface> {
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

    const refreshToken = user.refreshToken;
    const accessToken = await this.generateAccesToken(user);

    return { accessToken, refreshToken };
  }

  async refreshToken(
    currentRefreshToken: string,
  ): Promise<UserTokensInterface> {
    try {
      const decodedUser = this.jwtService.verify(currentRefreshToken);
      const user = await this.usersService.getUserByEmail(decodedUser.email);

      if (!user || user.refreshToken !== currentRefreshToken) {
        throw new UnauthorizedException(errorMessages.refreshToken());
      }

      const refreshToken = await this.generateRefreshToken(user.email);
      const accessToken = await this.generateAccesToken(user);

      await this.usersService.updateUsersRefreshToken(
        user._id.toString(),
        refreshToken,
      );

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException(errorMessages.refreshToken());
    }
  }
}
