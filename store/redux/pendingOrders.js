import { createSlice } from "@reduxjs/toolkit";

const pendingOrderSlice = createSlice({
  name: "pendingOrders",
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
    fetchOrder: (state, action) => {
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

export const getAllPendingOrders = (state) => state.pendingOrder.orders;

export const getSelectedOrder = (state) => state.pendingOrder.selectedOrder;

export const pendingOrderActions = pendingOrderSlice.actions;

export default pendingOrderSlice.reducer;
