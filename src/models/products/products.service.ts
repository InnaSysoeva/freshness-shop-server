import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.schema";
import { Model } from "mongoose";
import { ProductInterface } from "src/common/interfaces/product.interface";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductFiltersInterface } from "src/common/interfaces/product-filters.interface";
import { buildFilterQuery } from "../../utils/buildFilterQuery";
import errorMessages from "../../common/constants/error.messages";
import { CategoryEnum } from "src/common/enums/category.enum";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductInterface>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductInterface> {
    const product = new this.productModel(createProductDto);

    return product.save();
  }

  async getProductsByPage(
    page: number,
    limit: number,
    filters: ProductFiltersInterface,
  ): Promise<ProductInterface[]> {
    const skip = (page - 1) * limit;
    const query = buildFilterQuery(filters);

    try {
      const products = await this.productModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .exec();

      return products;
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Products"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsQuantitybyCategory(category: CategoryEnum): Promise<number> {
    try {
      return await this.productModel.countDocuments({ category }).exec();
    } catch (error) {
      console.log(error)
      throw new HttpException(
        errorMessages.notFound("Products"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
