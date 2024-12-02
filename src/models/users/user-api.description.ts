export const userApiDescription = {
  createUser: {
    apiOperation: {
      summary: "Create a new user",
      description:
        "This endpoint allows you to create a new user in the system.",
    },
    apiResponse: {
      status: 201,
      description: "User created successfully.",
      example: {
        _id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "ABcd12//",
        phoneNumber: "1234567890",
        accessToken: "jwt-token",
      },
    },
  },
  getUserByEmail: {
    apiOperation: {
      summary: "Retrieve a user",
      description: "This endpoint allows you to retrieve a user be email",
    },
    apiResponse: {
      status: 200,
      description: "User retrieved successfully.",
      example: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
        accessToken: "jwt-token",
      },
    },
  },
  getWishList: {
    apiOperation: {
      summary: "Get user's wish list",
      description:
        "This endpoint retrieves the user's wish list, returning an array of product IDs that the user has added to the wish list. The request is protected and requires authentication.",
    },
    apiResponse: {
      status: 200,
      description: "Successfully retrieved the user's wish list.",
      example: ["product-id-1", "product-id-2", "product-id-3"],
    },
  },
  addToWishList: {
    apiOperation: {
      summary: "Add product to user's wish list",
      description:
        "This endpoint adds a specified product to the authenticated user's wish list. The request requires the user to be logged in and authenticated.",
    },
    apiResponse: {
      status: 204,
      description:
        "Product added to the wish list successfully. No content is returned.",
    },
  },
  removeFromWishList: {
    apiOperation: {
      summary: "Remove product from user's wish list",
      description:
        "This endpoint removes a specified product from the authenticated user's wish list. The request requires the user to be logged in and authenticated.",
    },
    apiResponse: {
      status: 204,
      description:
        "Product removed from the wish list successfully. No content is returned.",
    },
  },
  removeAllFromWishList: {
    apiOperation: {
      summary: "Remove all products from user's wish list",
      description:
        "This endpoint clears the authenticated user's wish list by removing all products. The request requires the user to be logged in and authenticated.",
    },
    apiResponse: {
      status: 204,
      description:
        "All products removed from the wish list successfully. No content is returned.",
    },
  },
};
