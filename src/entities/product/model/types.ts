export type SortOrder = "asc" | "desc";
export type ProductSortField = "price" | "rating" | "title";

export interface Product {
  id: number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  rating: number;
  brand?: string;
  sku?: string;
  thumbnail?: string;
  isLocal?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductsQueryArgs {
  limit: number;
  skip: number;
  sortBy?: ProductSortField;
  order?: SortOrder;
}

export interface SearchProductsQueryArgs extends ProductsQueryArgs {
  query: string;
}
