import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create-order.dto";
import { orderApiDescription } from "./order-api.description";
import { OrderInterface } from "src/common/interfaces/order.interface";
import { DateRangeInterface } from "src/common/interfaces/date-range.interface";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { UserRequest } from "src/common/interfaces/user-request.interface";

@Controller("orders")
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation(orderApiDescription.createOrder.apiOperation)
  @ApiResponse(orderApiDescription.createOrder.apiResponse)
  async createOrder(@Body() orderDto: CreateOrderDto): Promise<string> {
    return this.ordersService.createOrder(orderDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(orderApiDescription.getOrdersByUserId.apiOperation)
  @ApiResponse(orderApiDescription.getOrdersByUserId.apiResponse)
  async getOrdersByUserId(
    @Request() request: UserRequest,
    @Body() dateRange?: DateRangeInterface,
  ): Promise<OrderInterface[]> {
    return this.ordersService.getOrdersByUserId(request.user._id, dateRange);
  }
}
