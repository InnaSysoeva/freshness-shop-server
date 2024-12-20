import { ProductInterface } from "./product.interface";

export interface ProductResponseInterface {
  products: ProductInterface[];
  quantity: number;
}
