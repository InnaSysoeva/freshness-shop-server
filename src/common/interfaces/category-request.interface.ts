import { Request } from "express";
import { CategoryEnum } from "../enums/category.enum";

export interface CategoryRequest extends Request {
  category: CategoryEnum;
}