import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Request,
  Param,
  Get,
  UseGuards,
  Put,
} from "@nestjs/common";
import { CartsService } from "./carts.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { cartApiDescription } from "./cart-api.description";
import { CartInterface } from "src/common/interfaces/cart.interface";
import { OrderItemInterface } from "src/common/interfaces/order-item.interface";
import { UserRequest } from "src/common/interfaces/user-request.interface";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@Controller("carts")
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(cartApiDescription.getCartByUserId.apiOperation)
  @ApiResponse(cartApiDescription.getCartByUserId.apiResponse)
  async getCartByUserId(
    @Request() request: UserRequest,
  ): Promise<CartInterface> {
    return this.cartsService.getCartByUserId(request.user._id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(cartApiDescription.addToCart.apiOperation)
  @ApiResponse(cartApiDescription.addToCart.apiResponse)
  async addToCart(
    @Body() product: OrderItemInterface,
    @Request() request: UserRequest,
  ): Promise<CartInterface> {
    return this.cartsService.addToCart(product, request.user._id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(cartApiDescription.updateCart.apiOperation)
  @ApiResponse(cartApiDescription.updateCart.apiResponse)
  async updateCart(
    @Body() product: OrderItemInterface,
    @Request() request: UserRequest,
  ): Promise<CartInterface> {
    return this.cartsService.updateCart(product, request.user._id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation(cartApiDescription.removeFromCart.apiOperation)
  @ApiResponse(cartApiDescription.removeFromCart.apiResponse)
  async removeFromCart(
    @Param("id") cartItemId: string,
    @Request() request: UserRequest,
  ): Promise<void> {
    return this.cartsService.removeFromCart(cartItemId, request.user._id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(cartApiDescription.deleteCart.apiOperation)
  @ApiResponse(cartApiDescription.deleteCart.apiResponse)
  async deleteCart(@Request() request: UserRequest): Promise<void> {
    return this.cartsService.deleteCart(request.user._id);
  }
}
