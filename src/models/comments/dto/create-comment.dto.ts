import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  productId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
