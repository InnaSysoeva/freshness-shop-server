import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  productId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
