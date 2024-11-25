import { Body, Controller, Get, Post, Query, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { productApiDescription } from "./product-api.description";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductInterface } from "src/common/interfaces/product.interface";
import { ProductFiltersInterface } from "src/common/interfaces/product-filters.interface";
import { QueryParamsPipe } from "../../pipes/query-params.pipe";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation(productApiDescription.getProductsByPage.apiOperation)
  @ApiResponse(productApiDescription.getProductsByPage.apiResponse)
  async getProductsByPage(
    @Query(new QueryParamsPipe())
    {
      page,
      limit,
      filters,
    }: {
      page: number;
      limit: number;
      filters: ProductFiltersInterface;
    },
  ): Promise<ProductInterface[]> {
    return this.productsService.getProductsByPage(page, limit, filters);
  }

  @Get("/total-by-categories")
  @ApiOperation(
    productApiDescription.getProductsQuantitybyCategory.apiOperation,
  )
  @ApiResponse(productApiDescription.getProductsQuantitybyCategory.apiResponse)
  async getProductsQuantitybyCategories(): Promise<Record<string, number>> {
    return this.productsService.getProductsQuantitybyCategories();
  }

  @Get(":id")
  @ApiOperation(productApiDescription.getProductById.apiOperation)
  @ApiResponse(productApiDescription.getProductById.apiResponse)
  async getProductById(@Param("id") id: string): Promise<ProductInterface> {
    return this.productsService.getProductById(id);
  }

  @Post()
  @ApiOperation(productApiDescription.createProduct.apiOperation)
  @ApiResponse(productApiDescription.createProduct.apiResponse)
  async createProduct(
    @Body() productDto: CreateProductDto,
  ): Promise<ProductInterface> {
    return this.productsService.createProduct(productDto);
  }
}
