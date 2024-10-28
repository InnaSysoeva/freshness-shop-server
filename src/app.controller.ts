import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiDecorator } from "./common/decorators/api.decorator";
import { swaggerMessages } from "./utils/swagger.messages";
import { HttpStatusCodeEnum } from "./common/enums/http.status.enum";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiDecorator(swaggerMessages.get('Hello world'), HttpStatusCodeEnum.OK)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
