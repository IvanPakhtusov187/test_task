import { baseApi } from "../../../shared/api/baseApi";
import type {
  ProductsQueryArgs,
  ProductsResponse,
  SearchProductsQueryArgs
} from "../model/types";

const toQueryParams = (args: ProductsQueryArgs) => {
  const params = new URLSearchParams();
  params.set("limit", String(args.limit));
  params.set("skip", String(args.skip));
  if (args.sortBy) params.set("sortBy", args.sortBy);
  if (args.order) params.set("order", args.order);
  return params.toString();
};

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductsQuery: builder.query<ProductsResponse, ProductsQueryArgs>({
      query: (args) => `/products?${toQueryParams(args)}`
    }),
    searchProductsQuery: builder.query<ProductsResponse, SearchProductsQueryArgs>({
      query: (args) => {
        const params = new URLSearchParams();
        params.set("q", args.query);
        params.set("limit", String(args.limit));
        params.set("skip", String(args.skip));
        if (args.sortBy) params.set("sortBy", args.sortBy);
        if (args.order) params.set("order", args.order);
        return `/products/search?${params.toString()}`;
      }
    })
  })
});

export const {
  useGetProductsQueryQuery: useGetProductsQuery,
  useSearchProductsQueryQuery: useSearchProductsQuery
} = productApi;
