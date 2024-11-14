export const productApiDescription = {
  getProductsByPage: {
    apiOperation: {
      summary: "Get products by page",
      description:
        "This endpoint retrieves products with pagination and filtering. The results are returned as an array of products based on the provided page, limit, and filter criteria.",
    },
    apiResponse: {
      status: 200,
      description:
        "Products retrieved successfully with pagination and filters applied.",
      example: [
        {
          _id: "1",
          title: "Product 1",
          description: "This is product 1.",
          rating: 4.5,
          price: 100,
          quantity: 50,
          brand: "Brand A",
          country: "USA",
          images: ["image1.jpg", "image2.jpg"],
          discount: 10,
          category: "Electronics",
          subcategory: "Mobile Phones",
        },
        {
          _id: "2",
          title: "Product 2",
          description: "This is product 2.",
          price: 150,
          quantity: 30,
          brand: "Brand B",
          country: "Germany",
          images: ["image3.jpg", "image4.jpg"],
          category: "Home Appliances",
          subcategory: "Refrigerators",
        },
      ],
    },
  },
  createProduct: {
    apiOperation: {
      summary: "Create a new product",
      description:
        "This endpoint allows you to create a new product in the system. It returns the created product details as an object.",
    },
    apiResponse: {
      status: 201,
      description: "Product created successfully.",
      example: {
        _id: "1",
        title: "New Product",
        description: "This is a new product.",
        rating: 4.7,
        price: 200,
        quantity: 100,
        brand: "Brand X",
        country: "USA",
        images: ["image1.jpg", "image2.jpg"],
        discount: 15,
        category: "Electronics",
        subcategory: "Laptops",
      },
    },
  },
  getProductsQuantitybyCategory: {
    apiOperation: {
      summary: "Get products quantity by category",
      description:
        "This endpoint retrieves the total quantity of products available in the specified category.",
    },
    apiResponse: {
      status: 200,
      description:
        "Successfully retrieved the quantity of products for the category.",
      example: 120,
    },
  },
};
