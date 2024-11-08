import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  rating?: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  country: string;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop()
  discount?: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  subcategory: string;

  @Prop({required: false})
  additionalInformation?: { key: string; value: string }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
