import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    ids: [4, 5, 6],
  },
  reducers: {
    createCategory: (state, action) => {
      console.log("result:", action.payload);
    },
    fetchAllCategories: (state, action) => {},
    fetchCategory: (state, action) => {},
    deleteCategory: (state, action) => {},
  },
});

export const createCategory = categorySlice.actions.createCategory;
export const fetchAllCategories = categorySlice.actions.fetchAllCategories;
export const fetchCategory = categorySlice.actions.fetchCategory;
export const deleteCategory = categorySlice.actions.deleteCategory;
export default categorySlice.reducer;
