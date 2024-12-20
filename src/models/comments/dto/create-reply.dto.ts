import { IsNotEmpty, IsString } from "class-validator";

export class CreateReplyDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  parentId: string;
}
