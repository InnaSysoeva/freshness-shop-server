import { Controller, Post, Body } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create-order.dto";
import { orderApiDescription } from "./order-api.description";

@Controller("orders")
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation(orderApiDescription.createOrder.apiOperation)
  @ApiResponse(orderApiDescription.createOrder.apiResponse)
  async createOrder(@Body() orderDto: CreateOrderDto): Promise<string> {
    return this.ordersService.createOrder(orderDto);
  }
}
