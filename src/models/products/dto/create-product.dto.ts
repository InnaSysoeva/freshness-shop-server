import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsPositive,
  IsInt,
  IsUrl,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsString()
  brand: string;

  @IsString()
  country: string;

  @IsArray()
  images: string[];

  @IsNumber()
  @IsOptional()
  discount?: number;

  category: string;

  subcategory: string;
}
