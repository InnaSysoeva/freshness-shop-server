import { CategoryEnum } from "../enums/category.enum";

export interface ProductInterface {
  _id: string;
  title: string;
  description: string;
  rating?: number;
  price: number;
  quantity: number;
  brand: string;
  country: string;
  images: string[];
  discount?: number;
  category: CategoryEnum;
  subcategory: string;
  additionaInformation?: [
    {
      key: string, 
      value: string
    }
  ]
}
