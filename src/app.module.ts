import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./models/users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./models/products/products.module";
import { OrdersModule } from "./models/orders/orders.module";
import { CartsModule } from "./models/carts/carts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      onConnectionCreate: (connection) => {
        connection.on("connected", () => console.log("MongoDB connected"));
        return connection;
      },
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    CartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
