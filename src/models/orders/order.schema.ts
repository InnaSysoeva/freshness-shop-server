import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop()
  size?: string;

  @Prop()
  color?: string;

  @Prop()
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: [OrderItemSchema], required: true })
  products: OrderItem[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop()
  userId: string | null;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop()
  promoCode?: string;

  @Prop()
  notes?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
