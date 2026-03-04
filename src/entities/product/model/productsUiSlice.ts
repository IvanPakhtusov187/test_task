import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ProductSortField, SortOrder } from "./types";

interface ProductsUiState {
  sortBy: ProductSortField;
  order: SortOrder;
}

const initialState: ProductsUiState = {
  sortBy: "price",
  order: "asc"
};

const productsUiSlice = createSlice({
  name: "productsUi",
  initialState,
  reducers: {
    setSorting: (
      state,
      action: PayloadAction<{ sortBy: ProductSortField; order: SortOrder }>
    ) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
    }
  }
});

export const { setSorting } = productsUiSlice.actions;
export default productsUiSlice.reducer;
