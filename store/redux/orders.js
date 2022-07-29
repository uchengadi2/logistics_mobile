import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    createOrder: (state, action) => {
      state.orders.push({
        id: action.payload.id,
        category: action.payload.category,
        quantity: action.payload.quantity,
      });
    },
    fetchOrder: (state, action) => {},
    deleteOrder: (state, action) => {},
    fetchAllOrders: (state, action) => {},
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
