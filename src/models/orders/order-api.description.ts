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
  getOrdersByUserId: {
    apiOperation: {
      summary: "Get orders by user ID",
      description:
        "This endpoint retrieves all orders for an authenticated user. If a date range is provided, it filters the orders within that range. If no date range is provided, all orders are returned.",
    },
    apiResponse: {
      status: 200,
      description: "Successfully retrieved the user's orders.",
      example: [
        {
          _id: "order-id-123",
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
          totalPrice: 150.0,
          userId: "user-id-456",
          firstName: "John",
          lastName: "Doe",
          address: "123 Main St",
          email: "john.doe@example.com",
          phone: "1234567890",
          city: "New York",
          country: "USA",
          postalCode: "10001",
          createdAt: "2024-12-01T10:00:00Z",
          updatedAt: "2024-12-01T12:00:00Z",
        },
        {
          _id: "order-id-124",
          products: [
            {
              productId: "product-id-3",
              size: "S",
              color: "Blue",
            },
          ],
          totalPrice: 80.0,
          userId: "user-id-456",
          firstName: "John",
          lastName: "Doe",
          address: "123 Main St",
          email: "john.doe@example.com",
          phone: "1234567890",
          city: "New York",
          country: "USA",
          postalCode: "10001",
          createdAt: "2024-12-05T14:30:00Z",
          updatedAt: "2024-12-05T14:30:00Z",
        },
      ],
    },
  },
};
