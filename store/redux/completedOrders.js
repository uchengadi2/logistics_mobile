import { createSlice } from "@reduxjs/toolkit";

const completedOrderSlice = createSlice({
  name: "completedOrders",
  initialState: {
    orders: [],
    selectedOrder: null,
  },
  reducers: {
    fetchAllOrders: (state, action) => {
      state.orders.push({
        id: action.payload.id,
        category: action.payload.category,
        quantity: action.payload.quantity,
      });
    },
    storeOrder: (state, action) => {
      state.orders.push({
        id: action.payload.id,
        category: action.payload.category,
        orderQuantity: action.payload.orderQuantity,
        orderNumber: action.payload.orderNumber,
        dateOrdered: action.payload.dateOrdered,
        status: action.payload.status,
        consignmentCountry: action.payload.consignmentCountry,
        destinationCountry: action.payload.destinationCountry,
        orderedBy: action.payload.orderedBy,
        logisticsInsurancetype: action.payload.logisticsInsurancetype,
      });
    },
    deleteOrder: (state, action) => {},

    selectedOrder: (state, action) => {
      state.selectedOrder = action.payload.selectedOrder;
    },
  },
});

export const getAllCompletedOrders = (state) => state.completedOrder.orders;

export const getSelectedCompletedOrder = (state) =>
  state.completedOrder.selectedOrder;

export const completedOrderActions = completedOrderSlice.actions;

export default completedOrderSlice.reducer;
