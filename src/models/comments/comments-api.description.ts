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
  addReplyToComment: {
    apiOperation: {
      summary: "Add a reply to a comment",
      description:
        "This endpoint adds a reply to a specific comment. The comment ID is provided as a URL parameter, and the reply details are provided in the request body. The reply is inserted into the comment's array of replies.",
    },
    apiResponse: {
      status: 201,
      description: "Reply added successfully. Returns the new reply.",
      example: {
        _id: "reply-id-123",
        parentId: "comment-id-456",
        userId: "user-id-789",
        content: "Thank you for the feedback!",
        createdAt: "2024-12-18T15:00:00Z",
        updatedAt: "2024-12-18T15:00:00Z",
      },
    },
  },
  updateReplyToComment: {
    apiOperation: {
      summary: "Update a reply to a comment",
      description:
        "This endpoint updates an existing reply to a comment. The comment ID and reply ID are provided as URL parameters, and the updated reply details are provided in the request body. It returns the updated reply.",
    },
    apiResponse: {
      status: 200,
      description: "Reply updated successfully. Returns the updated reply.",
      example: {
        _id: "reply-id-123",
        parentId: "comment-id-456",
        userId: "user-id-789",
        content: "Updated reply content here.",
        createdAt: "2024-12-18T15:00:00Z",
        updatedAt: "2024-12-18T16:00:00Z",
      },
    },
  },
  deleteReplyToComment: {
    apiOperation: {
      summary: "Delete a reply to a comment",
      description:
        "This endpoint deletes a specific reply from a comment. The comment ID and reply ID are provided as URL parameters. No content is returned upon successful operation.",
    },
    apiResponse: {
      status: 204,
      description: "Reply deleted successfully. No content is returned.",
    },
  },
};
