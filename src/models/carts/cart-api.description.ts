export const cartApiDescription = {
  getCartByUserId: {
    apiOperation: {
      summary: "Get cart by user ID",
      description:
        "This endpoint retrieves the cart for the authenticated user based on the user ID extracted from the token in the request headers.",
    },
    apiResponse: {
      status: 200,
      description: "Successfully retrieved the user's cart.",
      example: {
        userId: "user-id-123",
        products: [
          {
            _id: "cart-item-id-1",
            productId: "product-id-1",
            quantity: 2,
            size: "M",
            color: "Red",
          },
          {
            _id: "cart-item-id-2",
            productId: "product-id-2",
            quantity: 1,
          },
        ],
      },
    },
  },
  addToCart: {
    apiOperation: {
      summary: "Add product to user's cart",
      description:
        "This endpoint adds a product to the authenticated user's cart. The product details are provided in the request body, and the user ID is extracted from the token in the request headers. It returns the updated cart.",
    },
    apiResponse: {
      status: 200,
      description:
        "Product added to the cart successfully. Returns the updated cart.",
      example: {
        userId: "user-id-123",
        products: [
          {
            _id: "cart-item-id-1",
            productId: "product-id-1",
            quantity: 2,
            size: "M",
            color: "Red",
          },
          {
            _id: "cart-item-id-2",
            productId: "product-id-2",
            quantity: 1,
          },
        ],
      },
    },
  },
  removeFromCart: {
    apiOperation: {
      summary: "Remove product from user's cart",
      description:
        "This endpoint removes a product from the authenticated user's cart. The cart item ID is provided as a URL parameter, and the user ID is extracted from the token in the request headers. No content is returned upon successful operation.",
    },
    apiResponse: {
      status: 204,
      description:
        "Product removed from the cart successfully. No content is returned.",
    },
  },
  deleteCart: {
    apiOperation: {
      summary: "Delete a user's cart",
      description:
        "This endpoint deletes a specific user's cart. is extracted from the token in the request headers. No content is returned upon successful operation.",
    },
    apiResponse: {
      status: 204,
      description: "Cart deleted successfully. No content is returned.",
    },
  },
};
