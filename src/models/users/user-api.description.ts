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
  getUser: {
    apiOperation: {
      summary: "Retrieve a user",
      description: "This endpoint allows you to retrieve a user.",
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
};
