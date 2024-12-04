export const orderApiDescription = {
  createOrder: {
    apiOperation: {
      summary: "Create a new order",
      description:
        "This endpoint allows you to create a new order in the system. It returns the created order details as an object matching the OrderInterface.",
    },
    apiResponse: {
      status: 201,
      description: "Order created successfully.",
      example: {
        _id: "123",
        products: [
          {
            productId: "product-id-1",
            size: "M",
            color: "Red",
          },
          {
            productId: "product-id-2",
            size: "L",
          },
        ],
        totalPrice: 250.0,
        isComplete: false,
        userId: "user-id-123",
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St",
        email: "john.doe@example.com",
        phone: "1234567890",
        city: "New York",
        country: "USA",
        postalCode: "10001",
        promoCode: "SUMMER20",
        notes: "Leave package at the front door.",
        createdAt: "2024-12-03T12:34:56Z",
        updatedAt: "2024-12-03T12:34:56Z",
      },
    },
  },
};
