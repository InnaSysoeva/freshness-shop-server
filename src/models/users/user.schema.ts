import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  phoneNumber?: string;

  @Prop({ required: false })
  accessToken?: string;

  @Prop({ required: false })
  refreshToken?: string;

  @Prop({ type: [String], default: [] })
  wishList: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
