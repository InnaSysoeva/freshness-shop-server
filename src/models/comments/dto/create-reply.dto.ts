import { IsNotEmpty, IsString } from "class-validator";

export class CreateReplyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  parentId: string;
}
