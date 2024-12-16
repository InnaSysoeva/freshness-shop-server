import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./order.schema";
import { OrderInterface } from "src/common/interfaces/order.interface";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderInterface>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderInterface> {
    const order = new this.orderModel(createOrderDto);

    return await order.save();
  }
}
