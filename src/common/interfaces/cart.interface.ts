import { OrderItemInterface } from "./order-item.interface";

export interface CartInterface {
  userId: string;
  products: OrderItemInterface[];
}
