import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }), 
    MongooseModule.forRoot(process.env.MONGO_URI,{
      onConnectionCreate: (connection) => {
        connection.on('connected', () => console.log('MongoDB connected'));
        return connection;
    }}),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}