import { UserInterface } from "src/common/interfaces/user.interface";
import { IsString, IsEmail, IsOptional, IsNotEmpty } from "class-validator";

export class CreateUserDto implements UserInterface {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  readonly password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber?: string;

  readonly accessToken?: string;
}
