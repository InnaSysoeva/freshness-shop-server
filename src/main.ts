import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig } from "./common/constants/swagger.config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.enableCors({
    origin: process.env.BASE_URL,
  });
  app.setGlobalPrefix("api/");
  app.useGlobalPipes(new ValidationPipe());

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("/api/docs", app, swaggerDocument);

  await app.listen(port, () =>
    console.log(`Server is listening on port ${port}`),
  );
}

bootstrap();
