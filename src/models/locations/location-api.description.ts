export const locationApiDescription = {
  getCountries: {
    apiOperation: {
      summary: "Get list of countries",
      description:
        "This endpoint retrieves a list of countries by calling an external API (countriesnow.space). It returns an array of country names.",
    },
    apiResponse: {
      status: 200,
      description: "Successfully retrieved the list of countries.",
      example: ["United States", "Canada", "Germany", "France", "Australia"],
    },
  },
  getCities: {
    apiOperation: {
      summary: "Get list of cities by country",
      description:
        "This endpoint retrieves a list of cities for a given country. The country name is provided in the request body, and the function returns an array of city names for that country.",
    },
    apiResponse: {
      status: 200,
      description:
        "Successfully retrieved the list of cities for the specified country.",
      example: [
        "New York",
        "Los Angeles",
        "Chicago",
        "San Francisco",
        "Houston",
      ],
    },
  },
};
