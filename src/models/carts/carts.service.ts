import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart } from "./cart.schema";
import { CartInterface } from "src/common/interfaces/cart.interface";
import { OrderItemInterface } from "src/common/interfaces/order-item.interface";
import errorMessages from "../../common/constants/error.messages";

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartInterface>,
  ) {}

  async getCartByUserId(userId: string): Promise<CartInterface> {
    try {
      const cart = await this.cartModel.findOne({ userId });

      if (!cart) {
        return { userId: userId, products: [] };
      }

      return cart;
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Cart"),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addToCart(
    newProduct: OrderItemInterface,
    userId: string,
  ): Promise<CartInterface> {
    try {
      let cart = await this.cartModel.findOne({ userId });

      if (cart) {
        const existingProduct = cart.products.find(
          (product) =>
            product.productId === newProduct.productId &&
            product?.color === newProduct?.color &&
            product?.size === newProduct?.size,
        );

        if (existingProduct) {
          existingProduct.quantity += newProduct.quantity;
        } else {
          cart.products.push(newProduct);
        }
      } else {
        cart = new this.cartModel({
          userId,
          products: [newProduct],
        });
      }

      return await cart.save();
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("User"),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeFromCart(cartItemId: string, userId: string): Promise<void> {
    try {
      await this.cartModel.findOneAndUpdate(
        { userId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true },
      );
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Cart"),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCart(userId: string): Promise<void> {
    try {
      await this.cartModel.findOneAndDelete({ userId });
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Cart"),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
