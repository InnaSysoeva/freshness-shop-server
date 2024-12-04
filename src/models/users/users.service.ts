import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserInterface } from "src/common/interfaces/user.interface";
import errorMessages from "../../common/constants/error.messages";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserInterface>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserInterface> {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async getUserByEmail(email: string): Promise<UserInterface> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async addToWishList(productId: string, userId: string): Promise<void> {
    try {
      const user = await this.userModel.findById(userId);

      if (!user.wishList.includes(productId)) {
        user.wishList.push(productId);

        await user.save();
      }
    } catch {
      throw new HttpException(
        errorMessages.notFound("User"),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeFromWishList(productId: string, userId: string): Promise<void> {
    try {
      await this.userModel.findByIdAndUpdate(userId, {
        $pull: { wishList: productId },
      });
    } catch {
      throw new HttpException(
        errorMessages.notFound("User"),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeAllFromWishList(userId: string): Promise<void> {
    try {
      const user = await this.userModel.findById(userId);
      user.wishList = [];

      await user.save();
    } catch {
      throw new HttpException(
        errorMessages.notFound("User"),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getWishList(userId: string): Promise<string[]> {
    try {
      const user = await this.userModel.findById(userId);

      return user.wishList;
    } catch {
      throw new HttpException(
        errorMessages.notFound("User"),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
