import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderItem, OrderItemSchema } from "../orders/order.schema";

@Schema()
export class Cart {
  @Prop()
  userId: string;

  @Prop({ type: [OrderItemSchema], default: [] })
  products: OrderItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
