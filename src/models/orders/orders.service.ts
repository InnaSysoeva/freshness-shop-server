import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./order.schema";
import { OrderInterface } from "src/common/interfaces/order.interface";
import { CreateOrderDto } from "./dto/create-order.dto";
import { DateRangeInterface } from "src/common/interfaces/date-range.interface";
import errorMessages from "../../common/constants/error.messages";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderInterface>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<string> {
    try {
      const order = new this.orderModel(createOrderDto);
      await order.save();

      return order._id;
    } catch (error) {
      throw new HttpException(
        errorMessages.create("Order"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrdersByUserId(
    userId: string,
    dateRange?: DateRangeInterface,
  ): Promise<OrderInterface[]> {
    try {
      if (dateRange && dateRange.startDate && dateRange.endDate) {
        const { startDate, endDate } = dateRange;

        return await this.orderModel.find({
          userId,
          createdAt: { $gte: startDate, $lte: endDate },
        });
      }

      return await this.orderModel.find({ userId });
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Orders"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
