import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "./comment.schema";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { accessTokenExpirationTime } from "../../common/constants/token-expiration.const";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("PRIVATE_KEY"),
        signOptions: { expiresIn: accessTokenExpirationTime },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
