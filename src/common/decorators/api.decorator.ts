import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpStatusCodeEnum } from "../enums/http.status.enum";

export const ApiDecorator = (summary: string, status: HttpStatusCodeEnum): MethodDecorator => {
  return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    ApiOperation({ summary })(target, key, descriptor);
    ApiResponse({ status })(target, key, descriptor);
  };
};