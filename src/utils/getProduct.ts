import { OrderItemInterface } from "src/common/interfaces/order-item.interface";

export function getProduct(
  products: OrderItemInterface[],
  newProduct: OrderItemInterface,
) {
  return products.find(
    (product) =>
      product.productId === newProduct.productId &&
      product?.color === newProduct?.color &&
      product?.size === newProduct?.size,
  );
}
