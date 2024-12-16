import { Module } from "@nestjs/common";
import { CartsService } from "./carts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "./cart.schema";
import { CartsController } from "./carts.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { accessTokenExpirationTime } from "../../common/constants/token-expiration.const";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("PRIVATE_KEY"),
        signOptions: { expiresIn: accessTokenExpirationTime },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CartsService],
  controllers: [CartsController],
})
export class CartsModule {}
