import { ProductFiltersInterface } from "src/common/interfaces/product-filters.interface";

export function buildFilterQuery(
  filters: ProductFiltersInterface,
): Record<string, any> {
  const query: Record<string, any> = {};
  let sortOptions: Record<string, number> = {};
  let search: string = null;

  Object.entries(filters).forEach(([key, value]) => {
    if (key === "rating") {
      if (Array.isArray(value) && value.length) {
        query.$or = value.map((rating: number) => ({
          rating: { $gte: Number(rating), $lt: Number(rating) + 1 },
        }));
      } else {
        query.rating = { $gte: Number(value), $lt: Number(value) + 1 };
      }
    } else if (Array.isArray(value) && value.length) {
      query[key] = { $in: value };
    } else if (key === "minPrice" || key === "maxPrice") {
      if (!query.price) query.price = {};
      if (key === "minPrice") query.price.$gte = value;
      if (key === "maxPrice") query.price.$lte = value;
    } else if (key !== "sort" && key !== "sortDirection" && key !== "search") {
      query[key] = value;
    }
  });

  if (filters.sort && filters.sortDirection) {
    sortOptions[filters.sort] = Number(filters.sortDirection);
  }

  if (filters.search) {
    search = filters.search;
  }

  return {
    query,
    sortQuery: sortOptions,
    search,
  };
}
