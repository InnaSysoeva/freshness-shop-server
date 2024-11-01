export const authDescription = {
  registerUser: {
    apiOperation: {
      summary: "Register a new user",
      description:
        "This endpoint allows you to register a new user in the system.",
    },
    apiResponse: {
      status: 201,
      description: "User registered successfully.",
      example: {
        accessToken: "jwt-token",
      },
    },
  },
};
