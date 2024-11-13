export interface UrlQueryInterface {
  page: number;
  limit: number;
  category?: string;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}
