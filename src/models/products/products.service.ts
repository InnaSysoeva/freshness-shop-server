import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.schema";
import { Model } from "mongoose";
import { ProductInterface } from "src/common/interfaces/product.interface";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductFiltersInterface } from "src/common/interfaces/product-filters.interface";
import { buildFilterQuery } from "../../utils/buildFilterQuery";
import errorMessages from "../../common/constants/error.messages";
import { CategoryEnum } from "../../common/enums/category.enum";
import { ProductResponseInterface } from "src/common/interfaces/product-response.interface";

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

  async getProductById(id: string): Promise<ProductInterface> {
    try {
      return await this.productModel.findById(id).exec();
    } catch {
      throw new HttpException(
        errorMessages.notFound("Product"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsByIds(ids: string[]): Promise<ProductInterface[]> {
    try {
      return await this.productModel.find({ _id: { $in: ids } });
    } catch {
      throw new HttpException(
        errorMessages.notFound("Product"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsByPage(
    page: number,
    limit: number,
    filters: ProductFiltersInterface,
  ): Promise<ProductResponseInterface> {
    const skip = (page - 1) * limit;
    const { query, sortQuery, search } = buildFilterQuery(filters);
    let products: ProductInterface[];

    try {
      if (query.price) {
        delete query.price;

        const productsWithCount = await this.productModel.aggregate([
          {
            $addFields: {
              discountedPrice: {
                $multiply: [
                  "$price",
                  { $subtract: [1, { $divide: ["$discount", 100] }] },
                ],
              },
            },
          },
          {
            $match: {
              $and: [
                query,
                {
                  discountedPrice: {
                    $gte: Number(filters.minPrice),
                    $lte: Number(filters.maxPrice),
                  },
                },
              ],
            },
          },
          ...(search
            ? [
                {
                  $match: {
                    $or: [{ title: { $regex: new RegExp(search, "i") } }],
                  },
                },
              ]
            : []),
          {
            $facet: {
              products: [
                ...(Object.keys(sortQuery).length > 0
                  ? [{ $sort: sortQuery }]
                  : []),
                { $skip: skip },
                { $limit: Number(limit) },
              ],
              productsQuantity: [{ $count: "total" }],
            },
          },
        ]);

        return {
          products: productsWithCount[0]?.products || [],
          quantity:
            productsWithCount[0]?.productsQuantity[0]?.total || 0,
        };
      } else {
        products = await this.productModel
          .find({
            ...query,
            ...(search && {
              $or: [{ title: { $regex: new RegExp(search, "i") } }],
            }),
          })
          .sort(sortQuery)
          .skip(skip)
          .limit(limit)
          .exec();
      }

      const productsQuantity = await this.productModel
        .countDocuments({
          ...query,
          ...(search && {
            $or: [{ title: { $regex: new RegExp(search, "i") } }],
          }),
        })
        .exec();

      return {
        products: products,
        quantity: productsQuantity,
      };
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Products"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsQuantitybyCategories(): Promise<Record<string, number>> {
    const categories = Object.values(CategoryEnum);

    try {
      const result = await this.productModel.aggregate([
        { $match: { category: { $in: categories } } },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
      ]);

      const productQuantities: Record<string, number> = {};

      result.forEach((item) => {
        productQuantities[item._id] = item.count;
      });

      categories.forEach((category) => {
        if (!productQuantities[category]) {
          productQuantities[category] = 0;
        }
      });

      return productQuantities;
    } catch (error) {
      throw new HttpException(
        errorMessages.notFound("Products"),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
