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
};
