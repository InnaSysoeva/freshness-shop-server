export const commentsApiDescription = {
  createComment: {
    apiOperation: {
      summary: "Create a new comment",
      description:
        "This endpoint creates a new comment for a product. The comment details are provided in the request body, and the function returns the ID of the newly created comment.",
    },
    apiResponse: {
      status: 201,
      description: "Comment created successfully.",
      example: {
        _id: "123",
        userId: "456",
        productId: "789",
        content: "This is a great product!",
        parentId: null,
        createdAt: "2024-12-18T12:00:00Z",
        updatedAt: "2024-12-18T12:00:00Z",
      },
    },
  },
  updateComment: {
    apiOperation: {
      summary: "Update an existing comment",
      description:
        "This endpoint updates an existing comment by its ID. The comment ID is provided as a URL parameter, and the updated comment details are provided in the request body. The function returns updated comment.",
    },
    apiResponse: {
      status: 201,
      description: "Comment updated successfully.",
      example: {
        _id: "123",
        userId: "456",
        productId: "789",
        content: "This is a great product! updated",
        parentId: null,
        createdAt: "2024-12-18T12:00:00Z",
        updatedAt: "2024-12-18T12:00:00Z",
      },
    },
  },
  deleteComment: {
    apiOperation: {
      summary: "Delete a comment",
      description:
        "This endpoint deletes an existing comment by its ID. The comment ID is provided as a URL parameter. No content is returned upon successful operation.",
    },
    apiResponse: {
      status: 204,
      description: "Comment deleted successfully. No content is returned.",
    },
  },
  getCommentsByProductId: {
    apiOperation: {
      summary: "Get comments by product ID",
      description:
        "This endpoint retrieves all comments for a specific product by its ID. The comments are returned without their replies (nested comments).",
    },
    apiResponse: {
      status: 200,
      description: "Successfully retrieved comments for the product.",
      example: [
        {
          _id: "comment-id-1",
          userId: "user-id-123",
          productId: "product-id-456",
          content: "Great product, really loved it!",
          parentId: null,
          createdAt: "2024-12-18T12:00:00Z",
          updatedAt: "2024-12-18T12:00:00Z",
        },
        {
          _id: "comment-id-2",
          userId: "user-id-789",
          productId: "product-id-456",
          content: "Not satisfied with the quality.",
          parentId: null,
          createdAt: "2024-12-18T12:05:00Z",
          updatedAt: "2024-12-18T12:05:00Z",
        },
      ],
    },
  },
};
