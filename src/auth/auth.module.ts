import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../models/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { expirationTime } from "../common/constants/token.expiration.const";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("PRIVATE_KEY"),
        signOptions: { expiresIn: expirationTime },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule {}
