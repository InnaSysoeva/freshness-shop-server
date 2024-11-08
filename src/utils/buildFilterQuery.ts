import { ProductFiltersInterface } from "src/common/interfaces/product-filters.interface";

export function buildFilterQuery(
  filters: ProductFiltersInterface,
): Record<string, any> {
  const query: Record<string, any> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      query[key] = { $in: value };
    } else if (key === "minPrice" || key === "maxPrice") {
      if (!query.price) query.price = {};
      if (key === "minPrice") query.price.$gte = value;
      if (key === "maxPrice") query.price.$lte = value;
    } else {
      query[key] = value;
    }
  });

  return query;
}
