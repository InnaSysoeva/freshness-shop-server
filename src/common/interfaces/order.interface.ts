import { OrderItemInterface } from "./order-item.interface";

export interface OrderInterface {
  _id: string;
  products: OrderItemInterface[];
  totalPrice: number;
  isComplete: boolean;
  userId: string | null;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  postalCode: string;
  promoCode?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
