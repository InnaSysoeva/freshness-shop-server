import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Matches,
} from "class-validator";
import { passwordRegex } from "../../../common/constants/regex-expressions.const";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex)
  readonly password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber?: string;

  readonly refreshToken?: string;
}
