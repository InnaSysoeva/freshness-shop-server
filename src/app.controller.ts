import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpStatusCodeEnum } from "./common/enums/http.status.enum";
import { swaggerMessages } from "./utils/swagger.messages";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary: swaggerMessages.get('Hello world')})
  @ApiResponse({status: HttpStatusCodeEnum.OK})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
