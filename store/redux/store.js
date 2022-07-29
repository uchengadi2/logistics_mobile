import { configureStore } from "@reduxjs/toolkit";

import orderReducers from "./orders";
import categoryReducers from "./category";
import authReducers from "./auth";
import pendingOrdersReducers from "./pendingOrders";
import completedOrdersReducer from "./completedOrders";
import pendingPaymentReducer from "./pendingPayment";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    order: orderReducers,
    category: categoryReducers,
    pendingOrder: pendingOrdersReducers,
    completedOrder: completedOrdersReducer,
    pendingPayment: pendingPaymentReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
