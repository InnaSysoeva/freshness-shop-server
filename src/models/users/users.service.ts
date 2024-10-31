import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserInterface } from "src/common/interfaces/user.interface";

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

  async updateUsersRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken });
  }
}
