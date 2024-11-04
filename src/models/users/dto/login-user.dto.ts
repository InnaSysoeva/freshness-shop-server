import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { LoginUserIterface } from "src/common/interfaces/user-login.interface";

export class LoginUserDto implements LoginUserIterface {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
