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
  loginUser: {
    apiOperation: {
      summary: "Login user",
      description:
        "This endpoint allows an existing user to log in to the system and receive an access token.",
    },
    apiResponse: {
      status: 200,
      description: "User logged in successfully.",
      example: {
        accessToken: "jwt-token",
      },
    },
  },
  getCurrentUser: {
    apiOperation: {
      summary: "Get current user",
      description:
        "This endpoint retrieves the details of the currently logged-in user based on the provided JWT access token.",
    },
    apiResponse: {
      status: 200,
      description: "Successfully retrieved current user information.",
      example: {
        _id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "123-456-7890",
        accessToken: "jwt-token",
        refreshToken: "refresh-token",
      },
    },
  },
  refreshToken: {
    apiOperation: {
      summary: "Refresh tokens",
      description:
        "This endpoint generates new access and refresh tokens for the user.",
    },
    apiResponse: {
      status: 200,
      description: "Tokens refreshed successfully.",
      example: {
        accessToken: "new-access-jwt-token",
        refreshToken: "new-refresh-jwt-token",
      },
    },
  },
};
