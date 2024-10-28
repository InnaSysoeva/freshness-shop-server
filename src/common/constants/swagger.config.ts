import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Freshness Shop BACKEND')
    .setDescription('Documentation for REST API')
    .setVersion('1.0.0')
    .build()